from transformers import AutoModelForCausalLM, AutoTokenizer
from PIL import Image
import os
from web3 import Web3
from eth_account import Account
import time
from datetime import datetime


# Load your private key from an environment variable
private_key = os.getenv('PRIVATE_KEY')


model_id = "vikhyatk/moondream2"
revision = "2024-08-26"
model = AutoModelForCausalLM.from_pretrained(
    model_id, trust_remote_code=True, revision=revision
)
tokenizer = AutoTokenizer.from_pretrained(model_id, revision=revision)

image = Image.open('./data/fire.jpg')
enc_image = model.encode_image(image)
#answer = model.answer_question(enc_image, "does this photo show a kind of disaster? ", tokenizer)
answer = "Yes"
print(answer)

if answer[:3] == "Yes":
    # Connect to the SKALE blockchain
    #web3 = Web3(Web3.HTTPProvider("https://mainnet.infura.io/v3/8047f1f42e5a4af5a1ef75d4f04f5ca9"))
    web3 = Web3(Web3.HTTPProvider("https://testnet.skalenodes.com/v1/giant-half-dual-testnet"))

    # Check if the connection is successful
    if web3.is_connected():
        print("Connected to SKALE node")
    else:
        raise Exception("Failed to connect to SKALE node")

    # Set up account from private key
    account = Account.from_key(private_key)
    address = account.address

    # DisasterRegistry contract address and ABI
    contract_address = "0x0948e40e40860A02956E70E814c8C5088f4049E0"  
    contract_abi = [
        # ABI definition goes here; for example:
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
        }
        # Add other ABI elements if needed
    ]

    # Initialize contract instance
    contract = web3.eth.contract(address=contract_address, abi=contract_abi)
    print(address)
    # Prepare the transaction

    latitude = -688468  
    longitude = -263568  

    # Current timestamp
    timestamp = int(time.time())

    # Agent type (assuming 1 is still valid, adjust if needed)
    agent_type = 1

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
