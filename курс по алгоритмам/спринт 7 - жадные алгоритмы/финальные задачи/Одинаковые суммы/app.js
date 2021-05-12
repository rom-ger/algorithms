// ID - 51407535

/**
 * Принцип работы алогритма:
 * Суть решения состоит в том, чтобы определить, можно ли разбить множество чисел на два подножества, сумма каждого из которых будет равняться половине сумме всего множества
 * Для этого мы создадим матрицу в которой будем хранить промежуточные вычисления.
 * Таблицу размера K/2 на n, содержащую значения рекурсии, где K — сумма значений, а n — число элементов
 * Мы хотим определить, существует ли подмножество S, сумма элементов которого равна K/2. Пусть:
 * p(i, j) принимает значение True, если среди { x1, ..., xj } существует такое подмножество, элементы которого в сумме дают i и False в противном случае.
 * Тогда p(K/2, n) принимает значение True тогда и только тогда, когда существует подмножество S, сумма которого равна K/2.
 * Цель нашего алгоритма — вычислить p(K/2, n). Для достижения этого мы имеем следующие рекуррентные формулы:
 * p(i, j) принимает значение True, если либо p(i, j − 1) принимает значение True, либо p(i − xj, j − 1) принимает значение True
 * p(i, j) принимает значение False в противном случае
 * Причина этому следующая: существует некоторое подмножество S, сумма которого равна i для чисел
 * x1, ..., xj
 * тогда и только тогда, когда одно из двух верно:
 * существует подмножество { x1, ..., xj-1 }, дающее сумму i;
 * существует подмножество { x1, ..., xj-1 }, дающее сумму i − xj, поскольку xj + сумма этого подмножества=i.
 * 
 * Временная сложность:
 * Этот алгоритм работает за время O(K*N), где N — число элементов во входном множестве, а K — сумма элементов во входном множестве.
 * 
 * Пространственная сложность:
 * В памяти мы храним:
 * Все элементы множества - O(N)
 * Матрицу, размера K/2 на N - O(K/2 * N)
 * 
 * в сумме получаем: O(N) + O(K/2 * N) = O(K/2 * N)
 */

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let count = 0;
// здесь будем хранить все числа
let data = [];
// сумма всех чисел
let sum = 0;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        count = parseInt(line, dex);
    }
    if (index === 1) {
        data = line.split(' ').filter((el, i) => i < count).map(el => {
            let number = parseInt(el, dex);
            sum = sum + number;
            return number;
        });
    }
});

function calc() {
    // если сумма нечётная, то сразу можно вернуть false
    if (sum % 2 !== 0) {
        return 'False';
    }
    let countLine = sum / 2;
    // заполняем нашу матрицу стартовыми значениями
    let dp = new Array(countLine + 1).fill([]);
    dp.forEach((line, index) => {
        if (!index) {
            dp[index] = new Array(count + 1).fill(true);
        } else {
            dp[index] = new Array(count + 1);
            dp[index][0] = false;
        }
    });
    // проходимся по матрице по алгаритму, описаному в начале
    for (let i = 1; i <= countLine; i++) {
        for (let j = 1; j <= count; j++) {
            if (i - data[j - 1] >= 0) {
                dp[i][j] = dp[i][j - 1] || dp[i - data[j - 1]][j - 1];
            } else {
                dp[i][j] = dp[i][j - 1];
            }
        }
    }
    // после полного прохода возвращаем значение правой нижней ячейки
    return dp[countLine][count] ? 'True' : 'False';
}

fs.writeFileSync('output.txt', calc());