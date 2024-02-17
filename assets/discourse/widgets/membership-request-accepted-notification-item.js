define("discourse/widgets/membership-request-accepted-notification-item", ["discourse/widgets/default-notification-item", "I18n", "discourse/widgets/widget", "discourse/lib/url"], function (_defaultNotificationItem, _I18n, _widget, _url) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/default-notification-item",0,"I18n",0,"discourse/widgets/widget",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  (0, _widget.createWidgetFrom)(_defaultNotificationItem.DefaultNotificationItem, "membership-request-accepted-notification-item", {
    url(data) {
      return (0, _url.groupPath)(data.group_name);
    },
    text(notificationName, data) {
      return _I18n.default.t(`notifications.${notificationName}`, {
        group_name: data.group_name
      });
    }
  });
});