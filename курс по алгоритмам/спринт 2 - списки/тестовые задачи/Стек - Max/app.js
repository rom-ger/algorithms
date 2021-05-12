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

class StackMax {
    constructor() {
        this.data = [];
    }

    push(x) {
        this.data.push(x);
    }

    pop() {
        if (!this.data.length) {
            return false;
        }
        this.data.splice(this.data.length - 1, 1);
        return true;
    }

    get_max() {
        if (!this.data.length) {
            return false;
        }
        let max = this.data[0];
        this.data.forEach(el => el > max ? max = el : null);
        return max;
    }
}

const stack = new StackMax();

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

fs.writeFileSync('output.txt', result);