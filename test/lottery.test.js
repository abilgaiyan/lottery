const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// UPDATE THESE TWO LINES RIGHT HERE!!!!! <-----------------
const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let lottery;
let accounts;

beforeEach( async () => {
   // web3 = new Web3(ganache.provider());
  accounts = await web3.eth.getAccounts();
 
  lottery = await new web3.eth.Contract(JSON.parse(interface))
           .deploy({data: bytecode})
           .send({from: accounts[0], gas: '1000000'});
  lottery.setProvider(provider) ;          
});

describe('Lottery Contract', () => {
       
    it('deploys a contract',() =>{
        assert.ok(lottery.options.address);
    });

    it('Allows one account to enter', async ()  =>{
       
        await lottery.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei('0.02', 'ether')
         //value: '20000000000000000'

       });

       const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
       });

       assert.equal(players[0], accounts[0]);
       assert.equal(1, players.length);

    });

    it('Allows multiple account to enter', async ()  =>{
       
        await lottery.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei('0.02', 'ether')
         //value: '20000000000000000'

       });

       await lottery.methods.enter().send({
        from: accounts[1],
        value: web3.utils.toWei('0.02', 'ether')
       //value: '20000000000000000'

     });

     await lottery.methods.enter().send({
        from: accounts[2],
        value: web3.utils.toWei('0.02', 'ether')
       //value: '20000000000000000'

     });


       const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
       });

       assert.equal(players[0], accounts[0]);
       assert.equal(players[1], accounts[1]);
       assert.equal(players[2], accounts[2]);
       assert.equal(3, players.length);

    });


});


