define("discourse/components/expanding-text-area", ["exports", "discourse-common/utils/decorators", "@ember/legacy-built-in-components", "discourse/lib/autosize", "@ember/runloop"], function (_exports, _decorators, _legacyBuiltInComponents, _autosize, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"@ember/legacy-built-in-components",0,"discourse/lib/autosize",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _legacyBuiltInComponents.TextArea.extend((_dec = (0, _decorators.on)("didInsertElement"), _dec2 = (0, _decorators.observes)("value"), _dec3 = (0, _decorators.on)("willDestroyElement"), (_obj = {
    _startWatching() {
      (0, _runloop.schedule)("afterRender", () => {
        $(this.element).focus();
        (0, _autosize.default)(this.element);
      });
    },
    _updateAutosize() {
      this.element.value = this.value;
      const evt = document.createEvent("Event");
      evt.initEvent("autosize:update", true, false);
      this.element.dispatchEvent(evt);
    },
    _disableAutosize() {
      _autosize.default.destroy($(this.element));
    }
  }, (_applyDecoratedDescriptor(_obj, "_startWatching", [_dec], Object.getOwnPropertyDescriptor(_obj, "_startWatching"), _obj), _applyDecoratedDescriptor(_obj, "_updateAutosize", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_updateAutosize"), _obj), _applyDecoratedDescriptor(_obj, "_disableAutosize", [_dec3], Object.getOwnPropertyDescriptor(_obj, "_disableAutosize"), _obj)), _obj)));
  _exports.default = _default;
});