define("discourse/components/user-nav", ["exports", "@ember/component", "@ember/template-factory", "I18n", "@glimmer/component", "@ember/service", "@ember/object", "@ember/runloop", "discourse-common/utils/decorators", "discourse/components/user-nav/dropdown-list"], function (_exports, _component, _templateFactory, _I18n, _component2, _service, _object, _runloop, _decorators, _dropdownList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"I18n",0,"@glimmer/component",0,"@ember/service",0,"@ember/object",0,"@ember/runloop",0,"discourse-common/utils/decorators",0,"discourse/components/user-nav/dropdown-list"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <section class="user-navigation user-navigation-primary">
    <HorizontalOverflowNav
      @className="main-nav nav user-nav"
      @ariaLabel="User primary"
    >
      {{#unless @user.profile_hidden}}
        <DNavigationItem @route="user.summary" @class="user-nav__summary">
          {{d-icon "user"}}
          <span>{{i18n "user.summary.title"}}</span>
        </DNavigationItem>
  
        <DNavigationItem
          @route="userActivity"
          @class="user-nav__activity"
          @ariaCurrentContext="parentNav"
        >
          {{d-icon "stream"}}
          <span>{{i18n "user.activity_stream"}}</span>
        </DNavigationItem>
  
      {{/unless}}
  
      {{#if @showNotificationsTab}}
        <DNavigationItem
          @route="userNotifications"
          @class="user-nav__notifications"
          @ariaCurrentContext="parentNav"
        >
          {{d-icon "bell" class="glyph"}}
          <span>{{i18n "user.notifications"}}</span>
        </DNavigationItem>
      {{/if}}
  
      {{#if @showPrivateMessages}}
        <DNavigationItem
          @route="userPrivateMessages"
          @class="user-nav__personal-messages"
          @ariaCurrentContext="parentNav"
        >
          {{d-icon "envelope"}}
          <span>{{i18n "user.private_messages"}}</span>
        </DNavigationItem>
      {{/if}}
  
      {{#if @canInviteToForum}}
        <DNavigationItem
          @route="userInvited"
          @class="user-nav__invites"
          @ariaCurrentContext="parentNav"
        >
          {{d-icon "user-plus"}}
          <span>{{i18n "user.invited.title"}}</span>
        </DNavigationItem>
      {{/if}}
  
      {{#if @showBadges}}
        <DNavigationItem @route="user.badges" @class="user-nav__badges">
          {{d-icon "certificate"}}
          <span>{{i18n "badges.title"}}</span>
        </DNavigationItem>
      {{/if}}
  
      <PluginOutlet
        @name="user-main-nav"
        @connectorTagName="li"
        @outletArgs={{hash model=@user}}
      />
  
      {{#if @user.can_edit}}
        <DNavigationItem
          @route="preferences"
          @class="user-nav__preferences"
          @ariaCurrentContext="parentNav"
        >
          {{d-icon "cog"}}
          <span>{{i18n "user.preferences"}}</span>
        </DNavigationItem>
      {{/if}}
  
      {{#if (and this.site.mobileView this.currentUser.staff)}}
        <li class="user-nav__admin">
          <a href={{@user.adminPath}}>
            {{d-icon "wrench"}}
            <span>{{i18n "admin.user.manage_user"}}</span>
          </a>
        </li>
      {{/if}}
    </HorizontalOverflowNav>
  </section>
  */
  {
    "id": "/K7XHnYw",
    "block": "[[[10,\"section\"],[14,0,\"user-navigation user-navigation-primary\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@className\",\"@ariaLabel\"],[\"main-nav nav user-nav\",\"User primary\"]],[[\"default\"],[[[[1,\"\\n\"],[41,[51,[30,1,[\"profile_hidden\"]]],[[[1,\"      \"],[8,[39,2],null,[[\"@route\",\"@class\"],[\"user.summary\",\"user-nav__summary\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"user\"],null]],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,4],[\"user.summary.title\"],null]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\\n      \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userActivity\",\"user-nav__activity\",\"parentNav\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"stream\"],null]],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,4],[\"user.activity_stream\"],null]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\\n\"]],[]],null],[1,\"\\n\"],[41,[30,2],[[[1,\"      \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userNotifications\",\"user-nav__notifications\",\"parentNav\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"bell\"],[[\"class\"],[\"glyph\"]]]],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,4],[\"user.notifications\"],null]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,3],[[[1,\"      \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userPrivateMessages\",\"user-nav__personal-messages\",\"parentNav\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"envelope\"],null]],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,4],[\"user.private_messages\"],null]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,4],[[[1,\"      \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userInvited\",\"user-nav__invites\",\"parentNav\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"user-plus\"],null]],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,4],[\"user.invited.title\"],null]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,5],[[[1,\"      \"],[8,[39,2],null,[[\"@route\",\"@class\"],[\"user.badges\",\"user-nav__badges\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"certificate\"],null]],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,4],[\"badges.title\"],null]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-main-nav\",\"li\",[28,[37,7],null,[[\"model\"],[[30,1]]]]]],null],[1,\"\\n\\n\"],[41,[30,1,[\"can_edit\"]],[[[1,\"      \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"preferences\",\"user-nav__preferences\",\"parentNav\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"cog\"],null]],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,4],[\"user.preferences\"],null]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,8],[[30,0,[\"site\",\"mobileView\"]],[30,0,[\"currentUser\",\"staff\"]]],null],[[[1,\"      \"],[10,\"li\"],[14,0,\"user-nav__admin\"],[12],[1,\"\\n        \"],[10,3],[15,6,[30,1,[\"adminPath\"]]],[12],[1,\"\\n          \"],[1,[28,[35,3],[\"wrench\"],null]],[1,\"\\n          \"],[10,1],[12],[1,[28,[35,4],[\"admin.user.manage_user\"],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"]],[]]]]],[1,\"\\n\"],[13]],[\"@user\",\"@showNotificationsTab\",\"@showPrivateMessages\",\"@canInviteToForum\",\"@showBadges\"],false,[\"horizontal-overflow-nav\",\"unless\",\"d-navigation-item\",\"d-icon\",\"i18n\",\"if\",\"plugin-outlet\",\"hash\",\"and\"]]",
    "moduleName": "discourse/components/user-nav.hbs",
    "isStrictMode": false
  });
  let UserNav = (_class = class UserNav extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "currentUser", _descriptor, this);
      _initializerDefineProperty(this, "site", _descriptor2, this);
      _initializerDefineProperty(this, "router", _descriptor3, this);
    }
    get draftLabel() {
      const count = this.currentUser.draft_count;
      return count > 0 ? _I18n.default.t("drafts.label_with_count", {
        count
      }) : _I18n.default.t("drafts.label");
    }
    _handleClickEvent(event) {
      if (!event.target.closest(`.${_dropdownList.DROPDOWN_BUTTON_CSS_CLASS}`)) {
        (0, _runloop.next)(() => {
          this.args.toggleUserNav();
        });
      }
    }
    registerClickListener(element) {
      if (this.site.mobileView) {
        element.addEventListener("click", this._handleClickEvent);
      }
    }
    unregisterClickListener(element) {
      if (this.site.mobileView) {
        element.removeEventListener("click", this._handleClickEvent);
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "site", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "_handleClickEvent", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_handleClickEvent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "registerClickListener", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "registerClickListener"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "unregisterClickListener", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "unregisterClickListener"), _class.prototype)), _class);
  _exports.default = UserNav;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserNav);
});