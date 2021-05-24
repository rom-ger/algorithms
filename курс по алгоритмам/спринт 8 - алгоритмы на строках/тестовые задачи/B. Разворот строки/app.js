const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let data = [];

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        data = line.split(' ');
    }
});

let result = '';

for (let i = data.length - 1; i >= 0; i--) {
    result = `${result}${result ? ' ' : ''}${data[i]}`;
}

fs.writeFileSync('output.txt', result);
