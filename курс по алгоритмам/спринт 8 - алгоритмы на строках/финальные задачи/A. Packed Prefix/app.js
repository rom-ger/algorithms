// ID - 51677014

/**
 * Принцип работы алогритма:
 * 1. Распаковываем каждую строку с помощью простого стэка
 * 2. Проверяем на равенство каждого по счёту символа в распакованных строках, начиная с нулевого, заканчивая тем, где найдётся не равенство
 * 
 * Пусть M - кол-во строк, K - средняя длина запакованной строки, MinL - длинна самой маленькой распакованной строки, MiddleL - средняя длина распакованной строки
 * 
 * Временная сложность:
 * У нас есть две части алгоритма
 *   - в первой части мы проходим циклом по всем строкам, по каждой букве в строке
 *   - во второй части, мы сделаем MinL итераций по всем строкам
 * Итог: O(M * K) + O(MinL * M) = O(M*(k + MinL))
 * 
 * Пространственная сложность:
 * В памяти мы храним все распакованные слова, поэтому занимаем O(M * MiddleL) памяти
 */

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let unpackedWords = [];
let countWords = 0;
let DEX = 10;
let minLengthWord = 0;

// проверка на соответствие числу
function isCharacterNumeric(symbol) {
    return (symbol >= '0' && symbol <= '9')
}

// распакова строки
function unpack(str) {
    let stack = [''];
    for(let i = 0; i < str.length; i++) {
        const symbol = str[i];
        if(isCharacterNumeric(symbol)) {
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
        countWords = parseInt(line, DEX);
    }
    if (index > 0 && index <= countWords) {
        let unpackResult = unpack(line);
        unpackedWords.push(unpackResult);
        // находим самое короткое слово
        if (minLengthWord === 0 || minLengthWord < unpackResult.length) {
            minLengthWord = unpackResult.length;
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
