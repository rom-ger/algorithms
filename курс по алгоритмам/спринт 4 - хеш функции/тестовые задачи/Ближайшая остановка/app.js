const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');
const start = new Date().getTime();

const dex = 10;
let count1 = 0;
let data1 = [];
let count2 = 0;
let data2 = [];
let minx = null;
let miny = null;
let maxx = null;
let maxy = null;
let delta = 20;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        count1 = parseInt(line, dex);
    }
    if (index > 0 && index <= count1) {
        let point = line.split(' ').map(el => parseInt(el, dex));
        data1.push(point);
        if (minx === null || point[0] < minx) {
            minx = point[0];
        }
        if (maxx === null || point[0] > maxx) {
            maxx = point[0];
        }
        if (miny === null || point[1] < miny) {
            miny = point[1];
        }
        if (maxy === null || point[1] > maxy) {
            maxy = point[1];
        }
    }
    if (index === count1 + 1) {
        count2 = parseInt(line, dex);
    }
    if (index > count1 + 1 && index <= count1 + 1 + count2) {
        let point = line.split(' ').map(el => parseInt(el, dex));
        if (point[0] < minx - delta || point[0] > maxx + delta || point[1] > maxy + delta || point[1] < miny - delta) {
            return;
        }
        data2.push(point);
    }
});

const middle = new Date().getTime();
console.log(middle - start)

function isAvailable(point1, point2) {
    return (point1[0] - point2[0])*(point1[0] - point2[0]) + (point1[1] - point2[1])*(point1[1] - point2[1]) <= 400;
}

let max = 0;
let findIndex = 0;

for (let i = 0; i < data1.length; i++) {
    let count = 0;
    for (let j = 0; j < data2.length; j++) {
        if (count + data2.length - j > max) {
            if (isAvailable(data1[i], data2[j])) {
                count++;
            }
        }
    }
    if (count > max) {
        max = count;
        findIndex = i;
        if (max === data2.length) {
            break;
        }
    }
}


const end = new Date().getTime();
console.log(end - middle)

fs.writeFileSync('output.txt', findIndex + 1);