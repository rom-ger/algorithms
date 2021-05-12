const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let data = [];
let n = 0;
let k = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = line.split(' ')[0];
        k = line.split(' ')[1];
    }
    if (index === 1) {
        data = line.split(' ').filter((el, i) => i < n).map(el => parseInt(el, dex));
    }
});

data.sort();

let sum = 0;
let count = 0;

for (let i = 0; i < data.length; i++) {
    let newSum = sum + data[i];
    if (newSum <= k) {
        sum = newSum;
        count++;
    } else {
        break;
    }
}

fs.writeFileSync('output.txt', count);