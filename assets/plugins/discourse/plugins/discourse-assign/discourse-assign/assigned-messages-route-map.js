define("discourse/plugins/discourse-assign/discourse-assign/assigned-messages-route-map", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    resource: "user.userPrivateMessages",
    map() {
      this.route("assigned", {
        path: "/assigned"
      }, function () {
        this.route("index", {
          path: "/"
        });
      });
    }
  };
  _exports.default = _default;
});