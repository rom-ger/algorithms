// ID - 51418837

/**
 * Принцип работы алогритма:
 * Для решения этой задачи был использован алгоритм Вагнера-Фишера.
 * Который в свою очередь основан на построении матрицы вычислений нахождения расстояния для всех подстрок данных строк
 * Для вычисления значений матрицы, использовались следующие правила:
 * 1. Если i = 0 и j = 0, то dp[i][j] = 0
 * 2. Если i > 0  и j = 0, то dp[i][j] = i
 * 3. Если j > 0  и i = 0, то dp[i][j] = j
 * 4. Во всех остальных случаях мы находим минимальное значение между:
 *      1. dp[i][j - 1] + 1
 *      2. dp[i - 1][j] + 1
 *      3. dp[i - 1][j - 1] + (если соответствующие символы в строках равны, то 0, иначе 1)
 * 
 * 
 * Временная сложность:
 * Этот алгоритм требует O (M * N) операций, где M и N - это длинны двух строк
 * 
 * Пространственная сложность:
 * В памяти мы храним:
 * Две строки - O(N + M)
 * Матрицу, размера M на N - O(M * N)
 * 
 * в сумме получаем: O(N) + O(M * N) = O(M * N)
 */

 const fs = require('fs');
 let fileContent = fs.readFileSync('input.txt', 'utf8');
 
 // здесь будем хранить данные строк
 let str1 = [];
 let str2 = [];
 
 fileContent.split('\n').forEach((line, index) => {
     if (index === 0) {
         str1 = line.split('');
     }
     if (index === 1) {
         str2 = line.split('');
     }
 });

 let ok = true;
 
 function calc() {
     // создаём матрицу для хранения динамических результатов
     let dp = new Array(str1.length + 1).fill(null);
     dp.forEach((line, index) => {
         dp[index] = new Array(str2.length + 1);
     });
     // первый нулевой элемент
     dp[0][0] = 0;
     // заполняем первую строку
     for (let j = 1; j <= str2.length; j++) {
         dp[0][j] = dp[0][j - 1] + 1;
     }
     // проходимся по всем остальным строкам матрицы
     for (let i = 1; i <= str1.length; i++) {
         // каждый первый элемент в каждой строке легко высчитывается
         dp[i][0] = dp[i - 1][0] + 1;
         for (let j = 1; j <= str2.length; j++) {
             // ищем минимум среди трёх значений
             dp[i][j] = Math.min(
                 dp[i][j - 1] + 1,
                 dp[i - 1][j] + 1,
                 dp[i - 1][j - 1] + (str1[i - 1] === str2[j - 1] ? 0 : 1),
             );
             if (dp[i][j] > 1) {
                 ok = false;
                 break;
             }
         }
         if (!ok) {
             break;
         }
     }
     // после полного прохода возвращаем значение правой нижней ячейки
     return !ok ? 2 : dp[str1.length][str2.length];
 }
 
 fs.writeFileSync('output.txt', calc() < 2 ? 'OK': 'FAIL');