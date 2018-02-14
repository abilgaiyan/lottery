const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'quarter lesson cover logic fog possible multiply avocado hill wagon armor until',
    'https://rinkeby.infura.io/Vxn3QX1DmBgikjhTa7Se'
);

const web3 = new Web3(provider);
const deploy = async () =>{
    const accounts = await web3.eth.getAccounts();
    console.log('Account used to deploy', accounts[0]);

    const result = await web3.eth.Contract(JSON.parse(interface))
                   .deploy({data: bytecode})
                   .send({gas: 1000000, from: accounts[0]});
    console.log('Deployed at address', result);                    
}
deploy();