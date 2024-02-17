define("select-kit/components/category-drop/category-drop-header", ["exports", "select-kit/components/combo-box/combo-box-header", "discourse-common/utils/decorators", "select-kit/templates/components/category-drop/category-drop-header", "@ember/object/computed", "@ember/runloop", "@ember/template"], function (_exports, _comboBoxHeader, _decorators, _categoryDropHeader, _computed, _runloop, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/combo-box/combo-box-header",0,"discourse-common/utils/decorators",0,"select-kit/templates/components/category-drop/category-drop-header",0,"@ember/object/computed",0,"@ember/runloop",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _comboBoxHeader.default.extend((_dec = (0, _decorators.default)("selectedContent.color"), _dec2 = (0, _decorators.default)("selectedContent.text_color"), _dec3 = (0, _decorators.default)("selectedContent", "categoryBackgroundColor", "categoryTextColor"), (_obj = {
    layout: _categoryDropHeader.default,
    classNames: ["category-drop-header"],
    classNameBindings: ["categoryStyleClass"],
    categoryStyleClass: (0, _computed.readOnly)("site.category_style"),
    categoryBackgroundColor(categoryColor) {
      return categoryColor || "#e9e9e9";
    },
    categoryTextColor(categoryTextColor) {
      return categoryTextColor || "#333";
    },
    categoryStyle(category, categoryBackgroundColor, categoryTextColor) {
      const categoryStyle = this.siteSettings.category_style;
      if (categoryStyle === "bullet") {
        return;
      }
      if (category) {
        if (categoryBackgroundColor || categoryTextColor) {
          let style = "";
          if (categoryBackgroundColor) {
            if (categoryStyle === "box") {
              style += `border-color: #${categoryBackgroundColor}; background-color: #${categoryBackgroundColor};`;
              if (categoryTextColor) {
                style += `color: #${categoryTextColor};`;
              }
            }
          }
          return (0, _template.htmlSafe)(style);
        }
      }
    },
    didInsertElement() {
      this._super(...arguments);
      (0, _runloop.schedule)("afterRender", () => {
        if (this.categoryStyle) {
          this.element.setAttribute("style", this.categoryStyle);
          this.element.querySelector(".caret-icon").setAttribute("style", this.categoryStyle);
        }
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "categoryBackgroundColor", [_dec], Object.getOwnPropertyDescriptor(_obj, "categoryBackgroundColor"), _obj), _applyDecoratedDescriptor(_obj, "categoryTextColor", [_dec2], Object.getOwnPropertyDescriptor(_obj, "categoryTextColor"), _obj), _applyDecoratedDescriptor(_obj, "categoryStyle", [_dec3], Object.getOwnPropertyDescriptor(_obj, "categoryStyle"), _obj)), _obj)));
  _exports.default = _default;
});