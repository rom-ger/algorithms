const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let count = 0;


fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        count = parseInt(line, dex);
    }
});

function calc(n) {
    if (n === 0) {
        return 1;
    }
    return ((4*n - 2)/(n + 1)) * calc(n - 1);
}

fs.writeFileSync('output.txt', calc(count));