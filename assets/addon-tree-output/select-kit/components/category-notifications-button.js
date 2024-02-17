define("select-kit/components/category-notifications-button", ["exports", "select-kit/components/notifications-button", "@ember/object/computed", "I18n"], function (_exports, _notificationsButton, _computed, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/notifications-button",0,"@ember/object/computed",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _notificationsButton.default.extend({
    pluginApiIdentifiers: ["category-notifications-button"],
    classNames: ["category-notifications-button"],
    isHidden: (0, _computed.or)("category.deleted"),
    selectKitOptions: {
      i18nPrefix: "category.notifications",
      showFullTitle: false,
      headerAriaLabel: _I18n.default.t("category.notifications.title")
    }
  });
  _exports.default = _default;
});