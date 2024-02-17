define("discourse/components/d-toggle-switch", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@glimmer/tracking", "I18n"], function (_exports, _component, _templateFactory, _component2, _tracking, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@glimmer/tracking",0,"I18n"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="d-toggle-switch">
    <label class="d-toggle-switch--label">
      {{! template-lint-disable no-unnecessary-concat  }}
      <button
        class="d-toggle-switch__checkbox"
        type="button"
        role="switch"
        aria-checked="{{@state}}"
        ...attributes
      ></button>
      <span class="d-toggle-switch__checkbox-slider">
        {{#if @state}}
          {{d-icon "check"}}
        {{/if}}
      </span>
    </label>
    <span class="d-toggle-switch__checkbox-label">
      {{this.computedLabel}}
    </span>
  </div>
  */
  {
    "id": "JLaMPfjY",
    "block": "[[[10,0],[14,0,\"d-toggle-switch\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"d-toggle-switch--label\"],[12],[1,\"\\n\"],[1,\"    \"],[11,\"button\"],[24,0,\"d-toggle-switch__checkbox\"],[24,4,\"button\"],[24,\"role\",\"switch\"],[16,\"aria-checked\",[29,[[30,1]]]],[17,2],[12],[13],[1,\"\\n    \"],[10,1],[14,0,\"d-toggle-switch__checkbox-slider\"],[12],[1,\"\\n\"],[41,[30,1],[[[1,\"        \"],[1,[28,[35,1],[\"check\"],null]],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"d-toggle-switch__checkbox-label\"],[12],[1,\"\\n    \"],[1,[30,0,[\"computedLabel\"]]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"@state\",\"&attrs\"],false,[\"if\",\"d-icon\"]]",
    "moduleName": "discourse/components/d-toggle-switch.hbs",
    "isStrictMode": false
  });
  let DiscourseToggleSwitch = (_class = class DiscourseToggleSwitch extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "iconEnabled", _descriptor, this);
      _initializerDefineProperty(this, "showIcon", _descriptor2, this);
    }
    get computedLabel() {
      if (this.args.label) {
        return _I18n.default.t(this.args.label);
      }
      return this.args.translatedLabel;
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "iconEnabled", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return true;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "showIcon", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return this.iconEnabled && this.icon;
    }
  })), _class);
  _exports.default = DiscourseToggleSwitch;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, DiscourseToggleSwitch);
});