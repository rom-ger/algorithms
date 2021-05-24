const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let str1 = [];
let str2 = [];
let rules = new Map();
let rules2 = new Map();


fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        str1 = line.split('');
    }
    if (index === 1) {
        str2 = line.split('');
    }
});

function check() {
    if (str1.length !== str2.length) {
        return 'NO';
    }
    for (let i = 0; i < str1.length; i++) {
        let findRules = rules.get(str1[i]);
        if (findRules) {
            if (findRules !== str2[i]) {
                return 'NO';
            }
        } else {
            let findRules2 = rules2.get(str2[i]);
            if (findRules2) {
                return 'NO';
            } else {
                rules.set(str1[i], str2[i]);
                rules2.set(str2[i], str1[i]);
            }
        }
    }
    return 'YES';
}

fs.writeFileSync('output.txt', check());
