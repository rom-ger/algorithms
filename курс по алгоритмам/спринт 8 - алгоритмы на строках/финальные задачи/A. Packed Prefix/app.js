const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let data = [];
let count = 0;
let dex = 10;
let specialSymbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let minLength = 0;


function findEndIndex(str, startIndex) {
    let find = false;
    let i = startIndex - 1;
    let countOpen = 0;
    while(i < str.length && !find) {
        i++;
        if (str[i] === '[') {
            countOpen++;
        }
        if (str[i] === ']') {
            if (countOpen > 0) {
                countOpen--;
            } else {
                find = true;
            }
        }
    }
    return i;
}

function unpack(str, startIndex, endIndex) {
    let result = '';
    for (let i = startIndex; i <= endIndex; i++) {
        if (specialSymbols.some(s => s === str[i])) {
            let end = findEndIndex(str, i + 2);
            let unpackPart = unpack(str, i + 2, end - 1);
            for (let j = 0; j < parseInt(str[i], dex); j++) {
                result = `${result}${unpackPart}`;
            }
            i = end;
        } else {
            result = `${result}${str[i]}`;
        }
    }
    return result;
}

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        count = parseInt(line, dex);
    }
    if (index > 0 && index <= count) {
        let unpackSubstr = unpack(line, 0, line.length - 1);
        data.push(unpackSubstr);
        if (minLength === 0 || minLength < unpackSubstr.length) {
            minLength = unpackSubstr.length;
        }
    }
});

let index = 0;
let notEqual = false;
let result = '';

while(index < minLength && !notEqual) {
    let symbol = data[0][index];
    let j = 1;
    while (j < data.length && !notEqual) {
        notEqual = symbol !== data[j][index];
        j++;
    }
    if (!notEqual) {
        result = `${result}${symbol}`;
    }
    index++;
}

fs.writeFileSync('output.txt', result);
