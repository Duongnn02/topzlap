define("discourse/widgets/group-message-summary-notification-item", ["discourse/widgets/default-notification-item", "I18n", "discourse/widgets/widget"], function (_defaultNotificationItem, _I18n, _widget) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/default-notification-item",0,"I18n",0,"discourse/widgets/widget"eaimeta@70e063a35619d71f
  (0, _widget.createWidgetFrom)(_defaultNotificationItem.DefaultNotificationItem, "group-message-summary-notification-item", {
    text(notificationName, data) {
      const count = data.inbox_count;
      const group_name = data.group_name;
      return _I18n.default.t("notifications.group_message_summary", {
        count,
        group_name
      });
    }
  });
});