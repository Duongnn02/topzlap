define("discourse/plugins/discourse-assign/discourse-assign/connectors/group-reports-nav-item/assigned-topic-list", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    shouldRender(args, component) {
      return component.currentUser && component.currentUser.can_assign && args.group.can_show_assigned_tab && args.group.assignment_count > 0;
    }
  };
  _exports.default = _default;
});