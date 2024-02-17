define("discourse/components/sidebar/anonymous/tags-section", ["exports", "@embroider/macros/es-compat", "@ember/component", "@ember/template-factory", "@glimmer/tracking", "@glimmer/component", "@ember/service", "discourse/lib/sidebar/user/tags-section/tag-section-link"], function (_exports, _esCompat, _component, _templateFactory, _tracking, _component2, _service, _tagSectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/tracking",0,"@glimmer/component",0,"@ember/service",0,"discourse/lib/sidebar/user/tags-section/tag-section-link",0,"ember-cached-decorator-polyfill"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.displaySection}}
    <Sidebar::Section
      @sectionName="tags"
      @headerLinkText={{i18n "sidebar.sections.tags.header_link_text"}}
      @collapsable={{@collapsable}}
    >
  
      {{#each this.sectionLinks as |sectionLink|}}
        <Sidebar::SectionLink
          @route={{sectionLink.route}}
          @content={{sectionLink.text}}
          @currentWhen={{sectionLink.currentWhen}}
          @prefixType={{sectionLink.prefixType}}
          @prefixValue={{sectionLink.prefixValue}}
          @models={{sectionLink.models}}
          data-tag-name={{sectionLink.tagName}}
        />
      {{/each}}
  
      <Sidebar::Common::AllTagsSectionLink />
    </Sidebar::Section>
  {{/if}}
  */
  {
    "id": "loLwWpHm",
    "block": "[[[41,[30,0,[\"displaySection\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@sectionName\",\"@headerLinkText\",\"@collapsable\"],[\"tags\",[28,[37,2],[\"sidebar.sections.tags.header_link_text\"],null],[30,1]]],[[\"default\"],[[[[1,\"\\n\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"sectionLinks\"]]],null]],null],null,[[[1,\"      \"],[8,[39,5],[[16,\"data-tag-name\",[30,2,[\"tagName\"]]]],[[\"@route\",\"@content\",\"@currentWhen\",\"@prefixType\",\"@prefixValue\",\"@models\"],[[30,2,[\"route\"]],[30,2,[\"text\"]],[30,2,[\"currentWhen\"]],[30,2,[\"prefixType\"]],[30,2,[\"prefixValue\"]],[30,2,[\"models\"]]]],null],[1,\"\\n\"]],[2]],null],[1,\"\\n    \"],[8,[39,6],null,null,null],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]],null]],[\"@collapsable\",\"sectionLink\"],false,[\"if\",\"sidebar/section\",\"i18n\",\"each\",\"-track-array\",\"sidebar/section-link\",\"sidebar/common/all-tags-section-link\"]]",
    "moduleName": "discourse/components/sidebar/anonymous/tags-section.hbs",
    "isStrictMode": false
  });
  let cached = (0, _esCompat.default)(require("ember-cached-decorator-polyfill")).cached;
  let SidebarAnonymousTagsSection = (_class = class SidebarAnonymousTagsSection extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "router", _descriptor, this);
      _initializerDefineProperty(this, "topicTrackingState", _descriptor2, this);
      _initializerDefineProperty(this, "site", _descriptor3, this);
    }
    get displaySection() {
      return this.site.anonymous_default_sidebar_tags?.length > 0 || this.site.top_tags?.length > 0;
    }
    get sectionLinks() {
      let tags;
      if (this.site.anonymous_default_sidebar_tags) {
        tags = this.site.anonymous_default_sidebar_tags;
      } else {
        tags = this.site.top_tags.slice(0, 5);
      }
      return tags.map(tagName => {
        return new _tagSectionLink.default({
          tagName,
          topicTrackingState: this.topicTrackingState
        });
      });
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
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "site", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "sectionLinks", [cached], Object.getOwnPropertyDescriptor(_class.prototype, "sectionLinks"), _class.prototype)), _class);
  _exports.default = SidebarAnonymousTagsSection;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SidebarAnonymousTagsSection);
});