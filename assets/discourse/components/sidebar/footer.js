define("discourse/components/sidebar/footer", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service", "@ember/object", "discourse/lib/show-modal"], function (_exports, _component, _templateFactory, _component2, _service, _object, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service",0,"@ember/object",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="sidebar-footer-wrapper">
    <div class="sidebar-footer-container">
      <div class="sidebar-footer-actions">
        <PluginOutlet @name="sidebar-footer-actions" />
  
        {{#if this.currentUser.custom_sidebar_sections_enabled}}
          <DButton
            @icon="plus"
            @action={{action this.addSection}}
            @class="btn-flat add-section"
            @title="sidebar.sections.custom.add"
          />
        {{/if}}
  
        {{#if
          (or
            this.site.mobileView
            (and this.siteSettings.enable_mobile_theme this.capabilities.touch)
          )
        }}
          <DButton
            @action={{route-action "toggleMobileView"}}
            @title={{if this.site.mobileView "desktop_view" "mobile_view"}}
            @icon={{if this.site.mobileView "desktop" "mobile-alt"}}
            @class="sidebar-footer-actions-button sidebar-footer-actions-toggle-mobile-view"
          />
        {{/if}}
  
        {{#if this.site.desktopView}}
          <DButton
            @action={{route-action "showKeyboardShortcutsHelp"}}
            @title="keyboard_shortcuts_help.title"
            @icon="keyboard"
            @class="btn-flat sidebar-footer-actions-button sidebar-footer-actions-keyboard-shortcuts"
          />
        {{/if}}
      </div>
    </div>
  </div>
  */
  {
    "id": "mMh8C1p3",
    "block": "[[[10,0],[14,0,\"sidebar-footer-wrapper\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"sidebar-footer-container\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"sidebar-footer-actions\"],[12],[1,\"\\n      \"],[8,[39,0],null,[[\"@name\"],[\"sidebar-footer-actions\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"currentUser\",\"custom_sidebar_sections_enabled\"]],[[[1,\"        \"],[8,[39,2],null,[[\"@icon\",\"@action\",\"@class\",\"@title\"],[\"plus\",[28,[37,3],[[30,0],[30,0,[\"addSection\"]]],null],\"btn-flat add-section\",\"sidebar.sections.custom.add\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,4],[[30,0,[\"site\",\"mobileView\"]],[28,[37,5],[[30,0,[\"siteSettings\",\"enable_mobile_theme\"]],[30,0,[\"capabilities\",\"touch\"]]],null]],null],[[[1,\"        \"],[8,[39,2],null,[[\"@action\",\"@title\",\"@icon\",\"@class\"],[[28,[37,6],[\"toggleMobileView\"],null],[52,[30,0,[\"site\",\"mobileView\"]],\"desktop_view\",\"mobile_view\"],[52,[30,0,[\"site\",\"mobileView\"]],\"desktop\",\"mobile-alt\"],\"sidebar-footer-actions-button sidebar-footer-actions-toggle-mobile-view\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"site\",\"desktopView\"]],[[[1,\"        \"],[8,[39,2],null,[[\"@action\",\"@title\",\"@icon\",\"@class\"],[[28,[37,6],[\"showKeyboardShortcutsHelp\"],null],\"keyboard_shortcuts_help.title\",\"keyboard\",\"btn-flat sidebar-footer-actions-button sidebar-footer-actions-keyboard-shortcuts\"]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"plugin-outlet\",\"if\",\"d-button\",\"action\",\"or\",\"and\",\"route-action\"]]",
    "moduleName": "discourse/components/sidebar/footer.hbs",
    "isStrictMode": false
  });
  let SidebarFooter = (_class = class SidebarFooter extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "capabilities", _descriptor, this);
      _initializerDefineProperty(this, "site", _descriptor2, this);
      _initializerDefineProperty(this, "siteSettings", _descriptor3, this);
      _initializerDefineProperty(this, "currentUser", _descriptor4, this);
    }
    addSection() {
      (0, _showModal.default)("sidebar-section-form");
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "capabilities", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "site", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "addSection", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "addSection"), _class.prototype)), _class);
  _exports.default = SidebarFooter;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SidebarFooter);
});