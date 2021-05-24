const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let text = '';
let countWords = 0;
let dex = 10;
let patterns = [];

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
        patterns.push(line);
    }
});

function check(currentNode, index, isRoot = false) {
    if (index >= text.length) {
        return currentNode.isTerm || isRoot;
    }
    let symbol = text[index];
    let nextNode = currentNode.child.get(symbol);
    if (!nextNode) {
        return false;
    }
    if (!nextNode.isTerm) {
        return check(nextNode, index + 1);
    }
    return check(trie.root, index + 1, true) || check(nextNode, index + 1);
}

let isValid = check(trie.root, 0, true);

fs.writeFileSync('output.txt', isValid ? 'YES' : 'NO');
