const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let m = 0;
let count = 0;
let data = [];

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        m = parseInt(line, dex);
    }
    if (index === 1) {
        count = parseInt(line, dex);
    }
    if (index > 1 && index <= count + 1) {
        let array = line.split(' ');
        data.push({
            c: parseInt(array[0], dex),
            m: parseInt(array[1], dex),
        });
    }
});

let sumC = 0;
let sumM = 0;

data.sort((a, b) => b.c - a.c);

let index = 0;
let overflow = false;
while(!overflow && index < data.length) {
    if (data[index].m + sumM <= m) {
        sumM = sumM + data[index].m;
        sumC = sumC + data[index].m * data[index].c;
        index++;
    } else {
        let lastM = m - sumM;
        sumC = sumC + lastM * data[index].c;
        overflow = true;
    }
}

fs.writeFileSync('output.txt', sumC);
