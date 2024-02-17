define("discourse/lib/user-menu/notification-item", ["exports", "discourse/lib/user-menu/base-item", "discourse/lib/cookie", "discourse-common/lib/get-url", "discourse/lib/ajax", "discourse/lib/notification-types-manager"], function (_exports, _baseItem, _cookie, _getUrl, _ajax, _notificationTypesManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/user-menu/base-item",0,"discourse/lib/cookie",0,"discourse-common/lib/get-url",0,"discourse/lib/ajax",0,"discourse/lib/notification-types-manager"eaimeta@70e063a35619d71f
  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  var _notificationName = /*#__PURE__*/new WeakMap();
  class UserMenuNotificationItem extends _baseItem.default {
    constructor(_ref) {
      let {
        notification,
        currentUser,
        siteSettings,
        site
      } = _ref;
      super(...arguments);
      _classPrivateFieldInitSpec(this, _notificationName, {
        get: _get_notificationName,
        set: void 0
      });
      this.notification = notification;
      this.currentUser = currentUser;
      this.siteSettings = siteSettings;
      this.site = site;
      this.renderDirector = (0, _notificationTypesManager.getRenderDirector)(_classPrivateFieldGet(this, _notificationName), notification, currentUser, siteSettings, site);
    }
    get className() {
      return this.renderDirector.classNames?.join(" ") || "";
    }
    get linkHref() {
      return this.renderDirector.linkHref;
    }
    get linkTitle() {
      return this.renderDirector.linkTitle;
    }
    get icon() {
      return this.renderDirector.icon;
    }
    get label() {
      return this.renderDirector.label;
    }
    get labelClass() {
      return this.renderDirector.labelClasses?.join(" ") || "";
    }
    get description() {
      return this.renderDirector.description;
    }
    get descriptionClass() {
      return this.renderDirector.descriptionClasses?.join(" ") || "";
    }
    get topicId() {
      return this.notification.topic_id;
    }
    onClick() {
      if (!this.notification.read) {
        this.notification.set("read", true);
        const groupedUnreadNotifications = {
          ...this.currentUser.grouped_unread_notifications
        };
        const unreadCount = groupedUnreadNotifications && groupedUnreadNotifications[this.notification.notification_type];
        if (unreadCount > 0) {
          groupedUnreadNotifications[this.notification.notification_type] = unreadCount - 1;
          this.currentUser.set("grouped_unread_notifications", groupedUnreadNotifications);
        }
        (0, _ajax.setTransientHeader)("Discourse-Clear-Notifications", this.notification.id);
        (0, _cookie.default)("cn", this.notification.id, {
          path: (0, _getUrl.default)("/")
        });
      }
      super.onClick(...arguments);
    }
  }
  _exports.default = UserMenuNotificationItem;
  function _get_notificationName() {
    return this.site.notificationLookup[this.notification.notification_type];
  }
});