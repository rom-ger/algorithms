const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;

let data = fileContent.split(' ').map(el => parseInt(el, dex));

const a = data[0];
const x = data[1];
const b = data[2];
const c = data[3];

let result = a * x * x + b * x + c;

fs.writeFileSync('output.txt', result);