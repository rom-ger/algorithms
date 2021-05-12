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

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let countV = 0;
let countE = 0;
let startIndex = -1;
let data = new Array();
let color = new Array();
let previous = new Array();
let distance = new Array();
let planned = null;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        let array = line.split(' ');
        countV = parseInt(array[0], dex);
        countE = parseInt(array[1], dex);
        data = new Array(countV + 1);
        color = new Array(countV + 1).fill('white');
        previous = new Array(countV + 1).fill(null);
        distance = new Array(countV + 1).fill(null);
        planned = new MyQueueSized(countV + 1);
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


function BFS(index) {
    planned.push(index);
    color[index] = 'gray';
    distance[index] = 0;
    while(planned.actualSize) {
        let u = planned.pop();
        let list = data[u];
        let child = [];
        if (list) {
            let element = list.head;
            while(element) {
                child.push(element);
                element = element.next;
            }
        }
        child.sort((a, b) => a.value - b.value);
        child.forEach(element => {
            if (color[element.value] === 'white') {
                distance[element.value] = distance[u] + 1;
                previous[element.value] = u;
                color[element.value] = 'gray';
                planned.push(element.value);
            }
        });
        color[u] = 'black';
    }
}

BFS(startIndex);

// function shortestPath(index) {
//     let path = new Stack();
//     let currentVertex = index;
//     while(currentVertex !== null) {
//         path.push(currentVertex);
//         currentVertex = previous[currentVertex];
//     }
//     return path;
// }

let max = 0;
for (let i = 1; i < distance.length; i++) {
    let length = distance[i] === null ? 0 : distance[i];
    if (length > max) {
        max = length;
    }
}



fs.writeFileSync('output.txt', max);
