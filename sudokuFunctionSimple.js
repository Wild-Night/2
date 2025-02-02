// Примеры досок судоку для тестирования
// boards[0] - правильно заполненная доска
// boards[1] - частично заполненная доска (содержит нули)
boards = [
    [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]   
    ],
    [
        [5, 3, 4, 6, 7, 8, 9, 1, 2], 
        [6, 7, 2, 1, 9, 0, 3, 4, 8],
        [1, 0, 0, 3, 4, 2, 5, 6, 0],
        [8, 5, 9, 7, 6, 1, 0, 2, 0],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 0, 1, 5, 3, 7, 2, 1, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 0, 0, 4, 8, 1, 1, 7, 9]
    ]  
];

// Проверяем каждую доску из массива boards
boards.forEach((board) => {
    if (validSolution(board)) {
        console.log('board is valid'); 
    } else {
        console.log("board is not valid");
    }
});

/**
 * Проверяет, является ли решение судоку правильным
 * @param {number[][]} board - Двумерный массив 9x9, представляющий доску судоку
 * @returns {boolean} - true, если решение правильное, false - неправильно заполнена
 */
function validSolution(board) {
    // Шаг 1: Проверка заполненности
    // Проходим по всем ячейкам и проверяем, что нет пустых (0)
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                return false;
            }
        }
    }

    // Шаг 2: Проверка строк
    // Каждая строка должна содержать числа от 1 до 9 без повторений
    for (let i = 0; i < 9; i++) {
        let seen = new Set();
        for (let j = 0; j < 9; j++) {
            if (seen.has(board[i][j])) {
                return false; // Найден дубликат в строке
            }
            seen.add(board[i][j]);
        }
    }

    // Шаг 3: Проверка столбцов
    // Каждый столбец должен содержать числа от 1 до 9 без повторений
    for (let j = 0; j < 9; j++) {
        let seen = new Set();
        for (let i = 0; i < 9; i++) {
            if (seen.has(board[i][j])) {
                return false; // Найден дубликат в столбце
            }
            seen.add(board[i][j]);
        }
    }

    // Шаг 4: Проверка блоков 3x3
    // Каждый блок 3x3 должен содержать числа от 1 до 9 без повторений
    for (let blockRow = 0; blockRow < 3; blockRow++) {
        for (let blockCol = 0; blockCol < 3; blockCol++) {
            let seen = new Set();
            // Проходим по всем ячейкам внутри текущего блока 3x3
            for (let i = blockRow * 3; i < (blockRow + 1) * 3; i++) {
                for (let j = blockCol * 3; j < (blockCol + 1) * 3; j++) {
                    if (seen.has(board[i][j])) {
                        return false; // Найден дубликат в блоке 3x3
                    }
                    seen.add(board[i][j]);
                }
            }
        }
    }

    // Если все проверки пройдены успешно, решение правильное
    return true;
}
