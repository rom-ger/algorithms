const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let data = [];
const dex = 10;
let n = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (index === 1) {
        data = line.split('').filter((el, index) => index < n);
    }
});

let maxLengthWord = {
    word: '',
    length: 0,
}

let startCheckIndex = -1;
let endCheckIndex = -1;
const checkWord = ' ';

data.forEach((el, index) => {
    if (el !== checkWord && (!index || data[index - 1] === checkWord)) {
        startCheckIndex = index;
        endCheckIndex = -1;
        return;
    }
    if (el !== checkWord && index === data.length - 1) {
        endCheckIndex = index;
    }
    if (el === checkWord && index && data[index - 1] !== checkWord) {
        endCheckIndex = index - 1;
    }
    if (startCheckIndex !== -1 && endCheckIndex !== -1) {
        const length = endCheckIndex - startCheckIndex + 1;
        if (length > maxLengthWord.length) {
            maxLengthWord.length = length;
            maxLengthWord.word = data.slice(startCheckIndex, endCheckIndex + 1).join('');
        }
    }
});

result = `${maxLengthWord.word}\n${maxLengthWord.length}`;

fs.writeFileSync('output.txt', result);