define("discourse/helpers/category-badge", ["discourse/helpers/category-link", "discourse-common/lib/helpers", "@ember/utils"], function (_categoryLink, _helpers, _utils) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/helpers/category-link",0,"discourse-common/lib/helpers",0,"@ember/utils"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("category-badge", function (cat, options) {
    return (0, _categoryLink.categoryLinkHTML)(cat, {
      hideParent: options.hideParent,
      allowUncategorized: options.allowUncategorized,
      categoryStyle: options.categoryStyle,
      link: (0, _utils.isPresent)(options.link) ? options.link : false
    });
  });
});