const { adjustAmount } = require("../util");
const allConfigs = require("../config.json");

module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const config = allConfigs[network.name];
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  let ERC20Address;
  const erc20Config = config["erc20"];
  if (erc20Config["address"]) {
    ERC20Address = erc20Config["address"];
  } else {
    const erc20Instance = await deploy(erc20Config.name, {
      contract: "ERC20Mock",
      from: deployer,
      args: [
        erc20Config.name,
        erc20Config.symbol,
        erc20Config.decimals,
        adjustAmount(erc20Config.supply),
      ],
      log: true,
      skipIfAlreadyDeployed: true,
    });
    ERC20Address = erc20Instance.address;
  }

  const farmConfig = config["farm"];
  const startBlock = farmConfig["startBlock"]
    ? farmConfig["startBlock"]
    : await web3.eth.getBlockNumber();
  const rewardPerBlock = farmConfig["rewardPerBlock"];
  let rewardErc20;
  if (farmConfig["rewardErc20"]) {
    rewardErc20 = farmConfig["rewardErc20"];
  } else {
    rewardErc20 = deployer;
  }
  const farmInstance = await deploy(farmConfig["name"], {
    contract: "Farm",
    from: deployer,
    args: [ERC20Address, rewardErc20, rewardPerBlock, startBlock],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  if (farmInstance.newlyDeployed) {
    for (const poolConfig of config["pools"]) {
      let lpAddress;
      const lpConfig = poolConfig["lp"];
      if (lpConfig["address"]) {
        lpAddress = lpConfig.address;
      } else {
        if (lpConfig["name"]) {
          const lpInstance = await deploy(lpConfig["name"], {
            contract: "LPMock",
            from: deployer,
            args: [lpConfig["name"], lpConfig["symbol"], lpConfig["decimals"]],
            log: true,
            skipIfAlreadyDeployed: true,
          });
          lpAddress = lpInstance.address;
        } else {
          lpAddress = ERC20Address;
        }
      }

      await execute(
        farmConfig["name"],
        { from: deployer },
        "add",
        poolConfig["allocPoint"],
        lpAddress,
        false
      );
    }
  }
};
module.exports.tags = ["Dev", "Product"];
