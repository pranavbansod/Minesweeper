const rows = 16;
const cols = 32;
const bombs = 99;

let game = new Game(rows, cols, bombs);  //(rows,cols,bombs)

const getClickedCellId = function (event) {
  return event.target.id;
};

const displayAllBombs = function () {
  game.minefield.forEach(function (mineRow) {
    mineRow.forEach(function (cell) {
      if (cell.isBomb())
        displayNumber(cell.getId());
    });
  });
};

const disableAllButtons = function () {
  let allButtons = document.getElementsByTagName("button");
  let buttons = Array.prototype.slice.call(allButtons);
  buttons.map((button) => {
    button.setAttribute("disabled", "disabled")
  })
};

const gameOver = function () {
  displayAllBombs();
  removeEventListeners();
  displayLoseMessage();
  disableAllButtons();
};

const toggleFlag = function (event) {
  let cellId = getClickedCellId(event);
  let cellButton = document.getElementById(cellId);
  let cell = game.getCellById(cellId);
  if (cell.isFlagSet()) {
    cell.unsetFlag();
    cellButton.innerText = "";
  } else {
    cell.setFlag();
    cellButton.innerText = "@";
  }
};

const processGamePlay = function (cell, cellId) {
  if (!cell.isFlagSet()) {
    if (cell.isBomb()) {
      gameOver(cellId);
    } else {
      displayNumber(cellId);
      game.remaining--;
    }
  }
};

const removeEventListeners = function () {
  let minefield = document.getElementById('minefield');
  minefield.removeEventListener("click", updateMinefield);
  minefield.removeEventListener("contextmenu", toggleFlag);
};

const updateMinefield = function (event) {
  let cellId = getClickedCellId(event);
  let cell = game.getCellById(cellId);
  if (!game.isWon()) {
    processGamePlay(cell, cellId);
  }
  if (game.isWon()) {
    displayAllBombs();
    removeEventListeners();
    displayWinMessage();
  }
};

const initializeEventListener = function () {
  let minefield = document.getElementById('minefield');
  minefield.addEventListener("click", updateMinefield);
  minefield.addEventListener("contextmenu", toggleFlag);
};

const loadGame = function () {
  drawTable(rows, cols);
  game.createMinefield();
  initializeEventListener();
};


window.onload = loadGame;
