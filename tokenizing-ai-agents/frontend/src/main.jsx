import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import App from './App.jsx'
import './index.css'

// Setting up list of evmNetworks
const evmNetworks = [
  {
    blockExplorerUrls: ['https://explorer-holesky.morphl2.io/'],
    chainId: 2810,
    chainName: 'Morph Testnet',
    iconUrls: ["../morph_logo.jpeg"],
    name: 'Morph Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Morph',
      symbol: 'ETH',
    },
    networkId: 2810,
    rpcUrls: ['https://rpc-quicknode-holesky.morphl2.io'],
    vanityName: 'Morph',
  },
  {
    blockExplorerUrls: ['https://testnet.storyscan.xyz/'],
    chainId: 1513,
    chainName: 'Story Public Testnet',
    iconUrls: ["../story_logo.png"],
    name: 'Story Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Morph',
      symbol: 'ETH',
    },
    networkId: 1513,
    rpcUrls: ['https://testnet.storyrpc.io/'],
    vanityName: 'Story',
  }
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DynamicContextProvider
      settings={{
        environmentId: "d26a13e5-58d2-44a0-9820-f774949d6059",
        walletConnectors: [ EthereumWalletConnectors ],
        overrides: { evmNetworks },
      }}
    >
      <App />
    </DynamicContextProvider>
  </StrictMode>,
)
