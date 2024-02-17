define("discourse/controllers/explain-reviewable", ["exports", "@ember/controller", "discourse/mixins/modal-functionality"], function (_exports, _controller, _modalFunctionality) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality"eaimeta@70e063a35619d71f
  var _default = _controller.default.extend(_modalFunctionality.default, {
    loading: null,
    reviewableExplanation: null,
    onShow() {
      this.setProperties({
        loading: true,
        reviewableExplanation: null
      });
      this.store.find("reviewable-explanation", this.model.id).then(result => this.set("reviewableExplanation", result)).finally(() => this.set("loading", false));
    }
  });
  _exports.default = _default;
});