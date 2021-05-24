const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let text = '';
let countWords = 0;
let dex = 10;

class TrieItem {
    constructor(value, isTerm = false) {
        this.value = value;
        this.isTerm = isTerm;
        this.child = new Map();
    }
}

class Trie {
    constructor() {
        this.root = new TrieItem('');
    }
}

const trie = new Trie();

function addWordToTrie(word) {
    let currentNode = trie.root;
    for (let i = 0; i < word.length; i++) {
        let symbol = word[i];
        if (!currentNode.child.get(symbol)) {
            let newNode = new TrieItem(symbol);
            currentNode.child.set(symbol, newNode);
        }
        currentNode = currentNode.child.get(symbol);
    }
    currentNode.isTerm = true;
    return currentNode;
}

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        text = line;
    }
    if (index === 1) {
        countWords = parseInt(line, dex);
    }
    if (index > 1 && index <= countWords + 1) {
        addWordToTrie(line);
    }
});

let stack = [{node: trie.root, index: 0, isRoot: true}];

let isValid = false;

while(stack.length && !isValid) {
    const {node, index, isRoot} = stack.pop();
    if (index >= text.length) {
        isValid = node.isTerm || isRoot;
        continue;
    }
    let nextNode = node.child.get(text[index]);
    if (!nextNode) {
        continue;
    }
    stack.push({node: nextNode, index: index + 1, isRoot: false});
    if (nextNode.isTerm) {
        stack.push({node: trie.root, index: index + 1, isRoot: true});
    }
}

fs.writeFileSync('output.txt', isValid ? 'YES' : 'NO');
