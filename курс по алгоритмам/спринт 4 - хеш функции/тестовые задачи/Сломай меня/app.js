const fs = require('fs');
let start = new Date().getTime();

let a = 1000;
let m = 123987123;
let alphabet = [
    'q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'
];
let length = 6;

function hash(s) {
    let h = s.length ? s[0].charCodeAt(0) : 0;

    for (let i = 1; i < s.length; i++) {
        h = (h * a + s[i].charCodeAt(0)) % m;
    }
    
    h = h % m;
    return h;
}

const allWord = [];

function build(str) {
    if (str.length === length) {
        allWord.push({
            str,
            hash: hash(str),
        });
        return;
    }
    alphabet.forEach(w => build(`${str}${w}`));
}

allWord.sort((a, b) => a.hash - b.hash);

console.log('length: ', allWord.length);
let middle = new Date().getTime();
console.log('middle: ', middle - start);
let flag = false;

for (let i = 1; i < allWord.length; i++) {
    if (allWord[i - 1].hash === allWord[i].hash) {
        console.log('success: ', allWord[i - 1], allWord[i]);
        flag = true;
    }
}

let end = new Date().getTime();
console.log('end: ', end - start);

console.log(hash('ezhgeljkablzwnvuwqvpa') === hash('gbpdcvkumyfxillgnqrva'))

fs.writeFileSync('output.txt', '');