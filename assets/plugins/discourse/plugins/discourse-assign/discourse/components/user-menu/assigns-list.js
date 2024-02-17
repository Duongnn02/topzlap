define("discourse/plugins/discourse-assign/discourse/components/user-menu/assigns-list", ["exports", "discourse/components/user-menu/notifications-list", "discourse/lib/ajax", "discourse/lib/user-menu/notification-item", "discourse/plugins/discourse-assign/discourse-assign/lib/user-menu/assign-item", "discourse/models/notification", "I18n", "discourse/lib/show-modal", "discourse/models/topic", "discourse/plugins/discourse-assign/discourse/components/user-menu/assigns-list-empty-state"], function (_exports, _notificationsList, _ajax, _notificationItem, _assignItem, _notification, _I18n, _showModal, _topic, _assignsListEmptyState) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/user-menu/notifications-list",0,"discourse/lib/ajax",0,"discourse/lib/user-menu/notification-item",0,"discourse/plugins/discourse-assign/discourse-assign/lib/user-menu/assign-item",0,"discourse/models/notification",0,"I18n",0,"discourse/lib/show-modal",0,"discourse/models/topic",0,"discourse/plugins/discourse-assign/discourse/components/user-menu/assigns-list-empty-state"eaimeta@70e063a35619d71f
  class UserMenuAssignNotificationsList extends _notificationsList.default {
    get dismissTypes() {
      return this.filterByTypes;
    }
    get showDismiss() {
      return this._unreadAssignedNotificationsCount > 0;
    }
    get dismissTitle() {
      return _I18n.default.t("user.dismiss_assigned_tooltip");
    }
    get showAllHref() {
      return `${this.currentUser.path}/activity/assigned`;
    }
    get showAllTitle() {
      return _I18n.default.t("user_menu.view_all_assigned");
    }
    get itemsCacheKey() {
      return "user-menu-assigns-tab";
    }
    get emptyStateComponent() {
      return _assignsListEmptyState.default;
    }
    async fetchItems() {
      const data = await (0, _ajax.ajax)("/assign/user-menu-assigns.json");
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
      const topics = data.topics.map(t => _topic.default.create(t));
      await _topic.default.applyTransformations(topics);
      content.push(...topics.map(assign => new _assignItem.default({
        assign
      })));
      return content;
    }
    dismissWarningModal() {
      const modalController = (0, _showModal.default)("dismiss-notification-confirmation");
      modalController.set("confirmationMessage", _I18n.default.t("notifications.dismiss_confirmation.body.assigns", {
        count: this._unreadAssignedNotificationsCount
      }));
      return modalController;
    }
    get _unreadAssignedNotificationsCount() {
      const key = `grouped_unread_notifications.${this.site.notification_types.assigned}`;
      // we're retrieving the value with get() so that Ember tracks the property
      // and re-renders the UI when it changes.
      // we can stop using `get()` when the User model is refactored into native
      // class with @tracked properties.
      return this.currentUser.get(key) || 0;
    }
  }
  _exports.default = UserMenuAssignNotificationsList;
});