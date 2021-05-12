const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let data = [];
const dex = 10;

fileContent.split('\n').forEach((line, index) => {
    if (index && line) {
        data.push(line.split(' ').map(el => parseInt(el, dex)));
    }
});

let map = new Map();

data.forEach((dataLine) => {
    let findMap = map.get(dataLine[0]);
    let level = 0;
    if (findMap) {
        level = findMap.level;
    }
    map.set(dataLine[0], {
        level: level,
        live: dataLine[1],
    });
    if (dataLine[2] !== -1) {
        map.set(dataLine[2], {
            level: level + 1,
            live: 0,
        });
    }
    if (dataLine[3] !== -1) {
        map.set(dataLine[3], {
            level: level + 1,
            live: 0,
        });
    }
});

let liveArray = [];

for (let dataLine of map.values()) {
    if (!liveArray[dataLine.level]) {
        liveArray[dataLine.level] = {
            sumLive: 0,
            countData: 0,
        };
    }
    liveArray[dataLine.level] = {
        sumLive: liveArray[dataLine.level].sumLive + dataLine.live,
        countData: liveArray[dataLine.level].countData + 1,
    };
}

let result = '';

liveArray.forEach(liveData => {
    let r = (liveData.sumLive / liveData.countData).toFixed(2);
    result = `${result}${result ? ' ' : ''}${r}`;
});

fs.writeFileSync('output.txt', result);