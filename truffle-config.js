require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const { SIGNER_PRIVATE_KEY, ETH_SCAN_API_KEY, ETH_SEPOLIA_TESTNET_RPC } =
  process.env;

module.exports = {
  api_keys: {
    etherscan: ETH_SCAN_API_KEY,
  },
  networks: {
    // Default network
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*",
    },
    // Ganache network
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    // Sepolia network
    sepolia: {
      provider: () =>
        new HDWalletProvider(SIGNER_PRIVATE_KEY, ETH_SEPOLIA_TESTNET_RPC),
      network_id: 11155111,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.19",
    },
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: { etherscan: ETH_SCAN_API_KEY },
};
