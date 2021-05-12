const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let data1 = [];
let n = 0;
let data2 = [];
let m = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (index === 1) {
        data1 = line.split(' ').filter((el, i) => i < n).map(el => parseInt(el, dex));
    }
    if (index === 2) {
        m = parseInt(line, dex);
    }
    if (index === 3) {
        data2 = line.split(' ').filter((el, i) => i < m).map(el => parseInt(el, dex));
    }
});

data1.sort();
data2.sort();

let count = 0;

for (let i = 0; i < data1.length; i++) {
    let find = false;
    let index = 0;
    while (!find && index < data2.length) {
        if (data1[i] <= data2[index]) {
            find = true;
            data2[index] = -1;
            count = count + 1;
        }
        index++;
    }
}

fs.writeFileSync('output.txt', count);