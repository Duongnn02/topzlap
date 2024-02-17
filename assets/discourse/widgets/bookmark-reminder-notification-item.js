define("discourse/widgets/bookmark-reminder-notification-item", ["discourse/widgets/default-notification-item", "I18n", "discourse/widgets/widget", "discourse/lib/utilities"], function (_defaultNotificationItem, _I18n, _widget, _utilities) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/default-notification-item",0,"I18n",0,"discourse/widgets/widget",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  (0, _widget.createWidgetFrom)(_defaultNotificationItem.DefaultNotificationItem, "bookmark-reminder-notification-item", {
    text(notificationName, data) {
      const username = (0, _utilities.formatUsername)(data.display_username);
      const description = this.description(data);
      return _I18n.default.t("notifications.bookmark_reminder", {
        description,
        username
      });
    },
    notificationTitle(notificationName, data) {
      if (notificationName) {
        if (data.bookmark_name) {
          return _I18n.default.t(`notifications.titles.${notificationName}_with_name`, {
            name: data.bookmark_name
          });
        } else {
          return _I18n.default.t(`notifications.titles.${notificationName}`);
        }
      } else {
        return "";
      }
    }
  });
});