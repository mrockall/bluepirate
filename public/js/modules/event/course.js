define(function(require, exports, module) {
  "use strict";

  var app = require("app"),
      Holes = require("./hole");

  var Course = Backbone.Model.extend({
    initialize: function(attr, options){
      this.holes = new Holes.Collection();
      this.parse(attr);
    },
    parse: function(data){
      if(data.holes){
        this.holes.reset(data.holes);
        this.unset("holes");
        delete data.holes;
      }
      return data;
    }
  });

  var Courses = Backbone.Collection.extend({
    model: Course
  });

  module.exports = {
    Model: Course,
    Collection: Courses
  }
});