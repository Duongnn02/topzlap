define("discourse/components/sidebar/section", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service", "@ember/object", "@glimmer/tracking"], function (_exports, _component, _templateFactory, _component2, _service, _object, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service",0,"@ember/object",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.displaySection}}
    <div
      class={{concat-class "sidebar-section-wrapper sidebar-section" @class}}
      data-section-name={{@sectionName}}
    >
      <div class="sidebar-section-header-wrapper sidebar-row">
        <Sidebar::SectionHeader
          @collapsable={{@collapsable}}
          @sidebarSectionContentID={{this.sidebarSectionContentID}}
          @toggleSectionDisplay={{this.toggleSectionDisplay}}
          @isExpanded={{this.displaySectionContent}}
        >
          {{#if @collapsable}}
            <span class="sidebar-section-header-caret">
              {{d-icon this.headerCaretIcon}}
            </span>
          {{/if}}
  
          <span class="sidebar-section-header-text">
            {{@headerLinkText}}
          </span>
        </Sidebar::SectionHeader>
  
        {{#if this.isSingleHeaderAction}}
          {{#each @headerActions as |headerAction|}}
            <button
              type="button"
              class="sidebar-section-header-button"
              {{on "click" headerAction.action}}
              title={{headerAction.title}}
            >
              {{d-icon @headerActionsIcon}}
            </button>
          {{/each}}
        {{/if}}
  
        {{#if this.isMultipleHeaderActions}}
          <DropdownSelectBox
            @options={{hash icon=@headerActionsIcon placementStrategy="absolute"}}
            @content={{@headerActions}}
            @onChange={{action "handleMultipleHeaderActions"}}
            @class="sidebar-section-header-dropdown"
          />
        {{/if}}
      </div>
  
      {{#if this.displaySectionContent}}
        <ul class="sidebar-section-content" id={{this.sidebarSectionContentID}}>
          {{yield}}
        </ul>
      {{/if}}
    </div>
  {{/if}}
  */
  {
    "id": "Fa+JQvud",
    "block": "[[[41,[30,0,[\"displaySection\"]],[[[1,\"  \"],[10,0],[15,0,[28,[37,1],[\"sidebar-section-wrapper sidebar-section\",[30,1]],null]],[15,\"data-section-name\",[30,2]],[12],[1,\"\\n    \"],[10,0],[14,0,\"sidebar-section-header-wrapper sidebar-row\"],[12],[1,\"\\n      \"],[8,[39,2],null,[[\"@collapsable\",\"@sidebarSectionContentID\",\"@toggleSectionDisplay\",\"@isExpanded\"],[[30,3],[30,0,[\"sidebarSectionContentID\"]],[30,0,[\"toggleSectionDisplay\"]],[30,0,[\"displaySectionContent\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,3],[[[1,\"          \"],[10,1],[14,0,\"sidebar-section-header-caret\"],[12],[1,\"\\n            \"],[1,[28,[35,3],[[30,0,[\"headerCaretIcon\"]]],null]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n        \"],[10,1],[14,0,\"sidebar-section-header-text\"],[12],[1,\"\\n          \"],[1,[30,4]],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\\n\"],[41,[30,0,[\"isSingleHeaderAction\"]],[[[42,[28,[37,5],[[28,[37,5],[[30,5]],null]],null],null,[[[1,\"          \"],[11,\"button\"],[24,0,\"sidebar-section-header-button\"],[16,\"title\",[30,6,[\"title\"]]],[24,4,\"button\"],[4,[38,6],[\"click\",[30,6,[\"action\"]]],null],[12],[1,\"\\n            \"],[1,[28,[35,3],[[30,7]],null]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[6]],null]],[]],null],[1,\"\\n\"],[41,[30,0,[\"isMultipleHeaderActions\"]],[[[1,\"        \"],[8,[39,7],null,[[\"@options\",\"@content\",\"@onChange\",\"@class\"],[[28,[37,8],null,[[\"icon\",\"placementStrategy\"],[[30,7],\"absolute\"]]],[30,5],[28,[37,9],[[30,0],\"handleMultipleHeaderActions\"],null],\"sidebar-section-header-dropdown\"]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"displaySectionContent\"]],[[[1,\"      \"],[10,\"ul\"],[14,0,\"sidebar-section-content\"],[15,1,[30,0,[\"sidebarSectionContentID\"]]],[12],[1,\"\\n        \"],[18,8,null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null]],[\"@class\",\"@sectionName\",\"@collapsable\",\"@headerLinkText\",\"@headerActions\",\"headerAction\",\"@headerActionsIcon\",\"&default\"],false,[\"if\",\"concat-class\",\"sidebar/section-header\",\"d-icon\",\"each\",\"-track-array\",\"on\",\"dropdown-select-box\",\"hash\",\"action\",\"yield\"]]",
    "moduleName": "discourse/components/sidebar/section.hbs",
    "isStrictMode": false
  });
  let SidebarSection = (_class = class SidebarSection extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "keyValueStore", _descriptor, this);
      _initializerDefineProperty(this, "displaySectionContent", _descriptor2, this);
      _defineProperty(this, "sidebarSectionContentID", `sidebar-section-content-${this.args.sectionName}`);
      _defineProperty(this, "collapsedSidebarSectionKey", `sidebar-section-${this.args.sectionName}-collapsed`);
      if (this.args.collapsable) {
        this.displaySectionContent = this.keyValueStore.getItem(this.collapsedSidebarSectionKey) === undefined ? true : false;
      } else {
        this.displaySectionContent = true;
      }
    }
    willDestroy() {
      if (this.args.willDestroy) {
        this.args.willDestroy();
      }
    }
    toggleSectionDisplay() {
      this.displaySectionContent = !this.displaySectionContent;
      if (this.displaySectionContent) {
        this.keyValueStore.remove(this.collapsedSidebarSectionKey);
      } else {
        this.keyValueStore.setItem(this.collapsedSidebarSectionKey, true);
      }

      // remove focus from the toggle, but only on click
      if (!event.key) {
        document.activeElement.blur();
      }
    }
    handleMultipleHeaderActions(id) {
      this.args.headerActions.find(headerAction => headerAction.id === id).action();
    }
    get headerCaretIcon() {
      return this.displaySectionContent ? "angle-down" : "angle-right";
    }
    get isSingleHeaderAction() {
      return this.args.headerActions?.length === 1;
    }
    get isMultipleHeaderActions() {
      return this.args.headerActions?.length > 1;
    }
    get displaySection() {
      if (this.args.displaySection === undefined) {
        return true;
      }
      return this.args.displaySection;
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "keyValueStore", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "displaySectionContent", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "toggleSectionDisplay", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleSectionDisplay"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleMultipleHeaderActions", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleMultipleHeaderActions"), _class.prototype)), _class);
  _exports.default = SidebarSection;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SidebarSection);
});