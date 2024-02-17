define("discourse/components/sidebar/user/tags-section", ["exports", "@embroider/macros/es-compat", "@ember/component", "@ember/template-factory", "@glimmer/tracking", "@glimmer/component", "@ember/service", "@ember/object", "discourse/lib/sidebar/user/tags-section/tag-section-link", "discourse/lib/sidebar/user/tags-section/pm-tag-section-link"], function (_exports, _esCompat, _component, _templateFactory, _tracking, _component2, _service, _object, _tagSectionLink, _pmTagSectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/tracking",0,"@glimmer/component",0,"@ember/service",0,"@ember/object",0,"discourse/lib/sidebar/user/tags-section/tag-section-link",0,"discourse/lib/sidebar/user/tags-section/pm-tag-section-link",0,"ember-cached-decorator-polyfill"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if (or this.shouldDisplay this.shouldDisplayDefaultConfig)}}
    <Sidebar::Section
      @sectionName="tags"
      @headerLinkText={{i18n "sidebar.sections.tags.header_link_text"}}
      @headerActions={{array
        (hash
          action=this.editTracked
          title=(i18n "sidebar.sections.tags.header_action_title")
        )
      }}
      @headerActionsIcon="pencil-alt"
      @collapsable={{@collapsable}}
    >
  
      {{#if this.shouldDisplay}}
        {{#if (gt this.sectionLinks.length 0)}}
          {{#each this.sectionLinks as |sectionLink|}}
            <Sidebar::SectionLink
              @route={{sectionLink.route}}
              @title={{sectionLink.title}}
              @content={{sectionLink.text}}
              @currentWhen={{sectionLink.currentWhen}}
              @prefixType={{sectionLink.prefixType}}
              @prefixValue={{sectionLink.prefixValue}}
              @badgeText={{sectionLink.badgeText}}
              @models={{sectionLink.models}}
              @suffixCSSClass={{sectionLink.suffixCSSClass}}
              @suffixValue={{sectionLink.suffixValue}}
              @suffixType={{sectionLink.suffixType}}
              data-tag-name={{sectionLink.tagName}}
            />
          {{/each}}
        {{else}}
          <Sidebar::SectionLink
            @linkName="configure-tags"
            @route="preferences.sidebar"
            @prefixType="icon"
            @prefixValue="pencil-alt"
            @model={{this.currentUser}}
            @content={{i18n "sidebar.sections.tags.links.add_tags.content"}}
            @title={{i18n "sidebar.sections.tags.links.add_tags.title"}}
          />
        {{/if}}
  
        <Sidebar::Common::AllTagsSectionLink />
      {{/if}}
  
      {{#if this.shouldDisplayDefaultConfig}}
        <Sidebar::SectionLink
          @linkName="configure-default-sidebar-tags"
          @content={{i18n "sidebar.sections.tags.configure_defaults"}}
          @prefixType="icon"
          @prefixValue="wrench"
          @route="adminSiteSettingsCategory"
          @model="sidebar"
          @query={{hash filter="default_sidebar_tags"}}
        />
      {{/if}}
    </Sidebar::Section>
  {{/if}}
  */
  {
    "id": "GAvDLt5n",
    "block": "[[[41,[28,[37,1],[[30,0,[\"shouldDisplay\"]],[30,0,[\"shouldDisplayDefaultConfig\"]]],null],[[[1,\"  \"],[8,[39,2],null,[[\"@sectionName\",\"@headerLinkText\",\"@headerActions\",\"@headerActionsIcon\",\"@collapsable\"],[\"tags\",[28,[37,3],[\"sidebar.sections.tags.header_link_text\"],null],[28,[37,4],[[28,[37,5],null,[[\"action\",\"title\"],[[30,0,[\"editTracked\"]],[28,[37,3],[\"sidebar.sections.tags.header_action_title\"],null]]]]],null],\"pencil-alt\",[30,1]]],[[\"default\"],[[[[1,\"\\n\\n\"],[41,[30,0,[\"shouldDisplay\"]],[[[41,[28,[37,6],[[30,0,[\"sectionLinks\",\"length\"]],0],null],[[[42,[28,[37,8],[[28,[37,8],[[30,0,[\"sectionLinks\"]]],null]],null],null,[[[1,\"          \"],[8,[39,9],[[16,\"data-tag-name\",[30,2,[\"tagName\"]]]],[[\"@route\",\"@title\",\"@content\",\"@currentWhen\",\"@prefixType\",\"@prefixValue\",\"@badgeText\",\"@models\",\"@suffixCSSClass\",\"@suffixValue\",\"@suffixType\"],[[30,2,[\"route\"]],[30,2,[\"title\"]],[30,2,[\"text\"]],[30,2,[\"currentWhen\"]],[30,2,[\"prefixType\"]],[30,2,[\"prefixValue\"]],[30,2,[\"badgeText\"]],[30,2,[\"models\"]],[30,2,[\"suffixCSSClass\"]],[30,2,[\"suffixValue\"]],[30,2,[\"suffixType\"]]]],null],[1,\"\\n\"]],[2]],null]],[]],[[[1,\"        \"],[8,[39,9],null,[[\"@linkName\",\"@route\",\"@prefixType\",\"@prefixValue\",\"@model\",\"@content\",\"@title\"],[\"configure-tags\",\"preferences.sidebar\",\"icon\",\"pencil-alt\",[30,0,[\"currentUser\"]],[28,[37,3],[\"sidebar.sections.tags.links.add_tags.content\"],null],[28,[37,3],[\"sidebar.sections.tags.links.add_tags.title\"],null]]],null],[1,\"\\n\"]],[]]],[1,\"\\n      \"],[8,[39,10],null,null,null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"shouldDisplayDefaultConfig\"]],[[[1,\"      \"],[8,[39,9],null,[[\"@linkName\",\"@content\",\"@prefixType\",\"@prefixValue\",\"@route\",\"@model\",\"@query\"],[\"configure-default-sidebar-tags\",[28,[37,3],[\"sidebar.sections.tags.configure_defaults\"],null],\"icon\",\"wrench\",\"adminSiteSettingsCategory\",\"sidebar\",[28,[37,5],null,[[\"filter\"],[\"default_sidebar_tags\"]]]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"]],[]]]]],[1,\"\\n\"]],[]],null]],[\"@collapsable\",\"sectionLink\"],false,[\"if\",\"or\",\"sidebar/section\",\"i18n\",\"array\",\"hash\",\"gt\",\"each\",\"-track-array\",\"sidebar/section-link\",\"sidebar/common/all-tags-section-link\"]]",
    "moduleName": "discourse/components/sidebar/user/tags-section.hbs",
    "isStrictMode": false
  });
  let cached = (0, _esCompat.default)(require("ember-cached-decorator-polyfill")).cached;
  let SidebarUserTagsSection = (_class = class SidebarUserTagsSection extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "router", _descriptor, this);
      _initializerDefineProperty(this, "topicTrackingState", _descriptor2, this);
      _initializerDefineProperty(this, "pmTopicTrackingState", _descriptor3, this);
      _initializerDefineProperty(this, "currentUser", _descriptor4, this);
      _initializerDefineProperty(this, "siteSettings", _descriptor5, this);
      this.callbackId = this.topicTrackingState.onStateChange(() => {
        this.sectionLinks.forEach(sectionLink => {
          if (sectionLink.refreshCounts) {
            sectionLink.refreshCounts();
          }
        });
      });
    }
    willDestroy() {
      this.topicTrackingState.offStateChange(this.callbackId);
    }
    get sectionLinks() {
      const links = [];
      for (const tag of this.currentUser.sidebarTags) {
        if (tag.pm_only) {
          links.push(new _pmTagSectionLink.default({
            tagName: tag.name,
            currentUser: this.currentUser
          }));
        } else {
          links.push(new _tagSectionLink.default({
            tagName: tag.name,
            topicTrackingState: this.topicTrackingState,
            currentUser: this.currentUser
          }));
        }
      }
      return links;
    }

    /**
     * If a site has no default sidebar tags configured, show tags section if the user has personal sidebar tags configured.
     * Otherwise, hide the tags section from the sidebar for the user.
     *
     * If a site has default sidebar tags configured, always display the tags section.
     */
    get shouldDisplay() {
      if (this.hasDefaultSidebarTags) {
        return true;
      } else {
        return this.currentUser.sidebarTags.length > 0;
      }
    }
    get shouldDisplayDefaultConfig() {
      return this.currentUser.admin && !this.hasDefaultSidebarTags;
    }
    get hasDefaultSidebarTags() {
      return this.siteSettings.default_sidebar_tags.length > 0;
    }
    editTracked() {
      this.router.transitionTo("preferences.sidebar", this.currentUser);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "topicTrackingState", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "pmTopicTrackingState", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "sectionLinks", [cached], Object.getOwnPropertyDescriptor(_class.prototype, "sectionLinks"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "editTracked", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "editTracked"), _class.prototype)), _class);
  _exports.default = SidebarUserTagsSection;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SidebarUserTagsSection);
});