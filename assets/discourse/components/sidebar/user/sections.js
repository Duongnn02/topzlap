define("discourse/components/sidebar/user/sections", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "discourse/lib/sidebar/custom-sections", "@ember/application", "@ember/service"], function (_exports, _component, _templateFactory, _component2, _customSections, _application, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"discourse/lib/sidebar/custom-sections",0,"@ember/application",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="sidebar-sections">
    <Sidebar::User::CommunitySection @collapsable={{@collapsableSections}} />
    {{#if this.currentUser.custom_sidebar_sections_enabled}}
      <Sidebar::User::CustomSections />
    {{/if}}
    <Sidebar::User::CategoriesSection @collapsable={{@collapsableSections}} />
  
    {{#if this.currentUser.display_sidebar_tags}}
      <Sidebar::User::TagsSection @collapsable={{@collapsableSections}} />
    {{/if}}
  
    {{#if this.enableMessagesSection}}
      <Sidebar::User::MessagesSection @collapsable={{@collapsableSections}} />
    {{/if}}
  
    {{#each this.customSections as |customSection|}}
      <Sidebar::Section
        @sectionName={{customSection.name}}
        @headerLinkText={{customSection.text}}
        @headerLinkTitle={{customSection.title}}
        @headerActionsIcon={{customSection.actionsIcon}}
        @headerActions={{customSection.actions}}
        @willDestroy={{customSection.willDestroy}}
        @collapsable={{@collapsableSections}}
        @displaySection={{customSection.displaySection}}
      >
  
        {{#each customSection.links as |link|}}
          <Sidebar::SectionLink
            @linkName={{link.name}}
            @class={{link.classNames}}
            @route={{link.route}}
            @model={{link.model}}
            @models={{link.models}}
            @title={{link.title}}
            @contentCSSClass={{link.contentCSSClass}}
            @prefixColor={{link.prefixColor}}
            @prefixBadge={{link.prefixBadge}}
            @prefixType={{link.prefixType}}
            @prefixValue={{link.prefixValue}}
            @prefixCSSClass={{link.prefixCSSClass}}
            @suffixType={{link.suffixType}}
            @suffixValue={{link.suffixValue}}
            @suffixCSSClass={{link.suffixCSSClass}}
            @hoverType={{link.hoverType}}
            @hoverValue={{link.hoverValue}}
            @hoverAction={{link.hoverAction}}
            @hoverTitle={{link.hoverTitle}}
            @currentWhen={{link.currentWhen}}
            @didInsert={{link.didInsert}}
            @willDestroy={{link.willDestroy}}
            @content={{link.text}}
          />
        {{/each}}
      </Sidebar::Section>
    {{/each}}
  </div>
  */
  {
    "id": "mgXMU7k+",
    "block": "[[[10,0],[14,0,\"sidebar-sections\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@collapsable\"],[[30,1]]],null],[1,\"\\n\"],[41,[30,0,[\"currentUser\",\"custom_sidebar_sections_enabled\"]],[[[1,\"    \"],[8,[39,2],null,null,null],[1,\"\\n\"]],[]],null],[1,\"  \"],[8,[39,3],null,[[\"@collapsable\"],[[30,1]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"currentUser\",\"display_sidebar_tags\"]],[[[1,\"    \"],[8,[39,4],null,[[\"@collapsable\"],[[30,1]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"enableMessagesSection\"]],[[[1,\"    \"],[8,[39,5],null,[[\"@collapsable\"],[[30,1]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"customSections\"]]],null]],null],null,[[[1,\"    \"],[8,[39,8],null,[[\"@sectionName\",\"@headerLinkText\",\"@headerLinkTitle\",\"@headerActionsIcon\",\"@headerActions\",\"@willDestroy\",\"@collapsable\",\"@displaySection\"],[[30,2,[\"name\"]],[30,2,[\"text\"]],[30,2,[\"title\"]],[30,2,[\"actionsIcon\"]],[30,2,[\"actions\"]],[30,2,[\"willDestroy\"]],[30,1],[30,2,[\"displaySection\"]]]],[[\"default\"],[[[[1,\"\\n\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,2,[\"links\"]]],null]],null],null,[[[1,\"        \"],[8,[39,9],null,[[\"@linkName\",\"@class\",\"@route\",\"@model\",\"@models\",\"@title\",\"@contentCSSClass\",\"@prefixColor\",\"@prefixBadge\",\"@prefixType\",\"@prefixValue\",\"@prefixCSSClass\",\"@suffixType\",\"@suffixValue\",\"@suffixCSSClass\",\"@hoverType\",\"@hoverValue\",\"@hoverAction\",\"@hoverTitle\",\"@currentWhen\",\"@didInsert\",\"@willDestroy\",\"@content\"],[[30,3,[\"name\"]],[30,3,[\"classNames\"]],[30,3,[\"route\"]],[30,3,[\"model\"]],[30,3,[\"models\"]],[30,3,[\"title\"]],[30,3,[\"contentCSSClass\"]],[30,3,[\"prefixColor\"]],[30,3,[\"prefixBadge\"]],[30,3,[\"prefixType\"]],[30,3,[\"prefixValue\"]],[30,3,[\"prefixCSSClass\"]],[30,3,[\"suffixType\"]],[30,3,[\"suffixValue\"]],[30,3,[\"suffixCSSClass\"]],[30,3,[\"hoverType\"]],[30,3,[\"hoverValue\"]],[30,3,[\"hoverAction\"]],[30,3,[\"hoverTitle\"]],[30,3,[\"currentWhen\"]],[30,3,[\"didInsert\"]],[30,3,[\"willDestroy\"]],[30,3,[\"text\"]]]],null],[1,\"\\n\"]],[3]],null],[1,\"    \"]],[]]]]],[1,\"\\n\"]],[2]],null],[13]],[\"@collapsableSections\",\"customSection\",\"link\"],false,[\"sidebar/user/community-section\",\"if\",\"sidebar/user/custom-sections\",\"sidebar/user/categories-section\",\"sidebar/user/tags-section\",\"sidebar/user/messages-section\",\"each\",\"-track-array\",\"sidebar/section\",\"sidebar/section-link\"]]",
    "moduleName": "discourse/components/sidebar/user/sections.hbs",
    "isStrictMode": false
  });
  let SidebarUserSections = (_class = class SidebarUserSections extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "siteSettings", _descriptor, this);
      _initializerDefineProperty(this, "currentUser", _descriptor2, this);
      _initializerDefineProperty(this, "site", _descriptor3, this);
      _defineProperty(this, "customSections", void 0);
      this.customSections = this._customSections;
    }
    get _customSections() {
      return _customSections.customSections.map(customSection => {
        const section = new customSection({
          sidebar: this
        });
        (0, _application.setOwner)(section, (0, _application.getOwner)(this));
        return section;
      });
    }
    get enableMessagesSection() {
      return this.currentUser?.can_send_private_messages;
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "site", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = SidebarUserSections;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SidebarUserSections);
});