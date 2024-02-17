define("discourse/lib/sidebar/helpers", ["exports", "discourse/models/category"], function (_exports, _category) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.canDisplayCategory = canDisplayCategory;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/category"eaimeta@70e063a35619d71f
  function canDisplayCategory(categoryId, siteSettings) {
    if (siteSettings.allow_uncategorized_topics) {
      return true;
    }
    return !_category.default.isUncategorized(categoryId);
  }
});