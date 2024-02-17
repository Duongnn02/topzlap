define("discourse/mixins/viewing-action-type", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    viewingActionType(userActionType) {
      this.controllerFor("user").set("userActionType", userActionType);
      this.controllerFor("user-activity").set("userActionType", userActionType);
    }
  };
  _exports.default = _default;
});