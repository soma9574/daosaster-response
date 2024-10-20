import asyncio
from web3 import AsyncWeb3
from web3.exceptions import TransactionNotFound
import aiohttp
import json
from datetime import datetime, timedelta
from eth_account import Account
import os
import time
from web3 import Web3

private_key = os.getenv('PRIVATE_KEY')
# Contract address
CONTRACT_ADDRESS = '0x0948e40e40860A02956E70E814c8C5088f4049E0'

ENDPOINT = 'https://testnet.skalenodes.com/v1/giant-half-dual-testnet'

EARTHQUAKE_API_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson"
web3 = Web3(Web3.HTTPProvider("https://testnet.skalenodes.com/v1/giant-half-dual-testnet"))

ABI = [
    {
        "inputs": [
            {"internalType": "int256", "name": "_latitude", "type": "int256"},
            {"internalType": "int256", "name": "_longitude", "type": "int256"},
            {"internalType": "uint256", "name": "_timestamp", "type": "uint256"},
            {"internalType": "uint8", "name": "_agentType", "type": "uint8"}
        ],
        "name": "reportDisaster",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": False,
        "inputs": [
            {"indexed": True, "name": "from", "type": "address"},
            {"indexed": True, "name": "to", "type": "address"},
            {"indexed": False, "name": "value", "type": "uint256"}
        ],
        "name": "Transfer",
        "type": "event"
    }
]

def convert_coordinates(lat, lon):
    return lat / 10000, lon / 10000

async def check_nearby_earthquakes(latitude, longitude):
    lat, lon = convert_coordinates(latitude, longitude)
    
    async with aiohttp.ClientSession() as session:
        async with session.get(EARTHQUAKE_API_URL) as response:
            if response.status == 200:
                data = await response.json()
                nearby_earthquakes = []
                
                for feature in data['features']:
                    eq_lat, eq_lon, _ = feature['geometry']['coordinates']
                    eq_mag = feature['properties']['mag']
                    eq_time = datetime.fromtimestamp(feature['properties']['time'] / 1000)

                    # Check if earthquake is within ~500km (rough approximation)
                    if int(eq_lat) == int(lat) and int(eq_lon) == int(lon):
                        nearby_earthquakes.append({
                            'magnitude': eq_mag,
                            'latitude': eq_lat,
                            'longitude': eq_lon,
                            'time': eq_time
                        })
                
                return nearby_earthquakes
            else:
                print(f"Failed to fetch earthquake data: HTTP {response.status}")
                return []

async def log_loop(event_filter, poll_interval, w3, contract):
    while True:
        for event in await event_filter.get_new_entries():
            await handle_event(event, w3, contract)
        await asyncio.sleep(poll_interval)

async def handle_event(event, w3, contract):
    print("New event received")
    print(f"New event: {event}")
    transaction_hash = event['transactionHash'].hex()
    print(f"Transaction Hash: {transaction_hash}")
    
    try:
        # Get the transaction details
        transaction = await w3.eth.get_transaction(transaction_hash)
        
        # Decode the input data
        decoded_input = contract.decode_function_input(transaction.input)
        
        # Extract latitude and longitude
        function_name, function_params = decoded_input
        latitude = function_params['_latitude']
        longitude = function_params['_longitude']
        
        print(f"Raw Latitude: {latitude}")
        print(f"Raw Longitude: {longitude}")
        
        # Check for nearby earthquakes
        nearby_quakes = await check_nearby_earthquakes(latitude, longitude)
        print(nearby_quakes)
        if nearby_quakes:
            print("Nearby earthquakes detected:")
            for quake in nearby_quakes:

                account = Account.from_key(private_key)
                address = account.address

                # Initialize contract instance
                contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)
                print(address)
                # Prepare the transaction

                latitude =int(quake['latitude'])
                longitude = int(quake['longitude'])

                # Current timestamp - consider switching to earthquake time or adding as addtl info
                #timestamp = int(str(quake['time']))
                timestamp = int(time.time())

                # Agent type (assuming 1 is still valid, adjust if needed)
                agent_type = 2

                # Build transaction for reportDisaster
                transaction = contract.functions.reportDisaster(
                    latitude, longitude, timestamp, agent_type
                ).build_transaction({
                    'chainId': 974399131,  # Replace with the SKALE chain ID
                    'from': address,
                    'nonce': web3.eth.get_transaction_count(address),
                })

                # Sign the transaction with your private key
                signed_txn = web3.eth.account.sign_transaction(transaction, private_key)

                # Send the transaction
                tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)

                # Wait for the transaction receipt
                tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

                print(f"Transaction successful with hash: {tx_hash.hex()}")


                print(f"Magnitude {quake['magnitude']} earthquake at "
                      f"({quake['latitude']}, {quake['longitude']}) on {quake['time']}")
        else:
            print("No nearby earthquakes detected in the past day.")
        
    except TransactionNotFound:
        print(f"Transaction {transaction_hash} not found.")
    except Exception as e:
        print(f"Error processing transaction: {e}")

async def create_new_filter(w3, contract_address):
    # Get the latest block number
    latest_block = await w3.eth.get_block('latest')
    
    # Create a new filter starting from the latest block
    new_filter = await w3.eth.filter({
        "address": contract_address,
        "fromBlock": latest_block.number
    })
    
    print(f"New event filter created. Listening for events from block {latest_block.number}...")
    return new_filter

async def main():
    w3 = AsyncWeb3(AsyncWeb3.AsyncHTTPProvider(ENDPOINT))
    
    # Create contract instance
    contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)
    
    while True:
        try:
            # Create a new filter for each iteration
            event_filter = await create_new_filter(w3, CONTRACT_ADDRESS)
            
            # Run the log loop for a set duration (e.g., 10 minutes)
            try:
                await asyncio.wait_for(log_loop(event_filter, 2, w3, contract), timeout=600)
            except asyncio.TimeoutError:
                print("Resetting filter after timeout...")
            
            # Uninstall the old filter
            await w3.eth.uninstall_filter(event_filter.filter_id)
            print(f"Uninstalled filter {event_filter.filter_id}")
            
        except KeyboardInterrupt:
            print("Monitoring stopped by user.")
            break
        except Exception as e:
            print(f"An error occurred: {e}")
            print("Retrying in 10 seconds...")
            await asyncio.sleep(10)

if __name__ == '__main__':
    asyncio.run(main())