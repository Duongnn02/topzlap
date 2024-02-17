define("discourse/lib/notification-types/liked-consolidated", ["exports", "discourse/lib/notification-types/base", "discourse/lib/url", "I18n"], function (_exports, _base, _url, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/notification-types/base",0,"discourse/lib/url",0,"I18n"eaimeta@70e063a35619d71f
  class _default extends _base.default {
    get linkHref() {
      // TODO(osama): serialize username with notifications
      return (0, _url.userPath)(`${this.currentUser.username}/notifications/likes-received?acting_username=${this.notification.data.username}`);
    }
    get description() {
      return _I18n.default.t("notifications.liked_consolidated_description", {
        count: this.notification.data.count
      });
    }
  }
  _exports.default = _default;
});