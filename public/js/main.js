define("kickstart", function(require) {
  var app = require("app");
  var Router = require("router");

  var Backbone = require("backbone");
  var $ = require("jquery");

  // Setup the Router
  app.router = new Router();

  // Trigger the first route
  Backbone.history.start({ pushState: true, root: app.root });

  // Hijack any navigation links and push them through the router.
  $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
    
    var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
    var root = location.protocol + "//" + location.host + app.root;

    // Ensure the root is part of the anchor href, meaning it's relative.
    if (href.prop.slice(0, root.length) === root) {
      evt.preventDefault();
      Backbone.history.navigate(href.attr, true);
    }
  });
});

// Break out the application running from the configuration definition to
// assist with testing.
require(["config"], function() {
  
  // Kick off the application.
  require(["kickstart"]);
});