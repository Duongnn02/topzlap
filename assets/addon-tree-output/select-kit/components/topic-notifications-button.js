define("select-kit/components/topic-notifications-button", ["exports", "@ember/object", "I18n", "@ember/utils", "discourse/lib/notification-levels", "discourse-common/utils/decorators", "discourse-common/lib/get-url", "@ember/component", "select-kit/templates/components/topic-notifications-button"], function (_exports, _object, _I18n, _utils, _notificationLevels, _decorators, _getUrl, _component, _topicNotificationsButton) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"I18n",0,"@ember/utils",0,"discourse/lib/notification-levels",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url",0,"@ember/component",0,"select-kit/templates/components/topic-notifications-button"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend((_dec = (0, _decorators.default)("topic", "topic.details.{notification_level,notifications_reason_id}"), (_obj = {
    layout: _topicNotificationsButton.default,
    classNames: ["topic-notifications-button"],
    classNameBindings: ["isLoading"],
    appendReason: true,
    showFullTitle: true,
    notificationLevel: null,
    topic: null,
    showCaret: true,
    isLoading: false,
    icon: (0, _object.computed)("isLoading", function () {
      return this.isLoading ? "spinner" : null;
    }),
    changeTopicNotificationLevel(levelId) {
      if (levelId !== this.notificationLevel) {
        this.set("isLoading", true);
        this.topic.details.updateNotifications(levelId).finally(() => this.set("isLoading", false));
      }
    },
    notificationReasonText(topic, topicDetails) {
      let level = topicDetails.notification_level;
      let reason = topicDetails.notifications_reason_id;
      if (typeof level !== "number") {
        level = 1;
      }
      let localeString = `topic.notifications.reasons.${level}`;
      if (typeof reason === "number") {
        let localeStringWithReason = localeString + "_" + reason;
        if (this._notificationReasonStale(level, reason, topic, this.currentUser)) {
          localeStringWithReason += "_stale";
        }

        // some sane protection for missing translations of edge cases
        if (_I18n.default.lookup(localeStringWithReason, {
          locale: "en"
        })) {
          localeString = localeStringWithReason;
        }
      }
      if (this.currentUser && this.currentUser.user_option.mailing_list_mode && level > _notificationLevels.NotificationLevels.MUTED) {
        return _I18n.default.t("topic.notifications.reasons.mailing_list_mode");
      } else {
        return _I18n.default.t(localeString, {
          username: this.currentUser && this.currentUser.username_lower,
          basePath: (0, _getUrl.default)("")
        });
      }
    },
    // The user may have changed their category or tag tracking settings
    // since this topic was tracked/watched based on those settings in the
    // past. In that case we need to alter the reason message we show them
    // otherwise it is very confusing for the end user to be told they are
    // tracking a topic because of a category, when they are no longer tracking
    // that category.
    _notificationReasonStale(level, reason, topic, currentUser) {
      if (!currentUser) {
        return;
      }
      let categoryId = topic.category_id;
      let tags = topic.tags;
      let watchedCategoryIds = currentUser.watched_category_ids || [];
      let trackedCategoryIds = currentUser.tracked_category_ids || [];
      let watchedTags = currentUser.watched_tags || [];

      // 2_8 tracking category
      if (categoryId) {
        if (level === 2 && reason === 8) {
          if (!trackedCategoryIds.includes(categoryId)) {
            return true;
          }

          // 3_6 watching category
        } else if (level === 3 && reason === 6) {
          if (!watchedCategoryIds.includes(categoryId)) {
            return true;
          }
        }
      } else if (!(0, _utils.isEmpty)(tags)) {
        // 3_10 watching tag
        if (level === 3 && reason === 10) {
          if (!tags.some(tag => watchedTags.includes(tag))) {
            return true;
          }
        }
      }
      return false;
    }
  }, (_applyDecoratedDescriptor(_obj, "changeTopicNotificationLevel", [_object.action], Object.getOwnPropertyDescriptor(_obj, "changeTopicNotificationLevel"), _obj), _applyDecoratedDescriptor(_obj, "notificationReasonText", [_dec], Object.getOwnPropertyDescriptor(_obj, "notificationReasonText"), _obj)), _obj)));
  _exports.default = _default;
});