define("select-kit/components/future-date-input-selector/future-date-input-selector-header", ["exports", "select-kit/components/combo-box/combo-box-header", "select-kit/templates/components/future-date-input-selector/future-date-input-selector-header"], function (_exports, _comboBoxHeader, _futureDateInputSelectorHeader) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/combo-box/combo-box-header",0,"select-kit/templates/components/future-date-input-selector/future-date-input-selector-header"eaimeta@70e063a35619d71f
  var _default = _comboBoxHeader.default.extend({
    layout: _futureDateInputSelectorHeader.default,
    classNames: "future-date-input-selector-header"
  });
  _exports.default = _default;
});