define("select-kit/components/dropdown-select-box", ["exports", "select-kit/components/single-select"], function (_exports, _singleSelect) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/single-select"eaimeta@70e063a35619d71f
  var _default = _singleSelect.default.extend({
    pluginApiIdentifiers: ["dropdown-select-box"],
    classNames: ["dropdown-select-box"],
    selectKitOptions: {
      autoFilterable: false,
      filterable: false,
      showFullTitle: true,
      headerComponent: "dropdown-select-box/dropdown-select-box-header",
      caretUpIcon: "caret-up",
      caretDownIcon: "caret-down",
      showCaret: false,
      customStyle: null
    },
    modifyComponentForRow() {
      return "dropdown-select-box/dropdown-select-box-row";
    }
  });
  _exports.default = _default;
});