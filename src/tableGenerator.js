let table = "<table border=1>";
const createTable = function(rows,cols) {
  for(let row=0;row<rows;row++) {
    table += "<tr>";
    for(let col=0;col<cols;col++) {
      table += "<td></td>";
    }
    table += "</tr>";
  }
  return table;
}

exports.createTable = createTable;
