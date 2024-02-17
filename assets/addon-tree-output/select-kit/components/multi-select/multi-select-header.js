define("select-kit/components/multi-select/multi-select-header", ["exports", "select-kit/components/select-kit/select-kit-header", "select-kit/templates/components/multi-select/multi-select-header", "@ember/object", "@ember/object/computed"], function (_exports, _selectKitHeader, _multiSelectHeader, _object, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/select-kit/select-kit-header",0,"select-kit/templates/components/multi-select/multi-select-header",0,"@ember/object",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  var _default = _selectKitHeader.default.extend({
    tagName: "summary",
    classNames: ["multi-select-header"],
    attributeBindings: ["ariaLabel:aria-label"],
    layout: _multiSelectHeader.default,
    caretUpIcon: (0, _computed.reads)("selectKit.options.caretUpIcon"),
    caretDownIcon: (0, _computed.reads)("selectKit.options.caretDownIcon"),
    ariaLabel: (0, _computed.reads)("selectKit.options.headerAriaLabel"),
    caretIcon: (0, _object.computed)("selectKit.isExpanded", "caretUpIcon", "caretDownIcon", function () {
      return this.selectKit.isExpanded ? this.caretUpIcon : this.caretDownIcon;
    })
  });
  _exports.default = _default;
});