define("discourse/components/d-section", ["exports", "discourse-common/lib/deprecated", "@ember/component", "discourse/mixins/scroll-top", "@ember/runloop"], function (_exports, _deprecated, _component, _scrollTop, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/deprecated",0,"@ember/component",0,"discourse/mixins/scroll-top",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  // Can add a body class from within a component, also will scroll to the top automatically.
  class _default extends _component.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "tagName", null);
      _defineProperty(this, "pageClass", null);
      _defineProperty(this, "bodyClass", null);
      _defineProperty(this, "scrollTop", true);
      _defineProperty(this, "currentClasses", new Set());
    }
    didInsertElement() {
      this._super(...arguments);
      if (this.scrollTop === "false") {
        (0, _deprecated.default)("Uses boolean instead of string for scrollTop.", {
          since: "2.8.0.beta9",
          dropFrom: "2.9.0.beta1",
          id: "discourse.d-section.scroll-top-boolean"
        });
        return;
      }
      if (!this.scrollTop) {
        return;
      }
      (0, _scrollTop.scrollTop)();
    }
    didReceiveAttrs() {
      this._super(...arguments);
      (0, _runloop.scheduleOnce)("afterRender", this, this._updateClasses);
    }
    willDestroyElement() {
      this._super(...arguments);
      (0, _runloop.scheduleOnce)("afterRender", this, this._removeClasses);
    }
    _updateClasses() {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      const desiredClasses = new Set();
      if (this.pageClass) {
        desiredClasses.add(`${this.pageClass}-page`);
      }
      if (this.bodyClass) {
        for (const bodyClass of this.bodyClass.split(" ")) {
          desiredClasses.add(bodyClass);
        }
      }
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