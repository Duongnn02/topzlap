define("select-kit/components/tag-drop/tag-drop-header", ["exports", "select-kit/components/combo-box/combo-box-header", "select-kit/templates/components/tag-drop/tag-drop-header"], function (_exports, _comboBoxHeader, _tagDropHeader) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/combo-box/combo-box-header",0,"select-kit/templates/components/tag-drop/tag-drop-header"eaimeta@70e063a35619d71f
  var _default = _comboBoxHeader.default.extend({
    layout: _tagDropHeader.default,
    classNames: "tag-drop-header"
  });
  _exports.default = _default;
});