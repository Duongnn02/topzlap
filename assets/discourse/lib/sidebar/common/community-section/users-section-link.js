define("discourse/lib/sidebar/common/community-section/users-section-link", ["exports", "I18n", "discourse/lib/sidebar/base-community-section-link"], function (_exports, _I18n, _baseCommunitySectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/sidebar/base-community-section-link"eaimeta@70e063a35619d71f
  class UsersSectionLink extends _baseCommunitySectionLink.default {
    get name() {
      return "users";
    }
    get route() {
      return "users";
    }
    get title() {
      return _I18n.default.t("sidebar.sections.community.links.users.title");
    }
    get text() {
      return _I18n.default.t("sidebar.sections.community.links.users.content");
    }
    get shouldDisplay() {
      return this.siteSettings.enable_user_directory && (this.currentUser || !this.siteSettings.hide_user_profiles_from_public);
    }
    get prefixValue() {
      return "users";
    }
  }
  _exports.default = UsersSectionLink;
});