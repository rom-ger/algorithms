// ID - 48475236

/**
 * Принцип работы алогритма:
 * Используем стек для решения задачи. если на вход получаем число, добавляем в стек, если на вход получаем операцию, то выполняем её для последних двух значений из стека (при этом они удаляются из стека) и результат кладём в стек
 * после выполнения всех операций, последним элементов стеке будет искомый результат.
 * 
 * Временная сложность:
 * Так как мы заранее не знаем размер входных данных, то стек будет реализован на динамическом массиве, соответственно время на добавление и удаление элементов из этого массива будет равно O(n)
 * Проход по всем входным данным нам тоже нужен только один раз, поэтому и здесь время будет равно O(n)
 * 
 * Пространственная сложность:
 * Для хранения всех необходимых данным нам понадобится не больше места, чем придёт чисел на вход, так что памяти мы так же займём O(n)
 */

const fs = require('fs');

let data = [];
const dex = 10;
// все возможные операции
const operations = ['+', '-', '*', '/'];

/**
 * Проверяем, не операция ли нам пришла?
 * @param {*} el 
 */
function isOperation(el) {
    return operations.some(operation => operation === el);
}

/**
 * Читаем из файла
 */
function readInput() {
    let fileContent = fs.readFileSync('input.txt', 'utf8');
    fileContent.split('\n').forEach((line, index) => {
        if (index === 0) {
            data = line.split(' ').map(el => isOperation(el) ? el : parseInt(el, dex));
        }
    });
}

/**
 * Простой стек с добавлением и получением последнего элемента
 */
class Stack {
    constructor() {
        this.data = [];
    }

    push(x) {
        this.data.push(x);
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

/**
 * Производим операцию над двумя числами
 * @param {*} x 
 * @param {*} y 
 * @param {*} operation 
 */
function calc(x, y, operation) {
    if (operation === '+') {
        return x + y;
    }
    if (operation === '-') {
        return x - y;
    }
    if (operation === '*') {
        return x * y;
    }
    if (operation === '/') {
        return Math.floor(x / y);
    }
    return 0;
}

/**
 * Запускаем все, пришедшие команды
 */
function run() {
    const stack = new Stack();
    data.forEach(el => {
        // если это не операция, то просто добавляем в стек
        if (!isOperation(el)) {
            stack.push(el);
            return;
        }
        // если это операция, то берём два последний значения их стека и производим над ними эту операцию
        let y = stack.pop();
        let x = stack.pop();
        // результат кладём в стек
        stack.push(calc(x, y, el));
    });

    fs.writeFileSync('output.txt', stack.pop());
}

readInput();
run();