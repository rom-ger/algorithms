const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let data = [];
const dex = 10;

fileContent.split('\n').forEach((line, index) => {
    if (!index) {
        data = line.split(' ').map(el => parseInt(el, dex));
    }
});

let x1 = 1;
let x2 = 1;

for(let i = 1; i < data[0]; i++) {
    x3 = x2;
    x2 = (x1 + x2) % Math.pow(10, data[1]);
    x1 = x3;
}

fs.writeFileSync('output.txt', x2);