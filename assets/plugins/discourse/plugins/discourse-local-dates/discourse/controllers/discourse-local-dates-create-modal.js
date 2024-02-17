define("discourse/plugins/discourse-local-dates/discourse/controllers/discourse-local-dates-create-modal", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "@ember/runloop"], function (_exports, _controller, _modalFunctionality, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"@ember/runloop"eaimeta@70e063a35619d71f
  var _default = _controller.default.extend(_modalFunctionality.default, {
    onShow() {
      (0, _runloop.schedule)("afterRender", () => {
        const fromButton = document.getElementById("from-date-time");
        fromButton && fromButton.focus();
      });
    },
    onClose() {
      (0, _runloop.schedule)("afterRender", () => {
        const localDatesBtn = document.querySelector(".d-editor-button-bar .local-dates.btn");
        localDatesBtn && localDatesBtn.focus();
      });
    }
  });
  _exports.default = _default;
});