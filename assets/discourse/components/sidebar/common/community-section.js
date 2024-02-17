define("discourse/components/sidebar/common/community-section", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service", "@glimmer/tracking", "discourse/lib/sidebar/custom-community-section-links"], function (_exports, _component, _templateFactory, _component2, _service, _tracking, _customCommunitySectionLinks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _initializeSectionLinks, _initializeSectionLink;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service",0,"@glimmer/tracking",0,"discourse/lib/sidebar/custom-community-section-links"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <Sidebar::Section
    @sectionName="community"
    @headerLinkText={{i18n "sidebar.sections.community.header_link_text"}}
    @headerActionsIcon={{this.headerActionsIcon}}
    @headerActions={{this.headerActions}}
    @collapsable={{@collapsable}}
  >
  
    {{#if this.displayShortSiteDescription}}
      <Sidebar::SectionMessage>
        {{this.siteSettings.short_site_description}}
      </Sidebar::SectionMessage>
    {{/if}}
  
    {{#each this.sectionLinks as |sectionLink|}}
      <Sidebar::SectionLink
        @shouldDisplay={{sectionLink.shouldDisplay}}
        @linkName={{sectionLink.name}}
        @href={{sectionLink.href}}
        @route={{sectionLink.route}}
        @query={{sectionLink.query}}
        @title={{sectionLink.title}}
        @content={{sectionLink.text}}
        @currentWhen={{sectionLink.currentWhen}}
        @badgeText={{sectionLink.badgeText}}
        @model={{sectionLink.model}}
        @models={{sectionLink.models}}
        @prefixType={{sectionLink.prefixType}}
        @prefixValue={{sectionLink.prefixValue}}
        @suffixCSSClass={{sectionLink.suffixCSSClass}}
        @suffixValue={{sectionLink.suffixValue}}
        @suffixType={{sectionLink.suffixType}}
      />
    {{/each}}
  
    <Sidebar::MoreSectionLinks
      @sectionLinks={{this.moreSectionLinks}}
      @secondarySectionLinks={{this.moreSecondarySectionLinks}}
    />
  </Sidebar::Section>
  */
  {
    "id": "usatj50R",
    "block": "[[[8,[39,0],null,[[\"@sectionName\",\"@headerLinkText\",\"@headerActionsIcon\",\"@headerActions\",\"@collapsable\"],[\"community\",[28,[37,1],[\"sidebar.sections.community.header_link_text\"],null],[30,0,[\"headerActionsIcon\"]],[30,0,[\"headerActions\"]],[30,1]]],[[\"default\"],[[[[1,\"\\n\\n\"],[41,[30,0,[\"displayShortSiteDescription\"]],[[[1,\"    \"],[8,[39,3],null,null,[[\"default\"],[[[[1,\"\\n      \"],[1,[30,0,[\"siteSettings\",\"short_site_description\"]]],[1,\"\\n    \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,0,[\"sectionLinks\"]]],null]],null],null,[[[1,\"    \"],[8,[39,6],null,[[\"@shouldDisplay\",\"@linkName\",\"@href\",\"@route\",\"@query\",\"@title\",\"@content\",\"@currentWhen\",\"@badgeText\",\"@model\",\"@models\",\"@prefixType\",\"@prefixValue\",\"@suffixCSSClass\",\"@suffixValue\",\"@suffixType\"],[[30,2,[\"shouldDisplay\"]],[30,2,[\"name\"]],[30,2,[\"href\"]],[30,2,[\"route\"]],[30,2,[\"query\"]],[30,2,[\"title\"]],[30,2,[\"text\"]],[30,2,[\"currentWhen\"]],[30,2,[\"badgeText\"]],[30,2,[\"model\"]],[30,2,[\"models\"]],[30,2,[\"prefixType\"]],[30,2,[\"prefixValue\"]],[30,2,[\"suffixCSSClass\"]],[30,2,[\"suffixValue\"]],[30,2,[\"suffixType\"]]]],null],[1,\"\\n\"]],[2]],null],[1,\"\\n  \"],[8,[39,7],null,[[\"@sectionLinks\",\"@secondarySectionLinks\"],[[30,0,[\"moreSectionLinks\"]],[30,0,[\"moreSecondarySectionLinks\"]]]],null],[1,\"\\n\"]],[]]]]]],[\"@collapsable\",\"sectionLink\"],false,[\"sidebar/section\",\"i18n\",\"if\",\"sidebar/section-message\",\"each\",\"-track-array\",\"sidebar/section-link\",\"sidebar/more-section-links\"]]",
    "moduleName": "discourse/components/sidebar/common/community-section.hbs",
    "isStrictMode": false
  });
  let SidebarCommunitySection = (_class = (_initializeSectionLinks = /*#__PURE__*/new WeakSet(), _initializeSectionLink = /*#__PURE__*/new WeakSet(), class SidebarCommunitySection extends _component2.default {
    constructor() {
      super(...arguments);
      _classPrivateMethodInitSpec(this, _initializeSectionLink);
      _classPrivateMethodInitSpec(this, _initializeSectionLinks);
      _initializerDefineProperty(this, "router", _descriptor, this);
      _initializerDefineProperty(this, "topicTrackingState", _descriptor2, this);
      _initializerDefineProperty(this, "currentUser", _descriptor3, this);
      _initializerDefineProperty(this, "appEvents", _descriptor4, this);
      _initializerDefineProperty(this, "siteSettings", _descriptor5, this);
      _initializerDefineProperty(this, "sectionLinks", _descriptor6, this);
      _initializerDefineProperty(this, "moreSectionLinks", _descriptor7, this);
      _initializerDefineProperty(this, "moreSecondarySectionLinks", _descriptor8, this);
      _defineProperty(this, "callbackId", void 0);
      _defineProperty(this, "headerActionsIcon", void 0);
      _defineProperty(this, "headerActions", void 0);
      this.moreSectionLinks = _classPrivateMethodGet(this, _initializeSectionLinks, _initializeSectionLinks2).call(this, [...this.defaultMoreSectionLinks, ..._customCommunitySectionLinks.customSectionLinks], {
        inMoreDrawer: true
      });
      this.moreSecondarySectionLinks = _classPrivateMethodGet(this, _initializeSectionLinks, _initializeSectionLinks2).call(this, [...this.defaultMoreSecondarySectionLinks, ..._customCommunitySectionLinks.secondaryCustomSectionLinks], {
        inMoreDrawer: true
      });
      this.sectionLinks = _classPrivateMethodGet(this, _initializeSectionLinks, _initializeSectionLinks2).call(this, this.defaultMainSectionLinks, {
        inMoreDrawer: false
      });
      this.callbackId = this.topicTrackingState.onStateChange(() => {
        this.sectionLinks.forEach(sectionLink => {
          sectionLink.onTopicTrackingStateChange();
        });
      });
    }
    willDestroy() {
      [...this.sectionLinks, ...this.moreSectionLinks, ...this.moreSecondarySectionLinks].forEach(sectionLink => {
        sectionLink.teardown?.();
      });
      this.topicTrackingState.offStateChange(this.callbackId);
    }

    // Override in child
    get defaultMainSectionLinks() {
      return [];
    }

    // Override in child
    get defaultMoreSectionLinks() {
      return [];
    }

    // Override in child
    get defaultMoreSecondarySectionLinks() {
      return [];
    }
  }), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "topicTrackingState", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "appEvents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "sectionLinks", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "moreSectionLinks", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "moreSecondarySectionLinks", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = SidebarCommunitySection;
  function _initializeSectionLinks2(sectionLinkClasses) {
    let {
      inMoreDrawer
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return sectionLinkClasses.map(sectionLinkClass => {
      return _classPrivateMethodGet(this, _initializeSectionLink, _initializeSectionLink2).call(this, sectionLinkClass, inMoreDrawer);
    });
  }
  function _initializeSectionLink2(sectionLinkClass, inMoreDrawer) {
    return new sectionLinkClass({
      topicTrackingState: this.topicTrackingState,
      currentUser: this.currentUser,
      appEvents: this.appEvents,
      router: this.router,
      siteSettings: this.siteSettings,
      inMoreDrawer
    });
  }
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SidebarCommunitySection);
});