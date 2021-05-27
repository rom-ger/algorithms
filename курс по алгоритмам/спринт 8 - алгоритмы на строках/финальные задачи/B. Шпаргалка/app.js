// ID - 51680123

/**
 * Принцип работы алогритма:
 * 1. Собираем дерево слов из словаря, добавляем в него метод, который проверяет любое слово на наличие в словаре
 * 2. С помощью динамического программирования проходим по всему тексту посимвольно
 *      - Если от начала текста до проверяемого символа букв не больше, чем в самом длинном слове из словаря, то проверяем весь кусок [0, i] на наличие в словаре, если он там есть, то в dp[i] записываем true
 *      - Дальше идём назад по массиву dp, пока не отойдём от проверяемого индекса на расстояние равное самому длинному слову из словаря
 *          - на каждой итерации проверяем dp[checkI], если оно true, значит проверяем кусок [checkI + 1, i] на наличие в словаре, если он там есть, то в dp[i] записываем true
 * 3. в dp[text.length - 1] будет лежать ответ
 * 
 * Временная сложность:
 * 1. Построение дерева - O(L), где L - суммарная длина слов в словаре
 * 2. Проверка каждого индекса в тексте: для каждого индекса мы проведём максимум 100 операций (наибольшая возможная длина слова в словаре, по условию)
 *    В каждой из этих операций самая сложная часть - поиск части текста в словаре. Поиск слова в словаре равна O(MaxL) времени, где MaxL - максимальная длина слова в словаре
 *    Получается проверка займёт O(N * MaxL * MaxL), так как по-условию длинна текста (N) не превосходит 10^5, а длина слова в словаре (MaxL) не превосходит 10^2, то MaxL*MaxL можно приравнять к N
 * Получается временная сложность: O(L + N^2), где L - суммарная длина слов в словаре, а N - длинна текста
 * 
 * Пространственная сложность:
 * 1. Весь текст O(N)
 * 2. Все слова из словаря O(L)
 * Получается пространственная сложность: O(L + N)
 */

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');
 
let text = '';
let countWords = 0;
let dex = 10;
let maxLengthWord = 0;
 
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

    hasWord(word) {
        let currentNode = this.root;
        for (let i = 0; i < word.length; i++) {
            let symbol = word[i];
            if (!currentNode.child.get(symbol)) {
                return false;
            }
            currentNode = currentNode.child.get(symbol);
        }
        return currentNode.isTerm;
    }
}
 
const trie = new Trie();

// добавить слово в дерево
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
        // сохраняем максимальную длинну слова
        if (line.length > maxLengthWord) {
            maxLengthWord = line.length;
        }
    }
});

// погнали проверять
function check() {
    // массив для хранения результатов ДП
    let dp = new Array(text.length);
    // идём по всем символам в тексте
    for (let index = 0; index < dp.length; index++) {
        // по-умалчанию считаем проверяемый отрезок не валидным
        let valid = false;
        // если до начала текста не дальше, чем саммое длинное слово, то проверим этот отрезок сразу
        if (index + 1 <= maxLengthWord) {
            valid = trie.hasWord(text.substring(0, index + 1));
        }
        // высчитываем насколько далеко имеет смысл заходить назад для проверки
        let checkPrevIndex = index - 1;
        let minCheckPrevIndex = index - maxLengthWord;
        if (minCheckPrevIndex < 0) {
            minCheckPrevIndex = 0;
        }
        // идём пошагово назад, пока не найдём валидную комбинацию или не дойдём до конца
        while(!valid && checkPrevIndex >= minCheckPrevIndex) {
            // если тут сохранена не валидная кобинация, то пропускаем этот индекс
            if (!dp[checkPrevIndex]) {
                checkPrevIndex--;
                continue;
            }
            // иначе проверяем отрезок отсюда до нашего index
            valid = trie.hasWord(text.substring(checkPrevIndex + 1, index + 1));
            checkPrevIndex--;
        }
        dp[index] = valid;
    }
    return dp[dp.length - 1];
}
 
 
fs.writeFileSync('output.txt', check() ? 'YES' : 'NO');
