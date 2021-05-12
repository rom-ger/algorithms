const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let count = 0;
let russian = [];
let eng = [];
const dex = 10;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        count = parseInt(line, dex);
    }
    if (index === 1) {
        russian = line.split(' ').map(el => parseInt(el, dex));
    }
    if (index === 2) {
        eng = line.split(' ').map(el => parseInt(el, dex));
    }
});

let result = '';

for (let i = 0; i < count; i++) {
    result = `${result}${i ? ' ' : ''}${russian[i]} ${eng[i]}`;
}

fs.writeFileSync('output.txt', result);