define("select-kit/components/mini-tag-chooser/mini-tag-chooser-header", ["exports", "select-kit/components/combo-box/combo-box-header", "select-kit/templates/components/mini-tag-chooser/mini-tag-chooser-header"], function (_exports, _comboBoxHeader, _miniTagChooserHeader) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/combo-box/combo-box-header",0,"select-kit/templates/components/mini-tag-chooser/mini-tag-chooser-header"eaimeta@70e063a35619d71f
  var _default = _comboBoxHeader.default.extend({
    layout: _miniTagChooserHeader.default,
    classNames: ["mini-tag-chooser-header"]
  });
  _exports.default = _default;
});