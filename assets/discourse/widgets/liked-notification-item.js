define("discourse/widgets/liked-notification-item", ["discourse/widgets/default-notification-item", "I18n", "discourse/widgets/widget", "discourse/lib/utilities"], function (_defaultNotificationItem, _I18n, _widget, _utilities) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/default-notification-item",0,"I18n",0,"discourse/widgets/widget",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  (0, _widget.createWidgetFrom)(_defaultNotificationItem.DefaultNotificationItem, "liked-notification-item", {
    text(notificationName, data) {
      const username = (0, _utilities.formatUsername)(data.display_username);
      const description = this.description(data);
      if (data.count > 1) {
        const count = data.count - 2;
        const username2 = (0, _utilities.formatUsername)(data.username2);
        if (count === 0) {
          return _I18n.default.t("notifications.liked_2", {
            description,
            username: `<span class="multi-username">${username}</span>`,
            username2: `<span class="multi-username">${username2}</span>`
          });
        } else {
          return _I18n.default.t("notifications.liked_many", {
            description,
            username: `<span class="multi-username">${username}</span>`,
            username2: `<span class="multi-username">${username2}</span>`,
            count
          });
        }
      }
      return _I18n.default.t("notifications.liked", {
        description,
        username
      });
    }
  });
});