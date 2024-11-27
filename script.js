// Глобальная переменная для хранения текущего состояния доски
let currentBoard = null;

// Обработчик события загрузки файла
document.getElementById('boardFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            // Парсим JSON файл в массив
            const board = JSON.parse(e.target.result);
            if (isValidBoard(board)) {
                currentBoard = board;
                displayBoard(board);
            } else {
                alert('Неправильный формат доски. Проверьте входящий файл.');
            }
        } catch (error) {
            alert('Ошибка чтения файла. Убедитесь, что файл содержит правильный JSON.');
        }
    };
    reader.readAsText(file);
});

// Проверка корректности формата доски
function isValidBoard(board) {
    // Проверяем, что это массив 9x9
    if (!Array.isArray(board) || board.length !== 9) return false;
    // Проверяем, что каждая строка - массив из 9 чисел от 0 до 9
    return board.every(row => 
        Array.isArray(row) && 
        row.length === 9 && 
        row.every(cell => Number.isInteger(cell) && cell >= 0 && cell <= 9)
    );
}

// Отображение доски на странице с подсветкой ошибок и пустых ячеек
function displayBoard(board) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    // Находим повторяющиеся числа в строках, столбцах и блоках
    const errors = findErrors(board);

    board.forEach((row, i) => {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        
        row.forEach((cell, j) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            
            // Отображаем 0 как пустую ячейку и подсвечиваем её
            if (cell === 0) {
                cellElement.textContent = '0';
                cellElement.classList.add('empty-cell');
            } else {
                cellElement.textContent = cell;
            }
            
            // Подсвечиваем ячейку, если она содержит ошибку
            if (errors.some(err => err.row === i && err.col === j)) {
                cellElement.classList.add('error');
            }
            
            rowElement.appendChild(cellElement);
        });

        boardElement.appendChild(rowElement);
    });
}

// Поиск ошибок в судоку
function findErrors(board) {
    const errors = [];

    // Проверка строк
    for (let i = 0; i < 9; i++) {
        const seen = new Set();
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== 0) {
                if (seen.has(board[i][j])) {
                    errors.push({ row: i, col: j });
                }
                seen.add(board[i][j]);
            }
        }
    }

    // Проверка столбцов
    for (let j = 0; j < 9; j++) {
        const seen = new Set();
        for (let i = 0; i < 9; i++) {
            if (board[i][j] !== 0) {
                if (seen.has(board[i][j])) {
                    errors.push({ row: i, col: j });
                }
                seen.add(board[i][j]);
            }
        }
    }

    // Проверка блоков 3x3
    for (let block = 0; block < 9; block++) {
        const seen = new Set();
        const startRow = Math.floor(block / 3) * 3;
        const startCol = (block % 3) * 3;

        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] !== 0) {
                    if (seen.has(board[i][j])) {
                        errors.push({ row: i, col: j });
                    }
                    seen.add(board[i][j]);
                }
            }
        }
    }

    return errors;
}

// Обработчик кнопки "Сбросить"
document.getElementById('resetButton').addEventListener('click', function() {
    if (currentBoard) {
        // Заполняем всю доску нулями
        currentBoard = currentBoard.map(row => row.map(() => 0));
        displayBoard(currentBoard);
    }
});

// Обработчик кнопки "Проверить"
document.getElementById('checkButton').addEventListener('click', function() {
    if (!currentBoard) {
        alert('Сначала загрузите доску!');
        return;
    }
    if (isValidSudoku(currentBoard)) {
        alert('Доска заполнена правильно!');
        console.log('Доска заполнена правильно!');
    } else {
        alert('На доске есть ошибки!');
        console.log('На доске есть ошибки!');
    }
});

// Проверка правильности заполнения судоку
function isValidSudoku(board) {
    // Проверка строк
    for (let row of board) {
        if (!isValidSet(row)) return false;
    }

    // Проверка столбцов
    for (let col = 0; col < 9; col++) {
        const column = board.map(row => row[col]);
        if (!isValidSet(column)) return false;
    }

    // Проверка блоков 3x3
    for (let blockRow = 0; blockRow < 3; blockRow++) {
        for (let blockCol = 0; blockCol < 3; blockCol++) {
            const box = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    box.push(board[blockRow * 3 + i][blockCol * 3 + j]);
                }
            }
            if (!isValidSet(box)) return false;
        }
    }

    return true;
}

// Проверка набора чисел на уникальность
function isValidSet(arr) {
    const numbers = arr.filter(num => num !== 0);
    const set = new Set(numbers);
    return set.size === numbers.length;
}
