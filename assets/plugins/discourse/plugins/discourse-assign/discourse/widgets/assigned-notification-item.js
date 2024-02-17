define("discourse/plugins/discourse-assign/discourse/widgets/assigned-notification-item", ["discourse-common/lib/icon-library", "discourse/widgets/default-notification-item", "discourse/widgets/widget"], function (_iconLibrary, _defaultNotificationItem, _widget) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/icon-library",0,"discourse/widgets/default-notification-item",0,"discourse/widgets/widget"eaimeta@70e063a35619d71f
  (0, _widget.createWidgetFrom)(_defaultNotificationItem.DefaultNotificationItem, "assigned-notification-item", {
    icon(notificationName, data) {
      if (data.message === "discourse_assign.assign_group_notification") {
        return (0, _iconLibrary.iconNode)(`notification.discourse_assign.assign_group_notification`);
      }
      return (0, _iconLibrary.iconNode)(`notification.${notificationName}`);
    }
  });
});