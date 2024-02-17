define("discourse/plugins/discourse-assign/discourse-assign/connectors/user-preferences-notifications/remind-assigns-frequency", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    shouldRender(args, component) {
      return component.currentUser && component.currentUser.get("can_assign");
    }
  };
  _exports.default = _default;
});