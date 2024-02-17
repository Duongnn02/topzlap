define("discourse/components/user-menu/other-notifications-list", ["exports", "discourse/components/user-menu/notifications-list"], function (_exports, _notificationsList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/user-menu/notifications-list"eaimeta@70e063a35619d71f
  class UserMenuOtherNotificationsList extends _notificationsList.default {
    get dismissTypes() {
      return this.filterByTypes;
    }
    get emptyStateComponent() {
      return "user-menu/other-notifications-list-empty-state";
    }
    dismissWarningModal() {
      return null;
    }
  }
  _exports.default = UserMenuOtherNotificationsList;
});