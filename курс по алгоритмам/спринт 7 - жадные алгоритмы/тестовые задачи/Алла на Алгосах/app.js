const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let x = 0;
let k = 0;
let result = 0;
let data = [];

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        x = parseInt(line, dex);
    }
    if (index === 1) {
        k = parseInt(line, dex);
    }
    if (index === 2) {
        data = line.split(' ').filter((el, i) => i < k).map(el => parseInt(el, dex));
    }
});

data.sort((a, b) => b - a);

while (x > 0 && data.length) {
    console.log(x, data)
    while(x >= data[0]) {
        result++;
        x = x - data[0];
    }
    data.splice(0, 1);
}

fs.writeFileSync('output.txt', x === 0 ? result : -1);
