define("discourse/controllers/preferences/email", ["exports", "@ember/object/computed", "@ember/controller", "@ember/object", "I18n", "discourse-common/utils/decorators", "discourse/lib/utilities", "discourse/lib/computed"], function (_exports, _computed, _controller, _object, _I18n, _decorators, _utilities, _computed2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"@ember/controller",0,"@ember/object",0,"I18n",0,"discourse-common/utils/decorators",0,"discourse/lib/utilities",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("newEmail"), _dec2 = (0, _decorators.default)("saving", "new"), _dec3 = (0, _decorators.default)("newEmail"), _dec4 = (0, _decorators.default)("invalidEmail", "oldEmail", "newEmail"), (_obj = {
    queryParams: ["new"],
    taken: false,
    saving: false,
    error: false,
    success: false,
    oldEmail: null,
    newEmail: null,
    successMessage: null,
    newEmailEmpty: (0, _computed.empty)("newEmail"),
    saveDisabled: (0, _computed.or)("saving", "newEmailEmpty", "taken", "unchanged", "invalidEmail"),
    unchanged: (0, _computed2.propertyEqual)("newEmailLower", "oldEmail"),
    newEmailLower(newEmail) {
      return newEmail.toLowerCase().trim();
    },
    saveButtonText(saving, isNew) {
      if (saving) {
        return _I18n.default.t("saving");
      }
      if (isNew) {
        return _I18n.default.t("user.add_email.add");
      }
      return _I18n.default.t("user.change");
    },
    invalidEmail(newEmail) {
      return !(0, _utilities.emailValid)(newEmail);
    },
    emailValidation(invalidEmail, oldEmail, newEmail) {
      if (invalidEmail && (oldEmail || newEmail)) {
        return _object.default.create({
          failed: true,
          reason: _I18n.default.t("user.email.invalid")
        });
      }
    },
    reset() {
      this.setProperties({
        taken: false,
        saving: false,
        error: false,
        success: false,
        newEmail: null
      });
    },
    actions: {
      saveEmail() {
        this.set("saving", true);
        return (this.new ? this.model.addEmail(this.newEmail) : this.model.changeEmail(this.newEmail)).then(() => {
          this.set("success", true);
          if (this.model.staff) {
            this.set("successMessage", _I18n.default.t("user.change_email.success_staff"));
          } else {
            if (this.currentUser.admin) {
              this.set("successMessage", _I18n.default.t("user.change_email.success_via_admin"));
            } else {
              this.set("successMessage", _I18n.default.t("user.change_email.success"));
            }
          }
        }, e => {
          this.setProperties({
            error: true,
            saving: false
          });
          if (e.jqXHR.responseJSON && e.jqXHR.responseJSON.errors && e.jqXHR.responseJSON.errors[0]) {
            this.set("errorMessage", e.jqXHR.responseJSON.errors[0]);
          } else {
            this.set("errorMessage", _I18n.default.t("user.change_email.error"));
          }
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "newEmailLower", [_dec], Object.getOwnPropertyDescriptor(_obj, "newEmailLower"), _obj), _applyDecoratedDescriptor(_obj, "saveButtonText", [_dec2], Object.getOwnPropertyDescriptor(_obj, "saveButtonText"), _obj), _applyDecoratedDescriptor(_obj, "invalidEmail", [_dec3], Object.getOwnPropertyDescriptor(_obj, "invalidEmail"), _obj), _applyDecoratedDescriptor(_obj, "emailValidation", [_dec4], Object.getOwnPropertyDescriptor(_obj, "emailValidation"), _obj)), _obj)));
  _exports.default = _default;
});