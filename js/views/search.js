define(function(require) {
  'user strict';

  require('jquery.ui');
  
  var $ = require('jquery')
    , Backbone = require('backbone')
    , ProjectAV = require('projectAV')
    , SearchTemplate = require('text!../../templates/search.tmpl')
    , InputTemplate = require('text!../../templates/input.tmpl')
    , Spinner = require('spinjs');

  function setupSpinner() {
    return new Spinner({
      length: 80,
      width: 12,
      className: 'spinner',
      color: "#000",
      radius: 60,
      corners: 1
    });
  }

  ProjectAV.Views.Search = Backbone.View.extend({
    events: {
      'click #searchSubmit': 'submit'
    },
    
    initialize: function(options) {
      var base_url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
      this.autoLoginURL = base_url + "/fill";
      this.scrapeURL = base_url + "/scrape";
      this.spinner = options.spinner || setupSpinner();
      //this.data = 'file:///Users/echang/Documents/aaproject_ms/backbone_ms/success_search.html';
      this.data='file://localhost/Users/changey/Documents/aaproject_ms/backbone_ms/success_search.html';
    },

    render: function() {
      
      var that = this;

      var template = _.template(InputTemplate, {

      });
      this.$el.find('#contents').html(template);

      $('div.btn-group[data-toggle-name]').each(function () {
        var group = $(this);
        var form = group.parents('form').eq(0);
        var name = group.attr('data-toggle-name');
        var hidden = $('input[name="' + name + '"]', form);
        $('button', group).each(function () {
          var button = $(this);
          button.live('click', function () {
            hidden.val($(this).val());
            alert(hidden.val());
          });
          if (button.val() == hidden.val()) {
            button.addClass('active');
          }
        });
      });
      
      var availableAirports;
      
      $.getJSON( "../../airports.json", function( data ) {
        availableAirports = data;

        $(".depArrInput").autocomplete({
          source: availableAirports
        });
      });

      $.getJSON( "../../airportsMap.json", function( data ) {
        that.airportsMap = data;
      });

      $(".date").datepicker();

//      var $loading = this.$el.find('#loading');
//      this.spinner.spin($loading[0]);
//      $loading.fadeIn(800);
//      setTimeout(_.bind(function(){
//        this.spinner.stop();
//      }, this), 1000);
      
      //this.scrape();
      
    },
    
    submit: function() {
      
      var departure = $('#departure').val();
      var arrival = $('#arrival').val()
      
      var inputData = {
        departure: departure,
        arrival: arrival,
        depTime: $('#depTimeInput').val(),
        arrTime: $('#arrTimeInput').val(),
        depCode: this.getAirportCode(departure),
        arrCode: this.getAirportCode(arrival)
      }
      
      this.autoLogin(inputData);
    },
    
    getAirportCode: function(airportFullName) {
      return this.airportsMap[airportFullName];
    },

    autoLogin: function(inputData) {

      var that = this;
      $.ajax({
        type: "POST",
        crossDomain: true,
        url: this.autoLoginURL,
        data: inputData,
        dataType: "html",
        timeout: 1000000,
        success: _.bind(function(response) {
          console.log(response)

          this.scrapeHTML = response;
          var that = this;
          setTimeout(function(){
            console.log('triggered scrape')
            that.scrape();
          }, 3000);

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