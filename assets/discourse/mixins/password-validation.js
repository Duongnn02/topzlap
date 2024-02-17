define("discourse/mixins/password-validation", ["exports", "@ember/object", "I18n", "@ember/object/mixin", "discourse-common/utils/decorators", "@ember/utils"], function (_exports, _object, _I18n, _mixin, _decorators, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"I18n",0,"@ember/object/mixin",0,"discourse-common/utils/decorators",0,"@ember/utils"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _mixin.default.create((_dec = (0, _decorators.default)("passwordMinLength"), _dec2 = (0, _decorators.default)("isDeveloper", "admin"), _dec3 = (0, _decorators.default)("accountPassword", "passwordRequired", "rejectedPasswords.[]", "accountUsername", "accountEmail", "passwordMinLength", "forceValidationReason"), (_obj = {
    rejectedPasswords: null,
    init() {
      this._super(...arguments);
      this.set("rejectedPasswords", []);
      this.set("rejectedPasswordsMessages", new Map());
    },
    passwordInstructions() {
      return _I18n.default.t("user.password.instructions", {
        count: this.passwordMinLength
      });
    },
    passwordMinLength(isDeveloper, admin) {
      return isDeveloper || admin ? this.siteSettings.min_admin_password_length : this.siteSettings.min_password_length;
    },
    passwordValidation(password, passwordRequired, rejectedPasswords, accountUsername, accountEmail, passwordMinLength, forceValidationReason) {
      const failedAttrs = {
        failed: true,
        ok: false,
        element: document.querySelector("#new-account-password")
      };
      if (!passwordRequired) {
        return _object.default.create({
          ok: true
        });
      }
      if (rejectedPasswords.includes(password)) {
        return _object.default.create(Object.assign(failedAttrs, {
          reason: this.rejectedPasswordsMessages.get(password) || _I18n.default.t("user.password.common")
        }));
      }

      // If blank, fail without a reason
      if ((0, _utils.isEmpty)(password)) {
        return _object.default.create(Object.assign(failedAttrs, {
          message: _I18n.default.t("user.password.required"),
          reason: forceValidationReason ? _I18n.default.t("user.password.required") : null
        }));
      }

      // If too short
      if (password.length < passwordMinLength) {
        return _object.default.create(Object.assign(failedAttrs, {
          reason: _I18n.default.t("user.password.too_short")
        }));
      }
      if (!(0, _utils.isEmpty)(accountUsername) && password === accountUsername) {
        return _object.default.create(Object.assign(failedAttrs, {
          reason: _I18n.default.t("user.password.same_as_username")
        }));
      }
      if (!(0, _utils.isEmpty)(accountEmail) && password === accountEmail) {
        return _object.default.create(Object.assign(failedAttrs, {
          reason: _I18n.default.t("user.password.same_as_email")
        }));
      }

      // Looks good!
      return _object.default.create({
        ok: true,
        reason: _I18n.default.t("user.password.ok")
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "passwordInstructions", [_dec], Object.getOwnPropertyDescriptor(_obj, "passwordInstructions"), _obj), _applyDecoratedDescriptor(_obj, "passwordMinLength", [_dec2], Object.getOwnPropertyDescriptor(_obj, "passwordMinLength"), _obj), _applyDecoratedDescriptor(_obj, "passwordValidation", [_dec3], Object.getOwnPropertyDescriptor(_obj, "passwordValidation"), _obj)), _obj)));
  _exports.default = _default;
});