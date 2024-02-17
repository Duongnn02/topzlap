define("discourse/components/user-menu/likes-notifications-list", ["exports", "discourse/components/user-menu/notifications-list"], function (_exports, _notificationsList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/user-menu/notifications-list"eaimeta@70e063a35619d71f
  class UserMenuLikesNotificationsList extends _notificationsList.default {
    get dismissTypes() {
      return this.filterByTypes;
    }
    dismissWarningModal() {
      return null;
    }
    get emptyStateComponent() {
      return "user-menu/likes-list-empty-state";
    }
  }
  _exports.default = UserMenuLikesNotificationsList;
});