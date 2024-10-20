
# Disaster Response Hackathon (Eth Global)

## Overview

In the event of a disaster, traditional methods of communication and coordination often become unreliable or unavailable. This project aims to build an autonomous, decentralized disaster response system leveraging AI agents, drones, and blockchain technologies to mitigate these challenges.

The goal is to create an interconnected web of agents and autonomous systems that can work together to identify and respond to disasters. These systems will monitor the environment, assess the situation, and coordinate responses from both human and non-human participants.

### Features:

-   **Autonomous Agents:** AI agents that detect disasters and coordinate responses with other agents and human organizations.
-   **Decentralized Coordination:** Use of blockchain for trust, identity verification, and tasking rescue efforts.
-   **Autonomous Drones:** Integration of drones for data collection and rescue efforts.
-   **Disaster Reporting:** Agents report disasters and create a consensus across the network.
-   **Common Data Picture:** Create a unified dataset distributed among agents to maintain a shared understanding of the situation.

## How It Works:

1.  **Monitoring:** Agents (global, regional, and local) continuously monitor environments for signs of a disaster.
2.  **Trigger:** Once a disaster is detected, agents report the event and request confirmation from other agents, building a consensus.
3.  **Data Collection:** As confidence grows, more drones and systems are deployed to gather data.
4.  **Autonomous Tasking:** Agents begin automating the response effort, including deploying drones and coordinating human rescue efforts.
5.  **Response and Coordination:** Human organizations can interact with agents, verify their identity, and participate in the response.

## Workflow Stages:

1.  **Preparation:**
    
    -   Set up monitoring agents and autonomous drones.
    -   Equip organizations with decentralized identity mechanisms.
    -   Collect geospatial data for understanding the pre-disaster state of areas.
2.  **Monitoring and Trigger:**
    
    -   Monitor global and local sensors.
    -   Declare disasters based on confidence scores and coordinate with other agents.
3.  **Common Data Picture:**
    
    -   Build a shared dataset that updates continuously during the disaster.
4.  **Autonomous Tasking:**
    
    -   As consensus builds, agents start tasking drones and coordinating human response teams.

## Project Directory Structure

Below is the directory structure for the project. Each folder contains a specific aspect of the disaster response system. For further details on each component, refer to the individual `README.md` files within each folder.

### Folders:

-   **agents/**
    -   Contains the AI agents responsible for monitoring and reporting disasters.
-   **deploy-folder/**
    -   Includes smart contracts and deployment scripts for setting up the blockchain infrastructure.
-   **smart-contracts(S+W)/**
    -   Smart contracts that define the interaction between agents and disaster response organizations.
-   **tokenizing-ai-agents/**
    -   Front-end and smart contracts for tokenizing AI agents.
-   **v3-subgraph/**
    -   Subgraph implementation for indexing and querying disaster data from the blockchain.
-   **web3.py/**
    -   Python scripts for interacting with smart contracts using `web3.py`.


## See Also: 
Each folder contains its own `README.md` with detailed instructions and explanations of the components inside. For more information, visit: - [Agents](./agents/README.md) - [Deploy Folder](./deploy-folder/README.md) - [Smart Contracts (S+W)](./smart-contracts(S+W)/README.md) - [Tokenizing AI Agents](./tokenizing-ai-agents/README.md) - [v3 Subgraph](./v3-subgraph/README.md) - [Web3.py](./web3.py/README.md)
