const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let count = 0;

let result = '';

let data = new Map();
let flag = false;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        count = parseInt(line, dex);
    }
    if (index > 0 && index <= count) {
        if (!data.get(line)) {
            data.set(line, true);
            result = `${result}${flag ? '\n' : ''}${line}`;
            flag = true;
        }
    }
});

fs.writeFileSync('output.txt', result);