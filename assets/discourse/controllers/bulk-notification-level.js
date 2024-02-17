define("discourse/controllers/bulk-notification-level", ["exports", "@ember/controller", "I18n", "discourse-common/utils/decorators", "@ember/object/computed", "discourse/lib/notification-levels"], function (_exports, _controller, _I18n, _decorators, _computed, _notificationLevels) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"discourse/lib/notification-levels"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // Support for changing the notification level of various topics
  var _default = _controller.default.extend((_obj = {
    topicBulkActions: (0, _controller.inject)(),
    notificationLevelId: null,
    notificationLevels() {
      return _notificationLevels.topicLevels.map(level => {
        return {
          id: level.id.toString(),
          name: _I18n.default.t(`topic.notifications.${level.key}.title`),
          description: _I18n.default.t(`topic.notifications.${level.key}.description`)
        };
      });
    },
    disabled: (0, _computed.empty)("notificationLevelId"),
    actions: {
      changeNotificationLevel() {
        this.topicBulkActions.performAndRefresh({
          type: "change_notification_level",
          notification_level_id: this.notificationLevelId
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "notificationLevels", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "notificationLevels"), _obj)), _obj));
  _exports.default = _default;
});