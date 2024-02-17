define("select-kit/components/color-palettes", ["exports", "select-kit/components/combo-box", "I18n"], function (_exports, _comboBox, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/combo-box",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _comboBox.default.extend({
    pluginApiIdentifiers: ["color-palettes"],
    classNames: ["color-palettes"],
    modifyComponentForRow() {
      return "color-palettes/color-palettes-row";
    },
    selectKitOptions: {
      translatedNone: _I18n.default.t("admin.customize.theme.default_light_scheme")
    }
  });
  _exports.default = _default;
});