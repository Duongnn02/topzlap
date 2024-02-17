define("discourse/components/user-menu/bookmarks-list", ["exports", "discourse/components/user-menu/notifications-list", "discourse/lib/ajax", "discourse/models/notification", "discourse/lib/show-modal", "I18n", "discourse/lib/user-menu/notification-item", "discourse/lib/user-menu/bookmark-item", "discourse/models/bookmark"], function (_exports, _notificationsList, _ajax, _notification, _showModal, _I18n, _notificationItem, _bookmarkItem, _bookmark) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/user-menu/notifications-list",0,"discourse/lib/ajax",0,"discourse/models/notification",0,"discourse/lib/show-modal",0,"I18n",0,"discourse/lib/user-menu/notification-item",0,"discourse/lib/user-menu/bookmark-item",0,"discourse/models/bookmark"eaimeta@70e063a35619d71f
  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  var _unreadBookmarkRemindersCount = /*#__PURE__*/new WeakMap();
  class UserMenuBookmarksList extends _notificationsList.default {
    constructor() {
      super(...arguments);
      _classPrivateFieldInitSpec(this, _unreadBookmarkRemindersCount, {
        get: _get_unreadBookmarkRemindersCount,
        set: void 0
      });
    }
    get dismissTypes() {
      return ["bookmark_reminder"];
    }
    get showAllHref() {
      return `${this.currentUser.path}/activity/bookmarks`;
    }
    get showAllTitle() {
      return _I18n.default.t("user_menu.view_all_bookmarks");
    }
    get showDismiss() {
      return _classPrivateFieldGet(this, _unreadBookmarkRemindersCount) > 0;
    }
    get dismissTitle() {
      return _I18n.default.t("user.dismiss_bookmarks_tooltip");
    }
    get itemsCacheKey() {
      return "user-menu-bookmarks-tab";
    }
    get emptyStateComponent() {
      return "user-menu/bookmarks-list-empty-state";
    }
    async fetchItems() {
      const data = await (0, _ajax.ajax)(`/u/${this.currentUser.username}/user-menu-bookmarks`);
      const content = [];
      const notifications = data.notifications.map(n => _notification.default.create(n));
      await _notification.default.applyTransformations(notifications);
      notifications.forEach(notification => {
        content.push(new _notificationItem.default({
          notification,
          currentUser: this.currentUser,
          siteSettings: this.siteSettings,
          site: this.site
        }));
      });
      const bookmarks = data.bookmarks.map(b => _bookmark.default.create(b));
      await _bookmark.default.applyTransformations(bookmarks);
      content.push(...bookmarks.map(bookmark => {
        return new _bookmarkItem.default({
          bookmark
        });
      }));
      return content;
    }
    dismissWarningModal() {
      const modalController = (0, _showModal.default)("dismiss-notification-confirmation");
      modalController.set("confirmationMessage", _I18n.default.t("notifications.dismiss_confirmation.body.bookmarks", {
        count: _classPrivateFieldGet(this, _unreadBookmarkRemindersCount)
      }));
      return modalController;
    }
  }
  _exports.default = UserMenuBookmarksList;
  function _get_unreadBookmarkRemindersCount() {
    const key = `grouped_unread_notifications.${this.site.notification_types.bookmark_reminder}`;
    // we're retrieving the value with get() so that Ember tracks the property
    // and re-renders the UI when it changes.
    // we can stop using `get()` when the User model is refactored into native
    // class with @tracked properties.
    return this.currentUser.get(key) || 0;
  }
});