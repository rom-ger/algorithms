const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let count = 0;
let data = [];

let result = '';

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        count = parseInt(line, dex);
    }
    if (index === 1) {
        data = line.split(' ').filter((el, i) => i < count).map(el => parseInt(el, dex));
    }
});

let arr = [0, 0];

data.forEach(el => arr[el] = arr[el] + 1);

console.log(arr, data.length);

result = data.length - (Math.abs(arr[0] - arr[1]));

fs.writeFileSync('output.txt', result);