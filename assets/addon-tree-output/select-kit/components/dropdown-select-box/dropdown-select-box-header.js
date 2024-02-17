define("select-kit/components/dropdown-select-box/dropdown-select-box-header", ["exports", "select-kit/components/select-kit/single-select-header", "@ember/object", "select-kit/templates/components/dropdown-select-box/dropdown-select-box-header", "@ember/object/computed"], function (_exports, _singleSelectHeader, _object, _dropdownSelectBoxHeader, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/select-kit/single-select-header",0,"@ember/object",0,"select-kit/templates/components/dropdown-select-box/dropdown-select-box-header",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  var _default = _singleSelectHeader.default.extend({
    layout: _dropdownSelectBoxHeader.default,
    classNames: ["dropdown-select-box-header"],
    classNameBindings: ["btnClassName", "btnStyleClass"],
    showFullTitle: (0, _computed.readOnly)("selectKit.options.showFullTitle"),
    customStyle: (0, _computed.readOnly)("selectKit.options.customStyle"),
    btnClassName: (0, _object.computed)("showFullTitle", function () {
      return `btn ${this.showFullTitle ? "btn-icon-text" : "no-text btn-icon"}`;
    }),
    btnStyleClass: (0, _object.computed)("customStyle", function () {
      return `${this.customStyle ? "" : "btn-default"}`;
    }),
    caretUpIcon: (0, _computed.readOnly)("selectKit.options.caretUpIcon"),
    caretDownIcon: (0, _computed.readOnly)("selectKit.options.caretDownIcon"),
    caretIcon: (0, _object.computed)("selectKit.isExpanded", "caretUpIcon", "caretDownIcon", function () {
      return this.selectKit.isExpanded ? this.caretUpIcon : this.caretDownIcon;
    })
  });
  _exports.default = _default;
});