define(function(require, exports, module) {
  "use strict";

  module.exports = {
    Models: {
      Course: require("./course")['Model'],
      Event: require("./event")['Model'],
      Hole: require("./hole")['Model']
    },
    Collections: {
      Course: require("./course")['Collection'],
      Event: require("./event")['Collection'],
      Hole: require("./hole")['Collection']
    }
  };
});