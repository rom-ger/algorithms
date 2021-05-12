const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;

let data = parseInt(fileContent, dex);

let sqrt = Math.floor(Math.sqrt(data))
let j = 0;
let i = 2;
let a = [];
while (i <= sqrt && data !== 2) {
    if (data % i) {
        i++;
    } else {
        a[j] = i;
        j++;
        data = data / i;
    }
}
if (data > 1 && a.length || !a.length) {
    a[j] = data;
}

let result = a.join(' ');

fs.writeFileSync('output.txt', result);