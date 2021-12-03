module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, get, execute } = deployments;
  const { deployer, loftprocotolOwner } = await getNamedAccounts();

  await execute(
    "LoftProtocolFarm",
    { from: deployer },
    "transferOwnership",
    "0x9143860b52ed23FEF5724ad975809e5C12E0334A"
  );
};
module.exports.tags = ["TransferOwnership", "Config"];
