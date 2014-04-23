define(function(require, exports, module) {
  "use strict";

  var app = require('app');

  function kickstart(surface){
    var $pirate = $('.pirate');

    $('.loading').fadeOut();
    $pirate.addClass('kickstart');

    app.bindAnimationEnd($('.pirate .hat'), function(){
      $pirate.removeClass('kickstart')
             .addClass('header');

      app.bindAnimationEnd($pirate, function(ev){
        surface.show();
      });
    });
  }

  function surface_out(surface){
    surface.hide();
  }

  function surface_in(surface){
    surface.show(); 
  }

  module.exports = {
    kickstart: kickstart,
    surface_out: surface_out,
    surface_in: surface_in,
  };
});