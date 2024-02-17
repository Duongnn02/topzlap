define("discourse/components/sidebar/user/categories-section", ["exports", "@embroider/macros/es-compat", "@ember/component", "@ember/template-factory", "@ember/service", "@ember/object", "@glimmer/tracking", "discourse-common/utils/decorators", "discourse/models/category", "discourse/components/sidebar/common/categories-section"], function (_exports, _esCompat, _component, _templateFactory, _service, _object, _tracking, _decorators, _category, _categoriesSection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.REFRESH_COUNTS_APP_EVENT_NAME = void 0;
  var _dec, _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/service",0,"@ember/object",0,"@glimmer/tracking",0,"discourse-common/utils/decorators",0,"discourse/models/category",0,"discourse/components/sidebar/common/categories-section",0,"ember-cached-decorator-polyfill"eaimeta@70e063a35619d71f
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
      @sectionName="categories"
      @headerLinkText={{i18n "sidebar.sections.categories.header_link_text"}}
      @headerActions={{array
        (hash
          action=this.editTracked
          title=(i18n "sidebar.sections.categories.header_action_title")
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
              @query={{sectionLink.query}}
              @title={{sectionLink.title}}
              @content={{sectionLink.text}}
              @currentWhen={{sectionLink.currentWhen}}
              @model={{sectionLink.model}}
              @badgeText={{sectionLink.badgeText}}
              @prefixBadge={{sectionLink.prefixBadge}}
              @prefixType={{sectionLink.prefixType}}
              @prefixValue={{sectionLink.prefixValue}}
              @prefixColor={{sectionLink.prefixColor}}
              @prefixElementColors={{sectionLink.prefixElementColors}}
              @suffixCSSClass={{sectionLink.suffixCSSClass}}
              @suffixValue={{sectionLink.suffixValue}}
              @suffixType={{sectionLink.suffixType}}
              data-category-id={{sectionLink.category.id}}
            />
          {{/each}}
        {{else}}
          <Sidebar::SectionLink
            @linkName="configure-categories"
            @route="preferences.sidebar"
            @prefixType="icon"
            @prefixValue="pencil-alt"
            @model={{this.currentUser}}
            @content={{i18n
              "sidebar.sections.categories.links.add_categories.content"
            }}
            @title={{i18n
              "sidebar.sections.categories.links.add_categories.title"
            }}
          />
        {{/if}}
  
        <Sidebar::Common::AllCategoriesSectionLink />
      {{/if}}
  
      {{#if this.shouldDisplayDefaultConfig}}
        <Sidebar::SectionLink
          @linkName="configure-default-sidebar-categories"
          @content={{i18n "sidebar.sections.categories.configure_defaults"}}
          @prefixType="icon"
          @prefixValue="wrench"
          @route="adminSiteSettingsCategory"
          @model="sidebar"
          @query={{hash filter="default_sidebar_categories"}}
        />
      {{/if}}
    </Sidebar::Section>
  {{/if}}
  */
  {
    "id": "7ACgoO8O",
    "block": "[[[41,[28,[37,1],[[30,0,[\"shouldDisplay\"]],[30,0,[\"shouldDisplayDefaultConfig\"]]],null],[[[1,\"  \"],[8,[39,2],null,[[\"@sectionName\",\"@headerLinkText\",\"@headerActions\",\"@headerActionsIcon\",\"@collapsable\"],[\"categories\",[28,[37,3],[\"sidebar.sections.categories.header_link_text\"],null],[28,[37,4],[[28,[37,5],null,[[\"action\",\"title\"],[[30,0,[\"editTracked\"]],[28,[37,3],[\"sidebar.sections.categories.header_action_title\"],null]]]]],null],\"pencil-alt\",[30,1]]],[[\"default\"],[[[[1,\"\\n\\n\"],[41,[30,0,[\"shouldDisplay\"]],[[[41,[28,[37,6],[[30,0,[\"sectionLinks\",\"length\"]],0],null],[[[42,[28,[37,8],[[28,[37,8],[[30,0,[\"sectionLinks\"]]],null]],null],null,[[[1,\"          \"],[8,[39,9],[[16,\"data-category-id\",[30,2,[\"category\",\"id\"]]]],[[\"@route\",\"@query\",\"@title\",\"@content\",\"@currentWhen\",\"@model\",\"@badgeText\",\"@prefixBadge\",\"@prefixType\",\"@prefixValue\",\"@prefixColor\",\"@prefixElementColors\",\"@suffixCSSClass\",\"@suffixValue\",\"@suffixType\"],[[30,2,[\"route\"]],[30,2,[\"query\"]],[30,2,[\"title\"]],[30,2,[\"text\"]],[30,2,[\"currentWhen\"]],[30,2,[\"model\"]],[30,2,[\"badgeText\"]],[30,2,[\"prefixBadge\"]],[30,2,[\"prefixType\"]],[30,2,[\"prefixValue\"]],[30,2,[\"prefixColor\"]],[30,2,[\"prefixElementColors\"]],[30,2,[\"suffixCSSClass\"]],[30,2,[\"suffixValue\"]],[30,2,[\"suffixType\"]]]],null],[1,\"\\n\"]],[2]],null]],[]],[[[1,\"        \"],[8,[39,9],null,[[\"@linkName\",\"@route\",\"@prefixType\",\"@prefixValue\",\"@model\",\"@content\",\"@title\"],[\"configure-categories\",\"preferences.sidebar\",\"icon\",\"pencil-alt\",[30,0,[\"currentUser\"]],[28,[37,3],[\"sidebar.sections.categories.links.add_categories.content\"],null],[28,[37,3],[\"sidebar.sections.categories.links.add_categories.title\"],null]]],null],[1,\"\\n\"]],[]]],[1,\"\\n      \"],[8,[39,10],null,null,null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"shouldDisplayDefaultConfig\"]],[[[1,\"      \"],[8,[39,9],null,[[\"@linkName\",\"@content\",\"@prefixType\",\"@prefixValue\",\"@route\",\"@model\",\"@query\"],[\"configure-default-sidebar-categories\",[28,[37,3],[\"sidebar.sections.categories.configure_defaults\"],null],\"icon\",\"wrench\",\"adminSiteSettingsCategory\",\"sidebar\",[28,[37,5],null,[[\"filter\"],[\"default_sidebar_categories\"]]]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"]],[]]]]],[1,\"\\n\"]],[]],null]],[\"@collapsable\",\"sectionLink\"],false,[\"if\",\"or\",\"sidebar/section\",\"i18n\",\"array\",\"hash\",\"gt\",\"each\",\"-track-array\",\"sidebar/section-link\",\"sidebar/common/all-categories-section-link\"]]",
    "moduleName": "discourse/components/sidebar/user/categories-section.hbs",
    "isStrictMode": false
  });
  let cached = (0, _esCompat.default)(require("ember-cached-decorator-polyfill")).cached;
  const REFRESH_COUNTS_APP_EVENT_NAME = "sidebar:refresh-categories-section-counts";
  _exports.REFRESH_COUNTS_APP_EVENT_NAME = REFRESH_COUNTS_APP_EVENT_NAME;
  let SidebarUserCategoriesSection = (_dec = (0, _decorators.debounce)(300), (_class = class SidebarUserCategoriesSection extends _categoriesSection.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "router", _descriptor, this);
      _initializerDefineProperty(this, "currentUser", _descriptor2, this);
      _initializerDefineProperty(this, "appEvents", _descriptor3, this);
      this.callbackId = this.topicTrackingState.onStateChange(() => {
        this._refreshCounts();
      });
      this.appEvents.on(REFRESH_COUNTS_APP_EVENT_NAME, this, this._refreshCounts);
    }
    willDestroy() {
      super.willDestroy(...arguments);
      this.topicTrackingState.offStateChange(this.callbackId);
      this.appEvents.off(REFRESH_COUNTS_APP_EVENT_NAME, this, this._refreshCounts);
    }

    // TopicTrackingState changes or plugins can trigger this function so we debounce to ensure we're not refreshing
    // unnecessarily.
    _refreshCounts() {
      this.sectionLinks.forEach(sectionLink => {
        sectionLink.refreshCounts();
      });
    }
    get categories() {
      return _category.default.findByIds(this.currentUser.sidebarCategoryIds);
    }

    /**
     * If a site has no default sidebar categories configured, show categories section if the user has categories configured.
     * Otherwise, hide the categories section from the sidebar for the user.
     *
     * If a site has default sidebar categories configured, always show categories section for the user.
     */
    get shouldDisplay() {
      if (this.hasDefaultSidebarCategories) {
        return true;
      } else {
        return this.categories.length > 0;
      }
    }
    get shouldDisplayDefaultConfig() {
      return this.currentUser.admin && !this.hasDefaultSidebarCategories;
    }
    get hasDefaultSidebarCategories() {
      return this.siteSettings.default_sidebar_categories.length > 0;
    }
    editTracked() {
      this.router.transitionTo("preferences.sidebar", this.currentUser);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "appEvents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "_refreshCounts", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "_refreshCounts"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "categories", [cached], Object.getOwnPropertyDescriptor(_class.prototype, "categories"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "editTracked", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "editTracked"), _class.prototype)), _class));
  _exports.default = SidebarUserCategoriesSection;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SidebarUserCategoriesSection);
});