const func = async function (hre) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // Deploy agent contracts
  const globalAgent = await deploy("GlobalAgent", {
    from: deployer,
    args: [],
    log: true,
  });

  const regionalAgent = await deploy("RegionalAgent", {
    from: deployer,
    args: [],
    log: true,
  });

  const localAgent = await deploy("LocalAgent", {
    from: deployer,
    args: [],
    log: true,
  });

  // Deploy DisasterResponseDAO
  const tokenAddress = await deployMockToken(hre);
  const quorum = 5;
  const votingPeriod = 86400;

  const disasterResponseDAO = await deploy("DisasterResponseDAO", {
    from: deployer,
    args: [tokenAddress, quorum, votingPeriod],
    log: true,
  });

  // Deploy HumanOrganization and Individual contracts
  const humanOrganization = await deploy("HumanOrganization", {
    from: deployer,
    args: ["Test Organization", "Emergency Response"],
    log: true,
  });

  const individual = await deploy("Individual", {
    from: deployer,
    args: ["John Doe", "First Aid, Search and Rescue"],
    log: true,
  });

  // Deploy DisasterRegistry
  const disasterRegistry = await deploy("DisasterRegistry", {
    from: deployer,
    args: [],
    log: true,
  });

  // Deploy a sample Disaster contract
  const sampleDisaster = await deploy("Disaster", {
    from: deployer,
    args: [
      123456,
      789012,
      Math.floor(Date.now() / 1000),
      deployer,
      0,
      disasterResponseDAO.address,
    ],
    log: true,
  });

  console.log("All contracts deployed successfully!");
  console.log("GlobalAgent address:", globalAgent.address);
  console.log("RegionalAgent address:", regionalAgent.address);
  console.log("LocalAgent address:", localAgent.address);
  console.log("DisasterResponseDAO address:", disasterResponseDAO.address);
  console.log("HumanOrganization address:", humanOrganization.address);
  console.log("Individual address:", individual.address);
  console.log("DisasterRegistry address:", disasterRegistry.address);
  console.log("Sample Disaster address:", sampleDisaster.address);

  // Return deployed contract addresses for testing
  return {
    globalAgent,
    regionalAgent,
    localAgent,
    disasterResponseDAO,
    humanOrganization,
    individual,
    disasterRegistry,
    sampleDisaster,
    tokenAddress,
  };
};

// Helper function to deploy a mock token for testing
async function deployMockToken(hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const mockToken = await deploy("MockToken", {
    from: deployer,
    args: ["Mock Token", "MTK", ethers.utils.parseEther("1000000")],
    log: true,
  });

  return mockToken.address;
}

module.exports = func;
func.tags = [
  "DisasterRegistry",
  "DisasterResponseDAO",
  "HumanOrganization",
  "Individual",
  "GlobalAgent",
  "RegionalAgent",
  "LocalAgent",
  "Disaster",
  "MockToken",
];
