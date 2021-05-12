const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let n = 0;
let data = [1, 1];

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
});

for (let i = 0; i <= n; i++) {
    if (!data[i]) {
        data[i] = (data[i - 2] + data[i - 1]) % 1000000007;
    }
}

fs.writeFileSync('output.txt', data[n]);
