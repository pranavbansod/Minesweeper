const appendTableToDiv = function (table) {
  let div = document.getElementById('minesDiv');
  table.id = 'minefield';
  div.appendChild(table);
};

const drawTable = function (rows, cols) {
  let table = createTableWithButtons(rows, cols);
  appendTableToDiv(table);
};

let revealZeroes = function (row, col) {
  if (row < 0 || row >= game.rows || col < 0 || col >= game.cols) return;
  let isZero = game.minefield[row][col].isValueZero();
  let totalCols = game.cols;
  let cellId = getIdByRowCol(row, col, totalCols);
  let cell = document.getElementById(cellId);
  let isRevealed = cell.classList.contains("revealed");
  cell.classList.add("revealed");
  cell.innerText = game.getCellById(cellId).getValue();
  if (isZero && !isRevealed) {
    revealZeroes(row + 1, col, totalCols);
    revealZeroes(row - 1, col, totalCols);
    revealZeroes(row, col - 1, totalCols);
    revealZeroes(row, col + 1, totalCols);
  } else {
    return;
  }
};

const displayNumber = function (cellId) {
  let tableCell = document.getElementById(`${cellId}`);
  let mineCell = game.getCellById(cellId);
  if (mineCell.isValueZero()) {
    revealZeroes(getRowByCellId(cellId, game.cols), getColByCellId(cellId, game.cols));
  } else {
    tableCell.classList.add("revealed");
    tableCell.innerText = mineCell.getValue();
  }

};

const displayWinMessage = function () {
  let display = document.getElementById('display');
  display.innerText = "You Won";
};

const displayLoseMessage = function () {
  let display = document.getElementById('display');
  display.innerText = "You Lost";
};
