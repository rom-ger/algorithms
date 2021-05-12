const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let m = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        m = parseInt(line, dex);
    }
});

function fib(n) {
    if (!n) {
        return 1;
    }
    if (n === 1) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
}

fs.writeFileSync('output.txt', fib(m));