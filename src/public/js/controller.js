const rows = 16;
const cols = 16;
const bombs = 40;

let game = new Game(rows,cols,bombs);  //(rows,cols,bombs)
game.createMinefield();  //creates mine cells

const updateMinefield = function () {

}

const initializeEventListener = function() {
  let minefield = document.getElementById('minefield');
  minefield.addEventListener("click",updateMinefield);
}

const loadGame = function() {
  let table = createTable(rows,cols);
  appendTableToDiv(table);
  displayMinefield();
  initializeEventListener();
}


window.onload = loadGame;
