# initiateWeb3Transaction

$ This simple DApp contains code containing a pretty simple smart contract, UI, and a web3.js code to connect to contract to initiate transaction.

# Used OpenZeppelin truffle upgrade library.

#To deploy contract :
#npx truffle migrate



# To deploy contract post upgrade : 
Suppose your upgraded contract is 'CounterContractV2'and you want to upgrade from CounterContract,createa a .js file under 'migrations' folder[See '6_upgrade_contract.js' under 'migrations' folder for the reference] , and then execute  'npx truffle migrate'.

# To create API, express js has been used.


# Tools/framework/libraries used to develop DApp :
Truffle framework
ganache
web3.js
express.js
jQuery[in UI to call express.js APIs]
OpenZeppelin Truffle Upgrades [npm i --save-dev @openzeppelin/truffle-upgrades]

# UI:
UI is in plain html.
