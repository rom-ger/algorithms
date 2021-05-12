const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let data = parseInt(fileContent, dex);

let result = '';

let checkResult = data;

while (checkResult !== 0) {
    let a = checkResult % 2;
    result = `${a}${result}`;
    checkResult = Math.floor(checkResult / 2);
}

if (!result) {
    result = '0';
}

fs.writeFileSync('output.txt', result);