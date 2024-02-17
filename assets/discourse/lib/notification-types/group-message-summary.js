define("discourse/lib/notification-types/group-message-summary", ["exports", "discourse/lib/notification-types/base", "discourse/lib/url", "I18n"], function (_exports, _base, _url, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/notification-types/base",0,"discourse/lib/url",0,"I18n"eaimeta@70e063a35619d71f
  class _default extends _base.default {
    get description() {
      return _I18n.default.t("notifications.group_message_summary", {
        count: this.notification.data.inbox_count,
        group_name: this.notification.data.group_name
      });
    }
    get label() {
      return null;
    }
    get linkHref() {
      return (0, _url.userPath)(`${this.notification.data.username}/messages/group/${this.notification.data.group_name}`);
    }
  }
  _exports.default = _default;
});