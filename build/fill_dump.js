try {
  var Spooky = require('spooky');
} catch(e) {
  var Spooky = require('../lib/spooky');
}

exports.search = function(req, res) {
  var js;
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

    spooky.start('https://www.lifemiles.com/index.aspx');
    //spooky.viewport(1500,1500);
    spooky.then(function() {
      //res.send(js.all[0].outerHTML);
      js = this.evaluate(function() {
        return document;
      });
//      this.echo(js.all[0].outerHTML);
    });
    
    res.send("foo");
    spooky.then(function() {
      console.log("lala")
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