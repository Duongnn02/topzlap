define("discourse/routes/account-created-index", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route"eaimeta@70e063a35619d71f
  var _default = _route.default.extend({
    setupController(controller) {
      controller.set("accountCreated", this.controllerFor("account-created").get("accountCreated"));
    }
  });
  _exports.default = _default;
});