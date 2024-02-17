define("discourse/lib/notification-types/custom", ["exports", "discourse/lib/notification-types/base", "I18n"], function (_exports, _base, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/notification-types/base",0,"I18n"eaimeta@70e063a35619d71f
  class _default extends _base.default {
    get linkTitle() {
      if (this.notification.data.title) {
        return _I18n.default.t(this.notification.data.title);
      }
    }
    get icon() {
      return `notification.${this.notification.data.message}`;
    }
  }
  _exports.default = _default;
});