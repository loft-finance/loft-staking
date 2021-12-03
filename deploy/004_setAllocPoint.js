module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, get, execute } = deployments;
  const { deployer, loftprocotolOwner } = await getNamedAccounts();

  await execute("LoftProtocolFarm", { from: deployer }, "set", 0, 456, true);

  await execute("LoftProtocolFarm", { from: deployer }, "set", 1, 172, true);

  await execute("LoftProtocolFarm", { from: deployer }, "set", 2, 372, true);
};
module.exports.tags = ["setAllocPoint", "Config"];
