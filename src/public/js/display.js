const displayMinefield = function() {
  for (let cellId=0;cellId<game.cells;cellId++) {
    let tableCell = document.getElementById(`${cellId}`);
    let mineCell = game.getCellById(cellId);
    if(mineCell.getValue()==0){
      tableCell.innerText = "";
    } else {
      tableCell.innerText = mineCell.getValue();
    }
  }
}
