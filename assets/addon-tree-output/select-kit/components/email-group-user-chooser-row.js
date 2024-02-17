define("select-kit/components/email-group-user-chooser-row", ["exports", "select-kit/components/select-kit/select-kit-row", "select-kit/templates/components/email-group-user-chooser-row"], function (_exports, _selectKitRow, _emailGroupUserChooserRow) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/select-kit/select-kit-row",0,"select-kit/templates/components/email-group-user-chooser-row"eaimeta@70e063a35619d71f
  var _default = _selectKitRow.default.extend({
    layout: _emailGroupUserChooserRow.default,
    classNames: ["email-group-user-chooser-row"]
  });
  _exports.default = _default;
});