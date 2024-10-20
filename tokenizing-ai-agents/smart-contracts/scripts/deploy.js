const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const fundWalletAddress = "0x97EE6Bd44AA73ad966e0BA80432D8C71230beAE2"; // Replace with the actual fund wallet address

  const AIAgentNFT = await hre.ethers.getContractFactory("AIAgentNFT");
  const aiAgentNFT = await AIAgentNFT.deploy(fundWalletAddress);

  await aiAgentNFT.deployed();

  console.log("AIAgentNFT deployed to:", aiAgentNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
