define(function(require, exports, module) {
  "use strict";

  var app = require("app"),
      Transition = require("modules/transition"),
      Leaderboard = require("modules/leaderboard/index"),
      PlayerScreen = require("modules/player/index"),
      Score = require("modules/score/index"),
      Login = require("modules/login/index");

  var Router = Backbone.Router.extend({
    current: null,
    routes: {
      "": "index",
      "player/:id": "player",
      "login": "login",
      "score": "score",
      "score/hole/:hole": "score_hole"
    },

    index: function() {
      var surface = new Leaderboard.Views.List();
      this._transition(surface);
    },

    player: function(id) {
      var surface = new PlayerScreen.Views.Profile({player_id: id});
      this._transition(surface);
    },

    score: function(id) {
      var surface = new Score.Views.Score();
      this._transition(surface);
    },

    score_hole: function(hole) {
      var surface = new Score.Views.ScoreHole({hole: hole});
      this._transition(surface);
    },

    login: function() {
      if(app.current_user.logged_in()){
        this.navigate('/', {trigger: true});
      }

      var surface = new Login.Views.Login();
      this._transition(surface);
    },

    _transition: function(surface){
      if(!this.current){
        Transition.kickstart(surface);
        this.current = surface;
      } else {
        $.scrollTo(0,300, _.bind(function(){
          Transition.surface_out(this.current);
          Transition.surface_in(surface);

          this.current.clean();
          this.current = surface;
        }, this));
      }
    }
  });

  module.exports = Router;
});