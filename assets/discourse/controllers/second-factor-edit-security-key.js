define("discourse/controllers/second-factor-edit-security-key", ["exports", "@ember/controller", "discourse/mixins/modal-functionality"], function (_exports, _controller, _modalFunctionality) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality"eaimeta@70e063a35619d71f
  var _default = _controller.default.extend(_modalFunctionality.default, {
    actions: {
      editSecurityKey() {
        this.user.updateSecurityKey(this.model.id, this.model.name, false).then(response => {
          if (response.error) {
            return;
          }
          this.markDirty();
        }).catch(error => {
          this.onError(error);
        }).finally(() => {
          this.set("loading", false);
          this.send("closeModal");
        });
      }
    }
  });
  _exports.default = _default;
});