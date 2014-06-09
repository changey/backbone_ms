var fs = require("fs");
var express = require("express");
var site = express();
var scrape = require('./scrape.js');
var fill = require('./fill.js');

site.use(express.static(__dirname + '/..'));
site.use(express.bodyParser());

//site.use(express.favicon("./favicon.ico"));

site.get("/", function(req, res) {
  fs.createReadStream("./index.html").pipe(res);
});

var data = "file://localhost/Users/changey/Documents/aaproject_ms/backbone_ms/success_search.html";

site.get('/pages/:id', function (req, res){
  res.send("papa")
  // req.params.id is now defined here for you
});

site.get('/scrape', function(req, res) {
  //req.data = data;
  //scrape.foo(req, res);
  scrape.load(req, res);
  //scrape.bar(req, res);
});

site.post('/fill', function(req, res) {

  fill.search(req, res);
  
});

site.get('/foo', function(req, res, next) {
  req.link = "link2"
  return next();
}, function(req,res) {
  res.send(req.link);
});

site.listen(9201);

console.log("Server listening on http://localhost:9201");
