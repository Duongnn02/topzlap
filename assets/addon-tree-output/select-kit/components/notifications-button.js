define("select-kit/components/notifications-button", ["exports", "discourse/lib/notification-levels", "@ember/object", "select-kit/components/dropdown-select-box", "I18n"], function (_exports, _notificationLevels, _object, _dropdownSelectBox, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/notification-levels",0,"@ember/object",0,"select-kit/components/dropdown-select-box",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _dropdownSelectBox.default.extend({
    pluginApiIdentifiers: ["notifications-button"],
    classNames: ["notifications-button"],
    content: _notificationLevels.allLevels,
    nameProperty: "key",
    selectKitOptions: {
      autoFilterable: false,
      filterable: false,
      i18nPrefix: "",
      i18nPostfix: ""
    },
    modifyComponentForRow() {
      return "notifications-button/notifications-button-row";
    },
    modifySelection(content) {
      content = content || {};
      const {
        i18nPrefix,
        i18nPostfix
      } = this.selectKit.options;
      const title = _I18n.default.t(`${i18nPrefix}.${this.buttonForValue.key}${i18nPostfix}.title`);
      (0, _object.setProperties)(content, {
        title,
        label: title,
        icon: this.buttonForValue.icon
      });
      return content;
    },
    buttonForValue: (0, _object.computed)("value", function () {
      return (0, _notificationLevels.buttonDetails)(this.value);
    })
  });
  _exports.default = _default;
});