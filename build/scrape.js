var phantom = require('node-phantom')
  , $ = require('jquery');

exports.bar = function(req, res) {
  var fs = require('fs');
  fs.writeFile("tmp/test", "Hey there!", function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
},

exports.foo = function(req, res) {
  phantom.create(function(err, ph) {
    return ph.createPage(function(err, page) {
      //var page = require('webpage').create();
      return page.set('content', '<html><head></head><body><p>Hello</p></body></html>', function (err, status) {
        //console.log("opened site? ", status);
        page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
          return page.evaluate(function() {
          //jQuery Loaded.
          //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
          
            //var outputJson = JSON.stringify(output, null, ' ');

            return $('p').text();
          }, function(err, result) {

            res.send(result);
            //req.link = "caca";

            ph.exit();
          });
        });
      });
    });
  });
}

exports.load = function(req, res) {
phantom.create(function(err, ph) {
  return ph.createPage(function(err, page) {
    console.log(req.body)
    //return page.open(req.body, function(err, status) {
    return page.set(req.body, function (err, status) {
      console.log("opened site? ", status);
      page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
        //jQuery Loaded.
        //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
        page.render('foo.png');

        return page.evaluate(function() {
          var output = [];
          var flight;
          $('#tblODs tr').slice(3).each(function() {
            var totalDeparts,
              totalArrives,
              totalDuration,
              departs,
              arrives,
              stops = "",
              cabin = "",
              type = "",
              segment = [];
            var flightNumber = $('td:nth-child(2)', this).text();
            if(flightNumber !== "" && flightNumber !== "Flights") {
              if(this.className.indexOf("tbl-collapse") > -1) {
                if(flight != null) {
                  output.push(flight);
                }

                type = "multi";
                totalDeparts = $('td:nth-child(3)', this).text();
                totalArrives = $('td:nth-child(4)', this).text();
                totalDuration = $('td:nth-child(5)', this).text();
                segment = [];
                flight = {
                  type: type,
                  summary: {
                    flightNumber: flightNumber,
                    departs: totalDeparts,
                    arrives: totalArrives,
                    totalDuration: totalDuration
                  },
                  segment: segment
                }
              }
              else if(this.className.indexOf("tbl-detail") > -1) {

                type = "detail";
                departs = $('td:nth-child(3)', this).text();
                arrives = $('td:nth-child(4)', this).text();
                stops = $('td:nth-child(6)', this).text();
                cabin = $('td:nth-child(6)', this).text();
                segment = {
                  type: type,
                  flightNumber: flightNumber,
                  departs: departs,
                  arrives: arrives,
                  stops: stops,
                  cabin: cabin
                }
                flight['segment'].push(segment);
              }
              else {
                if(flight != null) {
                  output.push(flight);
                }
                type = "direct";
                totalDeparts = $('td:nth-child(3)', this).text();
                totalArrives = $('td:nth-child(4)', this).text();
                totalDuration = $('td:nth-child(5)', this).text();
                stops = $('td:nth-child(6)', this).text();
                cabin = $('td:nth-child(6)', this).text();
                flight = {
                  type: type,
                  flightNumber: flightNumber,
                  departs: totalDeparts,
                  arrives: totalArrives,
                  duration: totalDuration,
                  stops: stops,
                  cabin: cabin
                }
              }

            }
          });
          output.push(flight);
          var outputJson = JSON.stringify(output, null, ' ');

          return outputJson;
        }, function(err, result) {

          res.send(result);
          //req.link = "caca";
          
          ph.exit();
        });
      });
    });
  });
});
};