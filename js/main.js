const rows = 5;
const cols = 5;
const bombs = 4;

let game = new Game(rows,cols,bombs);  //(rows,cols,bombs)

const getClickedCellId = function(event) {
  return event.target.id;
};

const displayAllBombs = function() {
  game.minefield.forEach(function(mineRow) {
    mineRow.forEach(function(cell){
      if(cell.isBomb())
        displayCellValue(cell.getId())
    });
  });
};

const onBombClick = function() {
  displayAllBombs();
  let minefield = document.getElementById('minefield');
  minefield.removeEventListener("click",updateMinefield);
  displayLoseMessage();
};

const toggleFlag = function(event) {
  let cellId = getClickedCellId(event);
  let tableCell = document.getElementById(cellId);
  let cell = game.getCellById(cellId);
  if(cell.isFlagSet()) {
    cell.unsetFlag();
    tableCell.innerText = "";
  } else {
    cell.setFlag();
    tableCell.innerText = "@";
  }
};

const processGameplay = function(cell,cellId) {
  if(!cell.isFlagSet()) {
    if(cell.isBomb()) {
      onBombClick(cellId);
    }else {
      displayCellValue(cellId);
      game.remaining--;
    }
  }
};

const stopGame = function() {
  minefield.removeEventListener("click",updateMinefield);
  minefield.removeEventListener("contextmenu",toggleFlag);
};

const updateMinefield = function(event) {
  let cellId = getClickedCellId(event);
  let cell = game.getCellById(cellId);
  if(!game.isWon()){
    processGameplay(cell,cellId);
  }
  if(game.isWon()) {
    displayAllBombs();
    stopGame();
    displayWinMessage();
  }
};

const initializeEventListener = function() {
  let minefield = document.getElementById('minefield');
  minefield.addEventListener("click",updateMinefield);
  minefield.addEventListener("contextmenu",toggleFlag);
};

const loadGame = function() {
  drawTable(rows,cols);
  game.createMinefield();
  initializeEventListener();
};


window.onload = loadGame;
