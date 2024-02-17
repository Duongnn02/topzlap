define("discourse/plugins/docker_manager/discourse/controllers/upgrade", ["exports", "@ember/controller", "@glimmer/tracking", "@ember/object", "@ember-compat/tracked-built-ins"], function (_exports, _controller, _tracking, _object, _trackedBuiltIns) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@glimmer/tracking",0,"@ember/object",0,"@ember-compat/tracked-built-ins"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let Upgrade = (_class = class Upgrade extends _controller.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "banner", _descriptor, this);
      _initializerDefineProperty(this, "bannerDismissed", _descriptor2, this);
    }
    get showBanner() {
      if (this.bannerDismissed) {
        return false;
      }
      return this.banner?.length > 0;
    }
    appendBannerHtml(html) {
      if (!this.banner.includes(html)) {
        this.banner.push(html);
      }
    }
    dismiss() {
      this.bannerDismissed = true;
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "banner", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return new _trackedBuiltIns.TrackedArray([]);
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "bannerDismissed", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "dismiss", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "dismiss"), _class.prototype)), _class);
  _exports.default = Upgrade;
});