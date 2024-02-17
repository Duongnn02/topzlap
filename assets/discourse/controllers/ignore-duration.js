define("discourse/controllers/ignore-duration", ["exports", "@ember/controller", "I18n", "discourse/mixins/modal-functionality", "discourse/lib/ajax-error", "discourse/lib/time-shortcut", "discourse-common/utils/decorators"], function (_exports, _controller, _I18n, _modalFunctionality, _ajaxError, _timeShortcut, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"discourse/mixins/modal-functionality",0,"discourse/lib/ajax-error",0,"discourse/lib/time-shortcut",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_obj = {
    loading: false,
    ignoredUntil: null,
    timeShortcuts() {
      const timezone = this.currentUser.user_option.timezone;
      const shortcuts = (0, _timeShortcut.timeShortcuts)(timezone);
      return [shortcuts.laterToday(), shortcuts.tomorrow(), shortcuts.laterThisWeek(), shortcuts.thisWeekend(), shortcuts.monday(), shortcuts.twoWeeks(), shortcuts.nextMonth(), shortcuts.twoMonths(), shortcuts.threeMonths(), shortcuts.fourMonths(), shortcuts.sixMonths(), shortcuts.oneYear(), shortcuts.forever()];
    },
    actions: {
      ignore() {
        if (!this.ignoredUntil) {
          this.flash(_I18n.default.t("user.user_notifications.ignore_duration_time_frame_required"), "error");
          return;
        }
        this.set("loading", true);
        this.model.updateNotificationLevel({
          level: "ignore",
          expiringAt: this.ignoredUntil
        }).then(() => {
          this.set("model.ignored", true);
          this.set("model.muted", false);
          if (this.onSuccess) {
            this.onSuccess();
          }
          this.send("closeModal");
        }).catch(_ajaxError.popupAjaxError).finally(() => this.set("loading", false));
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "timeShortcuts", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "timeShortcuts"), _obj)), _obj));
  _exports.default = _default;
});