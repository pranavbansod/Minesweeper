let Cell = function(id) {
  this.id = id;
  this.bomb = false;
}

Cell.prototype.isBomb = function() {
  return this.bomb;
}

Cell.prototype.getValue = function() {
  return this.value;
}

let Game = function(rows,cols,bombs) {
  this.rows = rows;
  this.cols = cols;
  this.cells = this.rows * this.cols;
  this.bombs = bombs;
}

Game.prototype.getCellById = function(id) {
  let row = Math.floor(id/this.cols);
  let col = id % this.cols;
  return this.minefield[row][col];
}

Game.prototype.createMineCells = function() {
  let minefield = [];
  let id = 0;
  for(let row = 0; row < this.rows; row++) {
    let mineRow = [];
    for(let col = 0; col < this.cols; col++) {
      mineRow.push(new Cell(id++));
    }
    minefield.push(mineRow)
  }
  this.minefield = minefield;
}


Game.prototype.setBombs = function() {
  let bombsId = [];
  while(bombsId.length < this.bombs) {
    let randomCellId = Math.floor(Math.random()*this.cells);
    if(!bombsId.includes(randomCellId)) {
      bombsId.push(randomCellId)
    }
  }
  let gameReference = this;
  bombsId.forEach(function(cellId) {
    let cell = gameReference.getCellById(cellId);
    cell['bomb'] = true;
  });
}


Game.prototype.getAroundCellsOf = function(row,col) {
  let aroundCells = [];
  for(let y=-1; y<2; y++) {
    for(let x=-1; x<2; x++) {
      aroundCells.push({'row':row-y,'col':col-x})
    }
  }
  gameReference = this;
  return aroundCells.filter(function(coOrds) {
    return coOrds['col']>-1 && coOrds['col']<gameReference.cols && coOrds['row']>-1 && coOrds['row']<gameReference.rows;
  });
}


Game.prototype.calculateBombsAround = function(row,col) {
  this.minefield[row][col]['value'] = 0;
  let aroundCells = this.getAroundCellsOf(row,col)
  let gameReference = this;
  aroundCells.forEach(function(adjCell) {
    if(gameReference.minefield[adjCell['row']][adjCell['col']].isBomb())
      gameReference.minefield[row][col]['value']++;
  })
}

Game.prototype.setBombsAroundCount = function() {
  let gameReference = this;
  let row = 0;
  this.minefield.forEach(function(mineRow) {
    let col = 0;
    mineRow.forEach(function(cell){
      if(cell.isBomb()) {
        cell['value'] = "*";
      } else {
        gameReference.calculateBombsAround(row,col);
      }
      col++;
    });
    row++;
  });
}


Game.prototype.createMinefield = function() {
  this.createMineCells();
  this.setBombs();
  this.setBombsAroundCount();
}
