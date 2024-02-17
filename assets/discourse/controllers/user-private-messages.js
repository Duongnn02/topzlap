define("discourse/controllers/user-private-messages", ["exports", "@embroider/macros/es-compat", "@ember/controller", "@ember/object", "@ember/service", "@ember/object/computed", "@glimmer/tracking", "I18n", "discourse/lib/url"], function (_exports, _esCompat, _controller, _object, _service, _computed, _tracking, _I18n, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.registerCustomUserNavMessagesDropdownRow = registerCustomUserNavMessagesDropdownRow;
  _exports.resetCustomUserNavMessagesDropdownRows = resetCustomUserNavMessagesDropdownRows;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@ember/service",0,"@ember/object/computed",0,"@glimmer/tracking",0,"I18n",0,"discourse/lib/url",0,"ember-cached-decorator-polyfill"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let cached = (0, _esCompat.default)(require("ember-cached-decorator-polyfill")).cached;
  const customUserNavMessagesDropdownRows = [];
  function registerCustomUserNavMessagesDropdownRow(routeName, name, icon) {
    customUserNavMessagesDropdownRows.push({
      routeName,
      name,
      icon
    });
  }
  function resetCustomUserNavMessagesDropdownRows() {
    customUserNavMessagesDropdownRows.length = 0;
  }
  let _class = (_dec = (0, _computed.alias)("group.name"), _dec2 = (0, _computed.and)("user.viewingSelf", "currentUser.can_send_private_messages"), _dec3 = (0, _computed.equal)("currentParentRouteName", "userPrivateMessages.group"), _dec4 = (0, _computed.readOnly)("user.viewingSelf"), _dec5 = (0, _computed.readOnly)("router.currentRoute.parent.name"), _dec6 = (0, _computed.readOnly)("site.can_tag_pms"), (_class2 = class _class2 extends _controller.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "router", _descriptor, this);
      _initializerDefineProperty(this, "user", _descriptor2, this);
      _initializerDefineProperty(this, "group", _descriptor3, this);
      _initializerDefineProperty(this, "tagId", _descriptor4, this);
      _initializerDefineProperty(this, "groupFilter", _descriptor5, this);
      _initializerDefineProperty(this, "showNewPM", _descriptor6, this);
      _initializerDefineProperty(this, "isGroup", _descriptor7, this);
      _initializerDefineProperty(this, "viewingSelf", _descriptor8, this);
      _initializerDefineProperty(this, "currentParentRouteName", _descriptor9, this);
      _initializerDefineProperty(this, "pmTaggingEnabled", _descriptor10, this);
    }
    get messagesDropdownValue() {
      let value;
      for (let i = this.messagesDropdownContent.length - 1; i >= 0; i--) {
        const row = this.messagesDropdownContent[i];
        if (this.router.currentURL.toLowerCase().includes(row.id)) {
          value = row.id;
          break;
        }
      }
      return value;
    }
    get messagesDropdownContent() {
      const usernameLower = this.model.username_lower;
      const content = [{
        id: this.router.urlFor("userPrivateMessages.user", usernameLower),
        name: _I18n.default.t("user.messages.inbox")
      }];
      this.model.groupsWithMessages.forEach(group => {
        content.push({
          id: this.router.urlFor("userPrivateMessages.group", usernameLower, group.name),
          name: group.name,
          icon: "inbox"
        });
      });
      if (this.pmTaggingEnabled) {
        content.push({
          id: this.router.urlFor("userPrivateMessages.tags", usernameLower),
          name: _I18n.default.t("user.messages.tags"),
          icon: "tags"
        });
      }
      customUserNavMessagesDropdownRows.forEach(row => {
        content.push({
          id: this.router.urlFor(row.routeName, usernameLower),
          name: row.name,
          icon: row.icon
        });
      });
      return content;
    }
    changeGroupNotificationLevel(notificationLevel) {
      this.group.setNotification(notificationLevel, this.get("user.model.id"));
    }
    onMessagesDropdownChange(item) {
      return _url.default.routeTo(item);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "user", [_controller.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "group", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "tagId", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "groupFilter", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "showNewPM", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "isGroup", [_dec3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "viewingSelf", [_dec4], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "currentParentRouteName", [_dec5], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "pmTaggingEnabled", [_dec6], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class2.prototype, "messagesDropdownContent", [cached], Object.getOwnPropertyDescriptor(_class2.prototype, "messagesDropdownContent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeGroupNotificationLevel", [_object.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeGroupNotificationLevel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onMessagesDropdownChange", [_object.action], Object.getOwnPropertyDescriptor(_class2.prototype, "onMessagesDropdownChange"), _class2.prototype)), _class2));
  _exports.default = _class;
});