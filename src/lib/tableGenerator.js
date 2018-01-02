const createTable = function(rows,cols) {
  let table = "<table id=minefield>";
  let id=1;
  for(let row=0;row<rows;row++) {
    table += "<tr>";
    for(let col=0;col<cols;col++) {
      table += `<td id=${id++}></td>`;
    }
    table += "</tr>";
  }
  return table + "</table>";
}

exports.createTable = createTable;
