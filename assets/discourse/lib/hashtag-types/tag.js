define("discourse/lib/hashtag-types/tag", ["exports", "discourse/lib/hashtag-types/base"], function (_exports, _base) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/hashtag-types/base"eaimeta@70e063a35619d71f
  class TagHashtagType extends _base.default {
    get type() {
      return "tag";
    }
    get preloadedData() {
      return [];
    }
    generateColorCssClasses() {
      return [];
    }
  }
  _exports.default = TagHashtagType;
});