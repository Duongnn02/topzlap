define("discourse/initializers/auth-complete", ["exports", "@ember/runloop"], function (_exports, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop"eaimeta@70e063a35619d71f
  var _default = {
    name: "auth-complete",
    after: "inject-objects",
    initialize(container) {
      let lastAuthResult;
      if (document.getElementById("data-authentication")) {
        // Happens for full screen logins
        lastAuthResult = document.getElementById("data-authentication").dataset.authenticationData;
      }
      if (lastAuthResult) {
        const router = container.lookup("router:main");
        router.one("didTransition", () => {
          const controllerName = router.currentPath === "invites.show" ? "invites-show" : "login";
          (0, _runloop.next)(() => {
            let controller = container.lookup(`controller:${controllerName}`);
            controller.authenticationComplete(JSON.parse(lastAuthResult));
          });
        });
      }
    }
  };
  _exports.default = _default;
});