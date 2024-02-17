define("select-kit/components/user-notifications-dropdown", ["exports", "select-kit/components/dropdown-select-box", "I18n", "@ember/object", "discourse/lib/ajax-error", "discourse/lib/show-modal"], function (_exports, _dropdownSelectBox, _I18n, _object, _ajaxError, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/dropdown-select-box",0,"I18n",0,"@ember/object",0,"discourse/lib/ajax-error",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  var _default = _dropdownSelectBox.default.extend({
    classNames: ["user-notifications", "user-notifications-dropdown"],
    selectKitOptions: {
      headerIcon: "userNotificationIcon",
      showCaret: true
    },
    userNotificationIcon: (0, _object.computed)("mainCollection.[]", "value", function () {
      return this.mainCollection && this.mainCollection.find(row => row.id === this.value).icon;
    }),
    content: (0, _object.computed)(function () {
      const content = [];
      content.push({
        icon: "user",
        id: "changeToNormal",
        description: _I18n.default.t("user.user_notifications.normal_option_title"),
        name: _I18n.default.t("user.user_notifications.normal_option")
      });
      content.push({
        icon: "times-circle",
        id: "changeToMuted",
        description: _I18n.default.t("user.user_notifications.mute_option_title"),
        name: _I18n.default.t("user.user_notifications.mute_option")
      });
      if (this.get("user.can_ignore_user")) {
        content.push({
          icon: "far-eye-slash",
          id: "changeToIgnored",
          description: _I18n.default.t("user.user_notifications.ignore_option_title"),
          name: _I18n.default.t("user.user_notifications.ignore_option")
        });
      }
      return content;
    }),
    changeToNormal() {
      this.updateNotificationLevel({
        level: "normal"
      }).catch(_ajaxError.popupAjaxError);
    },
    changeToMuted() {
      this.updateNotificationLevel({
        level: "mute"
      }).catch(_ajaxError.popupAjaxError);
    },
    changeToIgnored() {
      (0, _showModal.default)("ignore-duration", {
        model: this.user
      });
    },
    actions: {
      onChange(level) {
        this[level]();

        // hack but model.ignored/muted is not
        // getting updated after updateNotificationLevel
        this.set("value", level);
      }
    }
  });
  _exports.default = _default;
});