define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Score = Backbone.Model.extend({
  });

  var Scores = Backbone.Collection.extend({
    model: Score,
    find_by_hole_id: function(id){
      return this.findWhere({hole_id: id});
    },
    get_totals: function(name) {
      if(name == "Front 9"){
        return {
          strokes: this.get_stroke_total(this.slice(0,9)),
          points: this.get_points_total(this.slice(0,9))
        }
      } else if(name == "Back 9"){
        return {
          strokes: this.get_stroke_total(this.slice(9,18)),
          points: this.get_points_total(this.slice(9,18))
        }
      } else if(name == "Total"){
        return {
          strokes: this.get_stroke_total(this.slice(0,18)),
          points: this.get_points_total(this.slice(0,18))
        }
      }
    },
    get_stroke_total: function(models) {
      var total = 0;
      _(models).each(function(m){
        if(m.get('score'))
          total += m.get('score');
      });
      return total;
    },
    get_points_total: function(models) {
      var total = 0;
      _(models).each(function(m){
        if(m.get('points'))
          total += m.get('points');
      });
      return total;
    }
  });

  module.exports = {
    Model: Score,
    Collection: Scores
  }
});