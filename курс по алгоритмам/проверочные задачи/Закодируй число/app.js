const fs = require('fs');

let str = fs.readFileSync('input.txt', 'utf8');
let checkNull = false;
let result = '';

for (let i = str.length - 1; i >=0; i--) {
    if (str[i] === '-') {
        result = `-${result}`;
        continue;
    }
    if (str[i] === '0' && !checkNull) {
        continue;
    }
    if (str[i] !== '0' && !checkNull) {
        checkNull = true;
    }
    result = `${result}${str[i]}`;
}

if (result === '') {
    result = '0';
}

fs.writeFileSync('output.txt', result);