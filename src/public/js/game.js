let Cell = function(id) {
  this.id = id;
  this.bomb = false;
  this.flag = false;
}

Cell.prototype.setFlag = function() {
  this.flag = true;
}

Cell.prototype.unsetFlag = function() {
  this.flag = false;
}

Cell.prototype.isFlagSet = function() {
  return this.flag;
}

Cell.prototype.isValueZero = function() {
  return this.value == 0;
}

Cell.prototype.isBomb = function() {
  return this.bomb;
}

Cell.prototype.getValue = function() {
  return this.value;
}

Cell.prototype.getId = function() {
  return this.id
}


let Game = function(rows,cols,bombs) {
  this.rows = rows;
  this.cols = cols;
  this.cells = this.rows * this.cols;
  this.remaining = this.cells;
  this.bombs = bombs;
}

Game.prototype.isWon = function() {
  return this.remaining == this.bombs;
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

Game.prototype.getValidCoOrds = function(coOrds) {
  let isValidCol = coOrds['col']>-1 && coOrds['col']<this.cols;
  let isValidRow = coOrds['row']>-1 && coOrds['row']<this.rows;
  return  isValidCol && isValidRow;
}

Game.prototype.isValidCellId = function(cellId) {
  return cellId > -1 && cellId < this.cells;
}

Game.prototype.getSurroundingCellIds = function(cellId) {
  let row = getRowByCellId(cellId,this.cols);
  let col = getColByCellId(cellId,this.cols);
  let aroundCellIds = [];
  for(let y=-1; y<2; y++) {
    for(let x=-1; x<2; x++) {
      let surroundingCol = Math.abs(col+x);
      if(surroundingCol < this.cols) {
        let cellId = getIdByRowCol(row+y,surroundingCol,this.cols);
        if(!aroundCellIds.includes(cellId))
        aroundCellIds.push(cellId);
      }
    }
  }
  return aroundCellIds.filter(id=>this.isValidCellId(id));
}


Game.prototype.calculateBombsAround = function(cellId) {
  let cell = this.getCellById(cellId)
  cell['value'] = 0;
  let surroundingCellIds = this.getSurroundingCellIds(cellId);
  let gameReference = this;
  surroundingCellIds.forEach(function(currCellId) {
    let currCell = gameReference.getCellById(currCellId);
    if(currCell.isBomb())
      cell['value']++;
  })
}

Game.prototype.setBombsAroundCount = function() {
  let gameReference = this;
  this.minefield.forEach(function(mineRow) {
    mineRow.forEach(function(cell){
      if(cell.isBomb()) {
        cell['value'] = "*";
      } else {
        gameReference.calculateBombsAround(cell.getId())
      }
    });
  });
}


Game.prototype.createMinefield = function() {
  this.createMineCells();
  this.setBombs();
  this.setBombsAroundCount();
}
