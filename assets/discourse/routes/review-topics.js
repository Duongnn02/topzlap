define("discourse/routes/review-topics", ["exports", "discourse/routes/discourse"], function (_exports, _discourse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    model() {
      return this.store.findAll("reviewable-topic");
    },
    setupController(controller, model) {
      controller.set("reviewableTopics", model);
    }
  });
  _exports.default = _default;
});