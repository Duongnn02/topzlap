define("discourse/components/sidebar/more-section-links", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/tracking", "@ember/object", "@ember/service", "@ember/utils", "discourse-common/utils/decorators", "@glimmer/component"], function (_exports, _component, _templateFactory, _tracking, _object, _service, _utils, _decorators, _component2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _allLinks, _filterActiveSectionLink, _removeClickEventListener, _addClickEventListener, _isOutsideDetailsClick, _setActiveSectionLink;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/service",0,"@ember/utils",0,"discourse-common/utils/decorators",0,"@glimmer/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.activeSectionLink}}
    <Sidebar::MoreSectionLink @sectionLink={{this.activeSectionLink}} />
  {{/if}}
  
  <details
    class="sidebar-more-section-links-details"
    {{on "toggle" this.toggleSectionLinks}}
  >
    <summary class="sidebar-more-section-links-details-summary sidebar-row">
      <span class="sidebar-more-section-links-icon-wrapper">
        {{d-icon "ellipsis-v"}}
      </span>
  
      {{i18n "sidebar.more"}}
    </summary>
  
    {{#if this.shouldDisplaySectionLinks}}
      <div
        class="sidebar-more-section-links-details-content-wrapper"
        {{did-insert this.registerClickListener}}
        {{will-destroy this.unregisterClickListener}}
      >
  
        <div class="sidebar-more-section-links-details-content">
          <div class="sidebar-more-section-links-details-content-main">
            {{#each this.sectionLinks as |sectionLink|}}
              <Sidebar::MoreSectionLink @sectionLink={{sectionLink}} />
            {{/each}}
          </div>
  
          {{#if (gt this.secondarySectionLinks.length 0)}}
            <div class="sidebar-more-section-links-details-content-secondary">
              {{#each this.secondarySectionLinks as |sectionLink|}}
                <Sidebar::MoreSectionLink @sectionLink={{sectionLink}} />
              {{/each}}
            </div>
          {{/if}}
        </div>
      </div>
    {{/if}}
  </details>
  */
  {
    "id": "hv1sW834",
    "block": "[[[41,[30,0,[\"activeSectionLink\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@sectionLink\"],[[30,0,[\"activeSectionLink\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[11,\"details\"],[24,0,\"sidebar-more-section-links-details\"],[4,[38,2],[\"toggle\",[30,0,[\"toggleSectionLinks\"]]],null],[12],[1,\"\\n  \"],[10,\"summary\"],[14,0,\"sidebar-more-section-links-details-summary sidebar-row\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"sidebar-more-section-links-icon-wrapper\"],[12],[1,\"\\n      \"],[1,[28,[35,3],[\"ellipsis-v\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[1,[28,[35,4],[\"sidebar.more\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"shouldDisplaySectionLinks\"]],[[[1,\"    \"],[11,0],[24,0,\"sidebar-more-section-links-details-content-wrapper\"],[4,[38,5],[[30,0,[\"registerClickListener\"]]],null],[4,[38,6],[[30,0,[\"unregisterClickListener\"]]],null],[12],[1,\"\\n\\n      \"],[10,0],[14,0,\"sidebar-more-section-links-details-content\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"sidebar-more-section-links-details-content-main\"],[12],[1,\"\\n\"],[42,[28,[37,8],[[28,[37,8],[[30,0,[\"sectionLinks\"]]],null]],null],null,[[[1,\"            \"],[8,[39,1],null,[[\"@sectionLink\"],[[30,1]]],null],[1,\"\\n\"]],[1]],null],[1,\"        \"],[13],[1,\"\\n\\n\"],[41,[28,[37,9],[[30,0,[\"secondarySectionLinks\",\"length\"]],0],null],[[[1,\"          \"],[10,0],[14,0,\"sidebar-more-section-links-details-content-secondary\"],[12],[1,\"\\n\"],[42,[28,[37,8],[[28,[37,8],[[30,0,[\"secondarySectionLinks\"]]],null]],null],null,[[[1,\"              \"],[8,[39,1],null,[[\"@sectionLink\"],[[30,2]]],null],[1,\"\\n\"]],[2]],null],[1,\"          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[\"sectionLink\",\"sectionLink\"],false,[\"if\",\"sidebar/more-section-link\",\"on\",\"d-icon\",\"i18n\",\"did-insert\",\"will-destroy\",\"each\",\"-track-array\",\"gt\"]]",
    "moduleName": "discourse/components/sidebar/more-section-links.hbs",
    "isStrictMode": false
  });
  let SidebarMoreSectionLinks = (_class = (_allLinks = /*#__PURE__*/new WeakMap(), _filterActiveSectionLink = /*#__PURE__*/new WeakSet(), _removeClickEventListener = /*#__PURE__*/new WeakSet(), _addClickEventListener = /*#__PURE__*/new WeakSet(), _isOutsideDetailsClick = /*#__PURE__*/new WeakSet(), _setActiveSectionLink = /*#__PURE__*/new WeakSet(), class SidebarMoreSectionLinks extends _component2.default {
    constructor() {
      super(...arguments);
      _classPrivateMethodInitSpec(this, _setActiveSectionLink);
      _classPrivateMethodInitSpec(this, _isOutsideDetailsClick);
      _classPrivateMethodInitSpec(this, _addClickEventListener);
      _classPrivateMethodInitSpec(this, _removeClickEventListener);
      _classPrivateMethodInitSpec(this, _filterActiveSectionLink);
      _initializerDefineProperty(this, "router", _descriptor, this);
      _initializerDefineProperty(this, "shouldDisplaySectionLinks", _descriptor2, this);
      _initializerDefineProperty(this, "activeSectionLink", _descriptor3, this);
      _classPrivateFieldInitSpec(this, _allLinks, {
        writable: true,
        value: [...this.args.sectionLinks, ...this.args.secondarySectionLinks]
      });
      _classPrivateMethodGet(this, _setActiveSectionLink, _setActiveSectionLink2).call(this);
      this.router.on("routeDidChange", this, _classPrivateMethodGet(this, _setActiveSectionLink, _setActiveSectionLink2));
    }
    willDestroy() {
      _classPrivateMethodGet(this, _removeClickEventListener, _removeClickEventListener2).call(this);
      this.router.off("routeDidChange", this, _classPrivateMethodGet(this, _setActiveSectionLink, _setActiveSectionLink2));
    }
    get sectionLinks() {
      if (this.activeSectionLink) {
        return _classPrivateMethodGet(this, _filterActiveSectionLink, _filterActiveSectionLink2).call(this, this.args.sectionLinks);
      } else {
        return this.args.sectionLinks;
      }
    }
    get secondarySectionLinks() {
      if (this.activeSectionLink) {
        return _classPrivateMethodGet(this, _filterActiveSectionLink, _filterActiveSectionLink2).call(this, this.args.secondarySectionLinks);
      } else {
        return this.args.secondarySectionLinks;
      }
    }
    closeDetails(event) {
      if (this.shouldDisplaySectionLinks) {
        const isLinkClick = event.target.className.includes("sidebar-section-link");
        if (isLinkClick || _classPrivateMethodGet(this, _isOutsideDetailsClick, _isOutsideDetailsClick2).call(this, event)) {
          document.querySelector(".sidebar-more-section-links-details")?.removeAttribute("open");
        }
      }
    }
    registerClickListener() {
      _classPrivateMethodGet(this, _addClickEventListener, _addClickEventListener2).call(this);
    }
    unregisterClickListener() {
      _classPrivateMethodGet(this, _removeClickEventListener, _removeClickEventListener2).call(this);
    }
    toggleSectionLinks(element) {
      this.shouldDisplaySectionLinks = element.target.hasAttribute("open");
    }
  }), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "shouldDisplaySectionLinks", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "activeSectionLink", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "closeDetails", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "closeDetails"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "registerClickListener", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "registerClickListener"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "unregisterClickListener", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "unregisterClickListener"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleSectionLinks", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleSectionLinks"), _class.prototype)), _class);
  _exports.default = SidebarMoreSectionLinks;
  function _filterActiveSectionLink2(sectionLinks) {
    return sectionLinks.filter(sectionLink => {
      return sectionLink.name !== this.activeSectionLink.name;
    });
  }
  function _removeClickEventListener2() {
    document.removeEventListener("click", this.closeDetails);
  }
  function _addClickEventListener2() {
    document.addEventListener("click", this.closeDetails);
  }
  function _isOutsideDetailsClick2(event) {
    return !event.composedPath().some(element => {
      return element.className === "sidebar-more-section-links-details";
    });
  }
  function _setActiveSectionLink2() {
    const activeSectionLink = _classPrivateFieldGet(this, _allLinks).find(sectionLink => {
      const args = [sectionLink.route];
      if (sectionLink.model) {
        args.push(sectionLink.model);
      } else if (sectionLink.models) {
        args.push(...sectionLink.models);
      }
      if (!(0, _utils.isEmpty)(sectionLink.query)) {
        args.push({
          queryParams: sectionLink.query
        });
      }
      return this.router.isActive(...args) && sectionLink;
    });
    this.activeSectionLink = activeSectionLink;
  }
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SidebarMoreSectionLinks);
});