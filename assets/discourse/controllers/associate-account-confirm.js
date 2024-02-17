define("discourse/controllers/associate-account-confirm", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "discourse/lib/ajax", "discourse/lib/ajax-error"], function (_exports, _controller, _modalFunctionality, _ajax, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  var _default = _controller.default.extend(_modalFunctionality.default, {
    actions: {
      finishConnect() {
        (0, _ajax.ajax)({
          url: `/associate/${encodeURIComponent(this.model.token)}`,
          type: "POST"
        }).then(result => {
          if (result.success) {
            this.transitionToRoute("preferences.account", this.currentUser.findDetails());
            this.send("closeModal");
          } else {
            this.set("model.error", result.error);
          }
        }).catch(_ajaxError.popupAjaxError);
      }
    }
  });
  _exports.default = _default;
});