define("discourse/lib/sidebar/user/tags-section/pm-tag-section-link", ["exports", "discourse/lib/sidebar/user/tags-section/base-tag-section-link"], function (_exports, _baseTagSectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/sidebar/user/tags-section/base-tag-section-link"eaimeta@70e063a35619d71f
  class PMTagSectionLink extends _baseTagSectionLink.default {
    constructor(_ref) {
      let {
        currentUser
      } = _ref;
      super(...arguments);
      this.currentUser = currentUser;
    }
    get models() {
      return [this.currentUser, this.tagName];
    }
    get route() {
      return "userPrivateMessages.tags.show";
    }
  }
  _exports.default = PMTagSectionLink;
});