var fs = require("fs");
var express = require("express");
var site = express.createServer();
var scrape = require('./scrape.js');
var fill = require('./fill_dump2.js');

site.use(express.static(__dirname + '/..'));

//site.use(express.favicon("./favicon.ico"));

site.get("/", function(req, res) {
  fs.createReadStream("./index.html").pipe(res);
});

site.get('/scrape', scrape.load);
site.get('/fill', fill.search);

site.listen(9201);

console.log("Server listening on http://localhost:9201");
