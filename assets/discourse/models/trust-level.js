define("discourse/models/trust-level", ["exports", "@ember/object", "I18n"], function (_exports, _object, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let TrustLevel = (_class = class TrustLevel {
    constructor(id, key) {
      this.id = id;
      this._key = key;
    }
    get name() {
      return _I18n.default.t(`trust_levels.names.${this._key}`);
    }
    get detailedName() {
      return _I18n.default.t("trust_levels.detailed_name", {
        level: this.id,
        name: this.name
      });
    }
  }, (_applyDecoratedDescriptor(_class.prototype, "name", [_object.computed], Object.getOwnPropertyDescriptor(_class.prototype, "name"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "detailedName", [_object.computed], Object.getOwnPropertyDescriptor(_class.prototype, "detailedName"), _class.prototype)), _class);
  _exports.default = TrustLevel;
});