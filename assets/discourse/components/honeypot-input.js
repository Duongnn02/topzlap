define("discourse/components/honeypot-input", ["exports", "discourse/components/text-field", "discourse-common/utils/decorators"], function (_exports, _textField, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/text-field",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _textField.default.extend((_dec = (0, _decorators.on)("init"), (_obj = {
    _init() {
      // Chrome autocomplete is buggy per:
      // https://bugs.chromium.org/p/chromium/issues/detail?id=987293
      // work around issue while leaving a semi useable honeypot for
      // bots that are running full Chrome
      if (navigator.userAgent.includes("Chrome")) {
        this.set("type", "text");
      } else {
        this.set("type", "password");
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_init", [_dec], Object.getOwnPropertyDescriptor(_obj, "_init"), _obj)), _obj)));
  _exports.default = _default;
});