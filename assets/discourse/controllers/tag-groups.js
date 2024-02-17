define("discourse/controllers/tag-groups", ["exports", "@ember/controller"], function (_exports, _controller) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller"eaimeta@70e063a35619d71f
  var _default = _controller.default.extend({
    actions: {
      newTagGroup() {
        this.transitionToRoute("tagGroups.new");
      }
    }
  });
  _exports.default = _default;
});