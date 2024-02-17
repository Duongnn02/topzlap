define("discourse/controllers/user-private-messages-tags-index", ["exports", "@ember/controller", "@ember/object", "@glimmer/tracking"], function (_exports, _controller, _object, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let _class = (_class2 = class _class2 extends _controller.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "tagsForUser", _descriptor, this);
      _initializerDefineProperty(this, "sortedByCount", _descriptor2, this);
      _initializerDefineProperty(this, "sortedByName", _descriptor3, this);
      _initializerDefineProperty(this, "sortProperties", _descriptor4, this);
    }
    sortByCount(event) {
      event?.preventDefault();
      this.sortProperties = ["count:desc", "id"];
      this.sortedByCount = true;
      this.sortedByName = false;
    }
    sortById(event) {
      event?.preventDefault();
      this.sortProperties = ["id"];
      this.sortedByCount = false;
      this.sortedByName = true;
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tagsForUser", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sortedByCount", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return true;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sortedByName", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sortProperties", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return ["count:desc", "id"];
    }
  }), _applyDecoratedDescriptor(_class2.prototype, "sortByCount", [_object.action], Object.getOwnPropertyDescriptor(_class2.prototype, "sortByCount"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sortById", [_object.action], Object.getOwnPropertyDescriptor(_class2.prototype, "sortById"), _class2.prototype)), _class2);
  _exports.default = _class;
});