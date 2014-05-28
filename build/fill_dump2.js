try {
  var Spooky = require('spooky');
} catch(e) {
  var Spooky = require('../lib/spooky');
}

//var scrape = require('./scrape.js');

exports.gettop = function(req, res, next){
  req.link = "dada";
//  return function(req, res) {
//    console.log(n);
//    res.send(200);
//  };
};

exports.search = function(req, res, next) {

  var spooky = new Spooky({
    child: {
      transport: 'http'
    },
    casper: {
      logLevel: 'debug',
      verbose: true
    }
  }, function(err, next) {
    if(err) {
      e = new Error('Failed to initialize SpookyJS');
      e.details = err;
      throw e;
    }
    
    //spooky.start('https://www.google.com');
    spooky.start('file:///Users/echang/Documents/aaproject_ms/backbone_ms/success_search.html');
    //spooky.viewport(1500,1500);
    spooky.then(function() {
      this.emit('page.loaded',this.getHTML('html', true));
      
    });

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
    //scrape.foo("foo", res);
    //req.link = "dada";
    //return next();
    res.send(html);
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