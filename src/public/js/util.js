const createTable = function(rows,cols) {
  let table = document.createElement("table");
  let id = 0;
  for(let row=0;row<rows;row++) {
    let tr = document.createElement("tr");
    for(let col=0;col<cols;col++) {
      let td = document.createElement("td");
      td.id = id++;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table
}

const appendTableToDiv = function(table) {
  let div = document.getElementById('minesDiv');
  table.id = 'minefield';
  div.appendChild(table);
}

const getRowByCellId = function(cellId,cols) {
  return Math.floor(cellId/cols);
}

const getColByCellId = function(cellId,cols) {
  return cellId % cols;
}
