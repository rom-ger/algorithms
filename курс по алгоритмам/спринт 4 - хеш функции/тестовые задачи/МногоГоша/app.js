const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let n = 0;
let k = 0;
let s = '';
let map = new Map();
let arr = [];
let results = new Set();

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        let arr = line.split(' ');
        n = parseInt(arr[0], dex);
        k = parseInt(arr[1], dex);
    }
    if (index === 1) {
        s = line;
        arr = new Array(s.length - n);
    }
});

function findFirstIndex(str) {
    let findMap = map.get(str);
    let findIndex = -1;
    if (findMap === undefined) {
        findIndex = arr.findIndex(el => el && el.str === str);
        if (findIndex !== -1) {
            map.set(str, findIndex);
        }
    } else {
        findIndex = findMap;
    }
    if (findIndex === -1) {
        return {firstIndex: -1, value: null};
    }
    return {firstIndex: findIndex, value: arr[findIndex]};
}

for (let i = 0; i <= s.length - n; i++) {
    let substr = s.substr(i, n);
    let result = findFirstIndex(substr);
    let count = 0;
    if (result.firstIndex === -1) {
        arr[i] = {
            count: 1,
            str: substr,
        }
        count = 1;
        firstIndex = i;
    } else {
        count = result.value.count;
        if (result.value.count < k) {
            count = result.value.count + 1;
            result.value.count = result.value.count + 1;
        }
    }
    if (count >= k) {
        results.add(result.firstIndex);
    } 
}

fs.writeFileSync('output.txt', Array.from(results).join(' '));