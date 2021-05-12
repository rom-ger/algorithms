const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let a = 0;
let m = 0;
let s = [];

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        a = parseInt(line, dex);
    }
    if (index === 1) {
        m = parseInt(line, dex);
    }
    if (index === 2) {
        s = line.split('');
    }
});

let h = s.length ? s[0].charCodeAt(0) : 0;

for (let i = 1; i < s.length; i++) {
    h = (h * a + s[i].charCodeAt(0)) % m;
}

h = h % m;

fs.writeFileSync('output.txt', h);