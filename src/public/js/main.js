const rows = 16;
const cols = 16;
const bombs = 40;

let game = new Game(rows,cols,bombs);  //(rows,cols,bombs)

const getClickedCellId = function(event) {
  return event.target.id;
}

const displayAllBombs = function() {
  game.minefield.forEach(function(mineRow) {
    mineRow.forEach(function(cell){
      if(cell.isBomb())
        displayCellValue(cell.getId())
    });
  });
}

const onBombClick = function(cellId) {
  displayAllBombs();
  let minefield = document.getElementById('minefield');
  minefield.removeEventListener("click",updateMinefield);
}

const updateMinefield = function (event) {
  let cellId = getClickedCellId(event);
  let cell = game.getCellById(cellId);
  if(cell.isBomb()) {
    onBombClick(cellId);
  }else {
    if(cell.isValueZero()) {
      displayCellValue(cellId);
    }else {
      displayCellValue(cellId);
    }
  }
}

const initializeEventListener = function() {
  let minefield = document.getElementById('minefield');
  minefield.addEventListener("click",updateMinefield);
}

const loadGame = function() {
  drawTable(rows,cols)
  game.createMinefield();
  // displayMinefield();
  initializeEventListener();
}


window.onload = loadGame;
