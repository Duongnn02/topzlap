define("discourse/initializers/subscribe-user-notifications", ["exports", "discourse/lib/desktop-notifications", "discourse/lib/push-notifications", "discourse-common/config/environment", "discourse/models/notification", "discourse-common/utils/decorators"], function (_exports, _desktopNotifications, _pushNotifications, _environment, _notification, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj; // Subscribes to user events on the message bus
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/desktop-notifications",0,"discourse/lib/push-notifications",0,"discourse-common/config/environment",0,"discourse/models/notification",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = (_obj = {
    name: "subscribe-user-notifications",
    after: "message-bus",
    initialize(container) {
      this.currentUser = container.lookup("service:current-user");
      if (!this.currentUser) {
        return;
      }
      this.messageBus = container.lookup("service:message-bus");
      this.store = container.lookup("service:store");
      this.messageBus = container.lookup("service:message-bus");
      this.appEvents = container.lookup("service:app-events");
      this.siteSettings = container.lookup("service:site-settings");
      this.site = container.lookup("service:site");
      this.router = container.lookup("router:main");
      this.reviewableCountsChannel = this.currentUser.redesigned_user_menu_enabled ? `/reviewable_counts/${this.currentUser.id}` : "/reviewable_counts";
      this.messageBus.subscribe(this.reviewableCountsChannel, this.onReviewableCounts);
      this.messageBus.subscribe(`/notification/${this.currentUser.id}`, this.onNotification, this.currentUser.notification_channel_position);
      this.messageBus.subscribe(`/user-drafts/${this.currentUser.id}`, this.onUserDrafts);
      this.messageBus.subscribe(`/do-not-disturb/${this.currentUser.id}`, this.onDoNotDisturb);
      this.messageBus.subscribe(`/user-status`, this.onUserStatus, this.currentUser.status?.message_bus_last_id);
      this.messageBus.subscribe("/categories", this.onCategories);
      this.messageBus.subscribe("/client_settings", this.onClientSettings);
      if (!(0, _environment.isTesting)()) {
        this.messageBus.subscribe((0, _desktopNotifications.alertChannel)(this.currentUser), this.onAlert);
        (0, _desktopNotifications.init)(this.messageBus, this.appEvents);
        if ((0, _pushNotifications.isPushNotificationsEnabled)(this.currentUser)) {
          (0, _desktopNotifications.disable)();
          (0, _pushNotifications.register)(this.currentUser, this.router, this.appEvents);
        } else {
          (0, _pushNotifications.unsubscribe)(this.currentUser);
        }
      }
    },
    teardown() {
      if (!this.currentUser) {
        return;
      }
      this.messageBus.unsubscribe(this.reviewableCountsChannel, this.onReviewableCounts);
      this.messageBus.unsubscribe(`/notification/${this.currentUser.id}`, this.onNotification);
      this.messageBus.unsubscribe(`/user-drafts/${this.currentUser.id}`, this.onUserDrafts);
      this.messageBus.unsubscribe(`/do-not-disturb/${this.currentUser.id}`, this.onDoNotDisturb);
      this.messageBus.unsubscribe(`/user-status`, this.onUserStatus);
      this.messageBus.unsubscribe("/categories", this.onCategories);
      this.messageBus.unsubscribe("/client_settings", this.onClientSettings);
      this.messageBus.unsubscribe((0, _desktopNotifications.alertChannel)(this.currentUser), this.onAlert);
    },
    onReviewableCounts(data) {
      if (data.reviewable_count >= 0) {
        this.currentUser.updateReviewableCount(data.reviewable_count);
      }
      if (this.currentUser.redesigned_user_menu_enabled) {
        this.currentUser.set("unseen_reviewable_count", data.unseen_reviewable_count);
      }
    },
    onNotification(data) {
      const oldUnread = this.currentUser.unread_notifications;
      const oldHighPriority = this.currentUser.unread_high_priority_notifications;
      const oldAllUnread = this.currentUser.all_unread_notifications_count;
      this.currentUser.setProperties({
        unread_notifications: data.unread_notifications,
        unread_high_priority_notifications: data.unread_high_priority_notifications,
        read_first_notification: data.read_first_notification,
        all_unread_notifications_count: data.all_unread_notifications_count,
        grouped_unread_notifications: data.grouped_unread_notifications,
        new_personal_messages_notifications_count: data.new_personal_messages_notifications_count
      });
      if (oldUnread !== data.unread_notifications || oldHighPriority !== data.unread_high_priority_notifications || oldAllUnread !== data.all_unread_notifications_count) {
        this.appEvents.trigger("notifications:changed");
        if (this.site.mobileView && (data.unread_notifications - oldUnread > 0 || data.unread_high_priority_notifications - oldHighPriority > 0 || data.all_unread_notifications_count - oldAllUnread > 0)) {
          this.appEvents.trigger("header:update-topic", null, 5000);
        }
      }
      const stale = this.store.findStale("notification", {}, {
        cacheKey: "recent-notifications"
      });
      const lastNotification = data.last_notification?.notification;
      if (stale?.hasResults && lastNotification) {
        const oldNotifications = stale.results.get("content");
        const staleIndex = oldNotifications.findIndex(n => n.id === lastNotification.id);
        if (staleIndex === -1) {
          let insertPosition = 0;

          // high priority and unread notifications are first
          if (!lastNotification.high_priority || lastNotification.read) {
            const nextPosition = oldNotifications.findIndex(n => !n.high_priority || n.read);
            if (nextPosition !== -1) {
              insertPosition = nextPosition;
            }
          }
          oldNotifications.insertAt(insertPosition, _notification.default.create(lastNotification));
        }

        // remove stale notifications and update existing ones
        const read = Object.fromEntries(data.recent);
        const newNotifications = oldNotifications.map(notification => {
          if (read[notification.id] !== undefined) {
            notification.set("read", read[notification.id]);
            return notification;
          }
        }).filter(Boolean);
        stale.results.set("content", newNotifications);
      }
    },
    onUserDrafts(data) {
      this.currentUser.updateDraftProperties(data);
    },
    onDoNotDisturb(data) {
      this.currentUser.updateDoNotDisturbStatus(data.ends_at);
    },
    onUserStatus(data) {
      this.appEvents.trigger("user-status:changed", data);
    },
    onCategories(data) {
      (data.categories || []).forEach(c => {
        const mutedCategoryIds = this.currentUser.muted_category_ids?.concat(this.currentUser.indirectly_muted_category_ids);
        if (mutedCategoryIds && mutedCategoryIds.includes(c.parent_category_id) && !mutedCategoryIds.includes(c.id)) {
          this.currentUser.set("indirectly_muted_category_ids", this.currentUser.indirectly_muted_category_ids.concat(c.id));
        }
        return this.site.updateCategory(c);
      });
      (data.deleted_categories || []).forEach(id => this.site.removeCategory(id));
    },
    onClientSettings(data) {
      this.siteSettings[data.name] = data.value;
    },
    onAlert(data) {
      return (0, _desktopNotifications.onNotification)(data, this.siteSettings, this.currentUser);
    }
  }, (_applyDecoratedDescriptor(_obj, "onReviewableCounts", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onReviewableCounts"), _obj), _applyDecoratedDescriptor(_obj, "onNotification", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onNotification"), _obj), _applyDecoratedDescriptor(_obj, "onUserDrafts", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onUserDrafts"), _obj), _applyDecoratedDescriptor(_obj, "onDoNotDisturb", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onDoNotDisturb"), _obj), _applyDecoratedDescriptor(_obj, "onUserStatus", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onUserStatus"), _obj), _applyDecoratedDescriptor(_obj, "onCategories", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onCategories"), _obj), _applyDecoratedDescriptor(_obj, "onClientSettings", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onClientSettings"), _obj), _applyDecoratedDescriptor(_obj, "onAlert", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onAlert"), _obj)), _obj);
  _exports.default = _default;
});