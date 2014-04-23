define(function(require, exports, module) {
  "use strict";

  var app = require("app"),
      Surface = require("../../surface"),
      Leaderboard = require("../collection"),
      View = {};

  // Create a new surface view..
  View = Surface.extend({
    page_title: 'Leaderboard',
    page_template: require("text!./template.html"),

    _pageInit: function(argument) {
      this.views = [];
    },

    serialize: function(){
      return {
        logged_in: app.current_user.logged_in()
      }
    },

    _renderPageContent: function() {
      this.$leaderboard = this.$el.find('.list');
      
      this.collection = new Leaderboard();
      this.collection.fetch({
        success: _.bind(this.renderPage, this)
      });
    },

    renderPage: function(){
      this.collection.each(_.bind(this.playerAdded, this));
    },

    playerAdded: function(m, i) {
      m.set('position', i+1);

      var v = new PlayerView({
        model: m
      }).render();

      this.$leaderboard.append(v.$el);
      this.views.push(v);
    }
  });

  var PlayerView = Backbone.View.extend({
    tagName: 'li',
    template: _.template(require("text!./player-template.html")),
    render: function() {
      this.$el.html(this.template(this.serialize()));
      return this;
    },
    serialize: function() {
      return {
        position: this.model.get('position'),
        player_id: this.model.get("player_id"),
        player: this.model.get('player_name'),
        score: this.model.get('score'),
        points: this.model.get('points'),
        through: this.model.get('through'),
        time_parsed: this.model.get('time_parsed')
      }
    }
  });

  module.exports = View;
});