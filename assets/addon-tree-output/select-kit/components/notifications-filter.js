define("select-kit/components/notifications-filter", ["exports", "select-kit/components/dropdown-select-box", "I18n", "@ember/object"], function (_exports, _dropdownSelectBox, _I18n, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/dropdown-select-box",0,"I18n",0,"@ember/object"eaimeta@70e063a35619d71f
  var _default = _dropdownSelectBox.default.extend({
    classNames: ["notifications-filter"],
    content: (0, _object.computed)(function () {
      return [{
        id: "all",
        label: _I18n.default.t("user.user_notifications.filters.all")
      }, {
        id: "read",
        label: _I18n.default.t("user.user_notifications.filters.read")
      }, {
        id: "unread",
        label: _I18n.default.t("user.user_notifications.filters.unread")
      }];
    }),
    selectKitOptions: {
      headerComponent: "notifications-filter/notifications-filter-header"
    }
  });
  _exports.default = _default;
});