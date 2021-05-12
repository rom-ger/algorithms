const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let n = 0;
let m = 0;
let dpNow = [];
let dpPrev = [];
let data = [];

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        let array = line.split(' ');
        n = parseInt(array[0], dex);
        m = parseInt(array[1], dex);
        dpNow = new Array(m+1).fill(0);
        dpPrev = new Array(m+1).fill(0);
    }
    if (index === 1) {
        data = line.split(' ').filter((el, i) => i < n).map(el => parseInt(el, dex));
    }
});

for (let i = 0; i < n; i++) {
    dpNow = new Array(m+1).fill(0);
    for (let j = 0; j <= m; j++) {
        let lastMax = i === 0 ? 0 : dpPrev[j];
        let newMax = j >= data[i] ? (data[i] + (i === 0 || (j - data[i] < 0) ? 0 : dpPrev[j - data[i]])) : 0;
        dpNow[j] = Math.max(lastMax, newMax);
    }
    dpPrev = dpNow.map(el => el);
}

fs.writeFileSync('output.txt', dpNow[m]);
