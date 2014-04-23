define(function(require, exports, module) {
  "use strict";

  var app = require("app"),
      Backbone = require("backbone"),
      Surface = require("../../surface"),
      View = {};

  View = Surface.extend({
    page_title: 'Score Hole',
    page_template: require("text!./loading-template.html"),
    the_template: _.template(require("text!./template.html")),

    events: {
      "click .save": "save_scores"
    },

    _pageInit: function(options) {
      this.hole_id = options.hole;

      var data = app.current_user.tee_group.map(function(m,i){ return m.get('player_id'); });
      $.get("/events/1/scores", {player_ids: data, hole_id: this.hole_id})
       .success(_.bind(this.renderPage, this));
    },

    renderPage: function(data, result, xhr) {
      this.views = [];

      this.$el.html(this.the_template({
        hole: data.hole.number,
        par: data.hole.par,
        index: data.hole.index
      }));

      this.$players = this.$el.find('.player-list');
      app.current_user.tee_group.each(_.bind(function(m, i){
        this.renderPlayer(m, i, data.players);
      }, this));
    },

    renderPlayer: function(m, i, data){
      m.set('score', data[m.get('player_id')]);

      var v = new PlayerView({
        model: m
      }).render();

      this.views.push(v);
      this.$players.append(v.$el);
    },

    save_scores: function(ev) {
      ev.preventDefault();
      ev.stopPropagation();

      var data = {};
      _(this.$el.find('select')).each(function(el){
        data[$(el).data('pid')] = $(el).val();
      });

      $.post("/events/1/scores", {players: data, hole_id: this.hole_id})
       .success(function(data, result, xhr){
          app.router.navigate('/score', {trigger: true});
       });
     }
  });

  var PlayerView = Backbone.View.extend({
    tagName: 'li',
    template: _.template(require("text!./player-template.html")),
    render: function(){
      this.$el.html(this.template({
        player_name: this.model.get('player_name'),
        player_id: this.model.get('player_id'),
        score: this.model.get('score')
      }));

      return this;
    }
  });

  module.exports = View;
});