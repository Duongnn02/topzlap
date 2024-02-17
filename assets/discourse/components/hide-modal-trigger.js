define("discourse/components/hide-modal-trigger", ["exports", "@ember/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component"eaimeta@70e063a35619d71f
  var _default = _component.default.extend({
    didInsertElement() {
      this._super(...arguments);
      $(".d-modal.fixed-modal").modal("hide").addClass("hidden");
    }
  });
  _exports.default = _default;
});