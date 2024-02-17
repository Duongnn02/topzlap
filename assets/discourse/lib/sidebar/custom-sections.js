define("discourse/lib/sidebar/custom-sections", ["exports", "discourse/lib/sidebar/base-custom-sidebar-section", "discourse/lib/sidebar/base-custom-sidebar-section-link"], function (_exports, _baseCustomSidebarSection, _baseCustomSidebarSectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addSidebarSection = addSidebarSection;
  _exports.customSections = void 0;
  _exports.resetSidebarSection = resetSidebarSection;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/sidebar/base-custom-sidebar-section",0,"discourse/lib/sidebar/base-custom-sidebar-section-link"eaimeta@70e063a35619d71f
  const customSections = [];
  _exports.customSections = customSections;
  function addSidebarSection(func) {
    customSections.push(func.call(this, _baseCustomSidebarSection.default, _baseCustomSidebarSectionLink.default));
  }
  function resetSidebarSection() {
    customSections.length = 0;
  }
});