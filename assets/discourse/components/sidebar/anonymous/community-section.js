define("discourse/components/sidebar/anonymous/community-section", ["exports", "discourse/components/sidebar/common/community-section", "discourse/lib/sidebar/common/community-section/everything-section-link", "discourse/lib/sidebar/common/community-section/about-section-link", "discourse/lib/sidebar/common/community-section/faq-section-link", "discourse/lib/sidebar/common/community-section/groups-section-link", "discourse/lib/sidebar/common/community-section/users-section-link", "discourse/lib/sidebar/common/community-section/badges-section-link"], function (_exports, _communitySection, _everythingSectionLink, _aboutSectionLink, _faqSectionLink, _groupsSectionLink, _usersSectionLink, _badgesSectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/sidebar/common/community-section",0,"discourse/lib/sidebar/common/community-section/everything-section-link",0,"discourse/lib/sidebar/common/community-section/about-section-link",0,"discourse/lib/sidebar/common/community-section/faq-section-link",0,"discourse/lib/sidebar/common/community-section/groups-section-link",0,"discourse/lib/sidebar/common/community-section/users-section-link",0,"discourse/lib/sidebar/common/community-section/badges-section-link"eaimeta@70e063a35619d71f
  class SidebarAnonymousCommunitySection extends _communitySection.default {
    get defaultMainSectionLinks() {
      const defaultLinks = [_everythingSectionLink.default, _usersSectionLink.default, _faqSectionLink.default];
      defaultLinks.splice(this.displayShortSiteDescription ? 0 : 2, 0, _aboutSectionLink.default);
      return defaultLinks;
    }
    get displayShortSiteDescription() {
      return !this.currentUser && (this.siteSettings.short_site_description || "").length > 0;
    }
    get defaultMoreSectionLinks() {
      return [_groupsSectionLink.default, _badgesSectionLink.default];
    }
  }
  _exports.default = SidebarAnonymousCommunitySection;
});