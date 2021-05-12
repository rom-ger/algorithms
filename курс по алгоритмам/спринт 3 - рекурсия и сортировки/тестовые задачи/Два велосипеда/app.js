const fs = require('fs');
const start = new Date().getTime();
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let data = [];
let n = 0;
let price = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (index === 1) {
        data = line.split(' ');
    }
    if (index === 2) {
        price = parseInt(line, dex);
    }
});

function findPrice(i1, i2) {
    if (i1 === i2 && parseInt(data[i1], dex) < price) {
        return -1;
    }
    let middle = Math.floor((i2 + i1) / 2);
    if (parseInt(data[middle], dex) >= price) {
        if (!middle || parseInt(data[middle - 1], dex) < price) {
            return middle + 1;
        }
        return findPrice(i1, middle);
    } else {
        if (middle < data.length - 1 && parseInt(data[middle + 1], dex) >= price) {
            return middle + 2;
        }
        return findPrice(middle + 1, i2);
    }
}

let index1 = findPrice(0, data.length - 1);
let index2 = -1;
if (index1 !== -1) {
    price = price * 2;
    index2 = findPrice(index1 - 1, data.length - 1);
}

const end = new Date().getTime();
console.log(end - start)
fs.writeFileSync('output.txt', `${index1} ${index2}`);