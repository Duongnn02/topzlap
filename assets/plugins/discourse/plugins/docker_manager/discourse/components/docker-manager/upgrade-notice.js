define("discourse/plugins/docker_manager/discourse/components/docker-manager/upgrade-notice", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service"], function (_exports, _component, _templateFactory, _component2, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.currentUser.admin}}
    {{#unless @versionCheck.upToDate}}
      <div class="upgrades-banner">
        {{i18n "admin.docker.outdated_notice"}}
  
        <LinkTo @route="upgrade">
          {{i18n "admin.docker.perform_upgrade"}}
        </LinkTo>
      </div>
    {{/unless}}
  {{/if}}
  */
  {
    "id": "RlHoQw+/",
    "block": "[[[41,[30,0,[\"currentUser\",\"admin\"]],[[[41,[51,[30,1,[\"upToDate\"]]],[[[1,\"    \"],[10,0],[14,0,\"upgrades-banner\"],[12],[1,\"\\n      \"],[1,[28,[35,2],[\"admin.docker.outdated_notice\"],null]],[1,\"\\n\\n      \"],[8,[39,3],null,[[\"@route\"],[\"upgrade\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,2],[\"admin.docker.perform_upgrade\"],null]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]],null]],[\"@versionCheck\"],false,[\"if\",\"unless\",\"i18n\",\"link-to\"]]",
    "moduleName": "discourse/plugins/docker_manager/discourse/components/docker-manager/upgrade-notice.hbs",
    "isStrictMode": false
  });
  let UpgradeNotice = (_class = class UpgradeNotice extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "currentUser", _descriptor, this);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = UpgradeNotice;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UpgradeNotice);
});