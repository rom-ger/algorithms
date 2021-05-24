const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let dex = 10;
let original = '';
let count = 0;
let data = [];

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        original = line;
    }
    if (index === 1) {
        count = parseInt(line, dex);
    }
    if (index > 1 && index < count + 2) {
        let array = line.split(' ');
        data.push({
            str: array[0],
            pos: parseInt(array[1], dex),
        });
    }
});

let result = '';

data.sort((a, b) => a.pos - b.pos);

let dataIndex = 0;

for (let i = 0; i < original.length; i++) {
    if (dataIndex < data.length && i === data[dataIndex].pos) {
        result = `${result}${data[dataIndex].str}`;
        dataIndex++;
    }
    result = `${result}${original[i]}`;
}

if (dataIndex === data.length - 1 && data[dataIndex].pos === original.length) {
    result = `${result}${data[dataIndex].str}`;
}

fs.writeFileSync('output.txt', result);
