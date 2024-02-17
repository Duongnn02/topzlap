define("@glimmer/component/-private/base-component-manager", ["exports", "@glimmer/component/-private/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = BaseComponentManager;
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  /**
   * This factory function returns a component manager class with common behavior
   * that can be extend to add Glimmer.js- or Ember.js-specific functionality. As
   * these environments converge, the need for two component manager
   * implementations (and thus this factory) should go away.
   */
  function BaseComponentManager(setOwner, getOwner, capabilities) {
    return class {
      static create(attrs) {
        let owner = getOwner(attrs);
        return new this(owner);
      }
      constructor(owner) {
        _defineProperty(this, "capabilities", capabilities);
        setOwner(this, owner);
      }
      createComponent(ComponentClass, args) {
        if (false /* DEBUG */) {
          _component.ARGS_SET.set(args.named, true);
        }
        return new ComponentClass(getOwner(this), args.named);
      }
      getContext(component) {
        return component;
      }
    };
  }
});