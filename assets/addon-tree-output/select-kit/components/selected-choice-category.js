define("select-kit/components/selected-choice-category", ["exports", "select-kit/templates/components/selected-choice-category", "select-kit/components/selected-choice", "discourse/helpers/category-link", "@ember/object", "@ember/template"], function (_exports, _selectedChoiceCategory, _selectedChoice, _categoryLink, _object, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/templates/components/selected-choice-category",0,"select-kit/components/selected-choice",0,"discourse/helpers/category-link",0,"@ember/object",0,"@ember/template"eaimeta@70e063a35619d71f
  var _default = _selectedChoice.default.extend({
    tagName: "",
    layout: _selectedChoiceCategory.default,
    extraClass: "selected-choice-category",
    badge: (0, _object.computed)("item", function () {
      return (0, _template.htmlSafe)((0, _categoryLink.categoryBadgeHTML)(this.item, {
        allowUncategorized: true,
        link: false
      }));
    })
  });
  _exports.default = _default;
});