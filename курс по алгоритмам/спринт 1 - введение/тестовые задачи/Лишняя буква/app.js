const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');
let a = 0;
let b = 0;


fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        a = line.split('');
    }
    if (index === 1) {
        b = line.split('');
    }
});

a.sort();
b.sort();

let find = null;

for (let i = 0; i < b.length; i++) {
    if (b[i] !== a[i]) {
        find = b[i];
        break;
    }
}

let result = find;

fs.writeFileSync('output.txt', result);