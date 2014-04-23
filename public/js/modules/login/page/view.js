define(function(require, exports, module) {
  "use strict";

  var app = require("app"),
      Backbone = require("backbone"),
      Surface = require("../../surface"),
      View = {};

  View = Surface.extend({
    page_title: 'Login',
    page_template: require("text!./template.html"),

    _renderPageContent: function() {
      this.$form = this.$el.find('form');
      this.$form.bind('submit', _.bind(this.formSubmitted, this));
    },

    formSubmitted: function(ev) {
      ev.preventDefault();
      ev.stopPropagation();

      app.current_user.log_in_with_credentials({
        name: this.$form.find('#name').val(), 
        password: this.$form.find('#password').val(),
        success: _.bind(this.login_success, this),
        failure: _.bind(this.login_fail, this)
      });
    },

    login_fail: function() {
      var $f = this.$form;
      $f.find('#password').val('');
      $f.addClass('is-invalid');
      app.bindAnimationEnd($f, function(){
        $f.removeClass('is-invalid');
      })
    },

    login_success: function() {
      app.router.navigate('/', {trigger: true});
    }
  });

  module.exports = View;
});