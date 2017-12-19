let createTable = require('../src/lib/tableGenerator.js').createTable;
let assert = require('assert');
let test = {};

test['test: test tableGenerator creates table of 1 row and 1 col'] = function() {
  let table = "<table><tr><td></td></tr></table>"
  assert.equal(table,createTable(1,1));
};

test['test: test tableGenerator creates table of 1 row and 3 col'] = function() {
  let table = "<table><tr><td></td><td></td><td></td></tr></table>"
  assert.equal(table,createTable(1,3));
};

test['test: test tableGenerator creates table of 2 row and 1 col'] = function() {
  let table = "<table><tr><td></td></tr><tr><td></td></tr></table>"
  assert.equal(table,createTable(2,1));
};

test['test: test tableGenerator creates table of 2 row and 3 col'] = function() {
  let table = "<table><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table>"
  assert.equal(table,createTable(2,3));
};

exports.test = test;
