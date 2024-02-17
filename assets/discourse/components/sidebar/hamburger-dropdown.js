define("discourse/components/sidebar/hamburger-dropdown", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/object", "@ember/service"], function (_exports, _component, _templateFactory, _component2, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="hamburger-panel">
    <div
      class="revamped menu-panel drop-down"
      data-max-width="320"
      {{did-insert this.triggerRenderedAppEvent}}
    >
      <div class="panel-body">
        <div class="panel-body-contents">
          <div class="sidebar-hamburger-dropdown">
            <Sidebar::Sections
              @currentUser={{this.currentUser}}
              @collapsableSections={{true}}
            />
            <Sidebar::Footer @tagName="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  */
  {
    "id": "8KDDbXA0",
    "block": "[[[10,0],[14,0,\"hamburger-panel\"],[12],[1,\"\\n  \"],[11,0],[24,0,\"revamped menu-panel drop-down\"],[24,\"data-max-width\",\"320\"],[4,[38,0],[[30,0,[\"triggerRenderedAppEvent\"]]],null],[12],[1,\"\\n    \"],[10,0],[14,0,\"panel-body\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"panel-body-contents\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"sidebar-hamburger-dropdown\"],[12],[1,\"\\n          \"],[8,[39,1],null,[[\"@currentUser\",\"@collapsableSections\"],[[30,0,[\"currentUser\"]],true]],null],[1,\"\\n          \"],[8,[39,2],null,[[\"@tagName\"],[\"\"]],null],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"did-insert\",\"sidebar/sections\",\"sidebar/footer\"]]",
    "moduleName": "discourse/components/sidebar/hamburger-dropdown.hbs",
    "isStrictMode": false
  });
  let SidebarHamburgerDropdown = (_class = class SidebarHamburgerDropdown extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "appEvents", _descriptor, this);
      _initializerDefineProperty(this, "currentUser", _descriptor2, this);
    }
    triggerRenderedAppEvent() {
      this.appEvents.trigger("sidebar-hamburger-dropdown:rendered");
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "appEvents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "triggerRenderedAppEvent", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "triggerRenderedAppEvent"), _class.prototype)), _class);
  _exports.default = SidebarHamburgerDropdown;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SidebarHamburgerDropdown);
});