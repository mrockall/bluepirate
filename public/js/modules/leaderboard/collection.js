define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Collection = Backbone.Collection.extend({
    url: "/events/1",
    parse: function(data){
      if(data.course.name) this.course_name = data.course.name;
      return _(data.tee_times).map(function(t, i){ 
        if(t.player){
          t.player_id = t.player.id;
          t.player_name = t.player.name;
          delete t.player;
        }
        return t; 
      });
    }
  });

  module.exports = Collection;
});