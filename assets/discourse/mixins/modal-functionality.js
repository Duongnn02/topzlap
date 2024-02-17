define("discourse/mixins/modal-functionality", ["exports", "@ember/object/mixin", "discourse/lib/show-modal"], function (_exports, _mixin, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/mixin",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  var _default = _mixin.default.create({
    flash(text, messageClass) {
      this.appEvents.trigger("modal-body:flash", {
        text,
        messageClass
      });
    },
    clearFlash() {
      this.appEvents.trigger("modal-body:clearFlash");
    },
    showModal() {
      return (0, _showModal.default)(...arguments);
    },
    actions: {
      closeModal() {
        this.modal.send("closeModal");
        this.set("panels", []);
      }
    }
  });
  _exports.default = _default;
});