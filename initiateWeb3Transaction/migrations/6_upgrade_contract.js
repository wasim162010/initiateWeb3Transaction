// migrations/2_deploy_box.js
const counterContract = artifacts.require('CounterContract');
const counterContractV2 = artifacts.require('CounterContractV2');

const { prepareUpgrade } = require('@openzeppelin/truffle-upgrades');
 
 
module.exports = async function (deployer) {
  const inst = await counterContract.deployed();
  await prepareUpgrade(inst.address, counterContractV2, { deployer });
};

