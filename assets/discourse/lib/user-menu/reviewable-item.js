define("discourse/lib/user-menu/reviewable-item", ["exports", "discourse/lib/user-menu/base-item", "discourse-common/lib/get-url", "discourse/lib/reviewable-types-manager"], function (_exports, _baseItem, _getUrl, _reviewableTypesManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/user-menu/base-item",0,"discourse-common/lib/get-url",0,"discourse/lib/reviewable-types-manager"eaimeta@70e063a35619d71f
  class UserMenuReviewableItem extends _baseItem.default {
    constructor(_ref) {
      let {
        reviewable,
        currentUser,
        siteSettings,
        site
      } = _ref;
      super(...arguments);
      this.reviewable = reviewable;
      this.currentUser = currentUser;
      this.siteSettings = siteSettings;
      this.site = site;
      this.renderDirector = (0, _reviewableTypesManager.getRenderDirector)(this.reviewable.type, this.reviewable, this.currentUser, this.siteSettings, this.site);
    }
    get className() {
      const classes = ["reviewable"];
      if (this.reviewable.pending) {
        classes.push("pending");
      } else {
        classes.push("reviewed");
      }
      return classes.join(" ");
    }
    get linkHref() {
      return (0, _getUrl.default)(`/review/${this.reviewable.id}`);
    }
    get linkTitle() {
      // TODO(osama): add title
      return "";
    }
    get icon() {
      return this.renderDirector.icon;
    }
    get label() {
      return this.renderDirector.actor;
    }
    get description() {
      return this.renderDirector.description;
    }
  }
  _exports.default = UserMenuReviewableItem;
});