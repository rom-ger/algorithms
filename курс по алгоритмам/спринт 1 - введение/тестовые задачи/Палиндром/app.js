const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let data = fileContent.toLowerCase().replace(/[^a-zа-я0-9]+/g, '').split('');

let findNotValid = false;

for (let i = 0; i < data.length; i++) {
    if (data[i] !== data[data.length - 1 - i]) {
        findNotValid = true;
        break;
    }
}

result = findNotValid ? 'False' : 'True';

fs.writeFileSync('output.txt', result);