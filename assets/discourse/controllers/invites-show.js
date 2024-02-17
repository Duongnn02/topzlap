define("discourse/controllers/invites-show", ["exports", "@ember/object/computed", "@ember/controller", "discourse/lib/url", "@ember/object", "I18n", "discourse/mixins/name-validation", "discourse/mixins/password-validation", "discourse/mixins/user-fields-validation", "discourse/mixins/username-validation", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse-common/utils/decorators", "discourse/lib/utilities", "discourse/models/login-method", "discourse-common/lib/get-url", "@ember/utils", "discourse/lib/waving-hand-url"], function (_exports, _computed, _controller, _url, _object, _I18n, _nameValidation, _passwordValidation, _userFieldsValidation, _usernameValidation, _ajax, _ajaxError, _decorators, _utilities, _loginMethod, _getUrl, _utils, _wavingHandUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _obj, _init, _init2;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"@ember/controller",0,"discourse/lib/url",0,"@ember/object",0,"I18n",0,"discourse/mixins/name-validation",0,"discourse/mixins/password-validation",0,"discourse/mixins/user-fields-validation",0,"discourse/mixins/username-validation",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error",0,"discourse-common/utils/decorators",0,"discourse/lib/utilities",0,"discourse/models/login-method",0,"discourse-common/lib/get-url",0,"@ember/utils",0,"discourse/lib/waving-hand-url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_passwordValidation.default, _usernameValidation.default, _nameValidation.default, _userFieldsValidation.default, (_dec = (0, _decorators.default)("existingUserId"), _dec2 = (0, _decorators.default)("email"), _dec3 = (0, _decorators.default)("emailValidation.failed", "usernameValidation.failed", "passwordValidation.failed", "nameValidation.failed", "userFieldsValidation.failed", "existingUserRedeeming", "existingUserCanRedeem"), _dec4 = (0, _decorators.default)("externalAuthsEnabled", "externalAuthsOnly", "discourseConnectEnabled"), _dec5 = (0, _decorators.default)("externalAuthsOnly", "authOptions", "emailValidation.failed", "existingUserRedeeming"), _dec6 = (0, _decorators.default)("email", "rejectedEmails.[]", "authOptions.email", "authOptions.email_valid", "hiddenEmail", "emailVerifiedByLink", "differentExternalEmail"), _dec7 = (0, _decorators.default)("authOptions.associate_url", "authOptions.auth_provider"), (_obj = {
    queryParams: ["t"],
    createAccount: (0, _controller.inject)(),
    invitedBy: (0, _computed.readOnly)("model.invited_by"),
    email: (0, _computed.alias)("model.email"),
    accountEmail: (0, _computed.alias)("email"),
    existingUserId: (0, _computed.readOnly)("model.existing_user_id"),
    existingUserCanRedeem: (0, _computed.readOnly)("model.existing_user_can_redeem"),
    existingUserCanRedeemError: (0, _computed.readOnly)("model.existing_user_can_redeem_error"),
    existingUserRedeeming: (0, _computed.bool)("existingUserId"),
    hiddenEmail: (0, _computed.alias)("model.hidden_email"),
    emailVerifiedByLink: (0, _computed.alias)("model.email_verified_by_link"),
    differentExternalEmail: (0, _computed.alias)("model.different_external_email"),
    accountUsername: (0, _computed.alias)("model.username"),
    passwordRequired: (0, _computed.not)("externalAuthsOnly"),
    successMessage: null,
    errorMessage: null,
    userFields: null,
    authOptions: null,
    inviteImageUrl: (0, _getUrl.default)("/images/envelope.svg"),
    isInviteLink: (0, _computed.readOnly)("model.is_invite_link"),
    rejectedEmails: null,
    maskPassword: true,
    init() {
      this._super(...arguments);
      this.rejectedEmails = [];
    },
    authenticationComplete(options) {
      const props = {
        accountUsername: options.username,
        accountName: options.name,
        authOptions: _object.default.create(options)
      };
      if (this.isInviteLink) {
        props.email = options.email;
      }
      this.setProperties(props);
    },
    discourseConnectEnabled() {
      return this.siteSettings.enable_discourse_connect;
    },
    welcomeTitle() {
      return _I18n.default.t("invites.welcome_to", {
        site_name: this.siteSettings.title
      });
    },
    subheaderMessage(existingUserId) {
      if (existingUserId) {
        return _I18n.default.t("invites.existing_user_can_redeem");
      } else {
        return _I18n.default.t("create_account.subheader_title");
      }
    },
    yourEmailMessage(email) {
      return _I18n.default.t("invites.your_email", {
        email
      });
    },
    externalAuthsEnabled() {
      return (0, _loginMethod.findAll)().length > 0;
    },
    externalAuthsOnly() {
      return !this.siteSettings.enable_local_logins && this.externalAuthsEnabled && !this.siteSettings.enable_discourse_connect;
    },
    submitDisabled(emailValidationFailed, usernameValidationFailed, passwordValidationFailed, nameValidationFailed, userFieldsValidationFailed, existingUserRedeeming, existingUserCanRedeem) {
      if (existingUserRedeeming) {
        return !existingUserCanRedeem;
      }
      return emailValidationFailed || usernameValidationFailed || passwordValidationFailed || nameValidationFailed || userFieldsValidationFailed;
    },
    showSocialLoginAvailable(externalAuthsEnabled, externalAuthsOnly, discourseConnectEnabled) {
      return externalAuthsEnabled && !externalAuthsOnly && !discourseConnectEnabled;
    },
    shouldDisplayForm(externalAuthsOnly, authOptions, emailValidationFailed, existingUserRedeeming) {
      return (this.siteSettings.enable_local_logins || externalAuthsOnly && authOptions && !emailValidationFailed) && !this.siteSettings.enable_discourse_connect && !existingUserRedeeming;
    },
    fullnameRequired() {
      return this.siteSettings.full_name_required || this.siteSettings.enable_names;
    },
    emailValidation(email, rejectedEmails, externalAuthEmail, externalAuthEmailValid, hiddenEmail, emailVerifiedByLink, differentExternalEmail) {
      if (hiddenEmail && !differentExternalEmail) {
        return _object.default.create({
          ok: true,
          reason: _I18n.default.t("user.email.ok")
        });
      }

      // If blank, fail without a reason
      if ((0, _utils.isEmpty)(email)) {
        return _object.default.create({
          failed: true
        });
      }
      if (rejectedEmails.includes(email)) {
        return _object.default.create({
          failed: true,
          reason: _I18n.default.t("user.email.invalid")
        });
      }
      if (externalAuthEmail && externalAuthEmailValid) {
        const provider = this.createAccount.authProviderDisplayName(this.get("authOptions.auth_provider"));
        if (externalAuthEmail === email) {
          return _object.default.create({
            ok: true,
            reason: _I18n.default.t("user.email.authenticated", {
              provider
            })
          });
        } else {
          return _object.default.create({
            failed: true,
            reason: _I18n.default.t("user.email.invite_auth_email_invalid", {
              provider
            })
          });
        }
      }
      if (emailVerifiedByLink) {
        return _object.default.create({
          ok: true,
          reason: _I18n.default.t("user.email.authenticated_by_invite")
        });
      }
      if ((0, _utilities.emailValid)(email)) {
        return _object.default.create({
          ok: true,
          reason: _I18n.default.t("user.email.ok")
        });
      }
      return _object.default.create({
        failed: true,
        reason: _I18n.default.t("user.email.invalid")
      });
    },
    wavingHandURL: () => (0, _wavingHandUrl.wavingHandURL)(),
    ssoPath: () => (0, _getUrl.default)("/session/sso"),
    disclaimerHtml() {
      return _I18n.default.t("create_account.disclaimer", {
        tos_link: this.siteSettings.tos_url || (0, _getUrl.default)("/tos"),
        privacy_link: this.siteSettings.privacy_policy_url || (0, _getUrl.default)("/privacy")
      });
    },
    associateHtml(url, provider) {
      if (!url) {
        return;
      }
      return _I18n.default.t("create_account.associate", {
        associate_link: url,
        provider: _I18n.default.t(`login.${provider}.name`)
      });
    },
    togglePasswordMask() {
      this.toggleProperty("maskPassword");
    },
    actions: {
      submit() {
        const userFields = this.userFields;
        let userCustomFields = {};
        if (!(0, _utils.isEmpty)(userFields)) {
          userFields.forEach(function (f) {
            userCustomFields[f.get("field.id")] = f.get("value");
          });
        }
        const data = {
          username: this.accountUsername,
          name: this.accountName,
          password: this.accountPassword,
          user_custom_fields: userCustomFields,
          timezone: moment.tz.guess()
        };
        if (this.isInviteLink) {
          data.email = this.email;
        } else {
          data.email_token = this.t;
        }
        (0, _ajax.ajax)({
          url: `/invites/show/${this.get("model.token")}.json`,
          type: "PUT",
          data
        }).then(result => {
          if (result.success) {
            this.set("successMessage", result.message || _I18n.default.t("invites.success"));
            if (result.redirect_to) {
              _url.default.redirectTo(result.redirect_to);
            }
          } else {
            if (result.errors && result.errors.email && result.errors.email.length > 0 && result.values) {
              this.rejectedEmails.pushObject(result.values.email);
            }
            if (result.errors && result.errors.password && result.errors.password.length > 0) {
              this.rejectedPasswords.pushObject(this.accountPassword);
              this.rejectedPasswordsMessages.set(this.accountPassword, result.errors.password[0]);
            }
            if (result.message) {
              this.set("errorMessage", result.message);
            }
          }
        }).catch(error => {
          this.set("errorMessage", (0, _ajaxError.extractError)(error));
        });
      },
      externalLogin(provider) {
        provider.doLogin({
          signup: true,
          params: {
            origin: window.location.href
          }
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "discourseConnectEnabled", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "discourseConnectEnabled"), _obj), _applyDecoratedDescriptor(_obj, "welcomeTitle", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "welcomeTitle"), _obj), _applyDecoratedDescriptor(_obj, "subheaderMessage", [_dec], Object.getOwnPropertyDescriptor(_obj, "subheaderMessage"), _obj), _applyDecoratedDescriptor(_obj, "yourEmailMessage", [_dec2], Object.getOwnPropertyDescriptor(_obj, "yourEmailMessage"), _obj), _applyDecoratedDescriptor(_obj, "externalAuthsEnabled", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "externalAuthsEnabled"), _obj), _applyDecoratedDescriptor(_obj, "externalAuthsOnly", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "externalAuthsOnly"), _obj), _applyDecoratedDescriptor(_obj, "submitDisabled", [_dec3], Object.getOwnPropertyDescriptor(_obj, "submitDisabled"), _obj), _applyDecoratedDescriptor(_obj, "showSocialLoginAvailable", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showSocialLoginAvailable"), _obj), _applyDecoratedDescriptor(_obj, "shouldDisplayForm", [_dec5], Object.getOwnPropertyDescriptor(_obj, "shouldDisplayForm"), _obj), _applyDecoratedDescriptor(_obj, "fullnameRequired", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "fullnameRequired"), _obj), _applyDecoratedDescriptor(_obj, "emailValidation", [_dec6], Object.getOwnPropertyDescriptor(_obj, "emailValidation"), _obj), _applyDecoratedDescriptor(_obj, "wavingHandURL", [_decorators.default], (_init = Object.getOwnPropertyDescriptor(_obj, "wavingHandURL"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "ssoPath", [_decorators.default], (_init2 = Object.getOwnPropertyDescriptor(_obj, "ssoPath"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "disclaimerHtml", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "disclaimerHtml"), _obj), _applyDecoratedDescriptor(_obj, "associateHtml", [_dec7], Object.getOwnPropertyDescriptor(_obj, "associateHtml"), _obj), _applyDecoratedDescriptor(_obj, "togglePasswordMask", [_object.action], Object.getOwnPropertyDescriptor(_obj, "togglePasswordMask"), _obj)), _obj)));
  _exports.default = _default;
});