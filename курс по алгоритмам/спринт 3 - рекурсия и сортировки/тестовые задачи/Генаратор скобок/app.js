const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let l = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        l = parseInt(line, dex);
    }
});


class StackMaxEffective {
    constructor() {
        this.data = [];
        this.max = [];
    }

    push(x) {
        this.data.push(x);
        if (!this.max.length || x >= this.max[this.max.length - 1]) {
            this.max.push(x);
        }
    }

    pop() {
        if (!this.data.length) {
            return false;
        }
        const lastElement = this.data[this.data.length - 1];
        if (lastElement === this.max[this.max.length - 1]) {
            this.max.splice(this.max.length - 1, 1);
        }
        this.data.splice(this.data.length - 1, 1);
        return lastElement;
    }

    pip() {
        if (!this.data.length) {
            return false;
        }
        return this.data[this.data.length - 1];
    }
}

function is_correct_bracket_seq(str) {
    let array = str.split('');
    if (array.length % 2 !== 0) {
        return false;
    }
    function isSameBracket(b1, b2) {
        if (b1 === '(' && b2 === ')') {
            return true;
        }
        if (b1 === '[' && b2 === ']') {
            return true;
        }
        if (b1 === '{' && b2 === '}') {
            return true;
        }
        return false;
    }
    const stack = new StackMaxEffective();
    array.forEach((el, i) => {
        const lastElement = stack.pip();
        if (lastElement !== false && isSameBracket(lastElement, el)) {
            stack.pop();
        } else {
            stack.push(el);
        }
    });
    return stack.pip() === false;
}

let data = [];

function generate(n, result) {
    if (!n) {
        if (is_correct_bracket_seq(result)) {
            return data.push(result);
        }
        return;
    }
    generate(n - 1, `${result}(`);
    generate(n - 1, `${result})`);
}

generate(l * 2, '');

data.sort();

let result = '';

data.forEach((line, index) => {
    result = `${result}${index ? '\n' : ''}${line}`;
});

fs.writeFileSync('output.txt', result);