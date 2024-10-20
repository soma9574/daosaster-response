from web3 import Web3, AsyncWeb3
import asyncio


infura_url = "https://mainnet.infura.io/v3/8047f1f42e5a4af5a1ef75d4f04f5ca9"

web3 = Web3(Web3.HTTPProvider(infura_url))

print(web3.eth.get_block('latest'))



