const ethers = require('ethers');
require('dotenv').config();
const { CONTRACT_ADDRESS, BLOB_ID, ABI } = require('./constants');


async function spgMintIp() {
  // Connect to the network
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  
  // Load the wallet to sign the transaction
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Create a contract instance
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  try {
    // Call the spgMintIp function
    const tx = await contract.spgMintIp(BLOB_ID);
    console.log('Transaction sent:', tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log('Transaction confirmed in block:', receipt.blockNumber);

    // Log the event data
    const event = receipt.logs[0];
    const decodedEvent = contract.interface.parseLog(event);
    console.log('Event data:', decodedEvent.args);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
spgMintIp();
