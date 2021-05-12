const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let data = [];
const dex = 10;
let n = 0;
let m = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        n = parseInt(line, dex);
    }
    if (index === 1) {
        m = parseInt(line, dex);
    }
    if (n && index > 1 && index < n + 2) {
        data.push(line.split(' ').map((el, i) => i ? parseInt(el, dex) : el));
    }
});

let result = '';

class MyQueueSized {
    constructor(maxSize) {
        this.data = new Array(maxSize);
        this.head = 0;
        this.tail = 0;
        this.actualSize = 0;
    }

    push(x) {
        if (this.actualSize >= this.data.length) {
            return false;
        }
        this.data[this.tail] = x;
        this.tail = (this.tail + 1) % this.data.length;
        this.actualSize = this.actualSize + 1;
        return true;
    }

    pop() {
        if (!this.actualSize ) {
            return false;
        }
        const head = this.data[this.head];
        this.data[this.head] = null;
        this.head = (this.head + 1) % this.data.length;
        this.actualSize = this.actualSize - 1;
        return head;
    }

    peek() {
        if (!this.actualSize ) {
            return false;
        }
        return this.data[this.head];
    }

    size() {
        return this.actualSize;
    }
}

const stack = new MyQueueSized(m);

data.forEach((d, i) => {
    if (d[0] === 'push') {
        let flag = stack.push(d[1]);
        if (!flag) {
            result = `${result}error${i < data.length - 1 ? '\n' : ''}`;
        }
    }
    if (d[0] === 'pop') {
        let r = stack.pop();
        result = `${result}${r === false ? 'None' : r}${i < data.length - 1 ? '\n' : ''}`;
    }
    if (d[0] === 'peek') {
        let r = stack.peek();
        result = `${result}${r === false ? 'None' : r}${i < data.length - 1 ? '\n' : ''}`;
    }
    if (d[0] === 'size') {
        const size = stack.size();
        result = `${result}${size}${i < data.length - 1 ? '\n' : ''}`;
    }
});

fs.writeFileSync('output.txt', result);