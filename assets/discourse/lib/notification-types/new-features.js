define("discourse/lib/notification-types/new-features", ["exports", "discourse/lib/notification-types/base", "discourse-common/lib/get-url", "I18n"], function (_exports, _base, _getUrl, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/notification-types/base",0,"discourse-common/lib/get-url",0,"I18n"eaimeta@70e063a35619d71f
  class _default extends _base.default {
    get label() {
      return null;
    }
    get description() {
      return _I18n.default.t("notifications.new_features");
    }
    get linkHref() {
      return (0, _getUrl.default)("/admin");
    }
    get icon() {
      return "gift";
    }
  }
  _exports.default = _default;
});