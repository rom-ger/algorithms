// ID - 49661919

/**
 * Принцип работы алогритма:
 * Реализовал хэш таблицу. Хэшы счтиаю просто находя остаток от деления на 99991 (просто число, максимально приближённое к 10^5)
 * Коллизии разрешаю методом цепочек, с помощью класса связного списка
 * 
 * n - кол-во документов
 * a - кол-во слов в документах
 * m - кол-во запросов
 * b - кол-во слов в запросе
 * 
 * Временная сложность:
 * Так как мы разрешаем коллизии методом цепочек, то самое затратное место - это поиск (получить, обновить, удалить) элемента
 * Как написано в теории, в лучшем случае эта операция занимает O(1) в худшем O(n) времени,
 * Для эффективной работы таблицы надо чтобы в ней было достаточно свободного места
 * Для этого надо выбрать такой модуль, что он был примерно равен (кол-во добавляемых записей / 1.5)
 * Соответственно при оптимальном заполнении таблицы, мы имеем среднюю временную сложность O(1)
 * 
 * Пространственная сложность:
 * Всё, что нам надо хранить - это элементы хэш таблицы, никаких больших дополнительных использований памяти нету
 * Итоговая сложность - линейная - O(n)
 */

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');
const dex = 10;
let countQuery = 0;
let result = '';

/**
 * Один элемент в связном списке
 * Храним Значение из таблицы, ключ из таблицы и ссылку на следующий элемент
 */
class LinkedListNode {
    constructor(value, next = null) {
        this.value = value.value;
        this.key = value.key;
        this.next = next;
    }
}

/**
 * Связный список
 */
class LinkedList {
    constructor() {
        //первый элемент списка
        this.head = null;
    }

    /**
     * Вставляем новый элемент в начало списка
     */
    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;
        return this;
    }

    /**
     * Удаляем элемент из списка
     * Поиск элемента происход по ключу
     */
    delete(key) {
        if (!this.head) {
            return null;
        }
        let deletedNode = null;
        while (this.head && this.head.key === key) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;
        if (currentNode !== null) {
            while (currentNode.next) {
                if (currentNode.next.key === key) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }
        return deletedNode;
    }

    /**
     * Ищем элемент по его ключу
     */
    find(key) {
        if (!this.head) {
            return null;
        }
        let currentNode = this.head;
        while (currentNode) {
            if (key !== undefined && currentNode.value && currentNode.key === key) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }
}

/**
 * Реализация хэш таблицы
 */
class MyMap {
    constructor(m = null) {
        const maxM = 99991;
        // основание - кол-во корзин
        this.m = m && m < maxM ? m : maxM;
        // массив для хранения данных
        this.data = new Array(this.m);
    }

    /**
     * Ищем номер корзины в таблице
     */
    findIndex(key) {
        let hash = key % this.m;
        if (this.data[hash] !== undefined) {
            return hash;
        }
        return -1;
    }

    /**
     * Возвращаем значение из элемента по ключу
     */
    get(key) {
        let index = this.findIndex(key);
        if (index === -1) {
            return 'None';
        }
        let node = this.data[index].find(key);
        return node === null ? 'None' : node.value;
    }

    /**
     * Вставляем/Обновляем значение элемента по ключу
     */
    put(key, value) {
        let hash = key % this.m;
        let list = this.data[hash];
        if (list === undefined) {
            list = new LinkedList();
        }
        list.prepend({key, value});
        this.data[hash] = list;
    }

    /**
     * Удаляем элемент по ключу
     */
    delete(key) {
        let index = this.findIndex(key);
        if (index === -1) {
            return 'None';
        }
        let node = this.data[index].find(key);
        if (node === null) {
            return 'None';
        }
        let value = node.value;
        this.data[index].delete(key);
        return value;
    }
}

let myMap = null;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        countQuery = parseInt(line, dex);
        // инициируем хэш-таблицу, высчитывая оптимальный набор корзин
        myMap = new MyMap(Math.floor(countQuery / 1.5));
    }
    if (index > 0 && index <= countQuery) {
        let data = line.split(' ');
        let r = '';
        if (data[0] === 'get') {
            r = myMap.get(parseInt(data[1], dex));
        }
        if (data[0] === 'put') {
            myMap.put(parseInt(data[1], dex), parseInt(data[2], dex));
        }
        if (data[0] === 'delete') {
            r = myMap.delete(parseInt(data[1], dex));
        }
        if (r !== '') {
            result = `${result}${result ? '\n' : ''}${r}`;
        }
    }
});

fs.writeFileSync('output.txt', result);
