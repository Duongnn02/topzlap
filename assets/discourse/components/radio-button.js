define("discourse/components/radio-button", ["exports", "@ember/component", "discourse-common/utils/decorators"], function (_exports, _component, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend((_dec = (0, _decorators.default)("value", "selection"), (_obj = {
    tagName: "input",
    type: "radio",
    attributeBindings: ["name", "type", "value", "checked:checked", "disabled:disabled"],
    click() {
      const value = $(this.element).val();
      if (this.onChange) {
        this.onChange(value);
      } else {
        if (this.selection === value) {
          this.set("selection", undefined);
        }
        this.set("selection", value);
      }
    },
    checked(value, selection) {
      return value === selection;
    }
  }, (_applyDecoratedDescriptor(_obj, "checked", [_dec], Object.getOwnPropertyDescriptor(_obj, "checked"), _obj)), _obj)));
  _exports.default = _default;
});