define("discourse/controllers/second-factor-backup-edit", ["exports", "@ember/controller", "I18n", "discourse/mixins/modal-functionality", "discourse/models/user", "@ember/object/computed", "discourse-common/lib/later"], function (_exports, _controller, _I18n, _modalFunctionality, _user, _computed, _later) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"discourse/mixins/modal-functionality",0,"discourse/models/user",0,"@ember/object/computed",0,"discourse-common/lib/later"eaimeta@70e063a35619d71f
  var _default = _controller.default.extend(_modalFunctionality.default, {
    loading: false,
    errorMessage: null,
    successMessage: null,
    backupEnabled: (0, _computed.alias)("model.second_factor_backup_enabled"),
    remainingCodes: (0, _computed.alias)("model.second_factor_remaining_backup_codes"),
    backupCodes: null,
    secondFactorMethod: _user.SECOND_FACTOR_METHODS.TOTP,
    onShow() {
      this.setProperties({
        loading: false,
        errorMessage: null,
        successMessage: null,
        backupCodes: null
      });
    },
    actions: {
      copyBackupCode(successful) {
        if (successful) {
          this.set("successMessage", _I18n.default.t("user.second_factor_backup.copied_to_clipboard"));
        } else {
          this.set("errorMessage", _I18n.default.t("user.second_factor_backup.copy_to_clipboard_error"));
        }
        this._hideCopyMessage();
      },
      generateSecondFactorCodes() {
        this.set("loading", true);
        this.model.generateSecondFactorCodes().then(response => {
          if (response.error) {
            this.set("errorMessage", response.error);
            return;
          }
          this.markDirty();
          this.setProperties({
            errorMessage: null,
            backupCodes: response.backup_codes,
            backupEnabled: true,
            remainingCodes: response.backup_codes.length
          });
        }).catch(error => {
          this.send("closeModal");
          this.onError(error);
        }).finally(() => {
          this.setProperties({
            loading: false
          });
        });
      }
    },
    _hideCopyMessage() {
      (0, _later.default)(() => this.setProperties({
        successMessage: null,
        errorMessage: null
      }), 2000);
    }
  });
  _exports.default = _default;
});