define(function(require, exports, module) {
  "use strict";

  module.exports = {
    Views: {
      Score: require("./page/view"),
      ScoreHole: require("./score_hole/view"),
    }
  };
});