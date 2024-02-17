define("discourse/routes/user-private-messages-group", ["exports", "discourse/routes/discourse"], function (_exports, _discourse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse"eaimeta@70e063a35619d71f
  class _default extends _discourse.default {
    model(params) {
      return params.name;
    }
    setupController(controller, model) {
      controller.set("groupName", model);
    }
  }
  _exports.default = _default;
});