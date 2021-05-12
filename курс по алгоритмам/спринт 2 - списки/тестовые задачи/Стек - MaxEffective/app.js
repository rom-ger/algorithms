const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let data = [];
const dex = 10;
let n = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (n && index > 0 && index < n + 1) {
        data.push(line.split(' ').map((el, i) => i ? parseInt(el, dex) : el));
    }
});

let result = '';

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
        if (this.data[this.data.length - 1] === this.max[this.max.length - 1]) {
            this.max.splice(this.max.length - 1, 1);
        }
        this.data.splice(this.data.length - 1, 1);
        return true;
    }

    get_max() {
        if (!this.data.length) {
            return false;
        }
        return this.max[this.max.length - 1];
    }
}

const stack = new StackMaxEffective();

data.forEach((d, i) => {
    if (d[0] === 'push') {
        stack.push(d[1]);
    }
    if (d[0] === 'pop' && !stack.pop()) {
        result = `${result}error${i < data.length - 1 ? '\n' : ''}`;
    }
    if (d[0] === 'get_max') {
        const max = stack.get_max();
        result = `${result}${max === false ? 'None' : max}${i < data.length - 1 ? '\n' : ''}`;
    }
});

if (!n) {
    result = 'None';
}

fs.writeFileSync('output.txt', result);