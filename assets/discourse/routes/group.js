define("discourse/routes/group", ["exports", "discourse/routes/discourse"], function (_exports, _discourse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    titleToken() {
      return [this.modelFor("group").get("name")];
    },
    model(params) {
      return this.store.find("group", params.name);
    },
    serialize(model) {
      return {
        name: model.get("name").toLowerCase()
      };
    },
    setupController(controller, model) {
      controller.set("model", model);
    }
  });
  _exports.default = _default;
});