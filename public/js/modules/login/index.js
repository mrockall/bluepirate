define(function(require, exports, module) {
  "use strict";

  module.exports = {
    Models: {
      CurrentUser: require("./current_user")
    },
    Views: {
      Login: require("./page/view")
    }
  };
});