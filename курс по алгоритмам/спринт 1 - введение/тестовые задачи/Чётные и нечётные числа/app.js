const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;

let data = fileContent.split(' ').map(el => parseInt(el, dex));

const a1 = data[0] % 2 === 0;
const a2 = data[1] % 2 === 0;
const a3 = data[2] % 2 === 0;

const isWin = a1 && a2 && a3 || !a1 && !a2 && !a3;

let result = isWin ? 'WIN' : 'FAIL';

fs.writeFileSync('output.txt', result);