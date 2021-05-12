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
    }

    push(value, afterElement = this.head) {
        if (value < afterElement.value) {
            let newElement = new LinkedListItem(value);
            newElement.next = afterElement;
            if (this.head.value === afterElement.value) {
                this.head = newElement;
            }
            this.size++;
        } else if (!afterElement.next) {
            let newElement = new LinkedListItem(value);
            afterElement.next = newElement;
            this.size++;
        } else {
            this.push(value, afterElement.next);
        }
    }
}

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let countV = 0;
let countE = 0;
let data = new Array();

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        let array = line.split(' ');
        countV = parseInt(array[0], dex);
        countE = parseInt(array[1], dex);
        data = new Array(countV);
    }
    if (index > 0 && index <= countE) {
        let array = line.split(' ');
        let v1 = parseInt(array[0], dex);
        let v2 = parseInt(array[1], dex);
        let list = data[v1 - 1];
        if (!list) {
            list = new LinkedList(v2);
            data[v1 - 1] = list;
        } else {
            list.push(v2);
        }
    }
});

let result = '';

for (let i = 0; i < countV; i++) {
    if (!data[i]) {
        result = `${result}${!i ? '' : '\n'}0`;
    } else {
        let list = data[i];
        result = `${result}${!i ? '' : '\n'}${list.size}`;
        let element = list.head;
        while(element) {
            result = `${result} ${element.value}`;
            element = element.next;        }
    }
}

fs.writeFileSync('output.txt', result);