define("discourse/controllers/preferences/notifications", ["exports", "@ember/controller", "I18n", "discourse/lib/ajax-error"], function (_exports, _controller, _I18n, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  var _default = _controller.default.extend({
    subpageTitle: _I18n.default.t("user.preferences_nav.notifications"),
    init() {
      this._super(...arguments);
      this.saveAttrNames = ["muted_usernames", "new_topic_duration_minutes", "auto_track_topics_after_msecs", "notification_level_when_replying", "like_notification_frequency", "allow_private_messages", "enable_allowed_pm_users", "user_notification_schedule"];
      this.likeNotificationFrequencies = [{
        name: _I18n.default.t("user.like_notification_frequency.always"),
        value: 0
      }, {
        name: _I18n.default.t("user.like_notification_frequency.first_time_and_daily"),
        value: 1
      }, {
        name: _I18n.default.t("user.like_notification_frequency.first_time"),
        value: 2
      }, {
        name: _I18n.default.t("user.like_notification_frequency.never"),
        value: 3
      }];
    },
    actions: {
      save() {
        this.set("saved", false);
        return this.model.save(this.saveAttrNames).then(() => {
          this.set("saved", true);
        }).catch(_ajaxError.popupAjaxError);
      }
    }
  });
  _exports.default = _default;
});