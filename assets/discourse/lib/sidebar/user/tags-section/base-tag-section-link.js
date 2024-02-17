define("discourse/lib/sidebar/user/tags-section/base-tag-section-link", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class BaseTagSectionLink {
    constructor(_ref) {
      let {
        tagName
      } = _ref;
      this.tagName = tagName;
    }
    get name() {
      return this.tagName;
    }
    get text() {
      return this.tagName;
    }
    get prefixType() {
      return "icon";
    }
    get prefixValue() {
      return "tag";
    }
  }
  _exports.default = BaseTagSectionLink;
});