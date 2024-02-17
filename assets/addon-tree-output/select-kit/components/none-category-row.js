define("select-kit/components/none-category-row", ["exports", "select-kit/components/category-row", "discourse/helpers/category-link", "discourse-common/utils/decorators", "select-kit/templates/components/category-row", "@ember/template"], function (_exports, _categoryRow, _categoryLink, _decorators, _categoryRow2, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/category-row",0,"discourse/helpers/category-link",0,"discourse-common/utils/decorators",0,"select-kit/templates/components/category-row",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _categoryRow.default.extend((_dec = (0, _decorators.default)("category"), (_obj = {
    layout: _categoryRow2.default,
    classNames: "none category-row",
    badgeForCategory(category) {
      return (0, _template.htmlSafe)((0, _categoryLink.categoryBadgeHTML)(category, {
        link: this.categoryLink,
        allowUncategorized: true,
        hideParent: true
      }));
    }
  }, (_applyDecoratedDescriptor(_obj, "badgeForCategory", [_dec], Object.getOwnPropertyDescriptor(_obj, "badgeForCategory"), _obj)), _obj)));
  _exports.default = _default;
});