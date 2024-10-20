
## Tokenizing AI Agents Project Overview

The **Tokenizing AI Agents** project integrates AI agents with NFT tokenization, leveraging blockchain technology to mint and manage AI agent NFTs. This setup includes both frontend and smart contract components, allowing users to tokenize AI agents, manage intellectual property (IP), and interact with these agents in a decentralized manner.

----------

### **Frontend Structure**

The frontend is built with **React.js** and **Vite**, utilizing **TailwindCSS** for styling. It offers two main functionalities: tokenizing AI agents and managing IP. The app allows users to mint AI agents as NFTs, each represented with a unique image and metadata.

Key Frontend Components:

-   **MintNFT**: Handles the minting process for AI agent NFTs, interacting with smart contracts on the blockchain. It includes wallet connection functionality using **Dynamic Labs SDK** and provides user feedback via **React Toastify** notifications.
-   **IPComponent** and **IPCard**: Displays a list of IPs and allows users to mint or remix IP tokens. IP data is fetched from an external source, and users can initiate minting directly from the UI.
-   **Dynamic Labs Integration**: The app uses **Dynamic Labs SDK** to manage wallet connections and perform blockchain transactions. It supports multiple networks, including **Morph Testnet** and **Story Testnet**.

Key Files:

-   `src/App.jsx`: Contains the main UI logic for switching between tokenization and IP management features.
-   `constants.js`: Defines important contract addresses and ABIs for interacting with smart contracts.

### **Smart Contracts**

The smart contracts manage the minting and tokenization of AI agents. The primary contract, **AIAgentNFT**, is an ERC721 contract that allows users to mint AI agents as NFTs. The mint price and agent types are configurable, and each agent type has a maximum supply.

Key Contracts:

1.  **AIAgentNFT.sol**:
    -   Implements ERC721 to tokenize AI agents.
    -   Allows users to mint AI agents, each associated with a unique token URI.
    -   Supports agent types, each with a predefined max supply.
    -   Collects minting fees and forwards them to a fund wallet.
2.  **Deployment and Configuration**:
    -   **hardhat.config.js**: Configures the Hardhat environment for deploying contracts to the **Morph L2** network.
    -   **deploy.js**: Handles contract deployment, specifying the fund wallet address and initializing the AI agent contract.

### **How to Deploy**

1.  **Frontend**:
    
    -   Install dependencies:
     
        ```sh
        npm install
        ``` 
        
    -   Start the development server:
        
  
        ```sh 
        npm run dev
        ``` 
        
2.  **Smart Contracts**:
    
    -   Compile the contracts:
        
  
        ```sh
         npx hardhat compile
        ``` 
        
    -   Deploy the contracts:
 
        ```sh
        npx hardhat run scripts/deploy.js --network morphL2
        ``` 
        

----------

By combining AI and NFTs, this project offers a platform for tokenizing AI agents while maintaining user-friendly interactions through the web application.

For more information on running decentralized applications with The Graph, visit the [Graph Protocol GitHub](https://github.com/graphprotocol/graph-node).
