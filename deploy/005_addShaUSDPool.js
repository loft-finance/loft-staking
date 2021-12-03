module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, get, execute } = deployments;
  const { deployer, loftprocotolOwner } = await getNamedAccounts();

  await execute(
    "LoftProtocolFarm",
    { from: deployer },
    "add",
    1,
    "0xe4Aa6B01b5C2cA61D78DE98f7C0D416b26152665",
    true
  );
};
module.exports.tags = ["addShaUSDPool", "Config"];
