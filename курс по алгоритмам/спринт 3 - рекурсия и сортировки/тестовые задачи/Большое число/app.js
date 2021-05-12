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
        data = line.split(' ').filter((el, i) => i < n);
    }
});

data.sort((a, b) => {
    let index = 0;
    let result = 0;
    while(index < Math.max(a.length, b.length) && !result) {
        let a1 = a[index] === undefined ? a[0] : a[index];
        let b1 = b[index] === undefined ? b[0] : b[index];
        if (a1 === b1 && index >= a.length - 1 && index >= b.length - 1) {
            result = b[b.length - 1] - a[a.length - 1];
        }
        if (a1 !== b1) {
            result = b1 - a1;
        }
        index++;
    }
    return result;
});

let str = data.join('');

fs.writeFileSync('output.txt', str ? (str.replace(/^0+/, '') || '0') : '');