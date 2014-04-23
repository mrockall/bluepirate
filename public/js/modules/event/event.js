define(function(require, exports, module) {
  "use strict";

  var app = require("app"),
      Course = require("./course"),
      Scores = require("./scores");

  var Event = Backbone.Model.extend({
    initialize: function(attr, options){
      this.course = null;
      this.scores = new Scores.Collection();
      this.parse(attr);
    },
    parse: function(data){
      if(data.course){
        this.course = new Course.Model(data.course);
        this.unset("course");
        delete data.course;
      }
      if(data.scores){
        this.scores.reset(data.scores);
        this.unset("scores");
        delete data.scores;
      }
      return data;
    }
  });

  var Events = Backbone.Collection.extend({
    model: Event
  });

  module.exports = {
    Model: Event,
    Collection: Events
  }
});