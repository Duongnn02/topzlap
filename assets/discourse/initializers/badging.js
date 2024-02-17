define("discourse/initializers/badging", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  // Updates the PWA badging if available
  var _default = {
    name: "badging",
    after: "message-bus",
    initialize(container) {
      if (!navigator.setAppBadge) {
        return;
      } // must have the Badging API

      const user = container.lookup("service:current-user");
      if (!user) {
        return;
      } // must be logged in

      const appEvents = container.lookup("service:app-events");
      appEvents.on("notifications:changed", () => {
        let notifications;
        if (user.redesigned_user_menu_enabled) {
          notifications = user.all_unread_notifications_count;
          if (user.unseen_reviewable_count) {
            notifications += user.unseen_reviewable_count;
          }
        } else {
          notifications = user.unread_notifications + user.unread_high_priority_notifications;
        }
        navigator.setAppBadge(notifications);
      });
    }
  };
  _exports.default = _default;
});