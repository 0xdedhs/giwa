import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    },
    giwaSepolia: {
      type: "http",
      chainType: "op",
      url: "https://sepolia-rpc.giwa.io",
    },
    giwaSepoliaForked: {
      type: "edr-simulated",
      chainId: 91342,
      forking: {
        enabled: true,
        url: "https://sepolia-rpc.giwa.io",
        blockNumber: 5207094,
      },
    },
  },
  chainDescriptors: {
    91342: {
      name: "Giwa Sepolia",
      blockExplorers: {
        blockscout: {
          name: "Giwa Sepolia Explorer",
          url: "https://sepolia-explorer.giwa.io",
          apiUrl: "https://sepolia-explorer.giwa.io/api",
        },
      },
    },
  },
};

export default config;
