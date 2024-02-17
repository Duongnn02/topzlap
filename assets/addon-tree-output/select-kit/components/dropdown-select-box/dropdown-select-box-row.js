define("select-kit/components/dropdown-select-box/dropdown-select-box-row", ["exports", "select-kit/components/select-kit/select-kit-row", "select-kit/templates/components/dropdown-select-box/dropdown-select-box-row", "@ember/object/computed"], function (_exports, _selectKitRow, _dropdownSelectBoxRow, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/select-kit/select-kit-row",0,"select-kit/templates/components/dropdown-select-box/dropdown-select-box-row",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  var _default = _selectKitRow.default.extend({
    layout: _dropdownSelectBoxRow.default,
    classNames: ["dropdown-select-box-row"],
    description: (0, _computed.readOnly)("item.description")
  });
  _exports.default = _default;
});