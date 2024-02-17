define("discourse/mixins/docking", ["exports", "@ember/object/mixin", "discourse-common/lib/debounce", "@ember/runloop", "discourse-common/lib/later", "discourse-common/utils/decorators"], function (_exports, _mixin, _debounce, _runloop, _later, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/mixin",0,"discourse-common/lib/debounce",0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const INITIAL_DELAY_MS = 50;
  const DEBOUNCE_MS = 5;
  var _default = _mixin.default.create((_obj = {
    _initialTimer: null,
    _queuedTimer: null,
    didInsertElement() {
      this._super(...arguments);
      window.addEventListener("scroll", this.queueDockCheck, {
        passive: true
      });
      document.addEventListener("touchmove", this.queueDockCheck, {
        passive: true
      });

      // dockCheck might happen too early on full page refresh
      this._initialTimer = (0, _later.default)(this, this.safeDockCheck, INITIAL_DELAY_MS);
    },
    willDestroyElement() {
      this._super(...arguments);
      if (this._queuedTimer) {
        (0, _runloop.cancel)(this._queuedTimer);
      }
      (0, _runloop.cancel)(this._initialTimer);
      window.removeEventListener("scroll", this.queueDockCheck);
      document.removeEventListener("touchmove", this.queueDockCheck);
    },
    queueDockCheck() {
      this._queuedTimer = (0, _debounce.default)(this, this.safeDockCheck, DEBOUNCE_MS);
    },
    safeDockCheck() {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }
      this.dockCheck();
    }
  }, (_applyDecoratedDescriptor(_obj, "queueDockCheck", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "queueDockCheck"), _obj), _applyDecoratedDescriptor(_obj, "safeDockCheck", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "safeDockCheck"), _obj)), _obj));
  _exports.default = _default;
});