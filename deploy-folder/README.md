
## SKALE Disaster Management System

This project focuses on managing and responding to disaster events through a decentralized system built on SKALE. The system tracks disasters, deploys agents for disaster response, and allows for resource allocation and decision-making through a decentralized autonomous organization (DAO).

### **Key Components**

-   **Disaster Tracking**: Track disasters based on geographic locations and assign agents like first responders or volunteers.
-   **Decentralized Agents**: Agents report disasters, monitor situations, and provide resource coordination.
-   **DAO for Governance**: A DAO structure allows for voting on resource allocation and other critical decisions.

### **Installation**

```sh
git clone git@github.com:soma9574/daosaster-response.git 
cd ./deploy-folder
``` 

### **Deployment**

Deploy the disaster management contracts using Hardhat. Ensure you have the proper deployment role and sufficient sFUEL. Example:

```sh 
npx hardhat deploy --tags disaster-registry --network calypso-testnet
``` 

----------

## Smart Contracts Overview

### [Disaster.sol](https://giant-half-dual-testnet.explorer.testnet.skalenodes.com/0x3B03E8D98C2c020E8D809fb2B55A85451e4e11C3)

The `Disaster` contract tracks individual disaster events, recording the latitude, longitude, timestamp, and associated agents. It allows new agents (e.g., first responders, volunteers) to be attached to specific disasters.

**Key Features**:

-   **attachAgent**: Adds an agent (e.g., first responder, volunteer) to the disaster.
-   **getAgents**: Retrieves the list of agents attached to a disaster.

----------

### [DisasterRegistry.sol](https://giant-half-dual-testnet.explorer.testnet.skalenodes.com/address/0x0948e40e40860A02956E70E814c8C5088f4049E0)

The `DisasterRegistry` contract handles disaster reporting and proximity-based disaster tracking. It creates new disaster entries or attaches new agents to existing disasters based on geographic proximity.

**Key Features**:

-   **reportDisaster**: Registers a new disaster or attaches agents to an existing disaster.
-   **findNearbyDisaster**: Uses a simplified distance formula to find nearby disasters based on coordinates.

----------

### [DisasterResponseDAO.sol](https://api.goldsky.com/api/public/project_cm0bmkexjt0n601ww47obci68/subgraphs/calypso/v0.0.6/gn)

This contract governs the disaster response process. Agents can propose funding allocations and vote on critical actions to respond to disasters. A quorum and voting mechanism ensures decentralized decision-making.


## **Agent Contracts Overview**

The agent contracts facilitate the monitoring and reporting of disaster events at various levels (global, regional, and local).

### [GlobalAgent.sol](https://api.goldsky.com/api/public/project_cm0bmkexjt0n601ww47obci68/subgraphs/calypso/v0.0.6/gn)

-   **Purpose**: Monitors global news sources and reports global disasters.
-   **Key Function**: `reportGlobalDisaster` collects disaster information from global sources.

### [RegionalAgent.sol](https://api.goldsky.com/api/public/project_cm0bmkexjt0n601ww47obci68/subgraphs/calypso/v0.0.6/gn)

-   **Purpose**: Focuses on regional communications to detect and report disasters specific to a region.
-   **Key Function**: `reportRegionalDisaster` provides details about disasters affecting a region.

### [LocalAgent.sol](https://api.goldsky.com/api/public/project_cm0bmkexjt0n601ww47obci68/subgraphs/calypso/v0.0.6/gn)

-   **Purpose**: Operates on a local level, monitoring local sensors and drones for disaster situations.
-   **Key Features**:
    -   `updateDroneData`: Captures and updates drone data related to local disaster zones.
    -   `reportDisaster`: Reports the disaster to the `DisasterRegistry` contract.

----------

By leveraging decentralized agents and a DAO-based governance system, this project provides a scalable, autonomous solution for disaster management on SKALE. For more details on the deployed contracts, visit the [subgraph](https://api.goldsky.com/api/public/project_cm0bmkexjt0n601ww47obci68/subgraphs/calypso/v0.0.6/gn).
