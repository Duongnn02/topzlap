define("discourse/mixins/username-validation", ["exports", "@ember/object", "I18n", "@ember/object/mixin", "discourse/models/user", "discourse-common/lib/debounce", "@ember/utils", "discourse-common/utils/decorators", "discourse/lib/computed"], function (_exports, _object, _I18n, _mixin, _user, _debounce, _utils, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"I18n",0,"@ember/object/mixin",0,"discourse/models/user",0,"discourse-common/lib/debounce",0,"@ember/utils",0,"discourse-common/utils/decorators",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function failedResult(attrs) {
    let result = _object.default.create({
      shouldCheck: false,
      failed: true,
      ok: false,
      element: document.querySelector("#new-account-username")
    });
    result.setProperties(attrs);
    return result;
  }
  function validResult(attrs) {
    let result = _object.default.create({
      ok: true
    });
    result.setProperties(attrs);
    return result;
  }
  var _default = _mixin.default.create((_dec = (0, _decorators.observes)("accountUsername"), (_obj = {
    uniqueUsernameValidation: null,
    maxUsernameLength: (0, _computed.setting)("max_username_length"),
    minUsernameLength: (0, _computed.setting)("min_username_length"),
    fetchExistingUsername() {
      _user.default.checkUsername(null, this.accountEmail).then(result => {
        if (result.suggestion && ((0, _utils.isEmpty)(this.accountUsername) || this.accountUsername === this.get("authOptions.username"))) {
          this.setProperties({
            accountUsername: result.suggestion,
            prefilledUsername: result.suggestion
          });
        }
      });
    },
    triggerValidation() {
      let {
        accountUsername
      } = this;
      let result = this.basicUsernameValidation(accountUsername);
      if (result.shouldCheck) {
        (0, _debounce.default)(this, this.checkUsernameAvailability, 500);
      }
      this.set("usernameValidation", result);
    },
    basicUsernameValidation(username) {
      if (username && username === this.prefilledUsername) {
        return validResult({
          reason: _I18n.default.t("user.username.prefilled")
        });
      }
      if ((0, _utils.isEmpty)(username)) {
        return failedResult({
          message: _I18n.default.t("user.username.required"),
          reason: this.forceValidationReason ? _I18n.default.t("user.username.required") : null
        });
      }
      if (username.length < this.siteSettings.min_username_length) {
        return failedResult({
          reason: _I18n.default.t("user.username.too_short")
        });
      }
      if (username.length > this.maxUsernameLength) {
        return failedResult({
          reason: _I18n.default.t("user.username.too_long")
        });
      }
      return failedResult({
        shouldCheck: true,
        reason: _I18n.default.t("user.username.checking")
      });
    },
    checkUsernameAvailability() {
      return _user.default.checkUsername(this.accountUsername, this.accountEmail).then(result => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }
        this.set("isDeveloper", false);
        if (result.available) {
          if (result.is_developer) {
            this.set("isDeveloper", true);
          }
          return this.set("usernameValidation", validResult({
            reason: _I18n.default.t("user.username.available")
          }));
        } else {
          if (result.suggestion) {
            return this.set("usernameValidation", failedResult({
              reason: _I18n.default.t("user.username.not_available", result)
            }));
          } else {
            return this.set("usernameValidation", failedResult({
              reason: result.errors ? result.errors.join(" ") : _I18n.default.t("user.username.not_available_no_suggestion")
            }));
          }
        }
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "triggerValidation", [_dec], Object.getOwnPropertyDescriptor(_obj, "triggerValidation"), _obj)), _obj)));
  _exports.default = _default;
});