define("discourse/components/sidebar", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "discourse-common/utils/decorators", "@ember/service"], function (_exports, _component, _templateFactory, _component2, _decorators, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"discourse-common/utils/decorators",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection
    @pageClass="has-sidebar"
    @id="d-sidebar"
    @class="sidebar-container"
    @scrollTop={{false}}
  >
    <Sidebar::Sections
      @currentUser={{this.currentUser}}
      @collapsableSections={{true}}
    />
    <Sidebar::Footer />
  </DSection>
  */
  {
    "id": "n0DQ9nl8",
    "block": "[[[8,[39,0],null,[[\"@pageClass\",\"@id\",\"@class\",\"@scrollTop\"],[\"has-sidebar\",\"d-sidebar\",\"sidebar-container\",false]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@currentUser\",\"@collapsableSections\"],[[30,0,[\"currentUser\"]],true]],null],[1,\"\\n  \"],[8,[39,2],null,null,null],[1,\"\\n\"]],[]]]]]],[],false,[\"d-section\",\"sidebar/sections\",\"sidebar/footer\"]]",
    "moduleName": "discourse/components/sidebar.hbs",
    "isStrictMode": false
  });
  let Sidebar = (_class = class Sidebar extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "appEvents", _descriptor, this);
      _initializerDefineProperty(this, "site", _descriptor2, this);
      _initializerDefineProperty(this, "currentUser", _descriptor3, this);
      if (this.site.mobileView) {
        document.addEventListener("click", this.collapseSidebar);
      }
    }
    collapseSidebar(event) {
      let shouldCollapseSidebar = false;
      const isClickWithinSidebar = event.composedPath().some(element => {
        if (element?.className !== "sidebar-section-header-caret" && ["A", "BUTTON"].includes(element.nodeName)) {
          shouldCollapseSidebar = true;
          return true;
        }
        return element.className && element.className === "sidebar-wrapper";
      });
      if (shouldCollapseSidebar || !isClickWithinSidebar) {
        this.args.toggleSidebar();
      }
    }
    willDestroy() {
      if (this.site.mobileView) {
        document.removeEventListener("click", this.collapseSidebar);
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "appEvents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "site", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "collapseSidebar", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "collapseSidebar"), _class.prototype)), _class);
  _exports.default = Sidebar;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, Sidebar);
});