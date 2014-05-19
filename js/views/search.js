define(function(require) {
  'user strict';

  var $ = require('jquery')
    , Backbone = require('backbone')
    , ProjectAV = require('projectAV')
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
      this.scrape();
        
      //this.autoLogin();

    },

    autoLogin: function() {

    },

    scrape: function() {

      $.ajax({
        type: "GET",
        crossDomain: true,
        url: this.scrapeURL,
        //data: JSON.stringify(coordinates),
        dataType: "html",
        success: _.bind(function(response) {

          this.flightData = JSON.parse(response);
          console.log(response)
          var template = _.template(SearchTemplate, {
            flightData: this.flightData
           });
          this.$el.find('#contents').html(template);
          return response;
        }, this)
      });
    }
  });

  return ProjectAV.Views.Search;
});