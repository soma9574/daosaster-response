const { expect } = require("chai");
const { ethers, deployments } = require("hardhat");

describe("Disaster Registry System", function () {
  let globalAgent,
    regionalAgent,
    localAgent,
    disasterResponseDAO,
    humanOrganization,
    individual,
    disasterRegistry,
    sampleDisaster,
    mockToken;
  let deployer, user1, user2;

  beforeEach(async function () {
    [deployer, user1, user2] = await ethers.getSigners();

    // Deploy all contracts
    await deployments.fixture([
      "DisasterRegistry",
      "DisasterResponseDAO",
      "HumanOrganization",
      "Individual",
      "GlobalAgent",
      "RegionalAgent",
      "LocalAgent",
      "Disaster",
      "MockToken",
    ]);

    // Get deployed contract instances
    globalAgent = await ethers.getContract("GlobalAgent");
    regionalAgent = await ethers.getContract("RegionalAgent");
    localAgent = await ethers.getContract("LocalAgent");
    disasterResponseDAO = await ethers.getContract("DisasterResponseDAO");
    humanOrganization = await ethers.getContract("HumanOrganization");
    individual = await ethers.getContract("Individual");
    disasterRegistry = await ethers.getContract("DisasterRegistry");
    sampleDisaster = await ethers.getContract("Disaster");
    mockToken = await ethers.getContract("MockToken");
  });

  describe("DisasterResponseDAO", function () {
    it("should have correct initial settings", async function () {
      expect(await disasterResponseDAO.quorum()).to.equal(5);
      expect(await disasterResponseDAO.votingPeriod()).to.equal(86400);
      expect(await disasterResponseDAO.governanceToken()).to.equal(
        mockToken.address
      );
    });

    // Add more tests for DisasterResponseDAO functionality
  });

  describe("HumanOrganization", function () {
    it("should have correct initial settings", async function () {
      expect(await humanOrganization.name()).to.equal("Test Organization");
      expect(await humanOrganization.expertise()).to.equal(
        "Emergency Response"
      );
    });

    // Add more tests for HumanOrganization functionality
  });

  describe("Individual", function () {
    it("should have correct initial settings", async function () {
      expect(await individual.name()).to.equal("John Doe");
      expect(await individual.skills()).to.equal(
        "First Aid, Search and Rescue"
      );
    });

    // Add more tests for Individual functionality
  });

  describe("DisasterRegistry", function () {
    it("should allow registering a new disaster", async function () {
      await disasterRegistry.registerDisaster(sampleDisaster.address);
      expect(await disasterRegistry.isRegistered(sampleDisaster.address)).to.be
        .true;
    });

    it("should emit DisasterCreated event when reporting a new disaster", async function () {
      const latitude = 123456;
      const longitude = 789012;
      const timestamp = Math.floor(Date.now() / 1000);
      const agentType = 0; // FirstResponder

      await expect(
        disasterRegistry.reportDisaster(
          latitude,
          longitude,
          timestamp,
          agentType
        )
      )
        .to.emit(disasterRegistry, "DisasterCreated")
        .withArgs(
          0, // disasterId (first disaster, so index is 0)
          await disasterRegistry.getDisasterContract(0), // disasterContract address
          latitude,
          longitude,
          timestamp,
          agentType
        );

      // Verify that the disaster count has increased
      expect(await disasterRegistry.getDisasterCount()).to.equal(1);
    });

    // Add more tests for DisasterRegistry functionality
  });

  describe("Disaster", function () {
    it("should have correct initial settings", async function () {
      const disasterInfo = await sampleDisaster.getDisasterInfo();
      expect(disasterInfo.latitude).to.equal(123456);
      expect(disasterInfo.longitude).to.equal(789012);
      expect(disasterInfo.timestamp).to.be.closeTo(
        Math.floor(Date.now() / 1000),
        5
      );
      expect(disasterInfo.firstAgentAddress).to.equal(deployer.address);
      expect(disasterInfo.firstAgentType).to.equal(0);
    });

    // Add more tests for Disaster functionality
  });

  // Add tests for GlobalAgent, RegionalAgent, and LocalAgent
});
