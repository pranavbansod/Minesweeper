// const createTable = function(rows,cols) {
//   let table = "<table id=minefield>";
//   let id=1;
//   for(let row=0;row<rows;row++) {
//     table += "<tr>";
//     for(let col=0;col<cols;col++) {
//       table += `<td id=${id++}></td>`;
//     }
//     table += "</tr>";
//   }
//   return table + "</table>";
// }


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
