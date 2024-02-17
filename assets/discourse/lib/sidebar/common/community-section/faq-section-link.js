define("discourse/lib/sidebar/common/community-section/faq-section-link", ["exports", "I18n", "discourse/lib/sidebar/base-community-section-link"], function (_exports, _I18n, _baseCommunitySectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/sidebar/base-community-section-link"eaimeta@70e063a35619d71f
  class FAQSectionLink extends _baseCommunitySectionLink.default {
    get name() {
      return "faq";
    }
    get route() {
      return "faq";
    }
    get href() {
      return this.siteSettings.faq_url;
    }
    get title() {
      return _I18n.default.t("sidebar.sections.community.links.faq.title");
    }
    get text() {
      return _I18n.default.t("sidebar.sections.community.links.faq.content");
    }
    get prefixValue() {
      return "question-circle";
    }
  }
  _exports.default = FAQSectionLink;
});