const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let count = 0;
let sum = 0;
let data = [];

let result = '';

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        count = parseInt(line, dex);
    }
    if (index === 1) {
        sum = parseInt(line, dex);
    }
    if (index === 2) {
        data = line.split(' ').filter((el, i) => i < count).map(el => parseInt(el, dex));
    }
});


data.sort((a, b) => a - b);

let set = new Set();

for (let i0 = 0; i0 < data.length; i0++) {
    for (let i1 = i0+1; i1 < data.length; i1++) {
        for (let i2 = i1+1; i2 < data.length; i2++) {
            for (let i3 = i2+1; i3 < data.length; i3++) {
                if (data[i0] + data[i1] + data[i2] + data[i3] === sum) {
                    set.add([data[i0], data[i1], data[i2], data[i3]].join(' '));
                }
            }
        }
    }
}

result = `${set.size}`;
let index = 0;

for (let value of set) {
    result = `${result}${index === set.size ? '' : '\n'}${value}`;
    index++;
}

fs.writeFileSync('output.txt', result);