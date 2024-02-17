define("discourse/widgets/user-notifications-large", ["exports", "discourse/widgets/widget", "discourse/helpers/node", "virtual-dom", "@ember/string"], function (_exports, _widget, _node, _virtualDom, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/widget",0,"discourse/helpers/node",0,"virtual-dom",0,"@ember/string"eaimeta@70e063a35619d71f
  (0, _widget.createWidget)("large-notification-item", {
    tagName: "li",
    buildClasses(attrs) {
      const result = ["item", "notification", "large-notification"];
      if (!attrs.get("read")) {
        result.push("unread");
      }
      return result;
    },
    html(attrs) {
      const notificationName = this.site.notificationLookup[attrs.notification_type];
      return [this.attach(`${(0, _string.dasherize)(notificationName)}-notification-item`, attrs, {}, {
        fallbackWidgetName: "default-notification-item",
        tagName: "div"
      }), (0, _virtualDom.h)("span.time", (0, _node.dateNode)(attrs.created_at))];
    }
  });
  var _default = (0, _widget.createWidget)("user-notifications-large", {
    tagName: "ul.notifications.large-notifications",
    html(attrs) {
      const notifications = attrs.notifications;
      const username = notifications.findArgs.username;
      return notifications.map(n => {
        n.username = username;
        return this.attach("large-notification-item", n);
      });
    }
  });
  _exports.default = _default;
});