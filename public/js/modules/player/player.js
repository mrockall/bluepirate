define(function(require, exports, module) {
  "use strict";

  var app = require("app"),
      Event = require("../event/index");

  var Model = Backbone.Model.extend({
    initialize: function(){
      this.events = new Event.Collections.Event();
    },
    url: function(){
      return "/players/" + this.get('id')
    },
    parse: function(data){
      if(data.events){
        this.events.reset(data.events);
        delete data.events;
      }
      return data;
    }
  });

  module.exports = Model;
});