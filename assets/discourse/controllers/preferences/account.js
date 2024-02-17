define("discourse/controllers/preferences/account", ["exports", "@ember/object/computed", "discourse/lib/computed", "discourse/mixins/can-check-emails", "@ember/controller", "@ember/object", "I18n", "discourse-common/utils/decorators", "discourse/models/login-method", "discourse/lib/url", "discourse-common/lib/get-url", "discourse/lib/ajax-error", "@ember/service", "@ember/runloop", "discourse/lib/show-modal", "discourse/lib/export-csv"], function (_exports, _computed, _computed2, _canCheckEmails, _controller, _object, _I18n, _decorators, _loginMethod, _url, _getUrl, _ajaxError, _service, _runloop, _showModal, _exportCsv) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"discourse/lib/computed",0,"discourse/mixins/can-check-emails",0,"@ember/controller",0,"@ember/object",0,"I18n",0,"discourse-common/utils/decorators",0,"discourse/models/login-method",0,"discourse/lib/url",0,"discourse-common/lib/get-url",0,"discourse/lib/ajax-error",0,"@ember/service",0,"@ember/runloop",0,"discourse/lib/show-modal",0,"discourse/lib/export-csv"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_canCheckEmails.default, (_dec = (0, _decorators.default)(), _dec2 = (0, _decorators.default)("model.filteredGroups"), _dec3 = (0, _decorators.default)("model.associated_accounts"), _dec4 = (0, _decorators.default)("model.associated_accounts.[]"), _dec5 = (0, _decorators.default)("model.email", "model.secondary_emails.[]", "model.unconfirmed_emails.[]"), _dec6 = (0, _decorators.default)("model.second_factor_enabled", "canCheckEmails", "model.is_anonymous"), (_obj = {
    dialog: (0, _service.inject)(),
    user: (0, _controller.inject)(),
    canDownloadPosts: (0, _computed.alias)("user.viewingSelf"),
    init() {
      this._super(...arguments);
      this.saveAttrNames = ["name", "title", "primary_group_id", "flair_group_id", "status"];
      this.set("revoking", {});
    },
    canEditName: (0, _computed2.setting)("enable_names"),
    canSelectUserStatus: (0, _computed2.setting)("enable_user_status"),
    canSaveUser: true,
    newNameInput: null,
    newTitleInput: null,
    newPrimaryGroupInput: null,
    newStatus: null,
    revoking: null,
    cannotDeleteAccount: (0, _computed.not)("currentUser.can_delete_account"),
    deleteDisabled: (0, _computed.or)("model.isSaving", "deleting", "cannotDeleteAccount"),
    reset() {
      this.set("passwordProgress", null);
    },
    nameInstructions() {
      return _I18n.default.t(this.siteSettings.full_name_required ? "user.name.instructions_required" : "user.name.instructions");
    },
    canSelectTitle: (0, _computed.gt)("model.availableTitles.length", 0),
    canSelectFlair: (0, _computed.gt)("model.availableFlairs.length", 0),
    canSelectPrimaryGroup(primaryGroupOptions) {
      return primaryGroupOptions.length > 0 && this.siteSettings.user_selected_primary_groups;
    },
    associatedAccountsLoaded(associatedAccounts) {
      return typeof associatedAccounts !== "undefined";
    },
    authProviders(accounts) {
      const allMethods = (0, _loginMethod.findAll)();
      const result = allMethods.map(method => {
        return {
          method,
          account: accounts.find(account => account.name === method.name) // Will be undefined if no account
        };
      });

      return result.filter(value => value.account || value.method.can_connect);
    },
    disableConnectButtons: (0, _computed2.propertyNotEqual)("model.id", "currentUser.id"),
    emails(primaryEmail, secondaryEmails, unconfirmedEmails) {
      const emails = [];
      if (primaryEmail) {
        emails.push(_object.default.create({
          email: primaryEmail,
          primary: true,
          confirmed: true
        }));
      }
      if (secondaryEmails) {
        secondaryEmails.forEach(email => {
          emails.push(_object.default.create({
            email,
            confirmed: true
          }));
        });
      }
      if (unconfirmedEmails) {
        unconfirmedEmails.forEach(email => {
          emails.push(_object.default.create({
            email
          }));
        });
      }
      return emails.sort((a, b) => a.email.localeCompare(b.email));
    },
    canUpdateAssociatedAccounts(secondFactorEnabled, canCheckEmails, isAnonymous) {
      if (secondFactorEnabled || !canCheckEmails || isAnonymous) {
        return false;
      }
      return (0, _loginMethod.findAll)().length > 0;
    },
    resendConfirmationEmail(email, event) {
      event?.preventDefault();
      email.set("resending", true);
      this.model.addEmail(email.email).then(() => {
        email.set("resent", true);
      }).finally(() => {
        email.set("resending", false);
      });
    },
    showUserStatusModal(status) {
      (0, _showModal.default)("user-status", {
        title: "user_status.set_custom_status",
        modalClass: "user-status",
        model: {
          status,
          hidePauseNotifications: true,
          saveAction: s => this.set("newStatus", s),
          deleteAction: () => this.set("newStatus", null)
        }
      });
    },
    actions: {
      save() {
        this.set("saved", false);
        this.model.setProperties({
          name: this.newNameInput,
          title: this.newTitleInput,
          primary_group_id: this.newPrimaryGroupInput,
          flair_group_id: this.newFlairGroupId,
          status: this.newStatus
        });
        return this.model.save(this.saveAttrNames).then(() => this.set("saved", true)).catch(_ajaxError.popupAjaxError);
      },
      setPrimaryEmail(email) {
        this.model.setPrimaryEmail(email).catch(_ajaxError.popupAjaxError);
      },
      destroyEmail(email) {
        this.model.destroyEmail(email);
      },
      delete() {
        this.dialog.alert({
          message: _I18n.default.t("user.delete_account_confirm"),
          buttons: [{
            icon: "exclamation-triangle",
            label: _I18n.default.t("user.delete_account"),
            class: "btn-danger",
            action: () => {
              return this.model.delete().then(() => {
                (0, _runloop.next)(() => {
                  this.dialog.alert({
                    message: _I18n.default.t("user.deleted_yourself"),
                    didConfirm: () => _url.default.redirectAbsolute((0, _getUrl.default)("/")),
                    didCancel: () => _url.default.redirectAbsolute((0, _getUrl.default)("/"))
                  });
                });
              }, () => {
                this.dialog.alert(_I18n.default.t("user.delete_yourself_not_allowed"));
                this.set("deleting", false);
              });
            }
          }, {
            label: _I18n.default.t("composer.cancel")
          }]
        });
      },
      revokeAccount(account) {
        this.set(`revoking.${account.name}`, true);
        this.model.revokeAssociatedAccount(account.name).then(result => {
          if (result.success) {
            this.model.associated_accounts.removeObject(account);
          } else {
            this.dialog.alert(result.message);
          }
        }).catch(_ajaxError.popupAjaxError).finally(() => this.set(`revoking.${account.name}`, false));
      },
      connectAccount(method) {
        method.doLogin({
          reconnect: true
        });
      },
      exportUserArchive() {
        this.dialog.yesNoConfirm({
          message: _I18n.default.t("user.download_archive.confirm"),
          didConfirm: () => (0, _exportCsv.exportUserArchive)()
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "nameInstructions", [_dec], Object.getOwnPropertyDescriptor(_obj, "nameInstructions"), _obj), _applyDecoratedDescriptor(_obj, "canSelectPrimaryGroup", [_dec2], Object.getOwnPropertyDescriptor(_obj, "canSelectPrimaryGroup"), _obj), _applyDecoratedDescriptor(_obj, "associatedAccountsLoaded", [_dec3], Object.getOwnPropertyDescriptor(_obj, "associatedAccountsLoaded"), _obj), _applyDecoratedDescriptor(_obj, "authProviders", [_dec4], Object.getOwnPropertyDescriptor(_obj, "authProviders"), _obj), _applyDecoratedDescriptor(_obj, "emails", [_dec5], Object.getOwnPropertyDescriptor(_obj, "emails"), _obj), _applyDecoratedDescriptor(_obj, "canUpdateAssociatedAccounts", [_dec6], Object.getOwnPropertyDescriptor(_obj, "canUpdateAssociatedAccounts"), _obj), _applyDecoratedDescriptor(_obj, "resendConfirmationEmail", [_object.action], Object.getOwnPropertyDescriptor(_obj, "resendConfirmationEmail"), _obj), _applyDecoratedDescriptor(_obj, "showUserStatusModal", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showUserStatusModal"), _obj)), _obj)));
  _exports.default = _default;
});