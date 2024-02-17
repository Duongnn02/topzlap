define("select-kit/components/combo-box/combo-box-header", ["exports", "@ember/object/computed", "select-kit/components/select-kit/single-select-header", "@ember/object", "select-kit/templates/components/combo-box/combo-box-header"], function (_exports, _computed, _singleSelectHeader, _object, _comboBoxHeader) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"select-kit/components/select-kit/single-select-header",0,"@ember/object",0,"select-kit/templates/components/combo-box/combo-box-header"eaimeta@70e063a35619d71f
  var _default = _singleSelectHeader.default.extend({
    layout: _comboBoxHeader.default,
    classNames: ["combo-box-header"],
    clearable: (0, _computed.reads)("selectKit.options.clearable"),
    caretUpIcon: (0, _computed.reads)("selectKit.options.caretUpIcon"),
    caretDownIcon: (0, _computed.reads)("selectKit.options.caretDownIcon"),
    shouldDisplayClearableButton: (0, _computed.and)("clearable", "value"),
    caretIcon: (0, _object.computed)("selectKit.isExpanded", "caretUpIcon", "caretDownIcon", function () {
      return this.selectKit.isExpanded ? this.caretUpIcon : this.caretDownIcon;
    })
  });
  _exports.default = _default;
});