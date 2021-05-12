const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;

let data = parseInt(fileContent, dex);

let a = data;
let fail = false;

while (a > 1 && !fail) {
    fail = a % 4 !== 0;
    a = Math.floor(a / 4);
}

let result = fail ? 'False' : 'True';

fs.writeFileSync('output.txt', result);