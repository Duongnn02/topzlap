define("discourse/controllers/edit-slow-mode", ["exports", "discourse/helpers/slow-mode", "@ember/controller", "I18n", "discourse/mixins/modal-functionality", "discourse/models/topic", "@ember/object", "discourse-common/utils/decorators", "@ember/object/computed", "discourse/lib/ajax-error", "discourse/lib/time-shortcut"], function (_exports, _slowMode, _controller, _I18n, _modalFunctionality, _topic, _object, _decorators, _computed, _ajaxError, _timeShortcut) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/helpers/slow-mode",0,"@ember/controller",0,"I18n",0,"discourse/mixins/modal-functionality",0,"discourse/models/topic",0,"@ember/object",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"discourse/lib/ajax-error",0,"discourse/lib/time-shortcut"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("saveDisabled", "durationIsSet", "model.slow_mode_enabled_until"), _dec2 = (0, _decorators.default)("model.slow_mode_seconds"), _dec3 = (0, _decorators.default)("slowModeEnabled"), (_obj = {
    selectedSlowMode: null,
    hours: null,
    minutes: null,
    seconds: null,
    saveDisabled: false,
    showCustomSelect: (0, _computed.equal)("selectedSlowMode", "custom"),
    durationIsSet: (0, _computed.or)("hours", "minutes", "seconds"),
    init() {
      this._super(...arguments);
      this.set("slowModes", [{
        id: "600",
        name: _I18n.default.t("topic.slow_mode_update.durations.10_minutes")
      }, {
        id: "900",
        name: _I18n.default.t("topic.slow_mode_update.durations.15_minutes")
      }, {
        id: "1800",
        name: _I18n.default.t("topic.slow_mode_update.durations.30_minutes")
      }, {
        id: "2700",
        name: _I18n.default.t("topic.slow_mode_update.durations.45_minutes")
      }, {
        id: "3600",
        name: _I18n.default.t("topic.slow_mode_update.durations.1_hour")
      }, {
        id: "7200",
        name: _I18n.default.t("topic.slow_mode_update.durations.2_hours")
      }, {
        id: "14400",
        name: _I18n.default.t("topic.slow_mode_update.durations.4_hours")
      }, {
        id: "28800",
        name: _I18n.default.t("topic.slow_mode_update.durations.8_hours")
      }, {
        id: "43200",
        name: _I18n.default.t("topic.slow_mode_update.durations.12_hours")
      }, {
        id: "86400",
        name: _I18n.default.t("topic.slow_mode_update.durations.24_hours")
      }, {
        id: "custom",
        name: _I18n.default.t("topic.slow_mode_update.durations.custom")
      }]);
    },
    onShow() {
      const currentDuration = parseInt(this.model.slow_mode_seconds, 10);
      if (currentDuration) {
        const selectedDuration = this.slowModes.find(mode => {
          return mode.id === currentDuration.toString();
        });
        if (selectedDuration) {
          this.set("selectedSlowMode", currentDuration.toString());
        } else {
          this.set("selectedSlowMode", "custom");
        }
        this._setFromSeconds(currentDuration);
      }
    },
    submitDisabled(saveDisabled, durationIsSet, enabledUntil) {
      return saveDisabled || !durationIsSet || !enabledUntil;
    },
    slowModeEnabled(slowModeSeconds) {
      return slowModeSeconds && slowModeSeconds !== 0;
    },
    saveButtonLabel(slowModeEnabled) {
      return slowModeEnabled ? "topic.slow_mode_update.update" : "topic.slow_mode_update.enable";
    },
    timeShortcuts() {
      const timezone = this.currentUser.user_option.timezone;
      const shortcuts = (0, _timeShortcut.timeShortcuts)(timezone);
      const nextWeek = shortcuts.monday();
      nextWeek.label = "time_shortcut.next_week";
      return [shortcuts.laterToday(), shortcuts.tomorrow(), shortcuts.twoDays(), nextWeek, shortcuts.twoWeeks(), shortcuts.nextMonth(), shortcuts.twoMonths()];
    },
    _setFromSeconds(seconds) {
      this.setProperties((0, _slowMode.fromSeconds)(seconds));
    },
    _parseValue(value) {
      return parseInt(value, 10) || 0;
    },
    setSlowModeDuration(duration) {
      if (duration !== "custom") {
        let seconds = parseInt(duration, 10);
        this._setFromSeconds(seconds);
      }
      this.set("selectedSlowMode", duration);
    },
    enableSlowMode() {
      this.set("saveDisabled", true);
      const seconds = (0, _slowMode.toSeconds)(this._parseValue(this.hours), this._parseValue(this.minutes), this._parseValue(this.seconds));
      _topic.default.setSlowMode(this.model.id, seconds, this.model.slow_mode_enabled_until).catch(_ajaxError.popupAjaxError).then(() => {
        this.set("model.slow_mode_seconds", seconds);
        this.send("closeModal");
      }).finally(() => this.set("saveDisabled", false));
    },
    disableSlowMode() {
      this.set("saveDisabled", true);
      _topic.default.setSlowMode(this.model.id, 0).catch(_ajaxError.popupAjaxError).then(() => {
        this.set("model.slow_mode_seconds", 0);
        this.send("closeModal");
      }).finally(() => this.set("saveDisabled", false));
    }
  }, (_applyDecoratedDescriptor(_obj, "submitDisabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "submitDisabled"), _obj), _applyDecoratedDescriptor(_obj, "slowModeEnabled", [_dec2], Object.getOwnPropertyDescriptor(_obj, "slowModeEnabled"), _obj), _applyDecoratedDescriptor(_obj, "saveButtonLabel", [_dec3], Object.getOwnPropertyDescriptor(_obj, "saveButtonLabel"), _obj), _applyDecoratedDescriptor(_obj, "timeShortcuts", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "timeShortcuts"), _obj), _applyDecoratedDescriptor(_obj, "setSlowModeDuration", [_object.action], Object.getOwnPropertyDescriptor(_obj, "setSlowModeDuration"), _obj), _applyDecoratedDescriptor(_obj, "enableSlowMode", [_object.action], Object.getOwnPropertyDescriptor(_obj, "enableSlowMode"), _obj), _applyDecoratedDescriptor(_obj, "disableSlowMode", [_object.action], Object.getOwnPropertyDescriptor(_obj, "disableSlowMode"), _obj)), _obj)));
  _exports.default = _default;
});