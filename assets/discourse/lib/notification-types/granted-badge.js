define("discourse/lib/notification-types/granted-badge", ["exports", "discourse/lib/notification-types/base", "discourse-common/lib/get-url", "I18n"], function (_exports, _base, _getUrl, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/notification-types/base",0,"discourse-common/lib/get-url",0,"I18n"eaimeta@70e063a35619d71f
  class _default extends _base.default {
    get linkHref() {
      const badgeId = this.notification.data.badge_id;
      if (badgeId) {
        let slug = this.notification.data.badge_slug;
        if (!slug) {
          slug = this.notification.data.badge_name.replace(/[^A-Za-z0-9_]+/g, "-").toLowerCase();
        }
        let username = this.notification.data.username;
        username = username ? `?username=${username.toLowerCase()}` : "";
        return (0, _getUrl.default)(`/badges/${badgeId}/${slug}${username}`);
      } else {
        return super.url;
      }
    }
    get description() {
      return _I18n.default.t("notifications.granted_badge", {
        description: this.notification.data.badge_name
      });
    }
    get label() {
      return null;
    }
  }
  _exports.default = _default;
});