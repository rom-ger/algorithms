const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let n = 0;
let m = 0;
let a = [];
let b = [];
let dp = [];

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (index === 1) {
        a = [''].concat(line.split(' ').filter((el, i) => i < n).map(el => parseInt(el, dex)));
    }
    if (index === 2) {
        m = parseInt(line, dex);
    }
    if (index === 3) {
        b = [''].concat(line.split(' ').filter((el, i) => i < m).map(el => parseInt(el, dex)));
    }
});

dp = new Array(n + 1).fill([]);
dp.forEach((line, index) => {
    if (!index) {
        dp[index] = new Array(m + 1).fill(0);
    } else {
        dp[index] = new Array(m + 1);
        dp[index][0] = 0;
    }
});

for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
        let symbol1 = a[i];
        let symbol2 = b[j];
        if (symbol1 === symbol2) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
}

let result = dp[n][m];

let answerIndexA = [];
let answerIndexB = [];

let i = n;
let j = m;

while(dp[i][j] !== 0) {
    if (a[i] === b[j]) {
        answerIndexA.unshift(i);
        answerIndexB.unshift(j);
        i = i - 1;
        j = j - 1;
    } else {
        if (dp[i][j] === dp[i][j - 1]) {
            j = j - 1;
        } else if(dp[i][j] === dp[i - 1][j]) {
            i = i - 1;
        } else {
            i = i - 1;
            j = j - 1;
        }
    }
}

result = `${result}\n${answerIndexA.join(' ')}\n${answerIndexB.join(' ')}`;

fs.writeFileSync('output.txt', result);
