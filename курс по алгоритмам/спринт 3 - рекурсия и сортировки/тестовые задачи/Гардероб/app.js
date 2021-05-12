const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let data = [];
let n = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (index === 1) {
        data = line.split(' ').filter((el, i) => i < n).map(el => parseInt(el, dex));
    }
});

let counts = [0, 0, 0];

data.forEach(d => {
    counts[d]++;
});

let result = [];
counts.forEach((count, index) => {
    for (let i = 0; i < count; i++) {
        result.push(index);
    }
});

fs.writeFileSync('output.txt', result.join(' '));