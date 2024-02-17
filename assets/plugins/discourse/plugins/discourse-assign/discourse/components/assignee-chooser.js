define("discourse/plugins/discourse-assign/discourse/components/assignee-chooser", ["exports", "select-kit/components/email-group-user-chooser"], function (_exports, _emailGroupUserChooser) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/email-group-user-chooser"eaimeta@70e063a35619d71f
  var _default = _emailGroupUserChooser.default.extend({
    modifyComponentForRow() {
      return "assignee-chooser-row";
    }
  });
  _exports.default = _default;
});