define("discourse/components/number-field", ["exports", "I18n", "discourse/components/text-field", "discourse-common/utils/decorators"], function (_exports, _I18n, _textField, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/components/text-field",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const ALLOWED_KEYS = ["Enter", "Backspace", "Tab", "Delete", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var _default = _textField.default.extend((_dec = (0, _decorators.default)("number"), _dec2 = (0, _decorators.default)("placeholderKey"), (_obj = {
    classNameBindings: ["invalid"],
    keyDown: function (e) {
      return ALLOWED_KEYS.includes(e.key) || e.key === "-" && parseInt(this.get("min"), 10) < 0;
    },
    value: {
      get(number) {
        return parseInt(number, 10);
      },
      set(value) {
        const num = parseInt(value, 10);
        if (isNaN(num)) {
          this.set("invalid", true);
          return value;
        } else {
          this.set("invalid", false);
          this.set("number", num);
          return num.toString();
        }
      }
    },
    placeholder(key) {
      return key ? _I18n.default.t(key) : "";
    }
  }, (_applyDecoratedDescriptor(_obj, "value", [_dec], (_init = Object.getOwnPropertyDescriptor(_obj, "value"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "placeholder", [_dec2], Object.getOwnPropertyDescriptor(_obj, "placeholder"), _obj)), _obj)));
  _exports.default = _default;
});