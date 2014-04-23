define(function(require, exports, module) {
  "use strict";

  var app = require("app"),
      Backbone = require("backbone"),
      Surface = require("../../surface"),
      View = {};

  View = Surface.extend({
    page_title: 'Scores',
    page_template: require("text!./template.html"),

    serialize: function(){
      return {
        tee_group: app.current_user.tee_group
      }
    },

    _renderPageContent: function() {
      this.views = [];

      app.current_user.fetch({
        success: _.bind(this.renderPage, this)
      });
    },

    renderPage: function(){
      this.$players = this.$el.find('.player-list');
      app.current_user.tee_group.sort_by_points();
      app.current_user.tee_group.each(_.bind(this.renderPlayer, this));

      this.$course = this.$el.find('.course-list');
      app.current_user.tee_group.course.holes.each(_.bind(this.renderHole, this));
    },

    renderPlayer: function(m, i){
      var v = new PlayerView({
        model: m
      }).render();

      this.views.push(v);
      this.$players.append(v.$el);
    },

    renderHole: function(m, i){
      var v = new HoleView({
        model: m
      }).render();

      this.views.push(v);
      this.$course.append(v.$el);
    }
  });

  var PlayerView = Backbone.View.extend({
    tagName: 'li',
    template: _.template(require("text!./player-template.html")),
    render: function(){
      this.$el.html(this.template({
        position: this.model.get('position'),
        player_id: this.model.get('player_id'),
        player_name: this.model.get('player_name'),
        points: this.model.get('points'),
        score: this.model.get('score'),
        through: this.model.get('through'),
        time: this.model.get('time')
      }));

      return this;
    }
  });

  var HoleView = Backbone.View.extend({
    tagName: 'li',
    template: _.template(require("text!./hole-template.html")),
    render: function(){
      var scores = {};
      app.current_user.tee_group.each(_.bind(function(m,i){
        var score = m.scores.find_by_hole_id(this.model.get('number'));
        scores["result" + i] = score.get('score');
        scores["class" + i] = score.get('result');
      }, this));

      this.$el.html(this.template(_.extend({
        number: this.model.get('number'),
        par: this.model.get('par')
      }, scores)));

      return this;
    }
  });

  module.exports = View;
});