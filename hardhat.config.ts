import * as dotenv from "dotenv";

import { HardhatUserConfig, task, subtask } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-truffle5";
import { TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS } from "hardhat/builtin-tasks/task-names";
import { glob } from "hardhat/internal/util/glob";
import path from "path";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS, async (_, { config }) => {
  const mainContracts = await glob(
    path.join(config.paths.root, "contracts/**/*.sol")
  );
  const testContracts = await glob(
    path.join(config.paths.root, "contracts-test/**/*.sol")
  );
  // and so on

  return [
    ...mainContracts,
    ...testContracts,
    // and so on
  ].map(path.normalize); // not sure if normalize is needed here
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.3",
      },
      {
        version: "0.7.5",
        settings: {},
      },
      {
        version: "0.5.4",
        settings: {},
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
