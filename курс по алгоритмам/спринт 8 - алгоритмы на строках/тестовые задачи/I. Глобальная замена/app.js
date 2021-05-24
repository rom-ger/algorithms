const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let text = '';
let str1 = '';
let str2 = '';


fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        text = line;
    }
    if (index === 1) {
        str1 = line;
    }
    if (index === 2) {
        str2 = line;
    }
});

let findIndexes = [];

function getSymbol(index) {
    if (index < str1.length) {
        return str1[index];
    }
    if (index === str1.length) {
        return '#';
    }
    return text[index - (str1.length + 1)];
}

function prefixFunction() {
    let n = new Array(str1.length + 1);
    n[0] = 0;
    for (let i = 1; i < (str1.length + text.length + 1); i++) {
        let k = n[i >= n.length ? n.length - 1 : i -1];
        while(k > 0 && getSymbol(k) !== getSymbol(i)) {
            k = n[k - 1];
        }
        if (getSymbol(k) === getSymbol(i)) {
            k++;
        }
        n[i >= n.length ? n.length - 1 : i] = k;
        if (k === str1.length) {
            findIndexes.push(i - str1.length * 2);
        }
    }
    return n;
}

prefixFunction();

let result = [];

let index = 0;
let findIndexesIndex = 0;

if (findIndexes.length) {
    while (index < text.length) {
        if (findIndexesIndex < findIndexes.length && index === findIndexes[findIndexesIndex]) {
            result.push(str2);
            findIndexesIndex++;
            index = index + str1.length;
        } else {
            result.push(text[index]);
            index++;
        }
    }
} else {
    result.push(text);
}


fs.writeFileSync('output.txt', result.join(''));
