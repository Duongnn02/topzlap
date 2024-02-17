define("discourse/controllers/navigation/categories", ["exports", "discourse/controllers/navigation/default", "@ember/controller"], function (_exports, _default2, _controller) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/controllers/navigation/default",0,"@ember/controller"eaimeta@70e063a35619d71f
  var _default = _default2.default.extend({
    discoveryCategories: (0, _controller.inject)("discovery/categories")
  });
  _exports.default = _default;
});