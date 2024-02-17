define("discourse/widgets/new-features-notification-item", ["discourse/widgets/default-notification-item", "I18n", "discourse/widgets/widget", "discourse-common/lib/get-url", "discourse-common/lib/icon-library"], function (_defaultNotificationItem, _I18n, _widget, _getUrl, _iconLibrary) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/default-notification-item",0,"I18n",0,"discourse/widgets/widget",0,"discourse-common/lib/get-url",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  (0, _widget.createWidgetFrom)(_defaultNotificationItem.DefaultNotificationItem, "new-features-notification-item", {
    text() {
      return _I18n.default.t("notifications.new_features");
    },
    url() {
      return (0, _getUrl.default)("/admin");
    },
    icon() {
      return (0, _iconLibrary.iconNode)("gift");
    }
  });
});