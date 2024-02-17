define("discourse/widgets/custom-notification-item", ["discourse/widgets/default-notification-item", "I18n", "discourse/widgets/widget", "discourse/lib/utilities", "discourse-common/lib/icon-library"], function (_defaultNotificationItem, _I18n, _widget, _utilities, _iconLibrary) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/default-notification-item",0,"I18n",0,"discourse/widgets/widget",0,"discourse/lib/utilities",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  (0, _widget.createWidgetFrom)(_defaultNotificationItem.DefaultNotificationItem, "custom-notification-item", {
    notificationTitle(notificationName, data) {
      return data.title ? _I18n.default.t(data.title) : "";
    },
    text(notificationName, data) {
      const username = (0, _utilities.formatUsername)(data.display_username);
      const description = this.description(data);
      return _I18n.default.t(data.message, {
        description,
        username
      });
    },
    icon(notificationName, data) {
      return (0, _iconLibrary.iconNode)(`notification.${data.message}`);
    }
  });
});