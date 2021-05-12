const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let data = [];
let alphabet = new Map([
    ['q', -1], ['w', -1], ['e', -1], ['r', -1], ['t', -1], ['y', -1], ['u', -1], ['i', -1], ['o', -1], ['p', -1], ['a', -1], ['s', -1], ['d', -1], ['f', -1], ['g', -1], ['h', -1], ['j', -1], ['k', -1], ['l', -1], ['z', -1], ['x', -1], ['c', -1], ['v', -1], ['b', -1], ['n', -1], ['m', -1],
]);

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        data = line.split('');
    }
});

let maxLength = 1;
let nowLength = 1;
let helpIndex = 0;
alphabet.set(data[0], 0);

for (let i = 1; i < data.length; i++) {
    let lastFindIndex = alphabet.get(data[i]);
    alphabet.set(data[i], i);
    if (lastFindIndex === -1 || lastFindIndex < helpIndex) {
        nowLength++;
    } else {
        helpIndex = lastFindIndex + 1;
        if (nowLength > maxLength) {
            maxLength = nowLength;
        }
        nowLength = i - helpIndex + 1;
    }
}

if (nowLength > maxLength) {
    maxLength = nowLength;
}

fs.writeFileSync('output.txt', maxLength);