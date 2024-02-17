define("discourse/widgets/invitee-accepted-notification-item", ["discourse/widgets/default-notification-item", "discourse/widgets/widget", "discourse/lib/url"], function (_defaultNotificationItem, _widget, _url) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/default-notification-item",0,"discourse/widgets/widget",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  (0, _widget.createWidgetFrom)(_defaultNotificationItem.DefaultNotificationItem, "invitee-accepted-notification-item", {
    url(data) {
      return (0, _url.userPath)(data.display_username);
    }
  });
});