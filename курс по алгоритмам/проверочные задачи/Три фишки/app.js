const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let checkSum = 0;
let data = [];
const dex = 10;

fileContent.split('\n').forEach((line, index) => {
    if (!index) {
        checkSum = parseInt(line, dex);
    }
    if (index && line) {
        data = line.split(' ').map(el => parseInt(el, dex));
    }
});

let result = '';

fs.writeFileSync('output.txt', result);