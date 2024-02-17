define("discourse/controllers/create-account", ["exports", "@ember/controller", "discourse/lib/cookie", "discourse-common/utils/decorators", "@ember/array", "@ember/object", "I18n", "discourse/mixins/modal-functionality", "discourse/mixins/name-validation", "discourse/mixins/password-validation", "rsvp", "discourse/models/user", "discourse/mixins/user-fields-validation", "discourse/mixins/username-validation", "discourse/lib/ajax", "discourse/lib/utilities", "discourse/models/login-method", "discourse-common/lib/debounce", "discourse-common/lib/get-url", "@ember/utils", "@ember/object/computed", "discourse/lib/computed", "discourse/lib/url", "discourse/lib/waving-hand-url"], function (_exports, _controller, _cookie, _decorators, _array, _object, _I18n, _modalFunctionality, _nameValidation, _passwordValidation, _rsvp, _user, _userFieldsValidation, _usernameValidation, _ajax, _utilities, _loginMethod, _debounce, _getUrl, _utils, _computed, _computed2, _url, _wavingHandUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/lib/cookie",0,"discourse-common/utils/decorators",0,"@ember/array",0,"@ember/object",0,"I18n",0,"discourse/mixins/modal-functionality",0,"discourse/mixins/name-validation",0,"discourse/mixins/password-validation",0,"rsvp",0,"discourse/models/user",0,"discourse/mixins/user-fields-validation",0,"discourse/mixins/username-validation",0,"discourse/lib/ajax",0,"discourse/lib/utilities",0,"discourse/models/login-method",0,"discourse-common/lib/debounce",0,"discourse-common/lib/get-url",0,"@ember/utils",0,"@ember/object/computed",0,"discourse/lib/computed",0,"discourse/lib/url",0,"discourse/lib/waving-hand-url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, _passwordValidation.default, _usernameValidation.default, _nameValidation.default, _userFieldsValidation.default, (_dec = (0, _decorators.default)("hasAuthOptions", "canCreateLocal", "skipConfirmation"), _dec2 = (0, _decorators.default)("formSubmitted"), _dec3 = (0, _decorators.default)(), _dec4 = (0, _decorators.default)("userFields", "hasAtLeastOneLoginButton", "hasAuthOptions"), _dec5 = (0, _decorators.default)("authOptions", "authOptions.can_edit_username"), _dec6 = (0, _decorators.default)("authOptions", "authOptions.can_edit_name"), _dec7 = (0, _decorators.default)("authOptions.auth_provider"), _dec8 = (0, _decorators.default)("serverAccountEmail", "serverEmailValidation", "accountEmail", "rejectedEmails.[]", "forceValidationReason"), _dec9 = (0, _decorators.default)("accountEmail", "authOptions.email", "authOptions.email_valid"), _dec10 = (0, _decorators.observes)("emailValidation", "accountEmail"), _dec11 = (0, _decorators.on)("init"), _dec12 = (0, _decorators.default)("authOptions.associate_url", "authOptions.auth_provider"), (_obj = {
    login: (0, _controller.inject)(),
    complete: false,
    accountChallenge: 0,
    accountHoneypot: 0,
    formSubmitted: false,
    rejectedEmails: (0, _array.A)(),
    prefilledUsername: null,
    userFields: null,
    isDeveloper: false,
    maskPassword: true,
    hasAuthOptions: (0, _computed.notEmpty)("authOptions"),
    canCreateLocal: (0, _computed2.setting)("enable_local_logins"),
    requireInviteCode: (0, _computed2.setting)("require_invite_code"),
    showCreateForm(hasAuthOptions, canCreateLocal, skipConfirmation) {
      return (hasAuthOptions || canCreateLocal) && !skipConfirmation;
    },
    resetForm() {
      // We wrap the fields in a structure so we can assign a value
      this.setProperties({
        accountName: "",
        accountEmail: "",
        accountUsername: "",
        accountPassword: "",
        serverAccountEmail: null,
        serverEmailValidation: null,
        authOptions: null,
        complete: false,
        formSubmitted: false,
        rejectedEmails: [],
        rejectedPasswords: [],
        prefilledUsername: null,
        isDeveloper: false,
        maskPassword: true
      });
      this._createUserFields();
    },
    submitDisabled() {
      if (this.formSubmitted) {
        return true;
      }
      return false;
    },
    wavingHandURL: () => (0, _wavingHandUrl.wavingHandURL)(),
    modalBodyClasses(userFields, hasAtLeastOneLoginButton, hasAuthOptions) {
      const classes = [];
      if (userFields) {
        classes.push("has-user-fields");
      }
      if (hasAtLeastOneLoginButton && !hasAuthOptions) {
        classes.push("has-alt-auth");
      }
      if (!this.canCreateLocal) {
        classes.push("no-local-logins");
      }
      return classes.join(" ");
    },
    usernameDisabled(authOptions, canEditUsername) {
      return authOptions && !canEditUsername;
    },
    nameDisabled(authOptions, canEditName) {
      return authOptions && !canEditName;
    },
    fullnameRequired() {
      return this.siteSettings.full_name_required || this.siteSettings.enable_names;
    },
    passwordRequired(authProvider) {
      return (0, _utils.isEmpty)(authProvider);
    },
    disclaimerHtml() {
      return _I18n.default.t("create_account.disclaimer", {
        tos_link: this.siteSettings.tos_url || (0, _getUrl.default)("/tos"),
        privacy_link: this.siteSettings.privacy_policy_url || (0, _getUrl.default)("/privacy")
      });
    },
    emailValidation(serverAccountEmail, serverEmailValidation, email, rejectedEmails, forceValidationReason) {
      const failedAttrs = {
        failed: true,
        ok: false,
        element: document.querySelector("#new-account-email")
      };
      if (serverAccountEmail === email && serverEmailValidation) {
        return serverEmailValidation;
      }

      // If blank, fail without a reason
      if ((0, _utils.isEmpty)(email)) {
        return _object.default.create(Object.assign(failedAttrs, {
          message: _I18n.default.t("user.email.required"),
          reason: forceValidationReason ? _I18n.default.t("user.email.required") : null
        }));
      }
      if (rejectedEmails.includes(email) || !(0, _utilities.emailValid)(email)) {
        return _object.default.create(Object.assign(failedAttrs, {
          reason: _I18n.default.t("user.email.invalid")
        }));
      }
      if (this.get("authOptions.email") === email && this.get("authOptions.email_valid")) {
        return _object.default.create({
          ok: true,
          reason: _I18n.default.t("user.email.authenticated", {
            provider: this.authProviderDisplayName(this.get("authOptions.auth_provider"))
          })
        });
      }
      return _object.default.create({
        ok: true,
        reason: _I18n.default.t("user.email.ok")
      });
    },
    checkEmailAvailability() {
      if (!this.emailValidation.ok || this.serverAccountEmail === this.accountEmail) {
        return;
      }
      return _user.default.checkEmail(this.accountEmail).then(result => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }
        if (result.failed) {
          this.setProperties({
            serverAccountEmail: this.accountEmail,
            serverEmailValidation: _object.default.create({
              failed: true,
              element: document.querySelector("#new-account-email"),
              reason: result.errors[0]
            })
          });
        } else {
          this.setProperties({
            serverAccountEmail: this.accountEmail,
            serverEmailValidation: _object.default.create({
              ok: true,
              reason: _I18n.default.t("user.email.ok")
            })
          });
        }
      }).catch(() => {
        this.setProperties({
          serverAccountEmail: null,
          serverEmailValidation: null
        });
      });
    },
    emailDisabled() {
      return this.get("authOptions.email") === this.accountEmail && this.get("authOptions.email_valid");
    },
    authProviderDisplayName(providerName) {
      const matchingProvider = (0, _loginMethod.findAll)().find(provider => {
        return provider.name === providerName;
      });
      return matchingProvider ? matchingProvider.get("prettyName") : providerName;
    },
    prefillUsername() {
      if (this.prefilledUsername) {
        // If username field has been filled automatically, and email field just changed,
        // then remove the username.
        if (this.accountUsername === this.prefilledUsername) {
          this.set("accountUsername", "");
        }
        this.set("prefilledUsername", null);
      }
      if (this.get("emailValidation.ok") && ((0, _utils.isEmpty)(this.accountUsername) || this.get("authOptions.email"))) {
        // If email is valid and username has not been entered yet,
        // or email and username were filled automatically by 3rd party auth,
        // then look for a registered username that matches the email.
        (0, _debounce.default)(this, this.fetchExistingUsername, 500);
      }
    },
    hasAtLeastOneLoginButton() {
      return (0, _loginMethod.findAll)().length > 0;
    },
    fetchConfirmationValue() {
      if (this._challengeDate === undefined && this._hpPromise) {
        // Request already in progress
        return this._hpPromise;
      }
      this._hpPromise = (0, _ajax.ajax)("/session/hp.json").then(json => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }
        this._challengeDate = new Date();
        // remove 30 seconds for jitter, make sure this works for at least
        // 30 seconds so we don't have hard loops
        this._challengeExpiry = parseInt(json.expires_in, 10) - 30;
        if (this._challengeExpiry < 30) {
          this._challengeExpiry = 30;
        }
        this.setProperties({
          accountHoneypot: json.value,
          accountChallenge: json.challenge.split("").reverse().join("")
        });
      }).finally(() => this._hpPromise = undefined);
      return this._hpPromise;
    },
    performAccountCreation() {
      if (!this._challengeDate || new Date() - this._challengeDate > 1000 * this._challengeExpiry) {
        return this.fetchConfirmationValue().then(() => this.performAccountCreation());
      }
      const attrs = this.getProperties("accountName", "accountEmail", "accountPassword", "accountUsername", "accountChallenge", "inviteCode");
      attrs["accountPasswordConfirm"] = this.accountHoneypot;
      const userFields = this.userFields;
      const destinationUrl = this.get("authOptions.destination_url");
      if (!(0, _utils.isEmpty)(destinationUrl)) {
        (0, _cookie.default)("destination_url", destinationUrl, {
          path: "/"
        });
      }

      // Add the userfields to the data
      if (!(0, _utils.isEmpty)(userFields)) {
        attrs.userFields = {};
        userFields.forEach(f => attrs.userFields[f.get("field.id")] = f.get("value"));
      }
      this.set("formSubmitted", true);
      return _user.default.createAccount(attrs).then(result => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }
        this.set("isDeveloper", false);
        if (result.success) {
          // invalidate honeypot
          this._challengeExpiry = 1;

          // Trigger the browser's password manager using the hidden static login form:
          const $hidden_login_form = $("#hidden-login-form");
          $hidden_login_form.find("input[name=username]").val(attrs.accountUsername);
          $hidden_login_form.find("input[name=password]").val(attrs.accountPassword);
          $hidden_login_form.find("input[name=redirect]").val((0, _url.userPath)("account-created"));
          $hidden_login_form.submit();
          return new _rsvp.Promise(() => {}); // This will never resolve, the page will reload instead
        } else {
          this.flash(result.message || _I18n.default.t("create_account.failed"), "error");
          if (result.is_developer) {
            this.set("isDeveloper", true);
          }
          if (result.errors && result.errors.email && result.errors.email.length > 0 && result.values) {
            this.rejectedEmails.pushObject(result.values.email);
          }
          if (result.errors && result.errors.password && result.errors.password.length > 0) {
            this.rejectedPasswords.pushObject(attrs.accountPassword);
          }
          this.set("formSubmitted", false);
          (0, _cookie.removeCookie)("destination_url");
        }
      }, () => {
        this.set("formSubmitted", false);
        (0, _cookie.removeCookie)("destination_url");
        return this.flash(_I18n.default.t("create_account.failed"), "error");
      });
    },
    onShow() {
      if (this.skipConfirmation) {
        this.performAccountCreation().finally(() => this.set("skipConfirmation", false));
      }
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
      externalLogin(provider) {
        this.login.send("externalLogin", provider, {
          signup: true
        });
      },
      createAccount() {
        this.clearFlash();
        this.set("forceValidationReason", true);
        const validation = [this.emailValidation, this.usernameValidation, this.nameValidation, this.passwordValidation, this.userFieldsValidation].find(v => v.failed);
        if (validation) {
          const element = validation.element;
          if (element) {
            if (element.tagName === "DIV") {
              if (element.scrollIntoView) {
                element.scrollIntoView();
              }
              element.click();
            } else {
              element.focus();
            }
          }
          return;
        }
        this.set("forceValidationReason", false);
        this.performAccountCreation();
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "showCreateForm", [_dec], Object.getOwnPropertyDescriptor(_obj, "showCreateForm"), _obj), _applyDecoratedDescriptor(_obj, "submitDisabled", [_dec2], Object.getOwnPropertyDescriptor(_obj, "submitDisabled"), _obj), _applyDecoratedDescriptor(_obj, "wavingHandURL", [_dec3], (_init = Object.getOwnPropertyDescriptor(_obj, "wavingHandURL"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "modalBodyClasses", [_dec4], Object.getOwnPropertyDescriptor(_obj, "modalBodyClasses"), _obj), _applyDecoratedDescriptor(_obj, "usernameDisabled", [_dec5], Object.getOwnPropertyDescriptor(_obj, "usernameDisabled"), _obj), _applyDecoratedDescriptor(_obj, "nameDisabled", [_dec6], Object.getOwnPropertyDescriptor(_obj, "nameDisabled"), _obj), _applyDecoratedDescriptor(_obj, "fullnameRequired", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "fullnameRequired"), _obj), _applyDecoratedDescriptor(_obj, "passwordRequired", [_dec7], Object.getOwnPropertyDescriptor(_obj, "passwordRequired"), _obj), _applyDecoratedDescriptor(_obj, "disclaimerHtml", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "disclaimerHtml"), _obj), _applyDecoratedDescriptor(_obj, "emailValidation", [_dec8], Object.getOwnPropertyDescriptor(_obj, "emailValidation"), _obj), _applyDecoratedDescriptor(_obj, "checkEmailAvailability", [_object.action], Object.getOwnPropertyDescriptor(_obj, "checkEmailAvailability"), _obj), _applyDecoratedDescriptor(_obj, "emailDisabled", [_dec9], Object.getOwnPropertyDescriptor(_obj, "emailDisabled"), _obj), _applyDecoratedDescriptor(_obj, "prefillUsername", [_dec10], Object.getOwnPropertyDescriptor(_obj, "prefillUsername"), _obj), _applyDecoratedDescriptor(_obj, "hasAtLeastOneLoginButton", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "hasAtLeastOneLoginButton"), _obj), _applyDecoratedDescriptor(_obj, "fetchConfirmationValue", [_dec11], Object.getOwnPropertyDescriptor(_obj, "fetchConfirmationValue"), _obj), _applyDecoratedDescriptor(_obj, "associateHtml", [_dec12], Object.getOwnPropertyDescriptor(_obj, "associateHtml"), _obj), _applyDecoratedDescriptor(_obj, "togglePasswordMask", [_object.action], Object.getOwnPropertyDescriptor(_obj, "togglePasswordMask"), _obj)), _obj)));
  _exports.default = _default;
});