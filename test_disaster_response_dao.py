from web3 import Web3
from web3.middleware import geth_poa_middleware
import json
import os

# Connect to local Ethereum node (e.g., Ganache)
w3 = Web3(Web3.HTTPProvider('http://localhost:8545'))
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

# Ensure connection is successful
assert w3.is_connected(), "Not connected to Ethereum node"

# Set default account
w3.eth.default_account = w3.eth.accounts[0]

# Load contract ABI and bytecode
script_dir = os.path.dirname(os.path.abspath(__file__))
contract_path = os.path.join(script_dir, 'deploy-folder', 'artifacts', 'contracts', 'DisasterResponseDAO.sol', 'DisasterResponseDAO.json')

with open(contract_path, 'r') as file:
    contract_json = json.load(file)
    abi = contract_json['abi']
    bytecode = contract_json['bytecode']

# Deploy mock ERC20 token
mock_token_abi = [
    {"constant":False,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"},
    {"constant":False,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"type":"function"},
    {"constant":False,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"type":"function"},
    {"constant":True,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"}
]

mock_token_bytecode = "60806040..." # Add the bytecode of a simple ERC20 token here

MockToken = w3.eth.contract(abi=mock_token_abi, bytecode=mock_token_bytecode)
tx_hash = MockToken.constructor().transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
mock_token_address = tx_receipt.contractAddress

# Deploy DisasterResponseDAO contract
DisasterResponseDAO = w3.eth.contract(abi=abi, bytecode=bytecode)
tx_hash = DisasterResponseDAO.constructor(mock_token_address, 3, 86400).transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
dao_address = tx_receipt.contractAddress

# Create contract instance
dao = w3.eth.contract(address=dao_address, abi=abi)

# Test functions
def test_add_agent():
    tx_hash = dao.functions.addAgent(w3.eth.accounts[1]).transact()
    w3.eth.wait_for_transaction_receipt(tx_hash)
    assert dao.functions.isAgent(w3.eth.accounts[1]).call() == True, "Agent not added"
    print("Add agent test passed")

def test_create_proposal():
    # First, add the account as an agent
    tx_hash = dao.functions.addAgent(w3.eth.accounts[0]).transact()
    w3.eth.wait_for_transaction_receipt(tx_hash)
    
    tx_hash = dao.functions.createProposal(100, "Test proposal").transact()
    w3.eth.wait_for_transaction_receipt(tx_hash)
    proposal = dao.functions.getProposalDetails(1).call()
    assert proposal[0] == w3.eth.accounts[0], "Proposal creator mismatch"
    assert proposal[1] == 100, "Proposal amount mismatch"
    assert proposal[2] == "Test proposal", "Proposal description mismatch"
    print("Create proposal test passed")

def test_vote():
    tx_hash = dao.functions.vote(1, True).transact({'from': w3.eth.accounts[1]})
    w3.eth.wait_for_transaction_receipt(tx_hash)
    proposal = dao.functions.getProposalDetails(1).call()
    assert proposal[3] == 1, "Yes vote count mismatch"
    print("Vote test passed")

# Run tests
test_add_agent()
test_create_proposal()
test_vote()

print("All tests passed successfully!")
