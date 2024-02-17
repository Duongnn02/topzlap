define("select-kit/components/multi-select/selected-category", ["exports", "select-kit/components/selected-name", "discourse/helpers/category-link", "@ember/object", "select-kit/templates/components/multi-select/selected-category", "@ember/template"], function (_exports, _selectedName, _categoryLink, _object, _selectedCategory, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/selected-name",0,"discourse/helpers/category-link",0,"@ember/object",0,"select-kit/templates/components/multi-select/selected-category",0,"@ember/template"eaimeta@70e063a35619d71f
  var _default = _selectedName.default.extend({
    classNames: ["selected-category"],
    layout: _selectedCategory.default,
    badge: (0, _object.computed)("item", function () {
      return (0, _template.htmlSafe)((0, _categoryLink.categoryBadgeHTML)(this.item, {
        allowUncategorized: true,
        link: false
      }));
    })
  });
  _exports.default = _default;
});