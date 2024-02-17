define("discourse/components/bootstrap-mode-notice", ["exports", "@ember/component", "@ember/template-factory", "@ember/service", "@glimmer/component"], function (_exports, _component, _templateFactory, _service, _component2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/service",0,"@glimmer/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <a class="btn btn-default bootstrap-mode" href={{this.href}}>
    {{i18n "bootstrap_mode"}}
  </a>
  */
  {
    "id": "j9+3U+6N",
    "block": "[[[10,3],[14,0,\"btn btn-default bootstrap-mode\"],[15,6,[30,0,[\"href\"]]],[12],[1,\"\\n  \"],[1,[28,[35,0],[\"bootstrap_mode\"],null]],[1,\"\\n\"],[13]],[],false,[\"i18n\"]]",
    "moduleName": "discourse/components/bootstrap-mode-notice.hbs",
    "isStrictMode": false
  });
  let BootstrapModeNotice = (_class = class BootstrapModeNotice extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "siteSettings", _descriptor, this);
    }
    get href() {
      const topicId = this.siteSettings.admin_quick_start_topic_id;
      return `/t/-/${topicId}`;
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = BootstrapModeNotice;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, BootstrapModeNotice);
});