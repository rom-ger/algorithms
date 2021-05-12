const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let n = 0;
let m = 0;
let dp = [];
let data = [];

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        let array = line.split(' ');
        n = parseInt(array[0], dex);
        m = parseInt(array[1], dex);
        dp = new Array(n).fill([]);
        dp.forEach((line, i) => {
            dp[i] = new Array(m).fill(null);
        });
    }
    if (index > 0 && index <= n) {
        data.push(line.split('').filter((el, i) => i < m).map(el => parseInt(el, dex)));
    }
});

dp[n - 1][m - 1] = data[n - 1][m - 1];

function findCount(i, j) {
    if (dp[i][j] !== null) {
        return dp[i][j];
    }
    let left = j === 0 ? 0 : findCount(i, j - 1);
    let bottom = i === n - 1 ? 0 : findCount(i + 1, j);
    let current = Math.max(left, bottom) + data[i][j];
    dp[i][j] = current;
    return current;
}

let maxCount = findCount(0, m - 1);

let path = [];

let currentI = 0;
let currentJ = m - 1;

while(currentI < n && currentJ >= 0) {
    let left = currentJ === 0 ? -1 : dp[currentI][currentJ - 1];
    let bottom = currentI === n - 1 ? -1 : dp[currentI + 1][currentJ];
    if (left === -1 && bottom === -1) {
        currentJ = -1;
        currentI = n;
        continue;
    }
    let currentData = data[currentI][currentJ];
    let checkData = dp[currentI][currentJ] - currentData;
    if (checkData === left) {
        path.unshift('R');
        currentJ = currentJ - 1;
    } else if (checkData === bottom) {
        path.unshift('U');
        currentI = currentI + 1;
    }
}

fs.writeFileSync('output.txt', `${maxCount}\n${path.join('')}`);
