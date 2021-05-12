const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let count = 0;
let data = [];
let startTime = null;
let endTime = null;

function getFullTime(time) {
    return time.hour * 60 + time.min;
}

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        count = parseInt(line, dex);
    }
    if (index > 0 && index <= count) {
        let lesson = {};
        let array = line.split(' ');
        let arrayStart = array[0].split('.').map(el => parseInt(el, dex));
        let arrayEnd = array[1].split('.').map(el => parseInt(el, dex));
        lesson.start = {
            hour: arrayStart[0],
            min: arrayStart[1] || 0,
            str: array[0],
        };
        lesson.end = {
            hour: arrayEnd[0],
            min: arrayEnd[1] || 0,
            str: array[1],
        };
        lesson.start.time = getFullTime(lesson.start);
        lesson.end.time = getFullTime(lesson.end);
        if (endTime === null || endTime < lesson.end.time) {
            endTime = lesson.end.time;
        }
        if (startTime === null || startTime > lesson.start.time) {
            startTime = lesson.start.time;
        }
        lesson.index = data.length;
        data.push(lesson);
    }
});

let findCount = 0;

let result = '';

while(startTime <= endTime) {
    let array = data
                .filter(lesson => !!lesson && lesson.start.time >= startTime);
    array.sort((less1, less2) => {
        if (!less2 && !less1) {
            return 0;
        }
        if (!less2 && !!less1) {
            return -1;
        }
        if (!!less2 && !less1) {
            return 1;
        }
        if (less1.end.time === less2.end.time) {
            return less1.start.time - less2.start.time;
        }
        return less1.end.time - less2.end.time;
    });
    if (!array.length) {
        startTime = endTime + 1;
        continue;
    }
    findCount++;
    startTime = array[0].end.time;
    data[array[0].index] = null;
    result = `${result}\n${array[0].start.str} ${array[0].end.str}`;
}

result = `${findCount}${result}`;

fs.writeFileSync('output.txt', result);
