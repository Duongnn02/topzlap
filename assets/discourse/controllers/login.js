define("discourse/controllers/login", ["exports", "@ember/controller", "@ember/object/computed", "discourse/lib/utilities", "discourse/lib/cookie", "@ember/runloop", "@ember/object", "I18n", "discourse/mixins/modal-functionality", "discourse/models/user", "discourse/lib/ajax", "discourse-common/utils/decorators", "pretty-text/sanitizer", "discourse/lib/ajax-error", "discourse/models/login-method", "discourse-common/lib/get-url", "discourse/lib/webauthn", "@ember/utils", "discourse/lib/computed", "discourse/lib/show-modal", "discourse/lib/waving-hand-url", "@ember/service"], function (_exports, _controller, _computed, _utilities, _cookie, _runloop, _object, _I18n, _modalFunctionality, _user, _ajax, _decorators, _sanitizer, _ajaxError, _loginMethod, _getUrl, _webauthn, _utils, _computed2, _showModal, _wavingHandUrl, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object/computed",0,"discourse/lib/utilities",0,"discourse/lib/cookie",0,"@ember/runloop",0,"@ember/object",0,"I18n",0,"discourse/mixins/modal-functionality",0,"discourse/models/user",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"pretty-text/sanitizer",0,"discourse/lib/ajax-error",0,"discourse/models/login-method",0,"discourse-common/lib/get-url",0,"discourse/lib/webauthn",0,"@ember/utils",0,"discourse/lib/computed",0,"discourse/lib/show-modal",0,"discourse/lib/waving-hand-url",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // This is happening outside of the app via popup
  const AuthErrors = ["requires_invite", "awaiting_approval", "awaiting_activation", "admin_not_allowed_from_ip_address", "not_allowed_from_ip_address"];
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("showSecondFactor", "showSecurityKey"), _dec2 = (0, _decorators.default)(), _dec3 = (0, _decorators.default)("showSecondFactor", "showSecurityKey"), _dec4 = (0, _decorators.default)("awaitingApproval", "hasAtLeastOneLoginButton", "showSecondFactor", "canLoginLocal", "showSecurityKey"), _dec5 = (0, _decorators.default)("showSecondFactor", "showSecurityKey"), _dec6 = (0, _decorators.default)(), _dec7 = (0, _decorators.default)("loggingIn"), _dec8 = (0, _decorators.default)("loggingIn", "application.canSignUp"), _dec9 = (0, _decorators.default)("canLoginLocalWithEmail"), (_obj = {
    createAccount: (0, _controller.inject)(),
    forgotPassword: (0, _controller.inject)(),
    application: (0, _controller.inject)(),
    dialog: (0, _service.inject)(),
    loggingIn: false,
    loggedIn: false,
    processingEmailLink: false,
    showLoginButtons: true,
    showSecondFactor: false,
    awaitingApproval: false,
    maskPassword: true,
    canLoginLocal: (0, _computed2.setting)("enable_local_logins"),
    canLoginLocalWithEmail: (0, _computed2.setting)("enable_local_logins_via_email"),
    loginRequired: (0, _computed.alias)("application.loginRequired"),
    secondFactorMethod: _user.SECOND_FACTOR_METHODS.TOTP,
    noLoginLocal: (0, _computed.not)("canLoginLocal"),
    resetForm() {
      this.setProperties({
        loggingIn: false,
        loggedIn: false,
        secondFactorRequired: false,
        showSecondFactor: false,
        showSecurityKey: false,
        showLoginButtons: true,
        awaitingApproval: false,
        maskPassword: true
      });
    },
    credentialsClass(showSecondFactor, showSecurityKey) {
      return showSecondFactor || showSecurityKey ? "hidden" : "";
    },
    wavingHandURL: () => (0, _wavingHandUrl.wavingHandURL)(),
    secondFactorClass(showSecondFactor, showSecurityKey) {
      return showSecondFactor || showSecurityKey ? "" : "hidden";
    },
    modalBodyClasses(awaitingApproval, hasAtLeastOneLoginButton, showSecondFactor, canLoginLocal, showSecurityKey) {
      const classes = ["login-modal-body"];
      if (awaitingApproval) {
        classes.push("awaiting-approval");
      }
      if (hasAtLeastOneLoginButton && !showSecondFactor && !showSecurityKey) {
        classes.push("has-alt-auth");
      }
      if (!canLoginLocal) {
        classes.push("no-local-login");
      }
      if (showSecondFactor || showSecurityKey) {
        classes.push("second-factor");
      }
      return classes.join(" ");
    },
    disableLoginFields(showSecondFactor, showSecurityKey) {
      return showSecondFactor || showSecurityKey;
    },
    hasAtLeastOneLoginButton() {
      return (0, _loginMethod.findAll)().length > 0;
    },
    loginButtonLabel(loggingIn) {
      return loggingIn ? "login.logging_in" : "login.title";
    },
    loginDisabled: (0, _computed.or)("loggingIn", "loggedIn"),
    showSignupLink(loggingIn, canSignUp) {
      return canSignUp && !loggingIn;
    },
    showSpinner: (0, _computed.readOnly)("loggingIn"),
    showLoginWithEmailLink(canLoginLocalWithEmail) {
      return canLoginLocalWithEmail;
    },
    emailLogin(event) {
      event?.preventDefault();
      if (this.processingEmailLink) {
        return;
      }
      if ((0, _utils.isEmpty)(this.loginName)) {
        this.flash(_I18n.default.t("login.blank_username"), "info");
        return;
      }
      this.set("processingEmailLink", true);
      (0, _ajax.ajax)("/u/email-login", {
        data: {
          login: this.loginName.trim()
        },
        type: "POST"
      }).then(data => {
        const loginName = (0, _utilities.escapeExpression)(this.loginName);
        const isEmail = loginName.match(/@/);
        let key = `email_login.complete_${isEmail ? "email" : "username"}`;
        if (data.user_found === false) {
          this.flash(_I18n.default.t(`${key}_not_found`, {
            email: loginName,
            username: loginName
          }), "error");
        } else {
          let postfix = data.hide_taken ? "" : "_found";
          this.flash(_I18n.default.t(`${key}${postfix}`, {
            email: loginName,
            username: loginName
          }));
        }
      }).catch((0, _ajaxError.flashAjaxError)(this)).finally(() => this.set("processingEmailLink", false));
    },
    handleForgotPassword(event) {
      event?.preventDefault();
      const forgotPasswordController = this.forgotPassword;
      if (forgotPasswordController) {
        forgotPasswordController.set("accountEmailOrUsername", this.loginName);
      }
      this.send("showForgotPassword");
    },
    togglePasswordMask() {
      this.toggleProperty("maskPassword");
    },
    actions: {
      forgotPassword() {
        this.handleForgotPassword();
      },
      login() {
        if (this.loginDisabled) {
          return;
        }
        if ((0, _utils.isEmpty)(this.loginName) || (0, _utils.isEmpty)(this.loginPassword)) {
          this.flash(_I18n.default.t("login.blank_username_or_password"), "error");
          return;
        }
        this.set("loggingIn", true);
        (0, _ajax.ajax)("/session", {
          type: "POST",
          data: {
            login: this.loginName,
            password: this.loginPassword,
            second_factor_token: this.securityKeyCredential || this.secondFactorToken,
            second_factor_method: this.secondFactorMethod,
            timezone: moment.tz.guess()
          }
        }).then(result => {
          // Successful login
          if (result && result.error) {
            this.set("loggingIn", false);
            this.clearFlash();
            if ((result.security_key_enabled || result.totp_enabled) && !this.secondFactorRequired) {
              this.setProperties({
                otherMethodAllowed: result.multiple_second_factor_methods,
                secondFactorRequired: true,
                showLoginButtons: false,
                backupEnabled: result.backup_enabled,
                totpEnabled: result.totp_enabled,
                showSecondFactor: result.totp_enabled,
                showSecurityKey: result.security_key_enabled,
                secondFactorMethod: result.security_key_enabled ? _user.SECOND_FACTOR_METHODS.SECURITY_KEY : _user.SECOND_FACTOR_METHODS.TOTP,
                securityKeyChallenge: result.challenge,
                securityKeyAllowedCredentialIds: result.allowed_credential_ids
              });

              // only need to focus the 2FA input for TOTP
              if (!this.showSecurityKey) {
                (0, _runloop.schedule)("afterRender", () => document.getElementById("second-factor").querySelector("input").focus());
              }
              return;
            } else if (result.reason === "not_activated") {
              this.send("showNotActivated", {
                username: this.loginName,
                sentTo: (0, _sanitizer.escape)(result.sent_to_email),
                currentEmail: (0, _sanitizer.escape)(result.current_email)
              });
            } else if (result.reason === "suspended") {
              this.send("closeModal");
              this.dialog.alert(result.error);
            } else {
              this.flash(result.error, "error");
            }
          } else {
            this.set("loggedIn", true);
            // Trigger the browser's password manager using the hidden static login form:
            const hiddenLoginForm = document.getElementById("hidden-login-form");
            const applyHiddenFormInputValue = (value, key) => {
              if (!hiddenLoginForm) {
                return;
              }
              hiddenLoginForm.querySelector(`input[name=${key}]`).value = value;
            };
            const destinationUrl = (0, _cookie.default)("destination_url");
            const ssoDestinationUrl = (0, _cookie.default)("sso_destination_url");
            applyHiddenFormInputValue(this.loginName, "username");
            applyHiddenFormInputValue(this.loginPassword, "password");
            if (ssoDestinationUrl) {
              (0, _cookie.removeCookie)("sso_destination_url");
              window.location.assign(ssoDestinationUrl);
              return;
            } else if (destinationUrl) {
              // redirect client to the original URL
              (0, _cookie.removeCookie)("destination_url");
              applyHiddenFormInputValue(destinationUrl, "redirect");
            } else {
              applyHiddenFormInputValue(window.location.href, "redirect");
            }
            if (hiddenLoginForm) {
              if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && navigator.userAgent.match(/Safari/g)) {
                // In case of Safari on iOS do not submit hidden login form
                window.location.href = hiddenLoginForm.querySelector("input[name=redirect]").value;
              } else {
                hiddenLoginForm.submit();
              }
            }
            return;
          }
        }, e => {
          // Failed to login
          if (e.jqXHR && e.jqXHR.status === 429) {
            this.flash(_I18n.default.t("login.rate_limit"), "error");
          } else if (e.jqXHR && e.jqXHR.status === 503 && e.jqXHR.responseJSON.error_type === "read_only") {
            this.flash(_I18n.default.t("read_only_mode.login_disabled"), "error");
          } else if (!(0, _utilities.areCookiesEnabled)()) {
            this.flash(_I18n.default.t("login.cookies_error"), "error");
          } else {
            this.flash(_I18n.default.t("login.error"), "error");
          }
          this.set("loggingIn", false);
        });
        return false;
      },
      externalLogin(loginMethod) {
        let {
          signup = false
        } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (this.loginDisabled) {
          return;
        }
        this.set("loggingIn", true);
        loginMethod.doLogin({
          signup
        }).catch(() => this.set("loggingIn", false));
      },
      createAccount() {
        const createAccountController = this.createAccount;
        if (createAccountController) {
          createAccountController.resetForm();
          const loginName = this.loginName;
          if (loginName && loginName.indexOf("@") > 0) {
            createAccountController.set("accountEmail", loginName);
          } else {
            createAccountController.set("accountUsername", loginName);
          }
        }
        this.send("showCreateAccount");
      },
      authenticateSecurityKey() {
        (0, _webauthn.getWebauthnCredential)(this.securityKeyChallenge, this.securityKeyAllowedCredentialIds, credentialData => {
          this.set("securityKeyCredential", credentialData);
          this.send("login");
        }, errorMessage => {
          this.flash(errorMessage, "error");
        });
      }
    },
    authenticationComplete(options) {
      const loginError = (errorMsg, className, callback) => {
        (0, _showModal.default)("login");
        (0, _runloop.next)(() => {
          if (callback) {
            callback();
          }
          this.flash(errorMsg, className || "success");
        });
      };
      if (options.awaiting_approval && !this.canLoginLocal && !this.canLoginLocalWithEmail) {
        this.set("awaitingApproval", true);
      }
      if (options.omniauth_disallow_totp) {
        return loginError(_I18n.default.t("login.omniauth_disallow_totp"), "error", () => {
          this.setProperties({
            loginName: options.email,
            showLoginButtons: false
          });
          document.getElementById("login-account-password").focus();
        });
      }
      for (let i = 0; i < AuthErrors.length; i++) {
        const cond = AuthErrors[i];
        if (options[cond]) {
          return loginError(_I18n.default.t(`login.${cond}`));
        }
      }
      if (options.suspended) {
        return loginError(options.suspended_message, "error");
      }

      // Reload the page if we're authenticated
      if (options.authenticated) {
        const destinationUrl = (0, _cookie.default)("destination_url") || options.destination_url;
        if (destinationUrl) {
          // redirect client to the original URL
          (0, _cookie.removeCookie)("destination_url");
          window.location.href = destinationUrl;
        } else if (window.location.pathname === (0, _getUrl.default)("/login")) {
          window.location = (0, _getUrl.default)("/");
        } else {
          window.location.reload();
        }
        return;
      }
      const skipConfirmation = this.siteSettings.auth_skip_create_confirm;
      const createAccountController = this.createAccount;
      createAccountController.setProperties({
        accountEmail: options.email,
        accountUsername: options.username,
        accountName: options.name,
        authOptions: _object.default.create(options),
        skipConfirmation
      });
      (0, _runloop.next)(() => {
        (0, _showModal.default)("create-account", {
          modalClass: "create-account",
          titleAriaElementId: "create-account-title"
        });
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "credentialsClass", [_dec], Object.getOwnPropertyDescriptor(_obj, "credentialsClass"), _obj), _applyDecoratedDescriptor(_obj, "wavingHandURL", [_dec2], (_init = Object.getOwnPropertyDescriptor(_obj, "wavingHandURL"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "secondFactorClass", [_dec3], Object.getOwnPropertyDescriptor(_obj, "secondFactorClass"), _obj), _applyDecoratedDescriptor(_obj, "modalBodyClasses", [_dec4], Object.getOwnPropertyDescriptor(_obj, "modalBodyClasses"), _obj), _applyDecoratedDescriptor(_obj, "disableLoginFields", [_dec5], Object.getOwnPropertyDescriptor(_obj, "disableLoginFields"), _obj), _applyDecoratedDescriptor(_obj, "hasAtLeastOneLoginButton", [_dec6], Object.getOwnPropertyDescriptor(_obj, "hasAtLeastOneLoginButton"), _obj), _applyDecoratedDescriptor(_obj, "loginButtonLabel", [_dec7], Object.getOwnPropertyDescriptor(_obj, "loginButtonLabel"), _obj), _applyDecoratedDescriptor(_obj, "showSignupLink", [_dec8], Object.getOwnPropertyDescriptor(_obj, "showSignupLink"), _obj), _applyDecoratedDescriptor(_obj, "showLoginWithEmailLink", [_dec9], Object.getOwnPropertyDescriptor(_obj, "showLoginWithEmailLink"), _obj), _applyDecoratedDescriptor(_obj, "emailLogin", [_object.action], Object.getOwnPropertyDescriptor(_obj, "emailLogin"), _obj), _applyDecoratedDescriptor(_obj, "handleForgotPassword", [_object.action], Object.getOwnPropertyDescriptor(_obj, "handleForgotPassword"), _obj), _applyDecoratedDescriptor(_obj, "togglePasswordMask", [_object.action], Object.getOwnPropertyDescriptor(_obj, "togglePasswordMask"), _obj)), _obj)));
  _exports.default = _default;
});