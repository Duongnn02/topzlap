define("discourse/mixins/user-fields-validation", ["exports", "discourse-common/utils/decorators", "@ember/object", "I18n", "@ember/object/mixin", "@ember/utils"], function (_exports, _decorators, _object, _I18n, _mixin, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"@ember/object",0,"I18n",0,"@ember/object/mixin",0,"@ember/utils"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _mixin.default.create((_dec = (0, _decorators.on)("init"), _dec2 = (0, _decorators.default)("userFields.@each.value"), (_obj = {
    _createUserFields() {
      if (!this.site) {
        return;
      }
      let userFields = this.site.get("user_fields");
      if (userFields) {
        userFields = userFields.sortBy("position").map(f => _object.default.create({
          value: null,
          field: f
        }));
      }
      this.set("userFields", userFields);
    },
    userFieldsValidation() {
      if (!this.userFields) {
        return _object.default.create({
          ok: true
        });
      }
      this.userFields.forEach(userField => {
        let validation = _object.default.create({
          ok: true
        });
        if (userField.field.required && (!userField.value || (0, _utils.isEmpty)(userField.value))) {
          validation = _object.default.create({
            failed: true,
            reason: _I18n.default.t("user_fields.required", {
              name: userField.field.name
            }),
            element: userField.field.element
          });
        } else if (this.accountPassword && userField.field.field_type === "text" && userField.value && userField.value.toLowerCase().includes(this.accountPassword.toLowerCase())) {
          validation = _object.default.create({
            failed: true,
            reason: _I18n.default.t("user_fields.same_as_password"),
            element: userField.field.element
          });
        }
        userField.set("validation", validation);
      });
      const invalidUserField = this.userFields.find(f => f.validation.failed);
      if (invalidUserField) {
        return invalidUserField.validation;
      }
      return _object.default.create({
        ok: true
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "_createUserFields", [_dec], Object.getOwnPropertyDescriptor(_obj, "_createUserFields"), _obj), _applyDecoratedDescriptor(_obj, "userFieldsValidation", [_dec2], Object.getOwnPropertyDescriptor(_obj, "userFieldsValidation"), _obj)), _obj)));
  _exports.default = _default;
});