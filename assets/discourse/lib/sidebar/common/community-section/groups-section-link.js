define("discourse/lib/sidebar/common/community-section/groups-section-link", ["exports", "I18n", "discourse/lib/sidebar/base-community-section-link"], function (_exports, _I18n, _baseCommunitySectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/sidebar/base-community-section-link"eaimeta@70e063a35619d71f
  class GroupsSectionLink extends _baseCommunitySectionLink.default {
    get name() {
      return "groups";
    }
    get route() {
      return "groups";
    }
    get title() {
      return _I18n.default.t("sidebar.sections.community.links.groups.title");
    }
    get text() {
      return _I18n.default.t("sidebar.sections.community.links.groups.content");
    }
    get shouldDisplay() {
      return this.siteSettings.enable_group_directory;
    }
    get prefixValue() {
      return "user-friends";
    }
  }
  _exports.default = GroupsSectionLink;
});