define("select-kit/components/tag-chooser-row", ["exports", "select-kit/components/select-kit/select-kit-row", "select-kit/templates/components/tag-chooser-row"], function (_exports, _selectKitRow, _tagChooserRow) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/select-kit/select-kit-row",0,"select-kit/templates/components/tag-chooser-row"eaimeta@70e063a35619d71f
  var _default = _selectKitRow.default.extend({
    layout: _tagChooserRow.default,
    classNames: ["tag-chooser-row"]
  });
  _exports.default = _default;
});