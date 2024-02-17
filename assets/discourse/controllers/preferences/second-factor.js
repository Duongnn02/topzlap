define("discourse/controllers/preferences/second-factor", ["exports", "discourse/lib/url", "discourse/mixins/can-check-emails", "@ember/controller", "I18n", "discourse/models/user", "@ember/object", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/models/login-method", "discourse/lib/ajax-error", "discourse/lib/show-modal", "@ember/service", "discourse/components/dialog-messages/second-factor-confirm-phrase"], function (_exports, _url, _canCheckEmails, _controller, _I18n, _user, _object, _computed, _decorators, _loginMethod, _ajaxError, _showModal, _service, _secondFactorConfirmPhrase) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"discourse/mixins/can-check-emails",0,"@ember/controller",0,"I18n",0,"discourse/models/user",0,"@ember/object",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse/models/login-method",0,"discourse/lib/ajax-error",0,"discourse/lib/show-modal",0,"@ember/service",0,"discourse/components/dialog-messages/second-factor-confirm-phrase"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_canCheckEmails.default, (_dec = (0, _decorators.default)("currentUser"), (_obj = {
    dialog: (0, _service.inject)(),
    loading: false,
    dirty: false,
    resetPasswordLoading: false,
    resetPasswordProgress: "",
    password: null,
    errorMessage: null,
    newUsername: null,
    backupEnabled: (0, _computed.alias)("model.second_factor_backup_enabled"),
    secondFactorMethod: _user.SECOND_FACTOR_METHODS.TOTP,
    totps: null,
    loaded: false,
    init() {
      this._super(...arguments);
      this.set("totps", []);
    },
    displayOAuthWarning() {
      return (0, _loginMethod.findAll)().length > 0;
    },
    showEnforcedNotice(user) {
      return user && user.enforcedSecondFactor;
    },
    handleError(error) {
      if (error.jqXHR) {
        error = error.jqXHR;
      }
      let parsedJSON = error.responseJSON;
      if (parsedJSON.error_type === "invalid_access") {
        const usernameLower = this.model.username.toLowerCase();
        _url.default.redirectTo((0, _url.userPath)(`${usernameLower}/preferences/second-factor`));
      } else {
        (0, _ajaxError.popupAjaxError)(error);
      }
    },
    loadSecondFactors() {
      if (this.dirty === false) {
        return;
      }
      this.set("loading", true);
      this.model.loadSecondFactorCodes(this.password).then(response => {
        if (response.error) {
          this.set("errorMessage", response.error);
          return;
        }
        this.setProperties({
          errorMessage: null,
          loaded: true,
          totps: response.totps,
          security_keys: response.security_keys,
          password: null,
          dirty: false
        });
        this.set("model.second_factor_enabled", response.totps && response.totps.length > 0 || response.security_keys && response.security_keys.length > 0);
      }).catch(e => this.handleError(e)).finally(() => this.set("loading", false));
    },
    markDirty() {
      this.set("dirty", true);
    },
    resetPassword(event) {
      event?.preventDefault();
      this.setProperties({
        resetPasswordLoading: true,
        resetPasswordProgress: ""
      });
      return this.model.changePassword().then(() => {
        this.set("resetPasswordProgress", _I18n.default.t("user.change_password.success"));
      }).catch(_ajaxError.popupAjaxError).finally(() => this.set("resetPasswordLoading", false));
    },
    actions: {
      confirmPassword() {
        if (!this.password) {
          return;
        }
        this.markDirty();
        this.loadSecondFactors();
        this.set("password", null);
      },
      disableAllSecondFactors() {
        if (this.loading) {
          return;
        }
        this.dialog.deleteConfirm({
          title: _I18n.default.t("user.second_factor.disable_confirm"),
          bodyComponent: _secondFactorConfirmPhrase.default,
          bodyComponentModel: {
            totps: this.totps,
            security_keys: this.security_keys
          },
          confirmButtonLabel: "user.second_factor.disable",
          confirmButtonDisabled: true,
          confirmButtonIcon: "ban",
          cancelButtonClass: "btn-flat",
          didConfirm: () => {
            this.model.disableAllSecondFactors().then(() => {
              const usernameLower = this.model.username.toLowerCase();
              _url.default.redirectTo((0, _url.userPath)(`${usernameLower}/preferences`));
            }).catch(e => this.handleError(e)).finally(() => this.set("loading", false));
          }
        });
      },
      disableSingleSecondFactor(secondFactorMethod) {
        if (this.totps.concat(this.security_keys).length === 1) {
          this.send("disableAllSecondFactors");
          return;
        }
        this.dialog.deleteConfirm({
          title: _I18n.default.t("user.second_factor.delete_single_confirm_title"),
          message: _I18n.default.t("user.second_factor.delete_single_confirm_message", {
            name: secondFactorMethod.name
          }),
          confirmButtonLabel: "user.second_factor.delete",
          confirmButtonIcon: "ban",
          cancelButtonClass: "btn-flat",
          didConfirm: () => {
            if (this.totps.includes(secondFactorMethod)) {
              this.currentUser.updateSecondFactor(secondFactorMethod.id, secondFactorMethod.name, true, secondFactorMethod.method).then(response => {
                if (response.error) {
                  return;
                }
                this.markDirty();
                this.set("totps", this.totps.filter(totp => totp.id !== secondFactorMethod.id || totp.method !== secondFactorMethod.method));
              }).catch(e => this.handleError(e)).finally(() => {
                this.set("loading", false);
              });
            }
            if (this.security_keys.includes(secondFactorMethod)) {
              this.currentUser.updateSecurityKey(secondFactorMethod.id, secondFactorMethod.name, true).then(response => {
                if (response.error) {
                  return;
                }
                this.markDirty();
                this.set("security_keys", this.security_keys.filter(securityKey => securityKey.id !== secondFactorMethod.id));
              }).catch(e => this.handleError(e)).finally(() => {
                this.set("loading", false);
              });
            }
          }
        });
      },
      disableSecondFactorBackup() {
        this.dialog.deleteConfirm({
          title: _I18n.default.t("user.second_factor.delete_backup_codes_confirm_title"),
          message: _I18n.default.t("user.second_factor.delete_backup_codes_confirm_message"),
          confirmButtonLabel: "user.second_factor.delete",
          confirmButtonIcon: "ban",
          cancelButtonClass: "btn-flat",
          didConfirm: () => {
            this.set("backupCodes", []);
            this.set("loading", true);
            this.model.updateSecondFactor(0, "", true, _user.SECOND_FACTOR_METHODS.BACKUP_CODE).then(response => {
              if (response.error) {
                this.set("errorMessage", response.error);
                return;
              }
              this.set("errorMessage", null);
              this.model.set("second_factor_backup_enabled", false);
              this.markDirty();
              this.send("closeModal");
            }).catch(error => {
              this.send("closeModal");
              this.onError(error);
            }).finally(() => this.set("loading", false));
          }
        });
      },
      createTotp() {
        const controller = (0, _showModal.default)("second-factor-add-totp", {
          model: this.model,
          title: "user.second_factor.totp.add"
        });
        controller.setProperties({
          onClose: () => this.loadSecondFactors(),
          markDirty: () => this.markDirty(),
          onError: e => this.handleError(e)
        });
      },
      createSecurityKey() {
        const controller = (0, _showModal.default)("second-factor-add-security-key", {
          model: this.model,
          title: "user.second_factor.security_key.add"
        });
        controller.setProperties({
          onClose: () => this.loadSecondFactors(),
          markDirty: () => this.markDirty(),
          onError: e => this.handleError(e)
        });
      },
      editSecurityKey(security_key) {
        const controller = (0, _showModal.default)("second-factor-edit-security-key", {
          model: security_key,
          title: "user.second_factor.security_key.edit"
        });
        controller.setProperties({
          user: this.model,
          onClose: () => this.loadSecondFactors(),
          markDirty: () => this.markDirty(),
          onError: e => this.handleError(e)
        });
      },
      editSecondFactor(second_factor) {
        const controller = (0, _showModal.default)("second-factor-edit", {
          model: second_factor,
          title: "user.second_factor.edit_title"
        });
        controller.setProperties({
          user: this.model,
          onClose: () => this.loadSecondFactors(),
          markDirty: () => this.markDirty(),
          onError: e => this.handleError(e)
        });
      },
      editSecondFactorBackup() {
        const controller = (0, _showModal.default)("second-factor-backup-edit", {
          model: this.model,
          title: "user.second_factor_backup.title"
        });
        controller.setProperties({
          onClose: () => this.loadSecondFactors(),
          markDirty: () => this.markDirty(),
          onError: e => this.handleError(e)
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "displayOAuthWarning", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "displayOAuthWarning"), _obj), _applyDecoratedDescriptor(_obj, "showEnforcedNotice", [_dec], Object.getOwnPropertyDescriptor(_obj, "showEnforcedNotice"), _obj), _applyDecoratedDescriptor(_obj, "resetPassword", [_object.action], Object.getOwnPropertyDescriptor(_obj, "resetPassword"), _obj)), _obj)));
  _exports.default = _default;
});