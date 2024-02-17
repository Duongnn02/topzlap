define("discourse/controllers/activation-edit", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "discourse/lib/user-activation", "discourse-common/utils/decorators", "discourse/lib/ajax-error"], function (_exports, _controller, _modalFunctionality, _userActivation, _decorators, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"discourse/lib/user-activation",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("newEmail", "currentEmail"), (_obj = {
    login: (0, _controller.inject)(),
    currentEmail: null,
    newEmail: null,
    password: null,
    submitDisabled(newEmail, currentEmail) {
      return newEmail === currentEmail;
    },
    actions: {
      changeEmail() {
        const login = this.login;
        (0, _userActivation.changeEmail)({
          username: login.get("loginName"),
          password: login.get("loginPassword"),
          email: this.newEmail
        }).then(() => {
          const modal = this.showModal("activation-resent", {
            title: "log_in"
          });
          modal.set("currentEmail", this.newEmail);
        }).catch((0, _ajaxError.flashAjaxError)(this));
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "submitDisabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "submitDisabled"), _obj)), _obj)));
  _exports.default = _default;
});