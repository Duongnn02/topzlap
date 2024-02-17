define("discourse/components/user-menu/menu", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@glimmer/tracking", "@ember/object", "discourse/models/bookmark", "discourse/lib/user-menu/tab", "@ember/service", "discourse-common/lib/get-url", "discourse/lib/intercept-click", "discourse/components/user-menu/notifications-list", "discourse/components/user-menu/replies-notifications-list", "discourse/components/user-menu/likes-notifications-list", "discourse/components/user-menu/messages-list", "discourse/components/user-menu/bookmarks-list", "discourse/components/user-menu/reviewables-list", "discourse/components/user-menu/profile-tab-content", "discourse/components/user-menu/other-notifications-list", "discourse-common/lib/deprecated", "discourse-common/lib/get-owner"], function (_exports, _component, _templateFactory, _component2, _tracking, _object, _bookmark, _tab, _service, _getUrl, _interceptClick, _notificationsList, _repliesNotificationsList, _likesNotificationsList, _messagesList, _bookmarksList, _reviewablesList, _profileTabContent, _otherNotificationsList, _deprecated, _getOwner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class9, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _notificationTypesForTheOtherTab;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@glimmer/tracking",0,"@ember/object",0,"discourse/models/bookmark",0,"discourse/lib/user-menu/tab",0,"@ember/service",0,"discourse-common/lib/get-url",0,"discourse/lib/intercept-click",0,"discourse/components/user-menu/notifications-list",0,"discourse/components/user-menu/replies-notifications-list",0,"discourse/components/user-menu/likes-notifications-list",0,"discourse/components/user-menu/messages-list",0,"discourse/components/user-menu/bookmarks-list",0,"discourse/components/user-menu/reviewables-list",0,"discourse/components/user-menu/profile-tab-content",0,"discourse/components/user-menu/other-notifications-list",0,"discourse-common/lib/deprecated",0,"discourse-common/lib/get-owner"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div
    class="user-menu revamped menu-panel drop-down"
    data-max-width="320"
    {{did-insert this.triggerRenderedAppEvent}}
  >
    <div class="panel-body">
      <div class="panel-body-contents">
        <div
          class="menu-tabs-container"
          role="tablist"
          aria-orientation="vertical"
          aria-label={{i18n "user_menu.sr_menu_tabs"}}
        >
          <div class="top-tabs tabs-list" {{did-insert this.focusFirstTab}}>
            {{#each this.topTabs as |tab|}}
              <UserMenu::MenuTab
                @tab={{tab}}
                @currentTabId={{this.currentTabId}}
                @onTabClick={{fn this.handleTabClick tab}}
              />
            {{/each}}
          </div>
          <div class="bottom-tabs tabs-list">
            {{#each this.bottomTabs as |tab|}}
              <UserMenu::MenuTab
                @tab={{tab}}
                @currentTabId={{this.currentTabId}}
                @onTabClick={{fn this.handleTabClick tab}}
              />
            {{/each}}
          </div>
        </div>
        <div
          id={{concat "quick-access-" this.currentTabId}}
          class="quick-access-panel"
          tabindex="-1"
        >
          <this.currentPanelComponent
            @closeUserMenu={{@closeUserMenu}}
            @filterByTypes={{this.currentNotificationTypes}}
            @ariaLabelledby={{concat "user-menu-button-" this.currentTabId}}
          />
        </div>
      </div>
    </div>
  </div>
  */
  {
    "id": "Z4WdVuij",
    "block": "[[[11,0],[24,0,\"user-menu revamped menu-panel drop-down\"],[24,\"data-max-width\",\"320\"],[4,[38,0],[[30,0,[\"triggerRenderedAppEvent\"]]],null],[12],[1,\"\\n  \"],[10,0],[14,0,\"panel-body\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"panel-body-contents\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"menu-tabs-container\"],[14,\"role\",\"tablist\"],[14,\"aria-orientation\",\"vertical\"],[15,\"aria-label\",[28,[37,1],[\"user_menu.sr_menu_tabs\"],null]],[12],[1,\"\\n        \"],[11,0],[24,0,\"top-tabs tabs-list\"],[4,[38,0],[[30,0,[\"focusFirstTab\"]]],null],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"topTabs\"]]],null]],null],null,[[[1,\"            \"],[8,[39,4],null,[[\"@tab\",\"@currentTabId\",\"@onTabClick\"],[[30,1],[30,0,[\"currentTabId\"]],[28,[37,5],[[30,0,[\"handleTabClick\"]],[30,1]],null]]],null],[1,\"\\n\"]],[1]],null],[1,\"        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"bottom-tabs tabs-list\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"bottomTabs\"]]],null]],null],null,[[[1,\"            \"],[8,[39,4],null,[[\"@tab\",\"@currentTabId\",\"@onTabClick\"],[[30,2],[30,0,[\"currentTabId\"]],[28,[37,5],[[30,0,[\"handleTabClick\"]],[30,2]],null]]],null],[1,\"\\n\"]],[2]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[15,1,[28,[37,6],[\"quick-access-\",[30,0,[\"currentTabId\"]]],null]],[14,0,\"quick-access-panel\"],[14,\"tabindex\",\"-1\"],[12],[1,\"\\n        \"],[8,[30,0,[\"currentPanelComponent\"]],null,[[\"@closeUserMenu\",\"@filterByTypes\",\"@ariaLabelledby\"],[[30,3],[30,0,[\"currentNotificationTypes\"]],[28,[37,6],[\"user-menu-button-\",[30,0,[\"currentTabId\"]]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"tab\",\"tab\",\"@closeUserMenu\"],false,[\"did-insert\",\"i18n\",\"each\",\"-track-array\",\"user-menu/menu-tab\",\"fn\",\"concat\"]]",
    "moduleName": "discourse/components/user-menu/menu.hbs",
    "isStrictMode": false
  });
  const DEFAULT_TAB_ID = "all-notifications";
  const DEFAULT_PANEL_COMPONENT = _notificationsList.default;
  const REVIEW_QUEUE_TAB_ID = "review-queue";
  const CORE_TOP_TABS = [class extends _tab.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "id", DEFAULT_TAB_ID);
      _defineProperty(this, "icon", "bell");
      _defineProperty(this, "panelComponent", DEFAULT_PANEL_COMPONENT);
    }
    get linkWhenActive() {
      return `${this.currentUser.path}/notifications`;
    }
  }, class extends _tab.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "id", "replies");
      _defineProperty(this, "icon", "reply");
      _defineProperty(this, "panelComponent", _repliesNotificationsList.default);
      _defineProperty(this, "notificationTypes", ["mentioned", "posted", "quoted", "replied"]);
    }
    get count() {
      return this.getUnreadCountForType("mentioned") + this.getUnreadCountForType("posted") + this.getUnreadCountForType("quoted") + this.getUnreadCountForType("replied");
    }
    get linkWhenActive() {
      return `${this.currentUser.path}/notifications/responses`;
    }
  }, class extends _tab.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "id", "likes");
      _defineProperty(this, "icon", "heart");
      _defineProperty(this, "panelComponent", _likesNotificationsList.default);
    }
    get shouldDisplay() {
      return !this.currentUser.user_option.likes_notifications_disabled;
    }
    get count() {
      return this.getUnreadCountForType("liked") + this.getUnreadCountForType("liked_consolidated") + this.getUnreadCountForType("reaction");
    }

    // TODO(osama): reaction is a type used by the reactions plugin, but it's
    // added here temporarily unitl we add a plugin API for extending
    // filterByTypes in lists
    get notificationTypes() {
      return ["liked", "liked_consolidated", "reaction"];
    }
    get linkWhenActive() {
      return `${this.currentUser.path}/notifications/likes-received`;
    }
  }, class extends _tab.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "id", "messages");
      _defineProperty(this, "icon", "notification.private_message");
      _defineProperty(this, "panelComponent", _messagesList.default);
      _defineProperty(this, "notificationTypes", ["private_message", "group_message_summary"]);
    }
    get count() {
      return this.getUnreadCountForType("private_message");
    }
    get shouldDisplay() {
      return this.currentUser?.can_send_private_messages;
    }
    get linkWhenActive() {
      return `${this.currentUser.path}/messages`;
    }
  }, class extends _tab.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "id", "bookmarks");
      _defineProperty(this, "icon", _bookmark.NO_REMINDER_ICON);
      _defineProperty(this, "panelComponent", _bookmarksList.default);
      _defineProperty(this, "notificationTypes", ["bookmark_reminder"]);
    }
    get count() {
      return this.getUnreadCountForType("bookmark_reminder");
    }
    get linkWhenActive() {
      return `${this.currentUser.path}/activity/bookmarks`;
    }
  }, class extends _tab.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "id", REVIEW_QUEUE_TAB_ID);
      _defineProperty(this, "icon", "flag");
      _defineProperty(this, "panelComponent", _reviewablesList.default);
      _defineProperty(this, "linkWhenActive", (0, _getUrl.default)("/review"));
    }
    get shouldDisplay() {
      return this.currentUser.can_review && this.currentUser.get("reviewable_count");
    }
    get count() {
      return this.currentUser.get("reviewable_count");
    }
  }];
  const CORE_BOTTOM_TABS = [class extends _tab.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "id", "profile");
      _defineProperty(this, "icon", "user");
      _defineProperty(this, "panelComponent", _profileTabContent.default);
    }
    get linkWhenActive() {
      return `${this.currentUser.path}/summary`;
    }
  }];
  const CORE_OTHER_NOTIFICATIONS_TAB = class CORE_OTHER_NOTIFICATIONS_TAB extends _tab.default {
    constructor(currentUser, siteSettings, site, otherNotificationTypes) {
      super(...arguments);
      _defineProperty(this, "id", "other-notifications");
      _defineProperty(this, "icon", "discourse-other-tab");
      _defineProperty(this, "panelComponent", _otherNotificationsList.default);
      this.otherNotificationTypes = otherNotificationTypes;
    }
    get count() {
      return this.otherNotificationTypes.reduce((sum, notificationType) => {
        return sum + this.getUnreadCountForType(notificationType);
      }, 0);
    }
    get notificationTypes() {
      return this.otherNotificationTypes;
    }
  };
  function resolvePanelComponent(owner, panelComponent) {
    if (typeof panelComponent === "string") {
      const nameForConsole = JSON.stringify(panelComponent);
      (0, _deprecated.default)(`user-menu tab panelComponent must be passed as a component class (passed ${nameForConsole})`, {
        id: "discourse.user-menu.panel-component-class"
      });
      return owner.resolveRegistration(`component:${panelComponent}`);
    }
    return panelComponent;
  }
  let UserMenu = (_class9 = (_notificationTypesForTheOtherTab = /*#__PURE__*/new WeakSet(), class UserMenu extends _component2.default {
    constructor() {
      super(...arguments);
      _classPrivateMethodInitSpec(this, _notificationTypesForTheOtherTab);
      _initializerDefineProperty(this, "currentUser", _descriptor, this);
      _initializerDefineProperty(this, "siteSettings", _descriptor2, this);
      _initializerDefineProperty(this, "site", _descriptor3, this);
      _initializerDefineProperty(this, "appEvents", _descriptor4, this);
      _initializerDefineProperty(this, "currentTabId", _descriptor5, this);
      _initializerDefineProperty(this, "currentPanelComponent", _descriptor6, this);
      _initializerDefineProperty(this, "currentNotificationTypes", _descriptor7, this);
      this.topTabs = this._topTabs;
      this.bottomTabs = this._bottomTabs;
    }
    get _topTabs() {
      const tabs = [];
      CORE_TOP_TABS.forEach(tabClass => {
        const tab = new tabClass(this.currentUser, this.siteSettings, this.site);
        if (tab.shouldDisplay) {
          tabs.push(tab);
        }
      });
      let reviewQueueTabIndex = tabs.findIndex(tab => tab.id === REVIEW_QUEUE_TAB_ID);
      _tab.CUSTOM_TABS_CLASSES.forEach(tabClass => {
        const tab = new tabClass(this.currentUser, this.siteSettings, this.site);
        if (tab.shouldDisplay) {
          if (reviewQueueTabIndex === -1) {
            tabs.push(tab);
          } else {
            tabs.insertAt(reviewQueueTabIndex, tab);
            reviewQueueTabIndex++;
          }
        }
      });
      tabs.push(new CORE_OTHER_NOTIFICATIONS_TAB(this.currentUser, this.siteSettings, this.site, _classPrivateMethodGet(this, _notificationTypesForTheOtherTab, _notificationTypesForTheOtherTab2).call(this, tabs)));
      return tabs.map((tab, index) => {
        tab.position = index;
        return tab;
      });
    }
    get _bottomTabs() {
      const tabs = [];
      CORE_BOTTOM_TABS.forEach(tabClass => {
        const tab = new tabClass(this.currentUser, this.siteSettings, this.site);
        if (tab.shouldDisplay) {
          tabs.push(tab);
        }
      });
      const topTabsLength = this.topTabs.length;
      return tabs.map((tab, index) => {
        tab.position = index + topTabsLength;
        return tab;
      });
    }
    handleTabClick(tab, event) {
      if ((0, _interceptClick.wantsNewWindow)(event) || this.currentTabId === tab.id) {
        // Allow normal navigation to href
        return;
      }
      event.preventDefault();
      this.currentTabId = tab.id;
      this.currentPanelComponent = resolvePanelComponent((0, _getOwner.getOwner)(this), tab.panelComponent);
      this.currentNotificationTypes = tab.notificationTypes;
    }
    triggerRenderedAppEvent() {
      this.appEvents.trigger("user-menu:rendered");
    }
    focusFirstTab(topTabsContainerElement) {
      topTabsContainerElement.querySelector(".btn.active")?.focus();
    }
  }), (_descriptor = _applyDecoratedDescriptor(_class9.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class9.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class9.prototype, "site", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class9.prototype, "appEvents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class9.prototype, "currentTabId", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return DEFAULT_TAB_ID;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class9.prototype, "currentPanelComponent", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return DEFAULT_PANEL_COMPONENT;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class9.prototype, "currentNotificationTypes", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class9.prototype, "handleTabClick", [_object.action], Object.getOwnPropertyDescriptor(_class9.prototype, "handleTabClick"), _class9.prototype), _applyDecoratedDescriptor(_class9.prototype, "triggerRenderedAppEvent", [_object.action], Object.getOwnPropertyDescriptor(_class9.prototype, "triggerRenderedAppEvent"), _class9.prototype), _applyDecoratedDescriptor(_class9.prototype, "focusFirstTab", [_object.action], Object.getOwnPropertyDescriptor(_class9.prototype, "focusFirstTab"), _class9.prototype)), _class9);
  _exports.default = UserMenu;
  function _notificationTypesForTheOtherTab2(tabs) {
    const usedNotificationTypes = tabs.filter(tab => tab.notificationTypes).map(tab => tab.notificationTypes).flat();
    return Object.keys(this.site.notification_types).filter(notificationType => !usedNotificationTypes.includes(notificationType));
  }
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserMenu);
});