define("discourse/plugins/discourse-assign/discourse-assign/connectors/user-messages-nav/assigned-messages", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.shouldShowAssigned = shouldShowAssigned;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function shouldShowAssigned(args, component) {
    const needsButton = component.currentUser && component.currentUser.get("can_assign");
    return needsButton && (!component.get("site.mobileView") || args.model.get("isPrivateMessage"));
  }
  var _default = {
    shouldRender(args, component) {
      return shouldShowAssigned(args, component);
    }
  };
  _exports.default = _default;
});