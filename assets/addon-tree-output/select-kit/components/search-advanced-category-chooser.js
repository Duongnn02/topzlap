define("select-kit/components/search-advanced-category-chooser", ["exports", "select-kit/components/category-chooser"], function (_exports, _categoryChooser) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/category-chooser"eaimeta@70e063a35619d71f
  var _default = _categoryChooser.default.extend({
    pluginApiIdentifiers: ["search-advanced-category-chooser"],
    classNames: ["search-advanced-category-chooser"],
    selectKitOptions: {
      allowUncategorized: true,
      clearable: true,
      none: "category.all",
      displayCategoryDescription: false,
      permissionType: null
    }
  });
  _exports.default = _default;
});