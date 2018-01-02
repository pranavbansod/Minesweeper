let createTable = require('../src/lib/tableGenerator.js').createTable;
let assert = require('assert');
let test = {};

test['test: test tableGenerator creates table of 1 row and 1 col'] = function() {
  let table = "<table id=minefield><tr><td id=1></td></tr></table>"
  assert.equal(table,createTable(1,1));
};

test['test: test tableGenerator creates table of 1 row and 3 col'] = function() {
  let table = "<table id=minefield><tr><td id=1></td><td id=2></td><td id=3></td></tr></table>"
  assert.equal(table,createTable(1,3));
};

test['test: test tableGenerator creates table of 2 row and 1 col'] = function() {
  let table = "<table id=minefield><tr><td id=1></td></tr><tr><td id=2></td></tr></table>"
  assert.equal(table,createTable(2,1));
};

test['test: test tableGenerator creates table of 2 row and 3 col'] = function() {
  let table = "<table id=minefield><tr><td id=1></td><td id=2></td><td id=3></td></tr><tr><td id=4></td><td id=5></td><td id=6></td></tr></table>"
  assert.equal(table,createTable(2,3));
};

exports.test = test;
