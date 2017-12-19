const fs = require('fs');
const http = require('http');
const createTable = require('./lib/tableGenerator.js').createTable;
const port = 9000;

const getContentType = function(filename) {
  let extension = filename.slice(filename.lastIndexOf('.'));
  let contentType = {
    '.html':'text/html',
    '.jpg':'image/jpg',
    '.css':'text/css',
    '.js':'text/js',
    '.gif':'image/gif',
    '.pdf':'document/pdf',
    '.ico':'image/ico'
  }
  return contentType[extension];
};

const isMinesweeper = function(filename) {
  return filename == "./public/minesweeper.html";
}

const respondToFileFound = function(req,res,filename) {
  res.statusCode = 200;
  let fileContents = fs.readFileSync(filename,'utf8');
  if(isMinesweeper(filename)) {
    let field = createTable(8,8);
    fileContents = fileContents.replace("<field></field>",field);
    }
  res.write(fileContents);
  res.end();
}

const respondToFileNotFound = function(req,res) {
  res.statusCode = 404;
  res.write("Page Not Found");
  res.end();
}

const requestHandler = function(req,res) {
  let filename = "./public" + req.url;
  if(filename == "./public/") {
    filename = "./public/minesweeper.html";
  }
  if(fs.existsSync(filename)) {
    respondToFileFound(req,res,filename);
    return;
  } else {
    respondToFileNotFound(req,res);
    return;
  }
}

const server = http.createServer(requestHandler);
server.listen(port);
console.log(`Listening at port ${port}`);
