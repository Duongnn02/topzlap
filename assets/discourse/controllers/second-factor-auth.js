define("discourse/controllers/second-factor-auth", ["exports", "@ember/controller", "discourse/models/user", "I18n", "discourse/lib/ajax", "discourse/lib/ajax-error", "@ember/object", "discourse-common/utils/decorators", "@ember/object/computed", "discourse/lib/webauthn", "discourse/lib/url"], function (_exports, _controller, _user, _I18n, _ajax, _ajaxError, _object, _decorators, _computed, _webauthn, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/models/user",0,"I18n",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error",0,"@ember/object",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"discourse/lib/webauthn",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const {
    TOTP,
    BACKUP_CODE,
    SECURITY_KEY
  } = _user.SECOND_FACTOR_METHODS;
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("allowedMethods.[]", "totpEnabled"), _dec2 = (0, _decorators.default)("allowedMethods.[]", "backupCodesEnabled"), _dec3 = (0, _decorators.default)("allowedMethods.[]", "securityKeysEnabled"), _dec4 = (0, _decorators.default)("userSelectedMethod", "securityKeysAvailable", "totpAvailable", "backupCodesAvailable"), _dec5 = (0, _decorators.default)("shownSecondFactorMethod", "securityKeysAvailable", "totpAvailable", "backupCodesAvailable"), _dec6 = (0, _decorators.default)("shownSecondFactorMethod"), _dec7 = (0, _decorators.default)("shownSecondFactorMethod"), _dec8 = (0, _decorators.default)("messageIsError"), _dec9 = (0, _decorators.default)("showTotpForm", "showBackupCodesForm"), (_obj = {
    TOTP,
    BACKUP_CODE,
    SECURITY_KEY,
    queryParams: ["nonce"],
    message: null,
    loadError: false,
    messageIsError: false,
    secondFactorToken: null,
    userSelectedMethod: null,
    totpEnabled: (0, _computed.readOnly)("model.totp_enabled"),
    backupCodesEnabled: (0, _computed.readOnly)("model.backup_enabled"),
    securityKeysEnabled: (0, _computed.readOnly)("model.security_keys_enabled"),
    allowedMethods: (0, _computed.readOnly)("model.allowed_methods"),
    customDescription: (0, _computed.readOnly)("model.description"),
    showTotpForm: (0, _computed.equal)("shownSecondFactorMethod", TOTP),
    showSecurityKeyForm: (0, _computed.equal)("shownSecondFactorMethod", SECURITY_KEY),
    showBackupCodesForm: (0, _computed.equal)("shownSecondFactorMethod", BACKUP_CODE),
    totpAvailable() {
      return this.totpEnabled && this.allowedMethods.includes(TOTP);
    },
    backupCodesAvailable() {
      return this.backupCodesEnabled && this.allowedMethods.includes(BACKUP_CODE);
    },
    securityKeysAvailable() {
      return this.securityKeysEnabled && this.allowedMethods.includes(SECURITY_KEY);
    },
    shownSecondFactorMethod(userSelectedMethod, securityKeysAvailable, totpAvailable, backupCodesAvailable) {
      if (userSelectedMethod !== null) {
        return userSelectedMethod;
      } else {
        if (securityKeysAvailable) {
          return SECURITY_KEY;
        } else if (totpAvailable) {
          return TOTP;
        } else if (backupCodesAvailable) {
          return BACKUP_CODE;
        } else {
          throw new Error("unexpected state of user 2fa settings!");
        }
      }
    },
    alternativeMethods(shownSecondFactorMethod, securityKeysAvailable, totpAvailable, backupCodesAvailable) {
      const alts = [];
      if (securityKeysAvailable && shownSecondFactorMethod !== SECURITY_KEY) {
        alts.push({
          id: SECURITY_KEY,
          translationKey: "login.second_factor_toggle.security_key",
          class: "security-key"
        });
      }
      if (totpAvailable && shownSecondFactorMethod !== TOTP) {
        alts.push({
          id: TOTP,
          translationKey: "login.second_factor_toggle.totp",
          class: "totp"
        });
      }
      if (backupCodesAvailable && shownSecondFactorMethod !== BACKUP_CODE) {
        alts.push({
          id: BACKUP_CODE,
          translationKey: "login.second_factor_toggle.backup_code",
          class: "backup-code"
        });
      }
      return alts;
    },
    secondFactorTitle(shownSecondFactorMethod) {
      switch (shownSecondFactorMethod) {
        case TOTP:
          return _I18n.default.t("login.second_factor_title");
        case SECURITY_KEY:
          return _I18n.default.t("login.second_factor_title");
        case BACKUP_CODE:
          return _I18n.default.t("login.second_factor_backup_title");
      }
    },
    secondFactorDescription(shownSecondFactorMethod) {
      switch (shownSecondFactorMethod) {
        case TOTP:
          return _I18n.default.t("login.second_factor_description");
        case SECURITY_KEY:
          return _I18n.default.t("login.security_key_description");
        case BACKUP_CODE:
          return _I18n.default.t("login.second_factor_backup_description");
      }
    },
    alertClass(messageIsError) {
      if (messageIsError) {
        return "alert-error";
      } else {
        return "alert-success";
      }
    },
    inputFormClass(showTotpForm, showBackupCodesForm) {
      if (showTotpForm) {
        return "totp-token";
      } else if (showBackupCodesForm) {
        return "backup-code-token";
      }
    },
    resetState() {
      this.set("message", null);
      this.set("messageIsError", false);
      this.set("secondFactorToken", null);
      this.set("userSelectedMethod", null);
      this.set("loadError", false);
    },
    displayError(message) {
      this.set("message", message);
      this.set("messageIsError", true);
    },
    displaySuccess(message) {
      this.set("message", message);
      this.set("messageIsError", false);
    },
    verifySecondFactor(data) {
      return (0, _ajax.ajax)("/session/2fa", {
        type: "POST",
        data: {
          ...data,
          second_factor_method: this.shownSecondFactorMethod,
          nonce: this.nonce
        }
      }).then(response => {
        this.displaySuccess(_I18n.default.t("second_factor_auth.redirect_after_success"));
        (0, _ajax.ajax)(response.callback_path, {
          type: response.callback_method,
          data: {
            second_factor_nonce: this.nonce
          }
        }).then(callbackResponse => {
          const redirectUrl = callbackResponse.redirect_url || response.redirect_url;
          _url.default.routeTo(redirectUrl);
        }).catch(error => this.displayError((0, _ajaxError.extractError)(error)));
      }).catch(error => {
        this.displayError((0, _ajaxError.extractError)(error));
      });
    },
    onTokenInput(event) {
      this.set("secondFactorToken", event.target.value);
    },
    useAnotherMethod(newMethod, event) {
      event?.preventDefault();
      this.set("userSelectedMethod", newMethod);
    },
    authenticateSecurityKey() {
      (0, _webauthn.getWebauthnCredential)(this.model.challenge, this.model.allowed_credential_ids, credentialData => {
        this.verifySecondFactor({
          second_factor_token: credentialData
        });
      }, errorMessage => {
        this.displayError(errorMessage);
      });
    },
    authenticateToken() {
      this.verifySecondFactor({
        second_factor_token: this.secondFactorToken
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "totpAvailable", [_dec], Object.getOwnPropertyDescriptor(_obj, "totpAvailable"), _obj), _applyDecoratedDescriptor(_obj, "backupCodesAvailable", [_dec2], Object.getOwnPropertyDescriptor(_obj, "backupCodesAvailable"), _obj), _applyDecoratedDescriptor(_obj, "securityKeysAvailable", [_dec3], Object.getOwnPropertyDescriptor(_obj, "securityKeysAvailable"), _obj), _applyDecoratedDescriptor(_obj, "shownSecondFactorMethod", [_dec4], Object.getOwnPropertyDescriptor(_obj, "shownSecondFactorMethod"), _obj), _applyDecoratedDescriptor(_obj, "alternativeMethods", [_dec5], Object.getOwnPropertyDescriptor(_obj, "alternativeMethods"), _obj), _applyDecoratedDescriptor(_obj, "secondFactorTitle", [_dec6], Object.getOwnPropertyDescriptor(_obj, "secondFactorTitle"), _obj), _applyDecoratedDescriptor(_obj, "secondFactorDescription", [_dec7], Object.getOwnPropertyDescriptor(_obj, "secondFactorDescription"), _obj), _applyDecoratedDescriptor(_obj, "alertClass", [_dec8], Object.getOwnPropertyDescriptor(_obj, "alertClass"), _obj), _applyDecoratedDescriptor(_obj, "inputFormClass", [_dec9], Object.getOwnPropertyDescriptor(_obj, "inputFormClass"), _obj), _applyDecoratedDescriptor(_obj, "onTokenInput", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onTokenInput"), _obj), _applyDecoratedDescriptor(_obj, "useAnotherMethod", [_object.action], Object.getOwnPropertyDescriptor(_obj, "useAnotherMethod"), _obj), _applyDecoratedDescriptor(_obj, "authenticateSecurityKey", [_object.action], Object.getOwnPropertyDescriptor(_obj, "authenticateSecurityKey"), _obj), _applyDecoratedDescriptor(_obj, "authenticateToken", [_object.action], Object.getOwnPropertyDescriptor(_obj, "authenticateToken"), _obj)), _obj)));
  _exports.default = _default;
});