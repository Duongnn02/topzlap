define("ember-on-resize-modifier/modifiers/on-resize", ["exports", "ember-modifier", "@ember/service", "@ember/debug", "@ember/destroyable"], function (_exports, _emberModifier, _service, _debug, _destroyable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let OnResizeModifier = (_class = class OnResizeModifier extends _emberModifier.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "resizeObserver", _descriptor, this);
      _defineProperty(this, "callback", null);
      _defineProperty(this, "element", null);
      (0, _destroyable.registerDestructor)(this, () => {
        this.resizeObserver.unobserve(this.element, this.callback);
      });
    }
    modify(element, _ref) {
      let [callback] = _ref;
      (false && !(typeof callback === 'function') && (0, _debug.assert)(`on-resize-modifier: callback must be a function, but was ${callback}`, typeof callback === 'function'));
      this.resizeObserver.observe(element, callback);
      this.resizeObserver.unobserve(this.element, this.callback);
      this.callback = callback;
      this.element = element;
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "resizeObserver", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = OnResizeModifier;
});