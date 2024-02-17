define("discourse/plugins/discourse-assign/discourse-assign/assigned-group-route-map", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    resource: "group",
    map() {
      this.route("assigned", function () {
        this.route("show", {
          path: "/:filter"
        });
      });
    }
  };
  _exports.default = _default;
});