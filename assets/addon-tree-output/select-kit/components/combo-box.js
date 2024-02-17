define("select-kit/components/combo-box", ["exports", "select-kit/components/single-select", "@ember/object/computed"], function (_exports, _singleSelect, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/single-select",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  var _default = _singleSelect.default.extend({
    pluginApiIdentifiers: ["combo-box"],
    classNames: ["combobox", "combo-box"],
    selectKitOptions: {
      caretUpIcon: "caret-up",
      caretDownIcon: "caret-down",
      autoFilterable: "autoFilterable",
      clearable: false,
      headerComponent: "combo-box/combo-box-header"
    },
    autoFilterable: (0, _computed.gte)("content.length", 10)
  });
  _exports.default = _default;
});