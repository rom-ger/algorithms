const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let count = 0;
let ids = [];
const dex = 10;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        count = parseInt(line, dex);
    }
    if (index === 1) {
        ids = line.split(' ').map(el => parseInt(el, dex));
    }
});

let allSum = count*(count + 1)/2;
let nowSum = 0;
ids.forEach(el => nowSum += el);

let a = allSum - nowSum;

let allQrt = 0;
let nowQrt = 0;
ids.forEach(el => nowQrt += Math.pow(el, 2));
for(let i = 1; i <= count; i++) {
    allQrt += Math.pow(i, 2);
}

let b = allQrt - nowQrt;

let x = (a - Math.sqrt(2*b - Math.pow(a, 2))) / 2;
let y = (a + Math.sqrt(2*b - Math.pow(a, 2))) / 2;

let result = `${x} ${y}`;

fs.writeFileSync('output.txt', result);