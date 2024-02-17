define("select-kit/components/multi-select/selected-color", ["exports", "select-kit/components/selected-name", "discourse-common/utils/decorators", "@ember/template"], function (_exports, _selectedName, _decorators, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/selected-name",0,"discourse-common/utils/decorators",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _selectedName.default.extend((_dec = (0, _decorators.default)("name"), (_obj = {
    classNames: ["select-kit-selected-color"],
    footerContent(name) {
      return (0, _template.htmlSafe)(`<span class="color-preview" style="background:#${name}"></span>`);
    }
  }, (_applyDecoratedDescriptor(_obj, "footerContent", [_dec], Object.getOwnPropertyDescriptor(_obj, "footerContent"), _obj)), _obj)));
  _exports.default = _default;
});