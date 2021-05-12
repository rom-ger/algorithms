const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let data = [];
const dex = 10;
let n = 0;
let m = 0;
let n1 = 0;
let m1 = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (index === 1) {
        m = parseInt(line, dex);
    }
    if (n && m && index > 1 && index < n + 2) {
        data.push(line.split(' ').filter((el, index) => index < m).map(el => parseInt(el, dex)));
    }
    if (n && index === n + 2) {
        n1 = parseInt(line, dex);
    }
    if (n && index === n + 3) {
        m1 = parseInt(line, dex);
    }
});

let result = '';
let finds = [];

if (m1 + 1 < m) {
    finds.push(data[n1][m1 + 1]);
}

if (n1 > 0) {
    finds.push(data[n1 - 1][m1]);
}

if (m1 > 0) {
    finds.push(data[n1][m1 - 1]);
}

if (n1 + 1 < n) {
    finds.push(data[n1 + 1][m1]);
}

result = finds.sort((a, b) => a - b).join(' ');

fs.writeFileSync('output.txt', result);