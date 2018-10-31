const appendTableToDiv = function(table) {
  let div = document.getElementById('minesDiv');
  table.id = 'minefield';
  div.appendChild(table);
};

const displayMinefield = function() {
  for (let cellId=0;cellId<game.cells;cellId++) {
    let tableCell = document.getElementById(`${cellId}`);
    let mineCell = game.getCellById(cellId);
    displayNumber(cellId);
  }
};

const drawTable = function(rows,cols) {
  let table = createTableWithButtons(rows,cols);
  appendTableToDiv(table);
};

const displayNumber = function(cellId) {
  let tableCell = document.getElementById(`${cellId}`);
  tableCell.classList.add("revealed");
  let mineCell = game.getCellById(cellId);
  // if(mineCell.isValueZero()){
  //   tableCell.innerText = "";
  // } else {
  //   tableCell.innerText = mineCell.getValue();
  // }
  tableCell.innerText = mineCell.getValue();
};

const displayWinMessage = function() {
  let display = document.getElementById('display');
  display.innerText = "You Won";
};

const displayLoseMessage = function() {
  let display = document.getElementById('display');
  display.innerText = "You Lost";
};
