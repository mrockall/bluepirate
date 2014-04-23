define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Hole = Backbone.Model.extend({
  });

  var Holes = Backbone.Collection.extend({
    model: Hole
  });

  module.exports = {
    Model: Hole,
    Collection: Holes
  }
});