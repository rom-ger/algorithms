const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');
let s = [];
let t = [];

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        s = line.split('');
    }
    if (index === 1) {
        t = line.split('');
    }
});

function init() {
    let check = false;
    let indexS = 0;
    let indexT = 0;
    while (indexT < t.length && !check) {
        if (t[indexT] === s[indexS]) {
            indexS++;
            if (indexS === s.length) {
                check = true;
            }
        }
        indexT++;
    }
    return check;    
}

let r = false;

if (!s.length) {
    r = true;
} else {
    if (!t.length) {
        r = false;
    } else {
        r = init();
    }
}
result = r ? 'True' : 'False';

fs.writeFileSync('output.txt', result);