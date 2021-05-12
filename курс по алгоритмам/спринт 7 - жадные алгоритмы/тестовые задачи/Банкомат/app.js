const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let m = 0;
let n = 0;
let result = 0;
let data = [];

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        m = parseInt(line, dex);
    }
    if (index === 1) {
        n = parseInt(line, dex);
    }
    if (index === 2) {
        data = line.split(' ').filter((el, i) => i < n).map(el => parseInt(el, dex));
    }
});

data.sort((a, b) => b - a);

let dp = new Array(m + 1).fill([]);
dp.forEach((line, index) => {
    if (!index) {
        dp[index] = new Array(n).fill(1);
    } else {
        dp[index] = new Array(n);
        dp[index][0] = index % data[0] === 0 ? 1 : 0;
    }
});

for (let i = 1; i <= m; i++) {
    for (let j = 1; j < n; j++) {
        if (i < data[j]) {
            dp[i][j] = dp[i][j -1];
        } else {
            dp[i][j] = dp[i][j -1] + dp[i - data[j]][j];
        }
    }
}

fs.writeFileSync('output.txt', dp[m][n - 1]);
