require.config({
  paths: {
    underscore: "components/underscore/underscore",
    jquery: "components/jquery/dist/jquery",
    backbone: "components/backbone/backbone",
    text: "components/requirejs-text/text",
    scroll_to: "components/jquery.scrollTo/jquery.scrollTo"
  },

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    },
    scroll_to: {
      deps: ["jquery"]
    }
  }
});
