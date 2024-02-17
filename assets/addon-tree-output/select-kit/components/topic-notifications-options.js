define("select-kit/components/topic-notifications-options", ["exports", "select-kit/components/notifications-button", "@ember/object", "discourse/lib/notification-levels"], function (_exports, _notificationsButton, _object, _notificationLevels) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/notifications-button",0,"@ember/object",0,"discourse/lib/notification-levels"eaimeta@70e063a35619d71f
  var _default = _notificationsButton.default.extend({
    pluginApiIdentifiers: ["topic-notifications-options"],
    classNames: ["topic-notifications-options"],
    content: _notificationLevels.topicLevels,
    selectKitOptions: {
      i18nPrefix: "topic.notifications",
      i18nPostfix: "i18nPostfix",
      showCaret: true
    },
    i18nPostfix: (0, _object.computed)("topic.archetype", function () {
      return this.topic.archetype === "private_message" ? "_pm" : "";
    })
  });
  _exports.default = _default;
});