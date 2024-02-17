define("discourse/initializers/show-footer", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    name: "show-footer",
    initialize(container) {
      const router = container.lookup("router:main");
      const application = container.lookup("controller:application");

      // only take care of hiding the footer here
      // controllers MUST take care of displaying it
      router.on("routeWillChange", () => {
        application.set("showFooter", false);
        return true;
      });
    }
  };
  _exports.default = _default;
});