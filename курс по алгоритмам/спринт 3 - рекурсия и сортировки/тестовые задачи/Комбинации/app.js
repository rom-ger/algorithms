const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let data = [];
let config = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
}

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        data = line.split('').map(el => parseInt(el, dex));
    }
});

let array = [];

function generate(index, result) {
    if (index === data.length) {
        return array.push(result);
    }
    let conf = config[data[index]];
    conf.forEach(c => {
        generate(index + 1, `${result}${c}`);
    });
}

generate(0, '');

fs.writeFileSync('output.txt', array.join(' '));