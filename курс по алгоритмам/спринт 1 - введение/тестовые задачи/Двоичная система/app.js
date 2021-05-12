const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');
const dex = 10;
let a = 0;
let b = 0;


fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        a = line.split('').map(el => parseInt(el, dex));
    }
    if (index === 1) {
        b = line.split('').map(el => parseInt(el, dex));
    }
});
let result = '';

let member = 0;

let max = Math.max(a.length, b.length);
let i = 0;

while(i < max) {
    let c = 0;
    let a1 = a[a.length - i - 1];
    let b1 = b[b.length - i - 1];
    if (!a1) {
        c = (b1 ? b1 : 0) + member;
    }
    if (!b1) {
        c = (a1 ? a1 : 0) + member;
    }
    if (a1 && b1) {
        c = a1 + b1 + member;
    }
    if (c < 2) {
        member = 0;
    }
    if (c === 2) {
        c = 0;
        member = 1;
    }
    if (c === 3) {
        c = 1;
        member = 1;
    }
    result = `${c}${result}`;
    i++;
}

if (member) {
    result = `1${result}`;
}

fs.writeFileSync('output.txt', result);