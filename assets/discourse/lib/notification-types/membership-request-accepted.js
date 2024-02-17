define("discourse/lib/notification-types/membership-request-accepted", ["exports", "discourse/lib/notification-types/base", "discourse/lib/url", "I18n"], function (_exports, _base, _url, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/notification-types/base",0,"discourse/lib/url",0,"I18n"eaimeta@70e063a35619d71f
  class _default extends _base.default {
    get linkHref() {
      return (0, _url.groupPath)(this.notification.data.group_name);
    }
    get description() {
      return _I18n.default.t("notifications.membership_request_accepted", {
        group_name: this.notification.data.group_name
      });
    }
    get label() {
      return null;
    }
  }
  _exports.default = _default;
});