define("select-kit/components/tag-notifications-button", ["exports", "select-kit/components/notifications-button"], function (_exports, _notificationsButton) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/notifications-button"eaimeta@70e063a35619d71f
  var _default = _notificationsButton.default.extend({
    pluginApiIdentifiers: ["tag-notifications-button"],
    classNames: ["tag-notifications-button"],
    selectKitOptions: {
      showFullTitle: false,
      i18nPrefix: "tagging.notifications"
    }
  });
  _exports.default = _default;
});