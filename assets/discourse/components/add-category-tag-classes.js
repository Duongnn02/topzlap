define("discourse/components/add-category-tag-classes", ["exports", "@ember/component", "@ember/runloop"], function (_exports, _component, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  class _default extends _component.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "tagName", "");
      _defineProperty(this, "currentClasses", new Set());
    }
    didReceiveAttrs() {
      (0, _runloop.scheduleOnce)("afterRender", this, this._updateClasses);
    }
    willDestroyElement() {
      (0, _runloop.scheduleOnce)("afterRender", this, this._removeClasses);
    }
    _updateClasses() {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      const desiredClasses = new Set();
      const slug = this.category?.fullSlug;
      if (slug) {
        desiredClasses.add("category");
        desiredClasses.add(`category-${slug}`);
      }
      this.tags?.forEach(t => desiredClasses.add(`tag-${t}`));
      document.body.classList.add(...desiredClasses);
      const removeClasses = [...this.currentClasses].filter(c => !desiredClasses.has(c));
      document.body.classList.remove(...removeClasses);
      this.currentClasses = desiredClasses;
    }
    _removeClasses() {
      document.body.classList.remove(...this.currentClasses);
    }
  }
  _exports.default = _default;
});