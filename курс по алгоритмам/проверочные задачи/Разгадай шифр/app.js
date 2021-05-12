const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let matrix = [];
const dex = 10;

fileContent.split('\n').forEach((line, index) => {
    if (index) {
        matrix.push(line.split(' ').map(el => parseInt(el, dex)));
    }
});

const center = Math.floor(matrix[0].length / 2);

let i = center;
let j = center;
let radius = 1;
let result = `${matrix[i][j]}`;
let DIRECTIONS = {
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
};
let direction = DIRECTIONS.TOP;

canIGo = function () {
    if (direction === DIRECTIONS.TOP) {
        return center - j < radius;
    }
    if (direction === DIRECTIONS.BOTTOM) {
        return j - center < radius;
    }
    if (direction === DIRECTIONS.RIGHT) {
        return i - center < radius;
    }
    if (direction === DIRECTIONS.LEFT) {
        return center - i < radius;
    }
}

go = function () {
    if (direction === DIRECTIONS.TOP) {
        j = j - 1;
    }
    if (direction === DIRECTIONS.BOTTOM) {
        j = j + 1;
    }
    if (direction === DIRECTIONS.RIGHT) {
        i = i + 1;
    }
    if (direction === DIRECTIONS.LEFT) {
        i = i - 1;
    }
    if (j === center - radius && i === center - radius) {
        radius = radius + 1;
    }
}

changeDirection = function() {
    if (direction === DIRECTIONS.TOP) {
        return direction = DIRECTIONS.RIGHT;
    }
    if (direction === DIRECTIONS.BOTTOM) {
        return direction = DIRECTIONS.LEFT;
    }
    if (direction === DIRECTIONS.RIGHT) {
        return direction = DIRECTIONS.BOTTOM;
    }
    if (direction === DIRECTIONS.LEFT) {
        return direction = DIRECTIONS.TOP;
    }
}

while(!!i || !!j) {
    if (canIGo()) {
        go();
        result = `${result}\n${matrix[j][i]}`;
    }
    else {
        changeDirection();
    }
}


fs.writeFileSync('output.txt', result);