define("discourse/components/d-tooltip", ["exports", "@ember/component", "@ember/template-factory", "@ember/runloop", "tippy.js", "ember"], function (_exports, _component, _templateFactory, _runloop, _tippy, _ember) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/runloop",0,"tippy.js",0,"ember"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div>
    {{yield}}
  </div>
  */
  {
    "id": "j/A+y0fx",
    "block": "[[[10,0],[12],[1,\"\\n  \"],[18,1,null],[1,\"\\n\"],[13]],[\"&default\"],false,[\"yield\"]]",
    "moduleName": "discourse/components/d-tooltip.hbs",
    "isStrictMode": false
  });
  class DiscourseTooltip extends _component.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "tagName", "");
      _defineProperty(this, "interactive", false);
    }
    didInsertElement() {
      this._super(...arguments);
      this._initTippy();
    }
    willDestroyElement() {
      this._super(...arguments);
      this._tippyInstance.destroy();
    }
    stopPropagation(instance, event) {
      event.stopPropagation();
    }
    _initTippy() {
      (0, _runloop.schedule)("afterRender", () => {
        // Ember.ViewUtils.getViewBounds is a private API,
        // but it's not going to be dropped without a public deprecation warning,
        // see: https://stackoverflow.com/a/50125938/3206146
        const viewBounds = _ember.default.ViewUtils.getViewBounds(this);
        const element = viewBounds.firstNode;
        const parent = viewBounds.parentElement;
        const interactive = this.interactive;
        this._tippyInstance = (0, _tippy.default)(parent, {
          interactive,
          content: element,
          trigger: this.capabilities.touch ? "click" : "mouseenter",
          theme: "d-tooltip",
          arrow: false,
          placement: "bottom-start",
          onTrigger: this.stopPropagation,
          onUntrigger: this.stopPropagation
        });
      });
    }
  }
  _exports.default = DiscourseTooltip;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, DiscourseTooltip);
});