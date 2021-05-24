const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let str1 = '';
let str2 = '';

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        str1 = line.split('').filter(el => el.charCodeAt(0) % 2 === 0).join('');
    }
    if (index === 1) {
        str2 = line.split('').filter(el => el.charCodeAt(0) % 2 === 0).join('');
    }
});

let result = 0;

if (str1 < str2) {
    result = -1;
}
if (str1 > str2) {
    result = 1;
}

fs.writeFileSync('output.txt', result);
