const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let countV = 0;
let countE = 0;
let data = new Array();

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        let array = line.split(' ');
        countV = parseInt(array[0], dex);
        countE = parseInt(array[1], dex);
        for (let i = 0; i < countV; i++) {
            let arr = new Array(countV).fill(0);
            data.push(arr);
        }
    }
    if (index > 0 && index <= countE) {
        let array = line.split(' ');
        let v1 = parseInt(array[0], dex);
        let v2 = parseInt(array[1], dex);
        data[v1 - 1][v2 - 1] = 1;
    }
});

let result = '';

for (let i = 0; i < countV; i++) {
    result = `${result}${!i ? '' : '\n'}`;
    for (let j = 0; j < countV; j++) {
        result = `${result}${!j ? '' : ' '}${data[i][j]}`;
    }
}

fs.writeFileSync('output.txt', result);