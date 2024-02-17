define("discourse/widgets/liked-consolidated-notification-item", ["discourse/widgets/default-notification-item", "I18n", "discourse/widgets/widget", "discourse/lib/utilities", "@ember/utils", "discourse/lib/url"], function (_defaultNotificationItem, _I18n, _widget, _utilities, _utils, _url) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/default-notification-item",0,"I18n",0,"discourse/widgets/widget",0,"discourse/lib/utilities",0,"@ember/utils",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  (0, _widget.createWidgetFrom)(_defaultNotificationItem.DefaultNotificationItem, "liked-consolidated-notification-item", {
    url(data) {
      return (0, _url.userPath)(`${this.attrs.username || this.currentUser.username}/notifications/likes-received?acting_username=${data.display_username}`);
    },
    description(data) {
      const description = _I18n.default.t("notifications.liked_consolidated_description", {
        count: parseInt(data.count, 10)
      });
      return (0, _utils.isEmpty)(description) ? "" : (0, _utilities.escapeExpression)(description);
    }
  });
});