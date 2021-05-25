const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let text = '';
let countWords = 0;
let dex = 10;

function getSymbol(index, word) {
    if (index < word.length) {
        return word[index];
    }
    if (index === word.length) {
        return '#';
    }
    return text[index - (word.length + 1)];
}

function prefixFunction(word) {
    let findIndexes = [];
    let n = new Array(word.length + 1);
    n[0] = 0;
    for (let i = 1; i < (word.length + text.length + 1); i++) {
        let k = n[i >= n.length ? n.length - 1 : i -1];
        while(k > 0 && getSymbol(k, word) !== getSymbol(i, word)) {
            k = n[k - 1];
        }
        if (getSymbol(k, word) === getSymbol(i, word)) {
            k++;
        }
        n[i >= n.length ? n.length - 1 : i] = k;
        if (k === word.length) {
            findIndexes.push(i - word.length * 2);
        }
    }
    return findIndexes;
}

let map = [];

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        text = line;
        map = new Array(line.length);
    }
    if (index === 1) {
        countWords = parseInt(line, dex);
    }
    if (index > 1 && index <= countWords + 1) {
        prefixFunction(line)
            .forEach(i => {
                if (map[i]) {
                    map[i].push(i + line.length - 1);
                } else {
                    map[i] = [i + line.length - 1];
                }
        });
    }
});

let stack = [{index: 0}];

let isValid = false;

while(stack.length && !isValid) {
    const {index} = stack.pop();
    if (index >= text.length) {
        isValid = index === text.length;
        stack = [];
        continue;
    }
    let prefixes = map[index];
    if (!prefixes) {
        continue;
    }
    prefixes.forEach(prefixEnd => stack.push({index: prefixEnd + 1}));
}

fs.writeFileSync('output.txt', isValid ? 'YES' : 'NO');
