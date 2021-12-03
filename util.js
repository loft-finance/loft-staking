const Web3 = require('web3')
if (typeof web3 === 'undefined') {
	global.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
}


const adjustAmount = (amount) => {
    return web3.utils.toBN(10).pow(web3.utils.toBN(18)).mul(web3.utils.toBN(amount)).toString();
}

module.exports = {
	adjustAmount,
};