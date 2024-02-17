define("discourse/routes/preferences-profile", ["exports", "discourse/routes/restricted-user"], function (_exports, _restrictedUser) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/restricted-user"eaimeta@70e063a35619d71f
  var _default = _restrictedUser.default.extend({
    showFooter: true,
    setupController(controller, model) {
      controller.set("model", model);
    }
  });
  _exports.default = _default;
});