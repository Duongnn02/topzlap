define("discourse/components/color-picker-choice", ["exports", "@ember/component", "I18n", "discourse-common/utils/decorators", "@ember/template"], function (_exports, _component, _I18n, _decorators, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend((_dec = (0, _decorators.default)("color", "usedColors"), _dec2 = (0, _decorators.default)("isUsed"), _dec3 = (0, _decorators.default)("color"), (_obj = {
    tagName: "button",
    attributeBindings: ["style", "title"],
    classNameBindings: [":colorpicker", "isUsed:used-color:unused-color"],
    isUsed(color, usedColors) {
      return (usedColors || []).includes(color.toUpperCase());
    },
    title(isUsed) {
      return isUsed ? _I18n.default.t("category.already_used") : null;
    },
    style(color) {
      return (0, _template.htmlSafe)(`background-color: #${color};`);
    },
    click(e) {
      e.preventDefault();
      this.selectColor(this.color);
    }
  }, (_applyDecoratedDescriptor(_obj, "isUsed", [_dec], Object.getOwnPropertyDescriptor(_obj, "isUsed"), _obj), _applyDecoratedDescriptor(_obj, "title", [_dec2], Object.getOwnPropertyDescriptor(_obj, "title"), _obj), _applyDecoratedDescriptor(_obj, "style", [_dec3], Object.getOwnPropertyDescriptor(_obj, "style"), _obj)), _obj)));
  _exports.default = _default;
});