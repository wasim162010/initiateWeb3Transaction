var express = require('express');
var app = express();
var path = require('path');
const Web3 = require('web3')
//for the alert box
var alert = require('alert');

var Tx = require('ethereumjs-tx'); //to sign the transaction locallyweb3.currentProvider
const dotenv = require('dotenv').config();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/increment', async(req, res) =>{
   
	var txHash = await sendT();
	res.send("Transaction " + txHash + " is completed successfully");	
 });


 app.get('/curValue', async(req, res) => {

	var curVal = await currentVal();
	curVal.then(counterVal => {
		console.log(counterVal); 
		res.end(counterVal)
	  });
    
 });

 app.post('/resetValue', async(req, res) => {

	var txHash = await resetVal();
	res.send("Transaction " + txHash + " is completed successfully");	
    
 });

app.listen(8081);
console.log("server is up");


//web3.js code

// ganache url
const web3 = new Web3(process.env.endPoint);

//**NOTE** 'address' value should be changed to the address of the account which sends the transaction */
const address = web3.eth.getAccounts().then(function(acc){
	accounts=acc;
	return accounts[0];
		});

const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "incrEvent",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "fetchCurrentValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "fetchCurrentValue2121",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "fetchCurrentValue212sd1",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "increment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "reset",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
	



//**NOTE** 'contAddr' value should be changed to the address of the contract */
const contAddr = '0xc717092d19E7B4D7035809216f57837bb7ED38b3' 
const contract = new web3.eth.Contract(abi, contAddr)

async function sendT() {
	

	var block = await web3js.eth.getBlock("latest");
	var _gasLimit = block.gasLimit/block.transactions.length;

	var _gasPrice = await web3.eth.getGasPrice();

	const _data = contract.methods.increment().encodeABI()

	web3.eth.getTransactionCount(address, (err, txCount) => {

		const txObject = {
			nonce:    web3.utils.toHex(txCount),
			gasLimit: web3.utils.toHex(_gasLimit),
			gasPrice: web3.utils.toHex(_gasPrice),
			to:       contAddr,
			data: _data
		  }

		const privKey = process.env.privateKey;
		const key = Buffer.from(privKey, 'hex');

		// Signing the transaction
		const tx = new Tx(txObject);
		tx.sign(key);

		const serializedTx = tx.serialize()
		const raw = '0x' + serializedTx.toString('hex')
		
	  	web3.eth.sendSignedTransaction(raw, (err, txHash) => {
		console.log('txHash:', txHash)

		return txHash;
		
	  })

	})
} //send ends



async function resetVal() {

		console.log("Calling reset")
		
		const _data = contract.methods.reset().encodeABI();
		var block = await web3js.eth.getBlock("latest");
		var _gasLimit = block.gasLimit/block.transactions.length;

		var _gasPrice = await web3.eth.getGasPrice();

		web3.eth.getTransactionCount(address, (err, txCount) => {

			const txObject = {
				nonce:    web3.utils.toHex(txCount),
				gasLimit: web3.utils.toHex(_gasLimit),
				gasPrice: web3.utils.toHex(_gasPrice),
				to:       contAddr,
				data: _data
			  }
	
			const privKey = process.env.privateKey;
			const key = Buffer.from(privKey, 'hex');
	
			// Signing the transaction
			const tx = new Tx(txObject);
			tx.sign(key);
	
			const serializedTx = tx.serialize()
			const raw = '0x' + serializedTx.toString('hex')
			
			web3.eth.sendSignedTransaction(raw, (err, txHash) => {
			console.log('txHash:', txHash)

			return txHash;

			
		  })
	
		})

} 

async function currentVal() {
		console.log("Calling reset")
		var val=0;
		await contract.methods.fetchCurrentValue().call( 
				(err, result) => {
				console.log("current value ")
				console.log(result)
				val = result;
				}
			)
		return val;
} 

