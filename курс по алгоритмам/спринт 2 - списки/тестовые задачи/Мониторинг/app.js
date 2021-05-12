const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let data = [];
const dex = 10;
let n = 0;
let m = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (index === 1) {
        m = parseInt(line, dex);
    }
    if (n && m && index > 1 && index < n + 2) {
        data.push(line.split(' ').filter((el, index) => index < m).map(el => parseInt(el, dex)));
    }
});

let result = '';

for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
        result = `${result}${j ? ' ' : ''}${data[j][i]}`;
    }
    if (i !== m - 1) {
        result = `${result}\n`;
    }
}

fs.writeFileSync('output.txt', result);