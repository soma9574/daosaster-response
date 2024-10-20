// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Disaster {
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

    event AgentAttached(address indexed agent, AgentType agentType);

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
        emit AgentAttached(_firstAgent, _firstAgentType);
    }

    function attachAgent(address _agent, AgentType _agentType) external {
        agents.push(Agent(_agent, _agentType));
        emit AgentAttached(_agent, _agentType);
    }

    function getAgents() external view returns (Agent[] memory) {
        return agents;
    }
}
