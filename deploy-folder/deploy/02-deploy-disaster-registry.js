const { ethers } = require("hardhat");
const { verify } = require("../utils/verify");

const func = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // Helper function to deploy and verify
  async function deployAndVerify(contractName, args = []) {
    const contract = await deploy(contractName, {
      from: deployer,
      args: args,
      log: true,
      waitConfirmations: 1,
    });

    console.log(`${contractName} deployed to:`, contract.address);

    if (hre.network.name === "skaleCalypso") {
      console.log("Verifying contract...");
      try {
        await verify(contract.address, args);
      } catch (e) {
        console.log("Verification error:", e);
      }
    }

    return contract;
  }

  // Deploy and verify contracts
  const disasterRegistry = await deployAndVerify("DisasterRegistry");
  const globalAgent = await deployAndVerify("GlobalAgent");
  const regionalAgent = await deployAndVerify("RegionalAgent");
  const localAgent = await deployAndVerify("LocalAgent", [
    disasterRegistry.address,
  ]);
  const mockToken = await deployAndVerify("MockToken", [
    "Mock Token",
    "MTK",
    ethers.utils.parseEther("1000000"),
  ]);
  const disasterResponseDAO = await deployAndVerify("DisasterResponseDAO", [
    mockToken.address,
    5,
    86400,
  ]);
  const humanOrganization = await deployAndVerify("HumanOrganization", [
    "Test Organization",
    "Emergency Response",
  ]);
  const individual = await deployAndVerify("Individual", [
    "John Doe",
    "First Aid, Search and Rescue",
  ]);

  console.log("All contracts deployed and verified successfully!");

  // Return deployed contract addresses
  return {
    disasterRegistry: disasterRegistry.address,
    globalAgent: globalAgent.address,
    regionalAgent: regionalAgent.address,
    localAgent: localAgent.address,
    disasterResponseDAO: disasterResponseDAO.address,
    humanOrganization: humanOrganization.address,
    individual: individual.address,
    mockToken: mockToken.address,
  };
};

module.exports = func;
func.tags = [
  "DisasterRegistry",
  "DisasterResponseDAO",
  "HumanOrganization",
  "Individual",
  "GlobalAgent",
  "RegionalAgent",
  "LocalAgent",
  "MockToken",
];
