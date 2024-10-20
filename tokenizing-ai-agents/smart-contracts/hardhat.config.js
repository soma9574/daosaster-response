require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    morphL2: {
      url: process.env.MORPH_L2_URL || "https://rpc-quicknode-holesky.morphl2.io",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : ["e1127ad1d95df1522ad8cc5a8257189e64fe20fa3e2f4492f9f0812e74ca5dfa"],
      chainId: 2810,
    },
  },
};
