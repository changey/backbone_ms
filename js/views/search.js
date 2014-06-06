define(function(require) {
  'user strict';

  var $ = require('jquery')
    , Backbone = require('backbone')
    , ProjectAV = require('projectAV')
    , SearchTemplate = require('text!../../templates/search.tmpl')
    , InputTemplate = require('text!../../templates/input.tmpl');
  //debugger
  //var Spooky = require('spooky');

  ProjectAV.Views.Search = Backbone.View.extend({
    initialize: function() {
      var base_url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
      this.autoLoginURL = base_url + "/fill";
      this.scrapeURL = base_url + "/scrape";
      //this.data = 'file:///Users/echang/Documents/aaproject_ms/backbone_ms/success_search.html';
      this.data='file://localhost/Users/changey/Documents/aaproject_ms/backbone_ms/success_search.html';
    },

    render: function() {
      
      var that = this;

//      var template = _.template(SearchTemplate, {
//        flightData: this.flightData
//      });
        
      this.getInputData();

    },
    
    getInputData: function() {
      
      
      
      this.autoLogin();
    },

    autoLogin: function() {

      var that = this;
      $.ajax({
        type: "GET",
        crossDomain: true,
        url: this.autoLoginURL,
        //data: JSON.stringify(coordinates),
        dataType: "html",
        success: _.bind(function(response) {
          console.log(response)

//          this.scrapeHTML = response;
//          this.scrape(this.scrapeHTML);

        }, this)
      });
    },

    scrape: function(data) {

      $.ajax({
        type: "GET",
        crossDomain: true,
        url: this.scrapeURL,
        data: data,
        dataType: "html",
        success: _.bind(function(response) {

//            console.log(response)
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