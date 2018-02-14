const path = require('path');
const fs = require('fs');
const sol = require('solc');

const lotteryPath = path.resolve(__dirname,'contracts', 'lottery.sol' );

const source = fs.readFileSync(lotteryPath,'utf8');

module.exports = sol.compile(source,1).contracts[':Lottery'];

