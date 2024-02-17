define("discourse/lib/sidebar/common/community-section/badges-section-link", ["exports", "I18n", "discourse/lib/sidebar/base-community-section-link"], function (_exports, _I18n, _baseCommunitySectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/sidebar/base-community-section-link"eaimeta@70e063a35619d71f
  class BadgesSectionLink extends _baseCommunitySectionLink.default {
    get name() {
      return "badges";
    }
    get route() {
      return "badges";
    }
    get title() {
      return _I18n.default.t("sidebar.sections.community.links.badges.title");
    }
    get text() {
      return _I18n.default.t("sidebar.sections.community.links.badges.content");
    }
    get shouldDisplay() {
      return this.siteSettings.enable_badges;
    }
    get prefixValue() {
      return "certificate";
    }
  }
  _exports.default = BadgesSectionLink;
});