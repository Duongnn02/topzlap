define("discourse/lib/notification-types/bookmark-reminder", ["exports", "discourse/lib/notification-types/base", "I18n", "discourse-common/lib/get-url"], function (_exports, _base, _I18n, _getUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/notification-types/base",0,"I18n",0,"discourse-common/lib/get-url"eaimeta@70e063a35619d71f
  class _default extends _base.default {
    get linkTitle() {
      if (this.notification.data.bookmark_name) {
        return _I18n.default.t("notifications.titles.bookmark_reminder_with_name", {
          name: this.notification.data.bookmark_name
        });
      }
      return super.linkTitle;
    }
    get description() {
      return super.description || this.notification.data.title;
    }
    get linkHref() {
      let linkHref = super.linkHref;
      if (linkHref) {
        return linkHref;
      }
      if (this.notification.data.bookmarkable_url) {
        return (0, _getUrl.default)(this.notification.data.bookmarkable_url);
      }
    }
  }
  _exports.default = _default;
});