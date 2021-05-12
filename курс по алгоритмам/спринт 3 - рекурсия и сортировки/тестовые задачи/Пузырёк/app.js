const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let data = [];
let n = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (index === 1) {
        data = line.split(' ').filter((el, i) => i < n).map(el => parseInt(el, dex));
    }
});

let result = '';

for (let i = 0; i < data.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < data.length - i; j++) {
        if (data[j] > data[j+1]) {
            let c = data[j+1];
            data[j+1] = data[j];
            data[j] = c;
            flag = true;
        }
    }
    if (!flag) {
        break;
    }
    result = `${result}${i ? '\n' : ''}${data.join(' ')}`;
}

if (!result) {
    result = data.join(' ');
}


fs.writeFileSync('output.txt', result);