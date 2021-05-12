const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let n = 0;
let k = 0;
let data = [0, 0, 1];

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        let array = line.split(' ');
        n = parseInt(array[0], dex);
        k = parseInt(array[1], dex);
    }
});

function findCount(number) {
    if (data[number]) {
        return data[number];
    }
    let count = 1 + k >= number ? 1 : 0;
    let index = number - k;
    if (index < 2) {
        index = 2;
    }
    while(index < number) {
        let currentCount = findCount(index);
        count = (count + currentCount) % 1000000007;
        index++;
    }
    data[number] = count;
    return count;
}

fs.writeFileSync('output.txt', findCount(n));
