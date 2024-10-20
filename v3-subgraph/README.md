
## Disaster Management Subgraph

This subgraph is built to index and query data related to the disaster management system on SKALE. It extracts relevant data from smart contracts such as `DisasterRegistry`, `DisasterResponseDAO`, and various agent contracts like `GlobalAgent`, `LocalAgent`, and `RegionalAgent`. The subgraph architecture allows for efficient querying of disaster events, agent interactions, DAO proposals, and votes, enabling a decentralized disaster management system.

### **Key Subgraph Components**

1.  **Smart Contract ABIs**: The `abis` folder contains the Application Binary Interface (ABI) files for the disaster management contracts. These ABIs are used to map contract events and functions to the subgraph schema. Some of the contracts include:
    
    -   `Disaster.json`
    -   `DisasterRegistry.json`
    -   `DisasterResponseDAO.json`
    -   `GlobalAgent.json`
    -   `LocalAgent.json`
2.  **Generated Files**: The `generated` folder contains TypeScript files auto-generated from the subgraph schema. These files help interact with contract events and data.
    
    -   **DisasterRegistry.ts**: Handles indexing of disaster reports and registry data.
    -   **DisasterResponseDAO.ts**: Manages DAO governance events like proposals, votes, and fund allocations.
3.  **GraphQL Schema**:
    
    -   **schema.graphql**: Defines the structure of the subgraph's data, including entities such as `Disaster`, `Agent`, `Proposal`, and `Vote`. This schema describes how data from the contracts will be structured for querying through The Graph.
4.  **Mapping Handlers**: The `src/mappings` directory contains TypeScript files that handle the mapping of events from the smart contracts into the subgraph. These files process events emitted by the contracts and store the relevant data in the subgraph.
    
    -   **disaster-registry.ts**: Maps events related to disaster creation and agent attachments.
    -   **disaster-response-dao.ts**: Tracks proposals, votes, and executed actions in the DAO.
    -   **local-agent.ts**: Handles the drone data and resource updates reported by local agents.
5.  **Subgraph Configuration**: The `subgraph.yaml` file defines how The Graph will index the blockchain data. It includes information about the contracts to be indexed, the ABI files, the event handlers, and the start blocks for indexing.
    

### **How to Deploy the Subgraph**

1.  **Install Dependencies**:
    

    
    `yarn install` 
    
2.  **Code Generation**: Generate the necessary TypeScript files from the GraphQL schema:
    
    bash
    
    Copy code
    
    ```sh 
    yarn codegen
    ``` 
    
3.  **Build the Subgraph**: Compile the subgraph files:


    ```sh 
    yarn build 
    ``` 
    
4.  **Deploy**: Deploy the subgraph to a Graph node instance. You'll need to configure the deployment endpoint for The Graph:
      ```sh
      yarn deploy
      ``` 
    

For more details about deploying subgraphs and running your own Graph node, refer to the official documentation of [The Graph](https://github.com/graphprotocol/graph-node).

This subgraph indexes real-time disaster events and responses, empowering decentralized management systems to take action in emergency scenarios based on data retrieved from the blockchain.
