try {
  var Spooky = require('spooky');
} catch(e) {
  var Spooky = require('../lib/spooky');
}

//var scrape = require('./scrape.js');
var fs = require('fs');

exports.bar = function(req, res) {
  fs.writeFile("public/pages/test.html", "Hey there!", function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
},
  
exports.gettop = function(req, res, next){
  req.link = "dada";
//  return function(req, res) {
//    console.log(n);
//    res.send(200);
//  };
};

exports.search = function(req, res) {

  var departure = req.body.departure;
  var arrival = req.body.arrival;
  var depTime = req.body.depTime;
  var arrTime = req.body.arrTime;
  var depCode = req.body.depCode;
  var arrCode = req.body.arrCode;
  
  
  var spooky = new Spooky({
    child: {
      transport: 'http'
    },
    casper: {
      logLevel: 'debug',
      verbose: true
    }
  }, function(err) {
    if(err) {
      e = new Error('Failed to initialize SpookyJS');
      e.details = err;
      throw e;
    }
    
    //spooky.start('https://www.google.com');
    spooky.start('file:///Users/echang/Documents/aaproject_ms/backbone_ms/success_search.html');
    //spooky.start('file://localhost/Users/changey/Documents/aaproject_ms/backbone_ms/success_search.html');
    //spooky.viewport(1500,1500);

    spooky.then([{
      departure: departure,
      arrival: arrival,
      depTime: depTime,
      arrTime: arrTime,
      depCode: depCode,
      arrCode: arrCode
    }, function() {

      this.emit('clog', departure);
      this.emit('clog', arrival);

    }]);

    spooky.waitForSelector('#aspnetForm', function() {

      this.echo(this.getCurrentUrl());
      this.capture('success_dump.png');

      this.emit('page.loaded',this.getHTML('html', true));

    }, function() {
      this.echo("Timeout reached");
      this.echo(this.getCurrentUrl());
      this.capture('fail_dump.png');
      this.emit('page.loaded',this.getHTML('html', true));
      // do something
    }, 1000);

    spooky.then(function() {
      this.emit('clog', 'finished');
    });

    spooky.run();
  });

  spooky.on('error', function(e, stack) {
    console.error(e);

    if(stack) {
      console.log(stack);
    }
  });

  spooky.on('page.loaded', function (html) {
    console.log('###############EMIT');
    res.send(req.body);
    //scrape.foo("foo", res);
    //req.link = "dada";
    //return next();
    fs.writeFile("public/pages/test.html", html, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("The file was saved!");
      }
    });
    //res.send(html);
  });

  /*
   // Uncomment this block to see all of the things Casper has to say.
   // There are a lot.
   // He has opinions.
   spooky.on('console', function (line) {
   console.log(line);
   });
   */

  spooky.on('clog', function(message) {
    console.log(message);
  });

  spooky.on('log', function(log) {
    if(log.space === 'remote') {
      console.log(log.message.replace(/ \- .*/, ''));
    }
  });
};