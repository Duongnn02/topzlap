define("select-kit/components/group-notifications-button", ["exports", "select-kit/components/notifications-button"], function (_exports, _notificationsButton) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/notifications-button"eaimeta@70e063a35619d71f
  var _default = _notificationsButton.default.extend({
    pluginApiIdentifiers: ["group-notifications-button"],
    classNames: ["group-notifications-button"],
    selectKitOptions: {
      i18nPrefix: "groups.notifications"
    }
  });
  _exports.default = _default;
});