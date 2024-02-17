define("discourse/initializers/register-service-worker", ["exports", "discourse/lib/register-service-worker"], function (_exports, _registerServiceWorker) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/register-service-worker"eaimeta@70e063a35619d71f
  var _default = {
    name: "register-service-worker",
    initialize(container) {
      let {
        serviceWorkerURL
      } = container.lookup("service:session");
      (0, _registerServiceWorker.registerServiceWorker)(container, serviceWorkerURL);
    }
  };
  _exports.default = _default;
});