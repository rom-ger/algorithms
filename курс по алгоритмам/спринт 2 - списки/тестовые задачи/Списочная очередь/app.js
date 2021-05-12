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

class MyQueueSized {
    constructor() {
        this.head = null;
        this.tail = null;
        this.actualSize = 0;
    }

    put(x) {
        let element = {
            value: x,
            next: null,
            prev: null,
        };
        if (!this.actualSize) {
            this.head = element;
            this.tail = element;
            this.actualSize = this.actualSize + 1;
            return;
        }
        if (this.actualSize === 1) {
            let head = this.head;
            element.prev = head;
            this.tail = element;
            this.head.next = element;
            this.actualSize = this.actualSize + 1;
            return;
        }
        let tail = this.tail;
        element.prev = tail;
        tail.next = element;
        if (this.actualSize === 2) {
            this.head.next = tail;
        }
        this.tail = element;
        this.actualSize = this.actualSize + 1;
    }

    get() {
        if (!this.actualSize) {
            return false;
        }
        const headValue = this.head.value;
        if (this.actualSize === 1) {
            this.head = null;
            this.tail = null;
            this.actualSize = 0;
            return headValue;
        }
        let newHead = this.head.next;
        this.head = newHead;
        this.head.prev = null;
        this.actualSize = this.actualSize - 1;
        return headValue;
    }

    size() {
        return this.actualSize;
    }
}

const stack = new MyQueueSized();

data.forEach((d, i) => {
    if (d[0] === 'put') {
        stack.put(d[1]);
    }
    if (d[0] === 'get') {
        let r = stack.get();
        result = `${result}${r === false ? 'error' : r}${i < data.length - 1 ? '\n' : ''}`;
    }
    if (d[0] === 'size') {
        const size = stack.size();
        result = `${result}${size}${i < data.length - 1 ? '\n' : ''}`;
    }
});

fs.writeFileSync('output.txt', result);