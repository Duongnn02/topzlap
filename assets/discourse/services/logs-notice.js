define("discourse/services/logs-notice", ["exports", "discourse-common/utils/decorators", "@ember/service", "I18n", "discourse/lib/formatter", "discourse-common/lib/get-url", "@ember/template", "@ember/utils", "@ember/object/computed"], function (_exports, _decorators, _service, _I18n, _formatter, _getUrl, _template, _utils, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"@ember/service",0,"I18n",0,"discourse/lib/formatter",0,"discourse-common/lib/get-url",0,"@ember/template",0,"@ember/utils",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const LOGS_NOTICE_KEY = "logs-notice-text";
  var _default = _service.default.extend((_dec = (0, _decorators.default)("text"), _dec2 = (0, _decorators.default)("text"), _dec3 = (0, _decorators.default)("isEmpty", "isAdmin"), _dec4 = (0, _decorators.observes)("text"), (_obj = {
    text: "",
    isAdmin: (0, _computed.readOnly)("currentUser.admin"),
    init() {
      this._super(...arguments);
      if (this.siteSettings.alert_admins_if_errors_per_hour === 0 && this.siteSettings.alert_admins_if_errors_per_minute === 0) {
        return;
      }
      const text = this.keyValueStore.getItem(LOGS_NOTICE_KEY);
      if (text) {
        this.set("text", text);
      }
      this.messageBus.subscribe("/logs_error_rate_exceeded", this.onLogRateLimit);
    },
    willDestroy() {
      this._super(...arguments);
      this.messageBus.unsubscribe("/logs_error_rate_exceeded", this.onLogRateLimit);
    },
    onLogRateLimit(data) {
      const {
        duration,
        rate
      } = data;
      let siteSettingLimit = 0;
      if (duration === "minute") {
        siteSettingLimit = this.siteSettings.alert_admins_if_errors_per_minute;
      } else if (duration === "hour") {
        siteSettingLimit = this.siteSettings.alert_admins_if_errors_per_hour;
      }
      let translationKey = rate === siteSettingLimit ? "reached" : "exceeded";
      translationKey += `_${duration}_MF`;
      this.set("text", _I18n.default.messageFormat(`logs_error_rate_notice.${translationKey}`, {
        relativeAge: (0, _formatter.autoUpdatingRelativeAge)(new Date(data.publish_at * 1000)),
        rate,
        limit: siteSettingLimit,
        url: (0, _getUrl.default)("/logs")
      }));
    },
    isEmpty(text) {
      return (0, _utils.isEmpty)(text);
    },
    message(text) {
      return (0, _template.htmlSafe)(text);
    },
    hidden(thisIsEmpty, isAdmin) {
      return !isAdmin || thisIsEmpty;
    },
    _updateKeyValueStore() {
      this.keyValueStore.setItem(LOGS_NOTICE_KEY, this.text);
    }
  }, (_applyDecoratedDescriptor(_obj, "onLogRateLimit", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onLogRateLimit"), _obj), _applyDecoratedDescriptor(_obj, "isEmpty", [_dec], Object.getOwnPropertyDescriptor(_obj, "isEmpty"), _obj), _applyDecoratedDescriptor(_obj, "message", [_dec2], Object.getOwnPropertyDescriptor(_obj, "message"), _obj), _applyDecoratedDescriptor(_obj, "hidden", [_dec3], Object.getOwnPropertyDescriptor(_obj, "hidden"), _obj), _applyDecoratedDescriptor(_obj, "_updateKeyValueStore", [_dec4], Object.getOwnPropertyDescriptor(_obj, "_updateKeyValueStore"), _obj)), _obj)));
  _exports.default = _default;
});