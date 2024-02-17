define("discourse/plugins/discourse-topic-voting/discourse/feature-voting-route-map", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    resource: "user",
    path: "users/:username",
    map() {
      this.route("userActivity", {
        path: "activity",
        resetNamespace: true
      }, function () {
        this.route("votes");
      });
    }
  };
  _exports.default = _default;
});