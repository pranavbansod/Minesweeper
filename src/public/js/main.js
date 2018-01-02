const rows = 16;
const cols = 16;
const bombs = 40;

let game = new Game(rows,cols,bombs);  //(rows,cols,bombs)

const updateMinefield = function () {

}

const initializeEventListener = function() {
  let minefield = document.getElementById('minefield');
  minefield.addEventListener("click",updateMinefield);
}

const loadGame = function() {
  drawTable(rows,cols)
  game.createMinefield();  //creates mine cells
  displayMinefield();
  initializeEventListener();
}


window.onload = loadGame;
