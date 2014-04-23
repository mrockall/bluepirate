define(function(require, exports, module) {
  "use strict";

  var _ = require("underscore"),
      $ = require("jquery"),
      Backbone = require("backbone"),
      Login = require("./modules/login/index"),
      ScrollTo = require('scroll_to');

  // Alias the module for easier identification.
  var app = module.exports;

  // FOR DEVELOPMENT!
  window.app = app;

  // The root path to run the application through.
  app.root = "/";

  /** 
   * Small alias to grab the end of an animation
   */ 
  app.bindAnimationEnd = function($el, callback){
    $el.one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(ev){
      ev.stopPropagation();
      callback();
    });
  }

  /** 
   * Adds CSRF support to Backbone
   */ 
  var oldSync = Backbone.sync,
      csrf_token = $("meta[name='csrf-token']").attr('content');

  Backbone.sync = function(method, model, options){
    options.beforeSend = function(xhr){
      xhr.setRequestHeader('X-CSRF-Token', csrf_token);
    };
    return oldSync(method, model, options);
  };

  $.ajaxSetup({
    beforeSend: function(xhr, settings){
      xhr.setRequestHeader('X-CSRF-Token', csrf_token);
    }
  });

  /** 
   * Current User
   */ 
  app.current_user = new Login.Models.CurrentUser(InitialData.CurrentUser);

});