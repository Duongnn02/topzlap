define("discourse/routes/restricted-user", ["exports", "discourse/routes/discourse"], function (_exports, _discourse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse"eaimeta@70e063a35619d71f
  // A base route that allows us to redirect when access is restricted
  var _default = _discourse.default.extend({
    afterModel() {
      if (!this.modelFor("user").get("can_edit")) {
        this.replaceWith("userActivity");
      }
    }
  });
  _exports.default = _default;
});