// ID - 47788775

const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let data = new Map();
const dex = 10;
let count = 0;
let dot = '.';

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        count = parseInt(line, dex) * 2;
    }
    if (index > 0 && index < 5) {
        line.split('').forEach(el => {
            if (el === dot) {
                return;
            }
            let number = parseInt(el, dex);
            let numberCount = data.get(number) ? data.get(number) : 0;
            data.set(number, numberCount + 1);
        });
    }
});

let result = 0;

for (let numberCount of data.values()) {
    if (numberCount <= count) {
        result++;
    }
}

fs.writeFileSync('output.txt', result);