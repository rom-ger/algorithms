const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let s = [];
let t = [];

let result = 'NO';

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        s = line.split('');
    }
    if (index === 1) {
        t = line.split('');
    }
});

let map1 = new Map();
let map2 = new Map();
if (s.length === t.length) {
    result = 'YES';
    for (let i = 0; i < s.length; i++) {
        let find1 = map1.get(s[i]);
        let find2 = map2.get(t[i]);
        if (find1 === undefined && find2 === undefined) {
            map1.set(s[i], t[i]);
            map2.set(t[i], s[i]);
        } else {
            if (find1 !== t[i] || find2 !== s[i]) {
                result = 'NO';
            }
        }
    }
}

fs.writeFileSync('output.txt', result);