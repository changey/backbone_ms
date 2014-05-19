define(function(require) {
  'user strict';

  var $ = require('jquery')
    , ProjectAV = require('projectAV')
    , ScrapeModel = require('models/scrape')
    , SearchTemplate = require('text!../../templates/search.tmpl');
  //debugger
  //var Spooky = require('spooky');

  ProjectAV.Views.Search = Backbone.View.extend({
    initialize: function() {
      var base_url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
      this.scrapeURL = base_url + "/scrape";
    },

    render: function() {
      
      var that = this;
      var scrape = this.scrape();
      var scrapeModel = new ScrapeModel();
      scrapeModel.getFlightData().then(function() {
        
      });
      debugger
//      scrape.fetch().then(function() {
//        console.log(that.flightData);
//        var template = _.template(SearchTemplate);
//        this.$el.find('#contents').html(template);
//      });
      //this.autoLogin();

    },

    autoLogin: function() {

    },

    scrape: function() {

      return {
        fetch: function() {
          $.ajax({
            type: "GET",
            crossDomain: true,
            url: this.scrapeURL,
            //data: JSON.stringify(coordinates),
            dataType: "html"
          }).done(_.bind(function(response) {
              this.flightData = response;
              return Backbone.Model.prototype.fetch.call(this, {cache: false});
            }, this));
        }
      }
    }
  });

  return ProjectAV.Views.Search;
});