define("discourse/controllers/group-activity", ["exports", "@ember/controller", "@ember/service"], function (_exports, _controller, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service"eaimeta@70e063a35619d71f
  var _default = _controller.default.extend({
    router: (0, _service.inject)(),
    queryParams: ["category_id"]
  });
  _exports.default = _default;
});