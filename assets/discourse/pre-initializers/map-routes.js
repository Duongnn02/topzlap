define("discourse/pre-initializers/map-routes", ["exports", "discourse/mapping-router"], function (_exports, _mappingRouter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/mapping-router"eaimeta@70e063a35619d71f
  var _default = {
    name: "map-routes",
    after: "inject-discourse-objects",
    initialize(_, app) {
      this.routerClass = (0, _mappingRouter.mapRoutes)();
      app.register("router:main", this.routerClass);
    },
    teardown() {
      this.routerClass.dslCallbacks.length = 0;
    }
  };
  _exports.default = _default;
});