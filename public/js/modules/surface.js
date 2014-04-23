define(function(require, exports, module) {
  "use strict";

  var app = require('app'),
      Backbone = require('backbone');

  var SurfaceView = Backbone.View.extend({

    className: 'surface',
    page_name: "",
    page_title: "",
    page_template: null,

    initialize: function(params) {
      this.template = _.template(this.page_template);

      this._pageInit(params);
      return this.render();
    },

    _pageInit: function(){},

    render: function() {
      this.$el.append(this.template(this.serialize())).addClass(this.page_name.toLowerCase());
      $('.surface-container').append(this.$el);

      this._renderPageContent();
      this._setPageTitle();

      return this;
    },

    serialize: function(){
      return {};
    },

    _renderPageContent: function() {},

    show: function() {
      this._setPageTitle();

      this.$el.removeClass('hidden').addClass('animate-in');
      app.bindAnimationEnd(this.$el, _.bind(function(){
        this.$el.addClass('shown').removeClass('animate-in');
      }, this));

      return this;
    },

    hide: function(callback) {
      this.$el.addClass('animate-out');
      app.bindAnimationEnd(this.$el, _.bind(function(){
        this.$el.addClass('hidden').removeClass('shown animate-out');
      }, this));

      return this;
    },

    _setPageTitle: function(title) {
      if(title)
        document.title = title + " | Blue Pirate";
      else if(this.page_title)
        document.title = this.page_title + " | Blue Pirate";
      else
        document.title = "Blue Pirate";
    },

    clean: function(){
      this._clean();
      this.$el.remove();
    },

    _clean: function(){}

  });

  module.exports = SurfaceView
});