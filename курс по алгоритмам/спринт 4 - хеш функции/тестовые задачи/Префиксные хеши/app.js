const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let a = 0;
let m = 0;
let s = '';
let count = 0;
let result = '';
let hashs = [];
let pows = [1];

function getMode(x, y) {
    let mode = null;
    if (x >= 0) {
        mode = x % y;
    } else {
        if (-x < y) {
            mode = y + x;
        } else {
            mode = y - Math.abs(x % y);
        }
    }
    return mode;
}

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        a = parseInt(line, dex);
    }
    if (index === 1) {
        m = parseInt(line, dex);
    }
    if (index === 2) {
        s = line.split('');
        s.forEach((el, i) => {
            if (i) {
                pows.push((pows[pows.length - 1] * a) % m);
            }
            hashs[i] = !i ? el.charCodeAt(0) % m : (hashs[i-1] * a + el.charCodeAt(0)) % m;
        })
    }
    if (index === 3) {
        count = parseInt(line, dex);
    }
    if (index > 3 && index <= 3 + count) {
        let command = line.split(' ');
        let i1 = command[0] - 1;
        let i2 = command[1] - 1;
        let hash = hashs[i2];
        if (i1) {
            hash = getMode(hash - hashs[i1 - 1] * pows[i2 - i1 + 1], m);
        }
        result = `${result}${index !== 4 ? '\n' : ''}${hash}`;
    }
});

fs.writeFileSync('output.txt', result);