// ID - 47788035

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
        data = line.split(' ').filter((el, index) => index < n).map(el => parseInt(el, dex));
    }
});

let emptyIndexes = [];
let checkEmptyIndex = 0;
let resultArray = [];

data.forEach((el, index) => {
    if (!el) {
        emptyIndexes.push(index);
    }
});

data.forEach((el, index) => {
    if (!el) {
        if (!data[index + 1]) {
            checkEmptyIndex++;
        }
        return resultArray.push(0);
    }
    const nowCheckIndex = emptyIndexes[checkEmptyIndex];
    const nextCheckIndex = emptyIndexes[checkEmptyIndex + 1];
    if (index < nowCheckIndex) {
        return resultArray.push(nowCheckIndex - index);
    }
    if (emptyIndexes.length === checkEmptyIndex + 1 || index > nextCheckIndex) {
        return resultArray.push(index - nowCheckIndex);
    }
    resultArray.push(Math.min(index - nowCheckIndex, nextCheckIndex - index));
    if (index + 1 === nextCheckIndex) {
        checkEmptyIndex++;
    }
});

fs.writeFileSync('output.txt', resultArray.join(' '));