define("discourse/components/d-popover", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/lib/icon-library", "tippy.js", "@ember/object/internals", "@ember/object", "@ember/runloop", "discourse/lib/d-popover"], function (_exports, _component, _templateFactory, _iconLibrary, _tippy, _internals, _object, _runloop, _dPopover) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/lib/icon-library",0,"tippy.js",0,"@ember/object/internals",0,"@ember/object",0,"@ember/runloop",0,"discourse/lib/d-popover"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{! template-lint-disable no-invalid-interactive }}
  <div
    {{on "click" (action "close")}}
    id={{this.componentId}}
    class="d-popover {{this.class}} {{if this.isExpanded 'is-expanded'}}"
  >
    {{yield (hash isExpanded=this.isExpanded)}}
  </div>
  */
  {
    "id": "0xUvVv99",
    "block": "[[[11,0],[16,1,[30,0,[\"componentId\"]]],[16,0,[29,[\"d-popover \",[30,0,[\"class\"]],\" \",[52,[30,0,[\"isExpanded\"]],\"is-expanded\"]]]],[4,[38,1],[\"click\",[28,[37,2],[[30,0],\"close\"],null]],null],[12],[1,\"\\n  \"],[18,1,[[28,[37,4],null,[[\"isExpanded\"],[[30,0,[\"isExpanded\"]]]]]]],[1,\"\\n\"],[13]],[\"&default\"],false,[\"if\",\"on\",\"action\",\"yield\",\"hash\"]]",
    "moduleName": "discourse/components/d-popover.hbs",
    "isStrictMode": false
  });
  let DiscoursePopover = (_class = class DiscoursePopover extends _component.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "tagName", "");
      _defineProperty(this, "isExpanded", false);
      _defineProperty(this, "options", null);
      _defineProperty(this, "class", null);
    }
    didInsertElement() {
      this._super(...arguments);
      this._tippyInstance = this._setupTippy();
    }
    willDestroyElement() {
      this._super(...arguments);
      this._tippyInstance?.destroy();
    }
    get componentId() {
      return (0, _internals.guidFor)(this);
    }
    close(event) {
      event.preventDefault();
      if (!this.isExpanded) {
        return;
      }
      this._tippyInstance?.hide();
    }
    _setupTippy() {
      const baseOptions = {
        trigger: "click",
        zIndex: 1400,
        arrow: (0, _iconLibrary.iconHTML)("tippy-rounded-arrow"),
        interactive: true,
        allowHTML: false,
        appendTo: "parent",
        hideOnClick: true,
        plugins: [_dPopover.hideOnEscapePlugin],
        content: this.options?.content || document.getElementById(this.componentId).querySelector(":scope > .d-popover-content, :scope > div, :scope > ul"),
        onShow: () => {
          (0, _runloop.next)(() => {
            if (this.isDestroyed || this.isDestroying) {
              return;
            }
            this.set("isExpanded", true);
          });
          return true;
        },
        onHide: () => {
          (0, _runloop.next)(() => {
            if (this.isDestroyed || this.isDestroying) {
              return;
            }
            this.set("isExpanded", false);
          });
          return true;
        }
      };
      const target = document.getElementById(this.componentId).querySelector(':scope > .d-popover-trigger, :scope > .btn, :scope > [role="button"]');
      if (!target) {
        return null;
      }
      const instance = (0, _tippy.default)(target, Object.assign({}, baseOptions, this.options || {}));
      return instance?.id ? instance : null;
    }
  }, (_applyDecoratedDescriptor(_class.prototype, "close", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype)), _class);
  _exports.default = DiscoursePopover;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, DiscoursePopover);
});