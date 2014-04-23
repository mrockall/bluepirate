define(function(require, exports, module) {
  "use strict";

  var app = require("app"),
      Scores = require('../event/scores'),
      Course = require("../event/course");

  var TeeTime = Backbone.Model.extend({
    initialize: function(attr, options){
      this.parse(attr);
    },
    parse: function(data){
      if(data.player){
        this.set('player_id', data.player.id);
        this.set('player_name', data.player.name);
        this.set('player_initials', this.initials(data.player.name)),
        this.set('player_handicap', data.player.handicap);
        this.unset('player');
        delete data.player;
      }
      if(data.scores){
        this.scores = new Scores.Collection();
        this.scores.reset(data.scores);
        this.unset('scores');
        delete data.scores;
      }
    },
    initials: function(s) {
      return s.replace(/(\S)\S*\s*/ig, "$1");
    }
  })

  var TeeGroup = Backbone.Collection.extend({
    model: TeeTime,
    comparator: 'player_handicap',
    find_by_hole_id: function(hole){
      return this.findWhere({hole_id: hole});
    },
    sort_by_points: function(){
      var old_comparator = this.comparator;
      this.comparator = function(model) {
        return -model.get("points"); // Note the minus!
      };
      this.sort();

      this.comparator = old_comparator;
    }
  });

  var Model = Backbone.Model.extend({
    initialize: function(attr, options) {
      this.tee_group = new TeeGroup();
      this.parse(attr);
    },
    parse: function(data){
      if(data.events){
        this.tee_group.reset(data.events[0].tee_group);
        this.tee_group.course = new Course.Model(data.events[0].course);
        this.unset('events');
        delete data.events;
      }

      return data;
    },
    url: function() {
      if(this.logged_in()){
        return "/logged_in_user";
      }
    },
    logged_in: function(){
      return this.get('name') ? true : false;
    },
    log_in_with_credentials: function(options){
      if(_.isNull(options.name) || _.isNull(options.password)){
        if(_.isFunction(options.failure)) return options.failure();
        return;
      }

      $.get("/auth/identity/callback",{
        auth_key: options.name,
        password: options.password

      }).success(_.bind(function(data, result, xhr){
        this.set(data);
        this.parse(data);
        if(_.isFunction(options.success)) return options.success();

      }, this)).fail(function(xhr, result, message){
        if(_.isFunction(options.failure)) return options.failure();
      });
    }
  });

  module.exports = Model;
});