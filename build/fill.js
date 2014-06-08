try {
  var Spooky = require('spooky');
} catch(e) {
  var Spooky = require('../lib/spooky');
}

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
        'txtUser': 'alexdiaz03@outlook.com',
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

    spooky.thenEvaluate([{
      departure: departure,
      arrival: arrival,
      depTime: depTime,
      arrTime: arrTime,
      depCode: depCode,
      arrCode: arrCode
    }, function() {

      this.evaluate(function() {
        $("#cmbOrigen option:selected")[0].text = departure;
        $("#cmbOrigen option:selected")[0].value = depCode;
        $('#textOrigen').val(departure);
        $('#textDestino').val(arrival);

        $("#cmbDestino option:selected")[0].text = arrival;
        $("#cmbDestino option:selected")[0].value = arrCode;
        $('#fechaSalida').val(depTime);
        $('#fechaRegreso').val(arrTime);
        
//        $("#cmbOrigen option:selected")[0].text = 'San Francisco (SFO), United States';
//        $("#cmbOrigen option:selected")[0].value = "SFO";
//        $('#textOrigen').val('San Francisco (SFO), United States');
//        $('#textDestino').val('Taipei, Taiwan Taoyuan International Airport (TPE), Taiwan');
//
//        $("#cmbDestino option:selected")[0].text = 'Taipei, Taiwan Taoyuan International Airport (TPE), Taiwan';
//        $("#cmbDestino option:selected")[0].value = "TPE";
//        $('#fechaSalida').val('09/18/2014');
//        $('#fechaRegreso').val('09/25/2014');

        //submitForm();
      });

      this.capture('filled.png');
    }]);

//    spooky.waitForSelector('#aspnetForm', function() {
//      this.echo(this.getCurrentUrl());
//      this.capture('success.png');
//    }, function() {
//      this.echo("Timeout reached");
//      this.echo(this.getCurrentUrl());
//      this.capture('fail.png');
//      // do something
//    }, 150000);

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