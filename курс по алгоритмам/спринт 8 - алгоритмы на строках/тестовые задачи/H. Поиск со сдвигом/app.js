const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let dex = 10;
let n = 0;
let m = 0;
let text = [];
let pattern = [];


fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (index === 1) {
        text = line.split(' ').filter((el, i) => i < n).map(el => parseInt(el, dex));
    }
    if (index === 2) {
        m = parseInt(line, dex);
    }
    if (index === 3) {
        pattern = line.split(' ').filter((el, i) => i < m).map(el => parseInt(el, dex));
    }
});

function find(start = 0) {
    if (text.length - start < pattern.length) {
        return -1;
    }
    for (let i = start; i <= text.length - pattern.length; i++) {
        let match = true;
        let delta = text[i] - pattern[0];
        for (let offset = 0; offset <= pattern.length - 1; offset++) {
            if (text[i + offset] - pattern[offset] !== delta) {
                match = false;
                break;
            }
        }
        if (match) {
            return i;
        }
    }
    return -1;
}

function findAll() {
    let occurrences = [];
    let start = 0;
    let pos = find(start);
    while(pos !== -1) {
        occurrences.push(pos + 1);
        start = pos + 1;
        pos = find(start);
    }
    return occurrences;
}



fs.writeFileSync('output.txt', findAll().join(' '));
