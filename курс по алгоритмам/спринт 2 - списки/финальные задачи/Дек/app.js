// ID - 48442175

/**
 * Принцип работы алогритма:
 * храним данные в массиве, фиксированного размера, храним номера индексов массива для вставки вперёд и назад, а так же текущий размер дека
 * чтобы вставить элемент вперёд/назад у нас есть соответствующие индексы, после вставки нового элемента нам надо найти новый индекс для вставки вперёд/назад - это делается простым вычитанием/прибавлением и проверкой на границы текущего массива
 * Чтобы получить первый/последний элемент надо найти соответствущий индекс, это легко делается через индекс для вставки вперёд/назад
 * 
 * Временная сложность:
 * алгоритм будет выполняться за О(1), так как самые тяжёлые операции, которые здесь присутствуют - это поиск элемента в массиве по индексу и изменение значения элемента массива по индексу,
 * а это операции со сложностью О(1)
 * 
 * Пространственная сложность:
 * Максимум памяти будет занимать дек, который полностью заполнен, так как массив фиксированного размера, то память будет затрачиваться только на хранение n элементов, соответственно, потребление памяти будет О(n)
 */

const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let result = '';
let data = [];
const dex = 10;
let countCommands = 0;
let maxSize = 0;

/**
 * Читаем из файла
 */
function readInput() {
    fileContent.split('\n').forEach((line, index) => {
        if (index === 0) {
            countCommands = parseInt(line, dex);
        }
        if (index === 1) {
            maxSize = parseInt(line, dex);
        }
        if (countCommands && index > 1 && index < countCommands + 2) {
            data.push(line.split(' ').map((el, i) => i ? parseInt(el, dex) : el));
        }
    });
}

/**
 * Класс, реализующий ДЕК
 */
class Deq {
    constructor(maxSize) {
        // массив, фиксированного размера
        this.data = new Array(maxSize);
        // индекс для вставки вперёд
        this.indexForFrontPaste = 0;
        // индекс для вставки назад
        this.indexForBackPaste = 0;
        // текущий размер
        this.size = 0;
    }

    // получить следующий индекс в массиве для переданного индекса
    getNextIndex(nowIndex) {
        return (nowIndex + 1) % this.data.length;
    }

    // получить предыдущий индекс в массиве для переданного индекса
    getPrevIndex(nowIndex) {
        return nowIndex === 0 ? this.data.length - 1 : nowIndex - 1;
    }

    // сейчас дек пуст
    isEmpty() {
        return !this.size;
    }

    // сейчас дек состоит из одного элемента
    hasOnlyOneElement() {
        return this.size === 1;
    }

    // сейчас дек полон
    isFull() {
        return this.size === this.data.length;
    }
 
    pushBack(value) {
        // если дек полон - возвращаем false
        if (this.isFull()) {
            return false;
        }
        // вставляем новое значение
        this.data[this.indexForBackPaste] = value;
        // если до этого дек был пуст, значит индекс для вставки вперёд надо сдвинуть на один назад
        if (this.isEmpty()) {
            this.indexForFrontPaste = this.getPrevIndex(this.indexForFrontPaste);
        }
        // сдвигаем индекс для вставки назад на один вперёд
        this.indexForBackPaste = this.getNextIndex(this.indexForBackPaste);
        // увеличиваем размер дека
        this.size++;
        // всё хорошо - вернули true
        return true;
    }

    pushFront(value) {
        // если дек полон - возвращаем false
        if (this.isFull()) {
            return false;
        }
        // вставляем новое значение
        this.data[this.indexForFrontPaste] = value;
        // если до этого дек был пуст, значит индекс для вставки назад надо сдвинуть на один вперёд
        if (this.isEmpty()) {
            this.indexForBackPaste = this.getNextIndex(this.indexForBackPaste);
        }
        // сдвигаем индекс для вставки вперёд на один назад
        this.indexForFrontPaste = this.getPrevIndex(this.indexForFrontPaste);
        // увеличиваем размер дека
        this.size++;
        // всё хорошо - вернули true
        return true;
    }

    popFront() {
        // если дек пуст - возвращаем false
        if (this.isEmpty()) {
            return false;
        }
        // получаем индекс первого элемента дек
        let findIndex = this.getNextIndex(this.indexForFrontPaste);
        // получаем первый элемент дек
        const element = this.data[findIndex];
        // очищаем его место в массиве
        this.data[findIndex] = undefined;
        // если это был единственный элемент, то индекс для вставки назад делаем равным его индексу
        if (this.hasOnlyOneElement()) {
            this.indexForBackPaste = findIndex;
        }
        // индекс для вставки вперёд делаем равным его индексу
        this.indexForFrontPaste = findIndex;
        // уменьшаем размер дек
        this.size--;
        // возвращаем найденный элемент
        return element;
    }

    popBack() {
        // если дек пуст - возвращаем false
        if (this.isEmpty()) {
            return false;
        }
        // получаем индекс последнего элемента дек
        let findIndex = this.getPrevIndex(this.indexForBackPaste);
        // получаем последний элемент дек
        const element = this.data[findIndex];
        // очищаем его место в массиве
        this.data[findIndex] = undefined;
        // если это был единственный элемент, то индекс для вставки вперёд делаем равным его индексу
        if (this.hasOnlyOneElement()) {
            this.indexForFrontPaste = findIndex;
        }
        // индекс для вставки назад делаем равным его индексу
        this.indexForBackPaste = findIndex;
        // уменьшаем размер дек
        this.size--;
        // возвращаем найденный элемент
        return element;
    }
}

/**
 * Запускаем все, пришедшие команды
 */
function run() {
    const deq = new Deq(maxSize);
    
    data.forEach((d, i) => {
        if (d[0] === 'push_back') {
            let flag = deq.pushBack(d[1]);
            if (!flag) {
                result = `${result}error${i < data.length - 1 ? '\n' : ''}`;
            }
        }
        if (d[0] === 'push_front') {
            let flag = deq.pushFront(d[1]);
            if (!flag) {
                result = `${result}error${i < data.length - 1 ? '\n' : ''}`;
            }
        }
        if (d[0] === 'pop_front') {
            let element = deq.popFront();
            result = `${result}${element === false ? 'error' : element}${i < data.length - 1 ? '\n' : ''}`;
        }
        if (d[0] === 'pop_back') {
            let element = deq.popBack();
            result = `${result}${element === false ? 'error' : element}${i < data.length - 1 ? '\n' : ''}`;
        }
    });
}

readInput();
run();

fs.writeFileSync('output.txt', result);