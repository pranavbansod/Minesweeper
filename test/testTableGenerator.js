let createTable = require('../src/tableGenerator.js').createTable;
let assert = require('assert');
let test = {};

test['test: test tableGenerator creates table of specified rows and cols'] = function() {
  let tableOfOneCell = "<table><tr><td></td></tr></table>"
  assert.equal(tableOfOneCell,createTable(1,1));
}


exports.test = test;
