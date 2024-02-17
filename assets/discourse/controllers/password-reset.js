define("discourse/controllers/password-reset", ["exports", "discourse/lib/url", "@ember/object", "@ember/object/computed", "@ember/controller", "I18n", "discourse/mixins/password-validation", "discourse/models/user", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse-common/lib/get-url", "discourse/lib/webauthn", "discourse/lib/utilities"], function (_exports, _url, _object, _computed, _controller, _I18n, _passwordValidation, _user, _ajax, _decorators, _getUrl, _webauthn, _utilities) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"@ember/object",0,"@ember/object/computed",0,"@ember/controller",0,"I18n",0,"discourse/mixins/password-validation",0,"discourse/models/user",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url",0,"discourse/lib/webauthn",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_passwordValidation.default, (_dec = (0, _decorators.default)("model.security_key_required"), _dec2 = (0, _decorators.default)(), _dec3 = (0, _decorators.default)("redirectTo"), (_obj = {
    isDeveloper: (0, _computed.alias)("model.is_developer"),
    admin: (0, _computed.alias)("model.admin"),
    secondFactorRequired: (0, _computed.alias)("model.second_factor_required"),
    securityKeyRequired: (0, _computed.alias)("model.security_key_required"),
    backupEnabled: (0, _computed.alias)("model.backup_enabled"),
    securityKeyOrSecondFactorRequired: (0, _computed.or)("model.second_factor_required", "model.security_key_required"),
    otherMethodAllowed: (0, _computed.readOnly)("model.multiple_second_factor_methods"),
    secondFactorMethod(security_key_required) {
      return security_key_required ? _user.SECOND_FACTOR_METHODS.SECURITY_KEY : _user.SECOND_FACTOR_METHODS.TOTP;
    },
    passwordRequired: true,
    errorMessage: null,
    successMessage: null,
    requiresApproval: false,
    redirected: false,
    maskPassword: true,
    continueButtonText() {
      return _I18n.default.t("password_reset.continue", {
        site_name: this.siteSettings.title
      });
    },
    redirectHref(redirectTo) {
      return (0, _getUrl.default)(redirectTo || "/");
    },
    lockImageUrl: (0, _getUrl.default)("/images/lock.svg"),
    done(event) {
      if (event && (0, _utilities.modKeysPressed)(event).length > 0) {
        return false;
      }
      event?.preventDefault();
      this.set("redirected", true);
      _url.default.redirectTo(this.redirectTo || "/");
    },
    togglePasswordMask() {
      this.toggleProperty("maskPassword");
    },
    actions: {
      submit() {
        (0, _ajax.ajax)({
          url: (0, _url.userPath)(`password-reset/${this.get("model.token")}.json`),
          type: "PUT",
          data: {
            password: this.accountPassword,
            second_factor_token: this.securityKeyCredential || this.secondFactorToken,
            second_factor_method: this.secondFactorMethod,
            timezone: moment.tz.guess()
          }
        }).then(result => {
          if (result.success) {
            this.set("successMessage", result.message);
            this.set("redirectTo", result.redirect_to);
            if (result.requires_approval) {
              this.set("requiresApproval", true);
            } else {
              this.set("redirected", true);
              _url.default.redirectTo(result.redirect_to || "/");
            }
          } else {
            if (result.errors && !result.errors.password) {
              this.setProperties({
                secondFactorRequired: this.secondFactorRequired,
                securityKeyRequired: this.securityKeyRequired,
                password: null,
                errorMessage: result.message
              });
            } else if (this.secondFactorRequired || this.securityKeyRequired) {
              this.setProperties({
                secondFactorRequired: false,
                securityKeyRequired: false,
                errorMessage: null
              });
            } else if (result.errors && result.errors.password && result.errors.password.length > 0) {
              this.rejectedPasswords.pushObject(this.accountPassword);
              this.rejectedPasswordsMessages.set(this.accountPassword, result.errors.password[0]);
            }
            if (result.message) {
              this.set("errorMessage", result.message);
            }
          }
        }).catch(e => {
          if (e.jqXHR && e.jqXHR.status === 429) {
            this.set("errorMessage", _I18n.default.t("user.second_factor.rate_limit"));
          } else {
            throw new Error(e);
          }
        });
      },
      authenticateSecurityKey() {
        (0, _webauthn.getWebauthnCredential)(this.model.challenge, this.model.allowed_credential_ids, credentialData => {
          this.set("securityKeyCredential", credentialData);
          this.send("submit");
        }, errorMessage => {
          this.setProperties({
            securityKeyRequired: true,
            password: null,
            errorMessage
          });
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "secondFactorMethod", [_dec], Object.getOwnPropertyDescriptor(_obj, "secondFactorMethod"), _obj), _applyDecoratedDescriptor(_obj, "continueButtonText", [_dec2], Object.getOwnPropertyDescriptor(_obj, "continueButtonText"), _obj), _applyDecoratedDescriptor(_obj, "redirectHref", [_dec3], Object.getOwnPropertyDescriptor(_obj, "redirectHref"), _obj), _applyDecoratedDescriptor(_obj, "done", [_object.action], Object.getOwnPropertyDescriptor(_obj, "done"), _obj), _applyDecoratedDescriptor(_obj, "togglePasswordMask", [_object.action], Object.getOwnPropertyDescriptor(_obj, "togglePasswordMask"), _obj)), _obj)));
  _exports.default = _default;
});