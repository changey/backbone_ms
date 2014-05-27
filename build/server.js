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

var data = "file://localhost/Users/changey/Documents/aaproject_ms/backbone_ms/success_search.html";

site.get('/scrape', function(req, res) {
  req.data = data;
  scrape.load(req, res);
});

site.get('/fill', function(req, res, next) {
  
  fill.gettop(100);
//  var link = fill.search(req, res);
//  req.link = link;
});
//  return next();
//  //res.send("foo");
//}, function(req, res) {
//  res.send(res.link);
//});

site.get('/foo', function(req, res, next) {
  req.link = "link2"
  return next();
}, function(req,res) {
  res.send(req.link);
});

site.listen(9201);

console.log("Server listening on http://localhost:9201");
