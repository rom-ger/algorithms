const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let text = [];


fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        text = line.split('');
    }
});

function prefixFunction() {
    let n = new Array(text.length);
    n[0] = 0;
    for (let i = 1; i < text.length; i++) {
        let k = n[i - 1];
        while(k > 0 && text[k] !== text[i]) {
            k = n[k - 1];
        }
        if (text[k] === text[i]) {
            k++;
        }
        n[i] = k;
    }
    return n;
}

fs.writeFileSync('output.txt', prefixFunction().join(' '));
