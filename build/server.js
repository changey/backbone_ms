var fs = require("fs");
var express = require("express");
var site = express.createServer();

site.use(express.static(__dirname + '/..'));

//site.use(express.favicon("./favicon.ico"));

site.get("/", function(req, res) {
  fs.createReadStream("./index.html").pipe(res);
});

site.get('/fill', function(req, res) {
  require('./fill.js');
});

site.get('/scrape', function(req, res) {
  require('./scrape.js');
});


site.listen(9001);

console.log("Server listening on http://localhost:9001");
