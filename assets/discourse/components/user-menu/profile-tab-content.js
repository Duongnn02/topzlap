define("discourse/components/user-menu/profile-tab-content", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service", "@ember/object", "discourse/lib/show-modal", "discourse/lib/do-not-disturb"], function (_exports, _component, _templateFactory, _component2, _service, _object, _showModal, _doNotDisturb) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addUserMenuProfileTabItem = addUserMenuProfileTabItem;
  _exports.default = void 0;
  _exports.resetUserMenuProfileTabItems = resetUserMenuProfileTabItems;
  var _class, _descriptor, _descriptor2, _descriptor3, _doNotDisturbUntilDate;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service",0,"@ember/object",0,"discourse/lib/show-modal",0,"discourse/lib/do-not-disturb"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <ul aria-labelledby={{@ariaLabelledby}}>
    {{#if this.siteSettings.enable_user_status}}
      <li class="set-user-status">
        <DButton
          @class="btn-flat profile-tab-btn"
          @action={{this.setUserStatusClick}}
        >
          {{#if this.currentUser.status}}
            {{emoji this.currentUser.status.emoji}}
            <span class="item-label">
              {{this.currentUser.status.description}}
              {{#if this.currentUser.status.ends_at}}
                {{format-age this.currentUser.status.ends_at}}
              {{/if}}
            </span>
          {{else}}
            {{d-icon "plus-circle"}}
            <span class="item-label">
              {{i18n "user_status.set_custom_status"}}
            </span>
          {{/if}}
        </DButton>
      </li>
    {{/if}}
  
    <li class="summary">
      <LinkTo @route="user.summary" @model={{this.currentUser}}>
        {{d-icon "user"}}
        <span class="item-label">
          {{i18n "user.summary.title"}}
        </span>
      </LinkTo>
    </li>
  
    <li class="activity">
      <LinkTo @route="userActivity" @model={{this.currentUser}}>
        {{d-icon "stream"}}
        <span class="item-label">
          {{i18n "user.activity_stream"}}
        </span>
      </LinkTo>
    </li>
  
    {{#if this.currentUser.can_invite_to_forum}}
      <li class="invites">
        <LinkTo @route="userInvited" @model={{this.currentUser}}>
          {{d-icon "user-plus"}}
          <span class="item-label">
            {{i18n "user.invited.title"}}
          </span>
        </LinkTo>
      </li>
    {{/if}}
  
    <li class="drafts">
      <LinkTo @route="userActivity.drafts" @model={{this.currentUser}}>
        {{d-icon "pencil-alt"}}
        <span class="item-label">
          {{#if this.currentUser.draft_count}}
            {{i18n "drafts.label_with_count" count=this.currentUser.draft_count}}
          {{else}}
            {{i18n "drafts.label"}}
          {{/if}}
        </span>
      </LinkTo>
    </li>
  
    <li class="preferences">
      <LinkTo @route="preferences" @model={{this.currentUser}}>
        {{d-icon "cog"}}
        <span class="item-label">
          {{i18n "user.preferences"}}
        </span>
      </LinkTo>
    </li>
  
    <li class="do-not-disturb">
      <DButton
        @class="btn-flat profile-tab-btn"
        @action={{this.doNotDisturbClick}}
      >
        {{d-icon (if this.isInDoNotDisturb "toggle-on" "toggle-off")}}
        <span class="item-label">
          {{#if this.isInDoNotDisturb}}
            <span>{{i18n "pause_notifications.label"}}</span>
            {{#if this.showDoNotDisturbEndDate}}
              {{format-age this.doNotDisturbDateTime}}
            {{/if}}
          {{else}}
            {{i18n "pause_notifications.label"}}
          {{/if}}
        </span>
      </DButton>
    </li>
  
    {{#if this.showToggleAnonymousButton}}
      <li
        class={{if
          this.currentUser.is_anonymous
          "disable-anonymous"
          "enable-anonymous"
        }}
      >
        <DButton
          @class="btn-flat profile-tab-btn"
          @action={{route-action "toggleAnonymous"}}
        >
          {{#if this.currentUser.is_anonymous}}
            {{d-icon "ban"}}
            <span class="item-label">
              {{i18n "switch_from_anon"}}
            </span>
          {{else}}
            {{d-icon "user-secret"}}
            <span class="item-label">
              {{i18n "switch_to_anon"}}
            </span>
          {{/if}}
        </DButton>
      </li>
    {{/if}}
  
    {{#each this.extraItems as |item|}}
      <li class={{item.className}}>
        <a href={{item.href}}>
          {{#if item.icon}}
            {{d-icon item.icon}}
          {{/if}}
          <span class="item-label">
            {{item.content}}
          </span>
        </a>
      </li>
    {{/each}}
  
    <li class="logout">
      <DButton
        @class="btn-flat profile-tab-btn"
        @action={{route-action "logout"}}
      >
        {{d-icon "sign-out-alt"}}
        <span class="item-label">
          {{i18n "user.log_out"}}
        </span>
      </DButton>
    </li>
  </ul>
  */
  {
    "id": "hyLVYjeH",
    "block": "[[[10,\"ul\"],[15,\"aria-labelledby\",[30,1]],[12],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"enable_user_status\"]],[[[1,\"    \"],[10,\"li\"],[14,0,\"set-user-status\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@class\",\"@action\"],[\"btn-flat profile-tab-btn\",[30,0,[\"setUserStatusClick\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"currentUser\",\"status\"]],[[[1,\"          \"],[1,[28,[35,2],[[30,0,[\"currentUser\",\"status\",\"emoji\"]]],null]],[1,\"\\n          \"],[10,1],[14,0,\"item-label\"],[12],[1,\"\\n            \"],[1,[30,0,[\"currentUser\",\"status\",\"description\"]]],[1,\"\\n\"],[41,[30,0,[\"currentUser\",\"status\",\"ends_at\"]],[[[1,\"              \"],[1,[28,[35,3],[[30,0,[\"currentUser\",\"status\",\"ends_at\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[1,[28,[35,4],[\"plus-circle\"],null]],[1,\"\\n          \"],[10,1],[14,0,\"item-label\"],[12],[1,\"\\n            \"],[1,[28,[35,5],[\"user_status.set_custom_status\"],null]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]]],[1,\"      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,\"li\"],[14,0,\"summary\"],[12],[1,\"\\n    \"],[8,[39,6],null,[[\"@route\",\"@model\"],[\"user.summary\",[30,0,[\"currentUser\"]]]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,4],[\"user\"],null]],[1,\"\\n      \"],[10,1],[14,0,\"item-label\"],[12],[1,\"\\n        \"],[1,[28,[35,5],[\"user.summary.title\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"li\"],[14,0,\"activity\"],[12],[1,\"\\n    \"],[8,[39,6],null,[[\"@route\",\"@model\"],[\"userActivity\",[30,0,[\"currentUser\"]]]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,4],[\"stream\"],null]],[1,\"\\n      \"],[10,1],[14,0,\"item-label\"],[12],[1,\"\\n        \"],[1,[28,[35,5],[\"user.activity_stream\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"currentUser\",\"can_invite_to_forum\"]],[[[1,\"    \"],[10,\"li\"],[14,0,\"invites\"],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@route\",\"@model\"],[\"userInvited\",[30,0,[\"currentUser\"]]]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,4],[\"user-plus\"],null]],[1,\"\\n        \"],[10,1],[14,0,\"item-label\"],[12],[1,\"\\n          \"],[1,[28,[35,5],[\"user.invited.title\"],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,\"li\"],[14,0,\"drafts\"],[12],[1,\"\\n    \"],[8,[39,6],null,[[\"@route\",\"@model\"],[\"userActivity.drafts\",[30,0,[\"currentUser\"]]]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,4],[\"pencil-alt\"],null]],[1,\"\\n      \"],[10,1],[14,0,\"item-label\"],[12],[1,\"\\n\"],[41,[30,0,[\"currentUser\",\"draft_count\"]],[[[1,\"          \"],[1,[28,[35,5],[\"drafts.label_with_count\"],[[\"count\"],[[30,0,[\"currentUser\",\"draft_count\"]]]]]],[1,\"\\n\"]],[]],[[[1,\"          \"],[1,[28,[35,5],[\"drafts.label\"],null]],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"li\"],[14,0,\"preferences\"],[12],[1,\"\\n    \"],[8,[39,6],null,[[\"@route\",\"@model\"],[\"preferences\",[30,0,[\"currentUser\"]]]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,4],[\"cog\"],null]],[1,\"\\n      \"],[10,1],[14,0,\"item-label\"],[12],[1,\"\\n        \"],[1,[28,[35,5],[\"user.preferences\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"li\"],[14,0,\"do-not-disturb\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@class\",\"@action\"],[\"btn-flat profile-tab-btn\",[30,0,[\"doNotDisturbClick\"]]]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,4],[[52,[30,0,[\"isInDoNotDisturb\"]],\"toggle-on\",\"toggle-off\"]],null]],[1,\"\\n      \"],[10,1],[14,0,\"item-label\"],[12],[1,\"\\n\"],[41,[30,0,[\"isInDoNotDisturb\"]],[[[1,\"          \"],[10,1],[12],[1,[28,[35,5],[\"pause_notifications.label\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"showDoNotDisturbEndDate\"]],[[[1,\"            \"],[1,[28,[35,3],[[30,0,[\"doNotDisturbDateTime\"]]],null]],[1,\"\\n\"]],[]],null]],[]],[[[1,\"          \"],[1,[28,[35,5],[\"pause_notifications.label\"],null]],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showToggleAnonymousButton\"]],[[[1,\"    \"],[10,\"li\"],[15,0,[52,[30,0,[\"currentUser\",\"is_anonymous\"]],\"disable-anonymous\",\"enable-anonymous\"]],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@class\",\"@action\"],[\"btn-flat profile-tab-btn\",[28,[37,7],[\"toggleAnonymous\"],null]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"currentUser\",\"is_anonymous\"]],[[[1,\"          \"],[1,[28,[35,4],[\"ban\"],null]],[1,\"\\n          \"],[10,1],[14,0,\"item-label\"],[12],[1,\"\\n            \"],[1,[28,[35,5],[\"switch_from_anon\"],null]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[1,[28,[35,4],[\"user-secret\"],null]],[1,\"\\n          \"],[10,1],[14,0,\"item-label\"],[12],[1,\"\\n            \"],[1,[28,[35,5],[\"switch_to_anon\"],null]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]]],[1,\"      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[42,[28,[37,9],[[28,[37,9],[[30,0,[\"extraItems\"]]],null]],null],null,[[[1,\"    \"],[10,\"li\"],[15,0,[30,2,[\"className\"]]],[12],[1,\"\\n      \"],[10,3],[15,6,[30,2,[\"href\"]]],[12],[1,\"\\n\"],[41,[30,2,[\"icon\"]],[[[1,\"          \"],[1,[28,[35,4],[[30,2,[\"icon\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"        \"],[10,1],[14,0,\"item-label\"],[12],[1,\"\\n          \"],[1,[30,2,[\"content\"]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[2]],null],[1,\"\\n  \"],[10,\"li\"],[14,0,\"logout\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@class\",\"@action\"],[\"btn-flat profile-tab-btn\",[28,[37,7],[\"logout\"],null]]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,4],[\"sign-out-alt\"],null]],[1,\"\\n      \"],[10,1],[14,0,\"item-label\"],[12],[1,\"\\n        \"],[1,[28,[35,5],[\"user.log_out\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"@ariaLabelledby\",\"item\"],false,[\"if\",\"d-button\",\"emoji\",\"format-age\",\"d-icon\",\"i18n\",\"link-to\",\"route-action\",\"each\",\"-track-array\"]]",
    "moduleName": "discourse/components/user-menu/profile-tab-content.hbs",
    "isStrictMode": false
  });
  const _extraItems = [];
  function addUserMenuProfileTabItem(item) {
    _extraItems.push(item);
  }
  function resetUserMenuProfileTabItems() {
    _extraItems.clear();
  }
  let UserMenuProfileTabContent = (_class = (_doNotDisturbUntilDate = /*#__PURE__*/new WeakMap(), class UserMenuProfileTabContent extends _component2.default {
    constructor() {
      super(...arguments);
      _classPrivateFieldInitSpec(this, _doNotDisturbUntilDate, {
        get: _get_doNotDisturbUntilDate,
        set: void 0
      });
      _initializerDefineProperty(this, "currentUser", _descriptor, this);
      _initializerDefineProperty(this, "siteSettings", _descriptor2, this);
      _initializerDefineProperty(this, "userStatus", _descriptor3, this);
      _defineProperty(this, "saving", false);
    }
    get showToggleAnonymousButton() {
      return this.siteSettings.allow_anonymous_posting && this.currentUser.trust_level >= this.siteSettings.anonymous_posting_min_trust_level || this.currentUser.is_anonymous;
    }
    get isInDoNotDisturb() {
      return !!_classPrivateFieldGet(this, _doNotDisturbUntilDate);
    }
    get doNotDisturbDateTime() {
      return _classPrivateFieldGet(this, _doNotDisturbUntilDate).getTime();
    }
    get showDoNotDisturbEndDate() {
      return !_doNotDisturb.default.isEternal(this.currentUser.get("do_not_disturb_until"));
    }
    get extraItems() {
      return _extraItems;
    }
    doNotDisturbClick() {
      if (this.saving) {
        return;
      }
      this.saving = true;
      if (this.currentUser.do_not_disturb_until) {
        return this.currentUser.leaveDoNotDisturb().finally(() => {
          this.saving = false;
        });
      } else {
        this.saving = false;
        this.args.closeUserMenu();
        (0, _showModal.default)("do-not-disturb");
      }
    }
    setUserStatusClick() {
      this.args.closeUserMenu();
      (0, _showModal.default)("user-status", {
        title: "user_status.set_custom_status",
        modalClass: "user-status",
        model: {
          status: this.currentUser.status,
          pauseNotifications: this.currentUser.isInDoNotDisturb(),
          saveAction: (status, pauseNotifications) => this.userStatus.set(status, pauseNotifications),
          deleteAction: () => this.userStatus.clear()
        }
      });
    }
  }), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "userStatus", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "doNotDisturbClick", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "doNotDisturbClick"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setUserStatusClick", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "setUserStatusClick"), _class.prototype)), _class);
  _exports.default = UserMenuProfileTabContent;
  function _get_doNotDisturbUntilDate() {
    if (!this.currentUser.get("do_not_disturb_until")) {
      return;
    }
    const date = new Date(this.currentUser.get("do_not_disturb_until"));
    if (date < new Date()) {
      return;
    }
    return date;
  }
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserMenuProfileTabContent);
});