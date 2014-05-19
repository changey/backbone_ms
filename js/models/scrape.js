define(function(require) {
  'use strict';

  var Backbone = require('backbone')
    , ProjectAV= require('projectAV')
    , $ = require('jquery');

  ProjectAV.Models.Scrape = Backbone.Model.extend({
    url: ProjectAV.constants.API_URL + '/scrape',

    getFlightData: function() {
      $.ajax({
        type: "GET",
        crossDomain: true,
        url: this.scrapeURL,
        //data: JSON.stringify(coordinates),
        dataType: "html"
      }).done(_.bind(function(response) {
          this.flightData = response;
        }, this));
      return Backbone.Model.prototype.fetch.call(this, {cache: false});
    }

  });

  return ProjectAV.Models.Scrape;
});