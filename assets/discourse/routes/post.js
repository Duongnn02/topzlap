define("discourse/routes/post", ["exports", "discourse/routes/discourse", "@ember/service"], function (_exports, _discourse, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"@ember/service"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    router: (0, _service.inject)(),
    model(params) {
      return this.store.find("post", params.id);
    },
    afterModel(post) {
      this.router.transitionTo(post.url);
    }
  });
  _exports.default = _default;
});