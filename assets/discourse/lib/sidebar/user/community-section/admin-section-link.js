define("discourse/lib/sidebar/user/community-section/admin-section-link", ["exports", "I18n", "discourse/lib/sidebar/base-community-section-link"], function (_exports, _I18n, _baseCommunitySectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/sidebar/base-community-section-link"eaimeta@70e063a35619d71f
  class AdminSectionLink extends _baseCommunitySectionLink.default {
    get name() {
      return "admin";
    }
    get route() {
      return "admin";
    }
    get title() {
      return _I18n.default.t("sidebar.sections.community.links.admin.content");
    }
    get text() {
      return _I18n.default.t("sidebar.sections.community.links.admin.content");
    }
    get shouldDisplay() {
      return this.currentUser?.staff;
    }
    get prefixValue() {
      return "wrench";
    }
  }
  _exports.default = AdminSectionLink;
});