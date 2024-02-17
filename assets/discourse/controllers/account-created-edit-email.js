define("discourse/controllers/account-created-edit-email", ["exports", "@ember/controller", "discourse/lib/user-activation", "discourse-common/utils/decorators", "discourse/lib/ajax-error"], function (_exports, _controller, _userActivation, _decorators, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/lib/user-activation",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("newEmail", "accountCreated.email"), (_obj = {
    accountCreated: null,
    newEmail: null,
    submitDisabled(newEmail, currentEmail) {
      return newEmail === currentEmail;
    },
    actions: {
      changeEmail() {
        const email = this.newEmail;
        (0, _userActivation.changeEmail)({
          email
        }).then(() => {
          this.set("accountCreated.email", email);
          this.transitionToRoute("account-created.resent");
        }).catch(_ajaxError.popupAjaxError);
      },
      cancel() {
        this.transitionToRoute("account-created.index");
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "submitDisabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "submitDisabled"), _obj)), _obj)));
  _exports.default = _default;
});