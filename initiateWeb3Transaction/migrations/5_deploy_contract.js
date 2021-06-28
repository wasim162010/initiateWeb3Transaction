// migrations/2_deploy_box.js
const counterContract = artifacts.require('CounterContract');
 
const { deployProxy } = require('@openzeppelin/truffle-upgrades');
 
module.exports = async function (deployer) {
  await deployProxy(counterContract, { deployer, initializer: 'initializer' });
};