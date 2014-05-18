define(function (require) {
  'user strict';
  
  var $ = require('jquery')
    , ProjectAV = require('projectAV')
    , SearchTemplate = require('text!../../templates/search.tmpl');
  //debugger
  //var Spooky = require('spooky');
  
  
  ProjectAV.Views.Search = Backbone.View.extend({
    initialize: function() {
      
    },
    
    render: function() {
      var template =  _.template(SearchTemplate);
      this.$el.find('#contents').html(template);
      this.autoLogin();
    },
    
    autoLogin: function() {
//      try {
//        var Spooky = require('spooky');
//      } catch (e) {
//        var Spooky = require('../lib/spooky');
//      }
//      debugger
//      var casper = require('casper').create();
      
    }
  });
  
  return ProjectAV.Views.Search;
});