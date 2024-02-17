define("discourse/controllers/preferences/emails", ["exports", "@ember/controller", "I18n", "discourse-common/utils/decorators", "@ember/object/computed", "discourse/lib/ajax-error"], function (_exports, _controller, _I18n, _decorators, _computed, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const EMAIL_LEVELS = {
    ALWAYS: 0,
    ONLY_WHEN_AWAY: 1,
    NEVER: 2
  };
  var _default = _controller.default.extend((_dec = (0, _decorators.default)(), _dec2 = (0, _decorators.default)(), _dec3 = (0, _decorators.default)(), (_obj = {
    subpageTitle: _I18n.default.t("user.preferences_nav.emails"),
    emailMessagesLevelAway: (0, _computed.equal)("model.user_option.email_messages_level", EMAIL_LEVELS.ONLY_WHEN_AWAY),
    emailLevelAway: (0, _computed.equal)("model.user_option.email_level", EMAIL_LEVELS.ONLY_WHEN_AWAY),
    init() {
      this._super(...arguments);
      this.saveAttrNames = ["email_level", "email_messages_level", "mailing_list_mode", "mailing_list_mode_frequency", "email_digests", "email_in_reply_to", "email_previous_replies", "digest_after_minutes", "include_tl0_in_digests"];
      this.previousRepliesOptions = [{
        name: _I18n.default.t("user.email_previous_replies.always"),
        value: 0
      }, {
        name: _I18n.default.t("user.email_previous_replies.unless_emailed"),
        value: 1
      }, {
        name: _I18n.default.t("user.email_previous_replies.never"),
        value: 2
      }];
      this.emailLevelOptions = [{
        name: _I18n.default.t("user.email_level.always"),
        value: EMAIL_LEVELS.ALWAYS
      }, {
        name: _I18n.default.t("user.email_level.only_when_away"),
        value: EMAIL_LEVELS.ONLY_WHEN_AWAY
      }, {
        name: _I18n.default.t("user.email_level.never"),
        value: EMAIL_LEVELS.NEVER
      }];
      this.digestFrequencies = [{
        name: _I18n.default.t("user.email_digests.every_30_minutes"),
        value: 30
      }, {
        name: _I18n.default.t("user.email_digests.every_hour"),
        value: 60
      }, {
        name: _I18n.default.t("user.email_digests.daily"),
        value: 1440
      }, {
        name: _I18n.default.t("user.email_digests.weekly"),
        value: 10080
      }, {
        name: _I18n.default.t("user.email_digests.every_month"),
        value: 43200
      }, {
        name: _I18n.default.t("user.email_digests.every_six_months"),
        value: 259200
      }];
    },
    frequencyEstimate() {
      let estimate = this.get("model.mailing_list_posts_per_day");
      if (!estimate || estimate < 2) {
        return _I18n.default.t("user.mailing_list_mode.few_per_day");
      } else {
        return _I18n.default.t("user.mailing_list_mode.many_per_day", {
          dailyEmailEstimate: estimate
        });
      }
    },
    mailingListModeOptions() {
      return [{
        name: this.frequencyEstimate,
        value: 1
      }, {
        name: _I18n.default.t("user.mailing_list_mode.individual_no_echo"),
        value: 2
      }];
    },
    emailFrequencyInstructions() {
      return this.siteSettings.email_time_window_mins ? _I18n.default.t("user.email.frequency", {
        count: this.siteSettings.email_time_window_mins
      }) : null;
    },
    actions: {
      save() {
        this.set("saved", false);
        return this.model.save(this.saveAttrNames).then(() => {
          this.set("saved", true);
        }).catch(_ajaxError.popupAjaxError);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "frequencyEstimate", [_dec], Object.getOwnPropertyDescriptor(_obj, "frequencyEstimate"), _obj), _applyDecoratedDescriptor(_obj, "mailingListModeOptions", [_dec2], Object.getOwnPropertyDescriptor(_obj, "mailingListModeOptions"), _obj), _applyDecoratedDescriptor(_obj, "emailFrequencyInstructions", [_dec3], Object.getOwnPropertyDescriptor(_obj, "emailFrequencyInstructions"), _obj)), _obj)));
  _exports.default = _default;
});