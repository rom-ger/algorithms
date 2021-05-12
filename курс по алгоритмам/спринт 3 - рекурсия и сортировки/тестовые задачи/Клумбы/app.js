const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let data = [];
let n = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (index > 0 && index <= n) {
        data.push(line.split(' ').map(el => parseInt(el, dex)));
    }
});

data.sort((a, b) => {
    return a[0] - b[0];
});

let final = new Array(data.length);

let lengthFinal = 0;

let maxRight = 0;

data.forEach(line => {
    let merge = false;
    let l0 = line[0];
    let l1 = line[1];
    if (maxRight < l0) {
        maxRight = l1;
        final[lengthFinal] = line;
        lengthFinal++;
        return;
    }
    let index = 0;
    while (!merge && index < lengthFinal) {
        let f0 = final[index][0];
        let f1 = final[index][1];
        if (l0 < f0 && l1 >= f0 && l1 <= f1) {
            merge = true;
            final[index] = [l0, f1];
            if (maxRight < f1) {
                maxRight = f1;
            }
        }
        if (l1 > f1 && l0 <= f1 && l0 >= f0) {
            merge = true;
            final[index] = [f0, l1];
            if (maxRight < l1) {
                maxRight = l1;
            }
        }
        if (l1 > f1 && l0 < f0) {
            merge = true;
            final[index] = [l0, l1];
            if (maxRight < l1) {
                maxRight = l1;
            }
        }
        if (l1 <= f1 && l0 >= f0) {
            merge = true;
        }
        index++;
    }
    if (!merge) {
        final[lengthFinal] = line;
        lengthFinal++;
        if (maxRight < line[1]) {
            maxRight = line[1];
        }
    }
});

let result = '';

for(let i = 0; i < lengthFinal; i++) {
    result = `${result}${i ? '\n' : ''}${final[i][0]} ${final[i][1]}`;
}

fs.writeFileSync('output.txt', result);