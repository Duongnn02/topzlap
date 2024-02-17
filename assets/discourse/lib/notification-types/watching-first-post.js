define("discourse/lib/notification-types/watching-first-post", ["exports", "discourse/lib/notification-types/base", "I18n"], function (_exports, _base, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/notification-types/base",0,"I18n"eaimeta@70e063a35619d71f
  class _default extends _base.default {
    get label() {
      return _I18n.default.t("notifications.watching_first_post_label");
    }
  }
  _exports.default = _default;
});