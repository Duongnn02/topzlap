define("discourse/components/sidebar/user/messages-section", ["exports", "@embroider/macros/es-compat", "@ember/component", "@ember/template-factory", "@glimmer/tracking", "discourse-common/lib/get-owner", "@glimmer/component", "discourse-common/utils/decorators", "discourse/lib/sidebar/user/messages-section/group-message-section-link", "discourse/lib/sidebar/user/messages-section/personal-message-section-link", "@ember/service"], function (_exports, _esCompat, _component, _templateFactory, _tracking, _getOwner, _component2, _decorators, _groupMessageSectionLink, _personalMessageSectionLink, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.UNREAD = _exports.PERSONAL_MESSAGES_INBOX_FILTERS = _exports.NEW = _exports.INBOX = _exports.GROUP_MESSAGES_INBOX_FILTERS = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/tracking",0,"discourse-common/lib/get-owner",0,"@glimmer/component",0,"discourse-common/utils/decorators",0,"discourse/lib/sidebar/user/messages-section/group-message-section-link",0,"discourse/lib/sidebar/user/messages-section/personal-message-section-link",0,"@ember/service",0,"ember-cached-decorator-polyfill"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <Sidebar::Section
    @sectionName="messages"
    @headerActionIcon="plus"
    @headerActions={{array
      (hash
        action=(fn (route-action "composePrivateMessage") null null)
        title=(i18n "sidebar.sections.messages.header_action_title")
      )
    }}
    @headerActionsIcon="plus"
    @headerLinkText={{i18n "sidebar.sections.messages.header_link_text"}}
    @collapsable={{@collapsable}}
  >
  
    {{#each this.personalMessagesSectionLinks as |personalMessageSectionLink|}}
      {{#if personalMessageSectionLink.shouldDisplay}}
        <Sidebar::SectionLink
          @linkName={{personalMessageSectionLink.name}}
          @class={{personalMessageSectionLink.class}}
          @route={{personalMessageSectionLink.route}}
          @model={{personalMessageSectionLink.model}}
          @prefixType={{personalMessageSectionLink.prefixType}}
          @prefixValue={{personalMessageSectionLink.prefixValue}}
          @currentWhen={{personalMessageSectionLink.currentWhen}}
          @content={{personalMessageSectionLink.text}}
        />
      {{/if}}
    {{/each}}
  
    {{#if (gt this.groupMessagesSectionLinks.length 0)}}
      {{#each this.groupMessagesSectionLinks as |groupMessageSectionLink|}}
        {{#if groupMessageSectionLink.shouldDisplay}}
          <Sidebar::SectionLink
            @linkName={{groupMessageSectionLink.name}}
            @class={{groupMessageSectionLink.class}}
            @route={{groupMessageSectionLink.route}}
            @prefixType={{groupMessageSectionLink.prefixType}}
            @prefixValue={{groupMessageSectionLink.prefixValue}}
            @models={{groupMessageSectionLink.models}}
            @currentWhen={{groupMessageSectionLink.currentWhen}}
            @content={{groupMessageSectionLink.text}}
          />
        {{/if}}
      {{/each}}
    {{/if}}
  
  </Sidebar::Section>
  */
  {
    "id": "1mHI7XtA",
    "block": "[[[8,[39,0],null,[[\"@sectionName\",\"@headerActionIcon\",\"@headerActions\",\"@headerActionsIcon\",\"@headerLinkText\",\"@collapsable\"],[\"messages\",\"plus\",[28,[37,1],[[28,[37,2],null,[[\"action\",\"title\"],[[28,[37,3],[[28,[37,4],[\"composePrivateMessage\"],null],null,null],null],[28,[37,5],[\"sidebar.sections.messages.header_action_title\"],null]]]]],null],\"plus\",[28,[37,5],[\"sidebar.sections.messages.header_link_text\"],null],[30,1]]],[[\"default\"],[[[[1,\"\\n\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"personalMessagesSectionLinks\"]]],null]],null],null,[[[41,[30,2,[\"shouldDisplay\"]],[[[1,\"      \"],[8,[39,9],null,[[\"@linkName\",\"@class\",\"@route\",\"@model\",\"@prefixType\",\"@prefixValue\",\"@currentWhen\",\"@content\"],[[30,2,[\"name\"]],[30,2,[\"class\"]],[30,2,[\"route\"]],[30,2,[\"model\"]],[30,2,[\"prefixType\"]],[30,2,[\"prefixValue\"]],[30,2,[\"currentWhen\"]],[30,2,[\"text\"]]]],null],[1,\"\\n\"]],[]],null]],[2]],null],[1,\"\\n\"],[41,[28,[37,10],[[30,0,[\"groupMessagesSectionLinks\",\"length\"]],0],null],[[[42,[28,[37,7],[[28,[37,7],[[30,0,[\"groupMessagesSectionLinks\"]]],null]],null],null,[[[41,[30,3,[\"shouldDisplay\"]],[[[1,\"        \"],[8,[39,9],null,[[\"@linkName\",\"@class\",\"@route\",\"@prefixType\",\"@prefixValue\",\"@models\",\"@currentWhen\",\"@content\"],[[30,3,[\"name\"]],[30,3,[\"class\"]],[30,3,[\"route\"]],[30,3,[\"prefixType\"]],[30,3,[\"prefixValue\"]],[30,3,[\"models\"]],[30,3,[\"currentWhen\"]],[30,3,[\"text\"]]]],null],[1,\"\\n\"]],[]],null]],[3]],null]],[]],null],[1,\"\\n\"]],[]]]]]],[\"@collapsable\",\"personalMessageSectionLink\",\"groupMessageSectionLink\"],false,[\"sidebar/section\",\"array\",\"hash\",\"fn\",\"route-action\",\"i18n\",\"each\",\"-track-array\",\"if\",\"sidebar/section-link\",\"gt\"]]",
    "moduleName": "discourse/components/sidebar/user/messages-section.hbs",
    "isStrictMode": false
  });
  let cached = (0, _esCompat.default)(require("ember-cached-decorator-polyfill")).cached;
  const INBOX = "inbox";
  _exports.INBOX = INBOX;
  const UNREAD = "unread";
  _exports.UNREAD = UNREAD;
  const SENT = "sent";
  const NEW = "new";
  _exports.NEW = NEW;
  const ARCHIVE = "archive";
  const PERSONAL_MESSAGES_INBOX_FILTERS = [INBOX, NEW, UNREAD, SENT, ARCHIVE];
  _exports.PERSONAL_MESSAGES_INBOX_FILTERS = PERSONAL_MESSAGES_INBOX_FILTERS;
  const GROUP_MESSAGES_INBOX_FILTERS = [INBOX, NEW, UNREAD, ARCHIVE];
  _exports.GROUP_MESSAGES_INBOX_FILTERS = GROUP_MESSAGES_INBOX_FILTERS;
  let SidebarUserMessagesSection = (_class = class SidebarUserMessagesSection extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "appEvents", _descriptor, this);
      _initializerDefineProperty(this, "pmTopicTrackingState", _descriptor2, this);
      _initializerDefineProperty(this, "currentUser", _descriptor3, this);
      _initializerDefineProperty(this, "router", _descriptor4, this);
      this.appEvents.on("page:changed", this, this._refreshSectionLinksDisplayState);
      this._pmTopicTrackingStateKey = "messages-section";
      this.pmTopicTrackingState.onStateChange(this._pmTopicTrackingStateKey, this._refreshSectionLinkCounts);
    }
    _refreshSectionLinkCounts() {
      for (const sectionLink of this.allSectionLinks) {
        sectionLink.refreshCount();
      }
    }
    willDestroy() {
      this.appEvents.off("page:changed", this, this._refreshSectionLinksDisplayState);
      this.pmTopicTrackingState.offStateChange(this._pmTopicTrackingStateKey, this._refreshSectionLinkCounts);
    }
    _refreshSectionLinksDisplayState() {
      const currentRouteName = this.router.currentRoute.name;
      const currentRouteParentName = this.router.currentRoute.parent.name;
      const currentRouteParentParams = this.router.currentRoute.parent.params;
      if (!currentRouteParentName.includes("userPrivateMessages") && currentRouteParentName !== "topic") {
        for (const sectionLink of this.allSectionLinks) {
          sectionLink.collapse();
        }
      } else {
        const attrs = {
          currentRouteName,
          currentRouteParentParams
        };
        if (currentRouteParentName === "topic") {
          const topicController = (0, _getOwner.getOwner)(this).lookup("controller:topic");
          if (topicController.model.isPrivateMessage) {
            attrs.privateMessageTopic = topicController.model;
          }
        }
        for (const sectionLink of this.allSectionLinks) {
          sectionLink.pageChanged(attrs);
        }
      }
    }
    get personalMessagesSectionLinks() {
      const links = [];
      PERSONAL_MESSAGES_INBOX_FILTERS.forEach(type => {
        links.push(new _personalMessageSectionLink.default({
          currentUser: this.currentUser,
          type,
          pmTopicTrackingState: this.pmTopicTrackingState
        }));
      });
      return links;
    }
    get groupMessagesSectionLinks() {
      const links = [];
      this.currentUser.groupsWithMessages.sort((a, b) => a.name.localeCompare(b.name)).forEach(group => {
        GROUP_MESSAGES_INBOX_FILTERS.forEach(groupMessageLink => {
          links.push(new _groupMessageSectionLink.default({
            group,
            type: groupMessageLink,
            currentUser: this.currentUser,
            pmTopicTrackingState: this.pmTopicTrackingState
          }));
        });
      });
      return links;
    }
    get allSectionLinks() {
      return [...this.groupMessagesSectionLinks, ...this.personalMessagesSectionLinks];
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "appEvents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "pmTopicTrackingState", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "_refreshSectionLinkCounts", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_refreshSectionLinkCounts"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "personalMessagesSectionLinks", [cached], Object.getOwnPropertyDescriptor(_class.prototype, "personalMessagesSectionLinks"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "groupMessagesSectionLinks", [cached], Object.getOwnPropertyDescriptor(_class.prototype, "groupMessagesSectionLinks"), _class.prototype)), _class);
  _exports.default = SidebarUserMessagesSection;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SidebarUserMessagesSection);
});