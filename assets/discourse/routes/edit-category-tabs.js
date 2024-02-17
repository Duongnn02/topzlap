define("discourse/routes/edit-category-tabs", ["exports", "discourse/routes/discourse"], function (_exports, _discourse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    model() {
      return this.modelFor("editCategory");
    },
    setupController(controller, model, transition) {
      this._super(...arguments);
      const parentParams = this.paramsFor("editCategory");
      controller.setProperties({
        parentParams,
        selectedTab: transition.to.params.tab,
        showTooltip: false
      });
    }
  });
  _exports.default = _default;
});