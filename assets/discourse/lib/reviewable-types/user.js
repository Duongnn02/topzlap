define("discourse/lib/reviewable-types/user", ["exports", "discourse/lib/reviewable-types/base", "I18n"], function (_exports, _base, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/reviewable-types/base",0,"I18n"eaimeta@70e063a35619d71f
  class _default extends _base.default {
    get description() {
      return _I18n.default.t("user_menu.reviewable.user_requires_approval", {
        username: this.reviewable.username
      });
    }
    get icon() {
      return "user";
    }
  }
  _exports.default = _default;
});