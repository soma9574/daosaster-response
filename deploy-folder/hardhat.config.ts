/**
 *
 * @author Sawyer
 * @copyright 2022-2024 Dirt Road Development
 * @license MIT
 *
 **/

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "@nomiclabs/hardhat-etherscan";

import "hardhat-deploy";
import "hardhat-deploy-ethers";
("skale-testnet-calypso");
dotenv.config();

const PRIVATE_KEY: string | undefined = process.env.PRIVATE_KEY as
  | string
  | undefined;
if (!PRIVATE_KEY) {
  throw new Error("Private Key Not Found");
}

const BASE_RPC_TESTNET: string = "https://testnet.skalenodes.com/v1/";
const BASE_RPC_MAINNET: string = "https://mainnet.skalenodes.com/v1/";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  /// Required to work with hardhat deploy and the auatomation
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    "calypso-testnet": {
      accounts: [PRIVATE_KEY],
      url: BASE_RPC_TESTNET + "giant-half-dual-testnet",
    },
  },
  etherscan: {
    apiKey: {
      "calypso-testnet": "na",
    },
    customChains: [
      {
        network: "calypso-testnet",
        chainId: 974399131,
        urls: {
          apiURL:
            "https://giant-half-dual-testnet.explorer.testnet.skalenodes.com/api",
          browserURL:
            "https://giant-half-dual-testnet.explorer.testnet.skalenodes.com",
        },
      },
    ],
  },
};

export default config;
