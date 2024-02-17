define("select-kit/components/multi-select/multi-select-filter", ["exports", "I18n", "select-kit/components/select-kit/select-kit-filter", "@ember/utils", "discourse-common/utils/decorators", "select-kit/templates/components/select-kit/select-kit-filter", "@ember/object"], function (_exports, _I18n, _selectKitFilter, _utils, _decorators, _selectKitFilter2, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"select-kit/components/select-kit/select-kit-filter",0,"@ember/utils",0,"discourse-common/utils/decorators",0,"select-kit/templates/components/select-kit/select-kit-filter",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _selectKitFilter.default.extend((_dec = (0, _decorators.default)("placeholder", "selectKit.hasSelection"), (_obj = {
    layout: _selectKitFilter2.default,
    classNames: ["multi-select-filter"],
    computedPlaceholder(placeholder, hasSelection) {
      if (hasSelection) {
        return "";
      }
      return (0, _utils.isEmpty)(placeholder) ? "" : _I18n.default.t(placeholder);
    },
    onPaste(event) {
      const data = event?.clipboardData;
      if (!data) {
        return;
      }
      const parts = data.getData("text").split("|").filter(Boolean);
      if (parts.length > 1) {
        event.stopPropagation();
        event.preventDefault();
        this.selectKit.append(parts);
        return false;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "computedPlaceholder", [_dec], Object.getOwnPropertyDescriptor(_obj, "computedPlaceholder"), _obj), _applyDecoratedDescriptor(_obj, "onPaste", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onPaste"), _obj)), _obj)));
  _exports.default = _default;
});