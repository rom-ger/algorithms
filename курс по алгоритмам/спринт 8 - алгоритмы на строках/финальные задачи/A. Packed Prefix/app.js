// ID - 51677014

/**
 * Принцип работы алогритма:
 * 1. Распаковываем каждую строку с помощью простого стэка
 * 2. Проверяем на равенство каждого по счёту символа в распакованных строках, начиная с нулевого, заканчивая тем, где найдётся не равенство
 * 
 * Временная сложность:
 * У нас есть две части алгоритма
 *   - в первой части мы проходим циклом по всем словам, по каждой букве в слове
 *   - во второй части, в худшем случае мы пройдёмся так же по всем буквам всех слов
 * Получается время выполнения прямо пропорционально зависит от количества букв в распакованных словах - O(N), где N - кол-во распакованных букв
 * 
 * Пространственная сложность:
 * В памяти мы храним все распакованные слова, поэтому занимаем O(N) памяти, где N - кол-во распакованных букв
 */

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let unpackedWords = [];
let countWords = 0;
let dex = 10;
let minLengthWord = 0;

// проверка на соответствие числу
function isNumber(symbol) {
    return (symbol >= '0' && symbol <= '9')
}

// распакова строки
function unpack(str) {
    let stack = [''];
    for(let i = 0; i < str.length; i++) {
        const symbol = str[i];
        if(isNumber(symbol)) {
            stack.push(symbol);
            continue;
        }
        if(symbol === '[') {
            stack.push('');
            continue;
        }
        if(symbol === ']') {
            const temp = stack.pop();
            const rep = +stack.pop();
            stack.push(stack.pop() + temp.repeat(rep));
            continue;
        }
        stack.push(stack.pop() + symbol);
    }
    return stack[0];
}

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        countWords = parseInt(line, dex);
    }
    if (index > 0 && index <= countWords) {
        let unpackSubstr = unpack(line, 0, line.length - 1);
        unpackedWords.push(unpackSubstr);
        // находим самое короткое слово
        if (minLengthWord === 0 || minLengthWord < unpackSubstr.length) {
            minLengthWord = unpackSubstr.length;
        }
    }
});

// непосредственно считаем префикс
function calcPrefix() {
    let index = 0;
    let notEqual = false;
    let result = '';
    
    // идём по буквам, от нулевой, до самой последней в самом коротком слове
    while(index < minLengthWord && !notEqual) {
        let symbol = unpackedWords[0][index];
        let j = 1;
        // проходимся по всем словам и сравниваем текущую букву
        while (j < unpackedWords.length && !notEqual) {
            notEqual = symbol !== unpackedWords[j][index];
            j++;
        }
        // если соответствующие буквы равны во всех словах, то добавляем её в результат
        if (!notEqual) {
            result = `${result}${symbol}`;
        }
        index++;
    }

    return result;
}


fs.writeFileSync('output.txt', calcPrefix());
