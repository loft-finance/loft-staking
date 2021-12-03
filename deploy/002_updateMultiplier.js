module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, get, execute } = deployments;
  const { deployer, loftprocotolOwner } = await getNamedAccounts();

  await execute(
    "LoftProtocolFarm",
    { from: deployer },
    "updateMultiplier",
    50,
    true
  );
};
module.exports.tags = ["UpdateMultiplier", "Config"];
