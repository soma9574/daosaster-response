// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./HumanOrganization.sol";
import "./Individual.sol";
import "./DisasterResponseDAO.sol";
import "./agents/GlobalAgent.sol";
import "./agents/RegionalAgent.sol";
import "./agents/LocalAgent.sol";

contract Disaster is Ownable {
    enum AgentType {
        FirstResponder,
        Volunteer,
        Other
    }

    struct Agent {
        address agentAddress;
        AgentType agentType;
    }

    int256 public latitude;
    int256 public longitude;
    uint256 public timestamp;
    Agent[] public agents;
    HumanOrganization[] public organizations;
    Individual[] public individuals;
    DisasterResponseDAO public dao;

    event AgentAttached(address indexed agent, AgentType agentType);
    event OrganizationAdded(
        address indexed organization,
        string name,
        string expertise
    );
    event IndividualAdded(
        address indexed individual,
        string name,
        string skills
    );
    event TaskAssignedToOrganization(uint256 indexed orgIndex, string task);
    event TaskAssignedToIndividual(
        uint256 indexed individualIndex,
        string task
    );
    event FundingProposalCreated(uint256 amount, string description);

    constructor(
        int256 _latitude,
        int256 _longitude,
        uint256 _timestamp,
        address _firstAgent,
        AgentType _firstAgentType,
        address _daoAddress
    ) {
        latitude = _latitude;
        longitude = _longitude;
        timestamp = _timestamp;
        agents.push(Agent(_firstAgent, _firstAgentType));
        dao = DisasterResponseDAO(_daoAddress);
        emit AgentAttached(_firstAgent, _firstAgentType);
    }

    function attachAgent(
        address _agent,
        AgentType _agentType
    ) external onlyOwner {
        agents.push(Agent(_agent, _agentType));
        emit AgentAttached(_agent, _agentType);
    }

    function addOrganization(
        string memory _name,
        string memory _expertise
    ) external onlyOwner {
        HumanOrganization newOrg = new HumanOrganization(_name, _expertise);
        organizations.push(newOrg);
        emit OrganizationAdded(address(newOrg), _name, _expertise);
    }

    function addIndividual(
        string memory _name,
        string memory _skills
    ) external onlyOwner {
        Individual newIndividual = new Individual(_name, _skills);
        individuals.push(newIndividual);
        emit IndividualAdded(address(newIndividual), _name, _skills);
    }

    function assignTaskToOrganization(
        uint256 _orgIndex,
        string memory _task
    ) external onlyOwner {
        require(_orgIndex < organizations.length, "Invalid organization index");
        organizations[_orgIndex].assignTask(_task);
        emit TaskAssignedToOrganization(_orgIndex, _task);
    }

    function assignTaskToIndividual(
        uint256 _individualIndex,
        string memory _task
    ) external onlyOwner {
        require(
            _individualIndex < individuals.length,
            "Invalid individual index"
        );
        individuals[_individualIndex].assignTask(_task);
        emit TaskAssignedToIndividual(_individualIndex, _task);
    }

    function getAgents() external view returns (Agent[] memory) {
        return agents;
    }

    function getOrganizationsCount() external view returns (uint256) {
        return organizations.length;
    }

    function getIndividualsCount() external view returns (uint256) {
        return individuals.length;
    }

    function createFundingProposal(
        uint256 _amount,
        string memory _description
    ) external onlyOwner {
        dao.createProposal(_amount, _description);
        emit FundingProposalCreated(_amount, _description);
    }

    function executeAgentAction(uint256 _agentIndex) external view onlyOwner {
        require(_agentIndex < agents.length, "Invalid agent index");
        Agent memory agent = agents[_agentIndex];

        if (agent.agentType == AgentType.FirstResponder) {
            GlobalAgent(agent.agentAddress).monitorGlobalNews();
        } else if (agent.agentType == AgentType.Volunteer) {
            RegionalAgent(agent.agentAddress).monitorRegionalCommunications();
        } else if (agent.agentType == AgentType.Other) {
            LocalAgent(agent.agentAddress).monitorLocalSensors();
        }
    }
}
