define("discourse/mixins/name-validation", ["exports", "@ember/object", "I18n", "@ember/object/mixin", "discourse-common/utils/decorators", "@ember/utils"], function (_exports, _object, _I18n, _mixin, _decorators, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"I18n",0,"@ember/object/mixin",0,"discourse-common/utils/decorators",0,"@ember/utils"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _mixin.default.create((_dec = (0, _decorators.default)(), _dec2 = (0, _decorators.default)("accountName", "forceValidationReason"), (_obj = {
    nameInstructions() {
      return _I18n.default.t(this.siteSettings.full_name_required ? "user.name.instructions_required" : "user.name.instructions");
    },
    nameValidation(accountName, forceValidationReason) {
      if (this.siteSettings.full_name_required && (0, _utils.isEmpty)(accountName)) {
        return _object.default.create({
          failed: true,
          ok: false,
          message: _I18n.default.t("user.name.required"),
          reason: forceValidationReason ? _I18n.default.t("user.name.required") : null,
          element: document.querySelector("#new-account-name")
        });
      }
      return _object.default.create({
        ok: true
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "nameInstructions", [_dec], Object.getOwnPropertyDescriptor(_obj, "nameInstructions"), _obj), _applyDecoratedDescriptor(_obj, "nameValidation", [_dec2], Object.getOwnPropertyDescriptor(_obj, "nameValidation"), _obj)), _obj)));
  _exports.default = _default;
});