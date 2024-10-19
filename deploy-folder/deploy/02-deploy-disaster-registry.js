const func = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
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
  const tokenAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual token address
  const quorum = 5; // Set the quorum for proposal execution
  const votingPeriod = 86400; // Set the voting period in seconds (e.g., 1 day)

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
      123456, // latitude
      789012, // longitude
      Math.floor(Date.now() / 1000), // timestamp
      deployer, // first agent address
      0, // AgentType.FirstResponder
      disasterResponseDAO.address, // DAO address
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
  "Disaster",
];
