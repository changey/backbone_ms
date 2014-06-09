try {
  var Spooky = require('spooky');
} catch(e) {
  var Spooky = require('../lib/spooky');
}

var fs = require('fs');

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

    spooky.start('https://www.lifemiles.com/index.aspx');
    //spooky.viewport(1500,1500);
    spooky.then(function() {
      this.fill('#status-bar', {
        'txtUser': 'ramonrobles31@outlook.com',
        'username-pass': 'projectms',
        'txtPassword': 'projectms'
      }, false);
      this.wait(1000);
    });

    spooky.then(function clickButton() {
      this.click('#botonlogin');
      this.wait(1000);
    });

    spooky.waitForSelector('#botonlogin', function() {
      this.click('#botonlogin');
    });

    spooky.thenOpen('https://www.lifemiles.com/eng/use/red/dynredpar.aspx');
    
    spooky.then([{
      departure: departure,
      arrival: arrival,
      depTime: depTime,
      arrTime: arrTime,
      depCode: depCode,
      arrCode: arrCode
    }, function() {

      this.emit('clog', 'reach login');
      this.evaluate(function(
        departure,
        arrival,
        depTime,
        arrTime,
        depCode,
        arrCode
        ) {
        $("#cmbOrigen option:selected")[0].text = departure;
        $("#cmbOrigen option:selected")[0].value = depCode;
        $('#textOrigen').val(departure);
        $('#textDestino').val(arrival);

        $("#cmbDestino option:selected")[0].text = arrival;
        $("#cmbDestino option:selected")[0].value = arrCode;
        $('#fechaSalida').val(depTime);
        $('#fechaRegreso').val(arrTime);
        
        //sample date: 9/18-9/26

        submitForm();
      }, {
        departure: departure,
        arrival: arrival,
        depTime: depTime,
        arrTime: arrTime,
        depCode: depCode,
        arrCode: arrCode
      });

    }]);

    spooky.then(function clickButton() {
      this.capture('filled.png');
    });

    spooky.waitForSelector('#aspnetForm', function() {
      
      this.echo(this.getCurrentUrl());
      this.capture('success.png');
      this.evaluate(function() {
        submitForm();
      });
      this.emit('page.loaded',this.getHTML('html', true));
//      this.capture('success2.png');
    }, function() {
      this.echo("Timeout reached");
      this.echo(this.getCurrentUrl());
      this.capture('fail.png');
      this.emit('page.loaded',this.getHTML('html', true));
      // do something
    }, 150000);

    spooky.then(function() {
      this.emit('clog', 'finished');
    });

    spooky.run();
  });

  spooky.on('page.loaded', function (html) {
    console.log('###############EMIT');
    res.send(html);

    fs.writeFile("public/pages/test.html", html, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("The file was saved!");
      }
    });
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