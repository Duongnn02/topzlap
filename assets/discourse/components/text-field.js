define("discourse/components/text-field", ["exports", "@ember/runloop", "discourse/lib/text-direction", "I18n", "@ember/legacy-built-in-components", "discourse-common/utils/decorators", "discourse-common/lib/debounce"], function (_exports, _runloop, _textDirection, _I18n, _legacyBuiltInComponents, _decorators, _debounce) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"discourse/lib/text-direction",0,"I18n",0,"@ember/legacy-built-in-components",0,"discourse-common/utils/decorators",0,"discourse-common/lib/debounce"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const DEBOUNCE_MS = 500;
  var _default = _legacyBuiltInComponents.TextField.extend((_dec = (0, _decorators.default)("placeholderKey"), (_obj = {
    attributeBindings: ["autocorrect", "autocapitalize", "autofocus", "maxLength", "dir", "aria-label", "aria-controls"],
    init() {
      this._super(...arguments);
      this._prevValue = null;
      this._timer = null;
    },
    didReceiveAttrs() {
      this._super(...arguments);
      this._prevValue = this.value;
    },
    didUpdateAttrs() {
      this._super(...arguments);
      if (this._prevValue !== this.value) {
        if (this.onChangeImmediate) {
          (0, _runloop.next)(() => this.onChangeImmediate(this.value));
        }
        if (this.onChange) {
          (0, _runloop.cancel)(this._timer);
          this._timer = (0, _debounce.default)(this, this._debouncedChange, DEBOUNCE_MS);
        }
      }
    },
    _debouncedChange() {
      (0, _runloop.next)(() => this.onChange(this.value));
    },
    get dir() {
      if (this.siteSettings.support_mixed_text_direction) {
        const val = this.get("value");
        if (val && (0, _textDirection.isRTL)(val)) {
          return "rtl";
        } else if (val && (0, _textDirection.isLTR)(val)) {
          return "ltr";
        } else {
          return (0, _textDirection.siteDir)();
        }
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      (0, _runloop.cancel)(this._timer);
    },
    placeholder: {
      get() {
        if (this._placeholder) {
          return this._placeholder;
        }
        return this.placeholderKey ? _I18n.default.t(this.placeholderKey) : "";
      },
      set(value) {
        return this._placeholder = value;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "placeholder", [_dec], (_init = Object.getOwnPropertyDescriptor(_obj, "placeholder"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj)), _obj)));
  _exports.default = _default;
});