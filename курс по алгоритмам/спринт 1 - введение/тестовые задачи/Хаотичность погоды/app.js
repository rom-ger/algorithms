const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let data = [];
const dex = 10;
let n = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (index === 1) {
        data = line.split(' ').filter((el, index) => index < n).map(el => parseInt(el, dex));
    }
});

let count = 0;

data.forEach((el, index) => {
    if ((index === 0 || data[index - 1] < el) && (index === data.length - 1 || data[index + 1] < el)) {
        count++;
    }
});

result = `${count}`;

fs.writeFileSync('output.txt', result);