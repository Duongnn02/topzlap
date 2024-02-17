define("discourse/components/user-menu/messages-list", ["exports", "discourse/components/user-menu/notifications-list", "discourse/lib/ajax", "discourse/models/notification", "discourse/lib/show-modal", "I18n", "discourse/lib/user-menu/notification-item", "discourse/lib/user-menu/message-item", "discourse/models/topic", "discourse/lib/utilities", "@ember/service"], function (_exports, _notificationsList, _ajax, _notification, _showModal, _I18n, _notificationItem, _messageItem, _topic, _utilities, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _unreadMessagesNotifications;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/user-menu/notifications-list",0,"discourse/lib/ajax",0,"discourse/models/notification",0,"discourse/lib/show-modal",0,"I18n",0,"discourse/lib/user-menu/notification-item",0,"discourse/lib/user-menu/message-item",0,"discourse/models/topic",0,"discourse/lib/utilities",0,"@ember/service"eaimeta@70e063a35619d71f
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
  let UserMenuMessagesList = (_class = (_unreadMessagesNotifications = /*#__PURE__*/new WeakMap(), class UserMenuMessagesList extends _notificationsList.default {
    constructor() {
      super(...arguments);
      _classPrivateFieldInitSpec(this, _unreadMessagesNotifications, {
        get: _get_unreadMessagesNotifications,
        set: void 0
      });
      _initializerDefineProperty(this, "store", _descriptor, this);
    }
    get dismissTypes() {
      return this.filterByTypes;
    }
    get showAllHref() {
      return `${this.currentUser.path}/messages`;
    }
    get showAllTitle() {
      return _I18n.default.t("user_menu.view_all_messages");
    }
    get showDismiss() {
      return _classPrivateFieldGet(this, _unreadMessagesNotifications) > 0;
    }
    get dismissTitle() {
      return _I18n.default.t("user.dismiss_messages_tooltip");
    }
    get itemsCacheKey() {
      return "user-menu-messages-tab";
    }
    get emptyStateComponent() {
      return "user-menu/messages-list-empty-state";
    }
    async fetchItems() {
      const data = await (0, _ajax.ajax)(`/u/${this.currentUser.username}/user-menu-private-messages`);
      const content = [];
      const unreadNotifications = await _notification.default.initializeNotifications(data.unread_notifications);
      unreadNotifications.forEach(notification => {
        content.push(new _notificationItem.default({
          notification,
          currentUser: this.currentUser,
          siteSettings: this.siteSettings,
          site: this.site
        }));
      });
      const topics = data.topics.map(t => this.store.createRecord("topic", t));
      await _topic.default.applyTransformations(topics);
      const readNotifications = await _notification.default.initializeNotifications(data.read_notifications);
      (0, _utilities.mergeSortedLists)(readNotifications, topics, (notification, topic) => {
        const notificationCreatedAt = new Date(notification.created_at);
        const topicBumpedAt = new Date(topic.bumped_at);
        return topicBumpedAt > notificationCreatedAt;
      }).forEach(item => {
        if (item instanceof _notification.default) {
          content.push(new _notificationItem.default({
            notification: item,
            currentUser: this.currentUser,
            siteSettings: this.siteSettings,
            site: this.site
          }));
        } else {
          content.push(new _messageItem.default({
            message: item
          }));
        }
      });
      return content;
    }
    dismissWarningModal() {
      const modalController = (0, _showModal.default)("dismiss-notification-confirmation");
      modalController.set("confirmationMessage", _I18n.default.t("notifications.dismiss_confirmation.body.messages", {
        count: _classPrivateFieldGet(this, _unreadMessagesNotifications)
      }));
      return modalController;
    }
  }), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "store", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = UserMenuMessagesList;
  function _get_unreadMessagesNotifications() {
    const key = `grouped_unread_notifications.${this.site.notification_types.private_message}`;
    // we're retrieving the value with get() so that Ember tracks the property
    // and re-renders the UI when it changes.
    // we can stop using `get()` when the User model is refactored into native
    // class with @tracked properties.
    return this.currentUser.get(key) || 0;
  }
});