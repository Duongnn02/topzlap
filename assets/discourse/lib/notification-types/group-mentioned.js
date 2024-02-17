define("discourse/lib/notification-types/group-mentioned", ["exports", "discourse/lib/notification-types/base"], function (_exports, _base) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/notification-types/base"eaimeta@70e063a35619d71f
  class _default extends _base.default {
    get label() {
      return `${this.username} @${this.notification.data.group_name}`;
    }
    get labelClasses() {
      return ["mention-group", "notify"];
    }
  }
  _exports.default = _default;
});