const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let data = [];
const dex = 10;
let n = 0;
let k = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (index === 1) {
        data = line.split(' ').filter((el, index) => index < n).map(el => parseInt(el, dex));
    }
    if (index === 2) {
        k = parseInt(line, dex);
    }
});

let result = '';

let step = 0;
let x = 0;

for (let i = data.length - 1; i >= 0; i--) {
    x += data[i] * Math.pow(10, step);
    step++;
}

let sum = x + k;

result = `${sum}`.split('').join(' ');

fs.writeFileSync('output.txt', result);