define("discourse/controllers/not-activated", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "discourse/lib/user-activation"], function (_exports, _controller, _modalFunctionality, _userActivation) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"discourse/lib/user-activation"eaimeta@70e063a35619d71f
  var _default = _controller.default.extend(_modalFunctionality.default, {
    actions: {
      sendActivationEmail() {
        (0, _userActivation.resendActivationEmail)(this.username).then(() => {
          const modal = this.showModal("activation-resent", {
            title: "log_in"
          });
          modal.set("currentEmail", this.currentEmail);
        });
      },
      editActivationEmail() {
        const modal = this.showModal("activation-edit", {
          title: "login.change_email"
        });
        const currentEmail = this.currentEmail;
        modal.set("currentEmail", currentEmail);
        modal.set("newEmail", currentEmail);
      }
    }
  });
  _exports.default = _default;
});