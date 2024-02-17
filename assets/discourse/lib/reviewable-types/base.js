define("discourse/lib/reviewable-types/base", ["exports", "I18n"], function (_exports, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n"eaimeta@70e063a35619d71f
  class ReviewableTypeBase {
    constructor(_ref) {
      let {
        reviewable,
        currentUser,
        siteSettings,
        site
      } = _ref;
      this.reviewable = reviewable;
      this.currentUser = currentUser;
      this.siteSettings = siteSettings;
      this.site = site;
    }
    get actor() {
      const flagger = this.reviewable.flagger_username;
      if (flagger) {
        return flagger;
      } else {
        return _I18n.default.t("user_menu.reviewable.deleted_user");
      }
    }
    get description() {
      return _I18n.default.t("user_menu.reviewable.default_item", {
        reviewable_id: this.reviewable.id
      });
    }
    get icon() {
      return "flag";
    }
  }
  _exports.default = ReviewableTypeBase;
});