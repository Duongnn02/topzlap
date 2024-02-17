define("discourse/components/user-nav/messages-dropdown", ["exports", "select-kit/components/combo-box"], function (_exports, _comboBox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/combo-box"eaimeta@70e063a35619d71f
  var _default = _comboBox.default.extend({
    pluginApiIdentifiers: ["user-nav-messages-dropdown"],
    classNames: ["user-nav-messages-dropdown"],
    selectKitOptions: {
      caretDownIcon: "caret-right",
      caretUpIcon: "caret-down"
    }
  });
  _exports.default = _default;
});