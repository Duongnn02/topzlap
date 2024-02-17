define("discourse/lib/sidebar/common/community-section/about-section-link", ["exports", "I18n", "discourse/lib/sidebar/base-community-section-link"], function (_exports, _I18n, _baseCommunitySectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/sidebar/base-community-section-link"eaimeta@70e063a35619d71f
  class AboutSectionLink extends _baseCommunitySectionLink.default {
    get name() {
      return "about";
    }
    get route() {
      return "about";
    }
    get title() {
      return _I18n.default.t("sidebar.sections.community.links.about.title");
    }
    get text() {
      return _I18n.default.t("sidebar.sections.community.links.about.content");
    }
    get prefixValue() {
      return "info-circle";
    }
  }
  _exports.default = AboutSectionLink;
});