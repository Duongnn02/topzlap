define("discourse/components/user-menu/notifications-list", ["exports", "discourse/components/user-menu/items-list", "I18n", "@ember/object", "discourse/lib/ajax", "discourse/lib/utilities", "discourse/lib/show-modal", "@ember/service", "discourse/lib/user-menu/notification-item", "discourse/models/notification", "discourse/models/user-menu-reviewable", "discourse/lib/user-menu/reviewable-item"], function (_exports, _itemsList, _I18n, _object, _ajax, _utilities, _showModal, _service, _notificationItem, _notification, _userMenuReviewable, _reviewableItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/user-menu/items-list",0,"I18n",0,"@ember/object",0,"discourse/lib/ajax",0,"discourse/lib/utilities",0,"discourse/lib/show-modal",0,"@ember/service",0,"discourse/lib/user-menu/notification-item",0,"discourse/models/notification",0,"discourse/models/user-menu-reviewable",0,"discourse/lib/user-menu/reviewable-item"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let UserMenuNotificationsList = (_class = class UserMenuNotificationsList extends _itemsList.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "currentUser", _descriptor, this);
      _initializerDefineProperty(this, "siteSettings", _descriptor2, this);
      _initializerDefineProperty(this, "site", _descriptor3, this);
      _initializerDefineProperty(this, "store", _descriptor4, this);
    }
    get filterByTypes() {
      return this.args.filterByTypes;
    }
    get dismissTypes() {
      return null;
    }
    get showAllHref() {
      return `${this.currentUser.path}/notifications`;
    }
    get showAllTitle() {
      return _I18n.default.t("user_menu.view_all_notifications");
    }
    get showDismiss() {
      return Object.keys(this.currentUser.get("grouped_unread_notifications") || {}).any(key => {
        return this.currentUser.get(`grouped_unread_notifications.${key}`) > 0;
      });
    }
    get dismissTitle() {
      return _I18n.default.t("user.dismiss_notifications_tooltip");
    }
    get itemsCacheKey() {
      let key = "recent-notifications";
      const types = this.filterByTypes;
      if (types?.length > 0) {
        key += `-type-${types.join(",")}`;
      }
      return key;
    }
    get emptyStateComponent() {
      if (this.constructor === UserMenuNotificationsList) {
        return "user-menu/notifications-list-empty-state";
      } else {
        return super.emptyStateComponent;
      }
    }
    async fetchItems() {
      const params = {
        limit: 30,
        recent: true,
        bump_last_seen_reviewable: true
      };
      if (this.currentUser.enforcedSecondFactor) {
        params.silent = true;
      }
      const types = this.filterByTypes;
      if (types?.length > 0) {
        params.filter_by_types = types.join(",");
        params.silent = true;
      }
      const content = [];
      const data = await (0, _ajax.ajax)("/notifications", {
        data: params
      });
      const notifications = await _notification.default.initializeNotifications(data.notifications);
      const reviewables = data.pending_reviewables?.map(r => _userMenuReviewable.default.create(r));
      if (reviewables?.length) {
        const firstReadNotificationIndex = notifications.findIndex(n => n.read);
        const unreadNotifications = notifications.splice(0, firstReadNotificationIndex);
        (0, _utilities.mergeSortedLists)(unreadNotifications, reviewables, (notification, reviewable) => {
          const notificationCreatedAt = new Date(notification.created_at);
          const reviewableCreatedAt = new Date(reviewable.created_at);
          return reviewableCreatedAt > notificationCreatedAt;
        }).forEach(item => {
          const props = {
            currentUser: this.currentUser,
            siteSettings: this.siteSettings,
            site: this.site
          };
          if (item instanceof _notification.default) {
            props.notification = item;
            content.push(new _notificationItem.default(props));
          } else {
            props.reviewable = item;
            content.push(new _reviewableItem.default(props));
          }
        });
      }
      notifications.forEach(notification => {
        content.push(new _notificationItem.default({
          notification,
          currentUser: this.currentUser,
          siteSettings: this.siteSettings,
          site: this.site
        }));
      });
      return content;
    }
    dismissWarningModal() {
      if (this.currentUser.unread_high_priority_notifications > 0) {
        const modalController = (0, _showModal.default)("dismiss-notification-confirmation");
        modalController.set("confirmationMessage", _I18n.default.t("notifications.dismiss_confirmation.body.default", {
          count: this.currentUser.unread_high_priority_notifications
        }));
        return modalController;
      }
    }
    dismissButtonClick() {
      const opts = {
        type: "PUT"
      };
      const dismissTypes = this.dismissTypes;
      if (dismissTypes?.length > 0) {
        opts.data = {
          dismiss_types: dismissTypes.join(",")
        };
      }
      const modalController = this.dismissWarningModal();
      const modalCallback = () => {
        (0, _ajax.ajax)("/notifications/mark-read", opts).then(() => {
          if (dismissTypes) {
            const unreadNotificationCountsHash = {
              ...this.currentUser.grouped_unread_notifications
            };
            dismissTypes.forEach(type => {
              const typeId = this.site.notification_types[type];
              if (typeId) {
                delete unreadNotificationCountsHash[typeId];
              }
            });
            this.currentUser.set("grouped_unread_notifications", unreadNotificationCountsHash);
          } else {
            this.currentUser.set("all_unread_notifications_count", 0);
            this.currentUser.set("unread_high_priority_notifications", 0);
            this.currentUser.set("grouped_unread_notifications", {});
          }
          this.refreshList();
          (0, _utilities.postRNWebviewMessage)("markRead", "1");
        });
      };
      if (modalController) {
        modalController.set("dismissNotifications", modalCallback);
      } else {
        modalCallback();
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "site", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "store", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "dismissButtonClick", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "dismissButtonClick"), _class.prototype)), _class);
  _exports.default = UserMenuNotificationsList;
});