define(function(require, exports, module) {
  "use strict";

  var app = require("app"),
      Surface = require("../../surface"),
      Player = require("../player"),
      View = {};

  View = Surface.extend({
    page_title: 'Player',
    page_template: require("text!./loading-template.html"),

    _pageInit: function(options) {
      this.views = [];
      this.player = new Player({id: options.player_id});
    },
    
    _renderPageContent: function() {
      this.player.fetch({
        success: _.bind(this._render, this)
      });
    },

    _render: function(m,data,xhr) {
      this.$el.html(_.template(require("text!./template.html"))({
        name: m.get('name'),
        handicap: m.get('handicap')
      }));

      this._setPageTitle(m.get('name'));
      this.renderEvents(m);
    },

    renderEvents: function(m) {
      m.events.each(_.bind(function(e, i){
        this.$el.append(_.template(require("text!./event-template.html"))({
          course_name: e.course.get('name')
        }));

        var $list = this.$el.find('.list').last();

        e.course.holes.each(_.bind(function(h, i){
          var score = e.scores.find_by_hole_id(h.get('id'));
          this.renderHole(h, score, $list);
          if(i == 8){
            this.renderTotal("Front 9", e, $list);
          }
        }, this));

        this.renderTotal("Back 9", e, $list);
        this.renderTotal("Total", e, $list);
      }, this));
    },

    renderHole: function(h, score, $list) {
      var v = new HoleView({
        model: h,
        score: score
      }).render();

      this.views.push(v);
      $list.append(v.$el);
    },

    renderTotal: function(name, ev, $list) {
      var v = new TotalView({
        name: name,
        ev: ev
      }).render();

      this.views.push(v);
      $list.append(v.$el);
    }
  });

  var HoleView = Backbone.View.extend({
    tagName: 'li',
    template: _.template(require("text!./hole-template.html")),
    initialize: function(options){
      this.score = options.score;
    },
    render: function(){
      this.$el.html(this.template({
        number: this.model.get('number'),
        length: this.model.get('length'),
        par: this.model.get('par'),
        index: this.model.get('index'),
        points: this.score.get('points'),
        score: this.score.get('score'),
        result: this.score.get('result')
      }));

      return this;
    }
  });

  var TotalView = Backbone.View.extend({
    tagName: 'li',
    className: 'totals',
    template: _.template(require("text!./total-template.html")),
    initialize: function(options){
      this.ev = options.ev;
      this.name = options.name;
    },
    render: function(){
      var totals = this.ev.scores.get_totals(this.name);
      this.$el.html(this.template({
        points_total: totals.points,
        strokes_total: totals.strokes,
        name: this.name
      }));
      return this;
    }
  });

  module.exports = View;
});