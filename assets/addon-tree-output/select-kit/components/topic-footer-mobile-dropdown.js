define("select-kit/components/topic-footer-mobile-dropdown", ["exports", "select-kit/components/combo-box"], function (_exports, _comboBox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/combo-box"eaimeta@70e063a35619d71f
  var _default = _comboBox.default.extend({
    pluginApiIdentifiers: ["topic-footer-mobile-dropdown"],
    classNames: ["topic-footer-mobile-dropdown"],
    selectKitOptions: {
      none: "topic.controls",
      filterable: false,
      autoFilterable: false
    },
    actions: {
      onChange(value, item) {
        item.action && item.action();
      }
    }
  });
  _exports.default = _default;
});