define("discourse/widgets/category-link", ["exports", "discourse/widgets/raw-html", "discourse/helpers/category-link"], function (_exports, _rawHtml, _categoryLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/raw-html",0,"discourse/helpers/category-link"eaimeta@70e063a35619d71f
  // Right now it's RawHTML. Eventually it should emit nodes
  class CategoryLink extends _rawHtml.default {
    constructor(attrs) {
      attrs.html = `<span>${(0, _categoryLink.categoryBadgeHTML)(attrs.category, attrs)}</span>`;
      super(attrs);
    }
  }
  _exports.default = CategoryLink;
});