class LinkedListItem {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor(headValue) {
        this.head = new LinkedListItem(headValue);
        this.size = 1;
        this.last = this.head;
    }

    push(value) {
        let newElement = new LinkedListItem(value);
        let last = this.last;
        last.next = newElement;
        this.last = newElement;
        this.size++;
    }
}

class Stack {
    constructor() {
        this.data = [];
    }

    push(value) {
        this.data.push(value);
    }

    pop() {
        if (!this.data.length) {
            return false;
        }
        let element = this.data[this.data.length - 1];
        this.data.splice(this.data.length - 1, 1);
        return element;
    }
}

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let countV = 0;
let countE = 0;
let startIndex = -1;
let data = new Array();
let color = new Array();

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        let array = line.split(' ');
        countV = parseInt(array[0], dex);
        countE = parseInt(array[1], dex);
        data = new Array(countV + 1);
        color = new Array(countV + 1).fill('white');
    }
    if (index > 0 && index <= countE) {
        let array = line.split(' ');
        let v1 = parseInt(array[0], dex);
        let v2 = parseInt(array[1], dex);
        let list = data[v1];
        if (!list) {
            list = new LinkedList(v2);
            data[v1] = list;
        } else {
            list.push(v2);
        }
        list = data[v2];
        if (!list) {
            list = new LinkedList(v1);
            data[v2] = list;
        } else {
            list.push(v1);
        }
    }
    if (index === countE + 1) {
        startIndex = parseInt(line, dex);
    }
});

let result = '';


function DFS(index) {
    let stack = new Stack();
    let set = new Set();
    stack.push({v: index, stage: 'first_visit'});
    while(stack.data.length) {
        const {v, stage} = stack.pop();
        if (stage === 'first_visit') {
            stack.push({v: v, stage: 'return_visit'});
            set.add(v);
            color[v] = 'gray';
            let list = data[v];
            let child = [];
            if (list) {
                let element = list.head;
                while(element) {
                    child.push(element);
                    element = element.next;
                }
            }
            child.sort((a, b) => b.value - a.value);
            child.forEach(element => {
                if (color[element.value] === 'white') {
                    stack.push({v: element.value, stage: 'first_visit'});
                }
            });
        } else {
            color[v] = 'black';
        }
    }
    result = Array.from(set).join(' ');
}

DFS(startIndex);

fs.writeFileSync('output.txt', result);
