define("select-kit/components/timezone-input", ["exports", "select-kit/components/combo-box"], function (_exports, _comboBox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/combo-box"eaimeta@70e063a35619d71f
  var _default = _comboBox.default.extend({
    pluginApiIdentifiers: ["timezone-input"],
    classNames: ["timezone-input"],
    selectKitOptions: {
      filterable: true,
      allowAny: false
    },
    get nameProperty() {
      return this.isLocalized ? "name" : null;
    },
    get valueProperty() {
      return this.isLocalized ? "value" : null;
    },
    get content() {
      return this.isLocalized ? moment.tz.localizedNames() : moment.tz.names();
    },
    get isLocalized() {
      return moment.locale() !== "en" && typeof moment.tz.localizedNames === "function";
    }
  });
  _exports.default = _default;
});