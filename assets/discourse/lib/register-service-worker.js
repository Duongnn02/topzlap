define("discourse/lib/register-service-worker", ["exports", "discourse-common/lib/get-url"], function (_exports, _getUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.registerServiceWorker = registerServiceWorker;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/get-url"eaimeta@70e063a35619d71f
  function registerServiceWorker(container, serviceWorkerURL) {
    let registerOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (window.isSecureContext && "serviceWorker" in navigator) {
      if (serviceWorkerURL) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          for (let registration of registrations) {
            if (registration.active && !registration.active.scriptURL.includes(serviceWorkerURL)) {
              unregister(registration);
            }
          }
        });
        navigator.serviceWorker.register((0, _getUrl.default)(`/${serviceWorkerURL}`), registerOptions).catch(error => {
          // eslint-disable-next-line no-console
          console.info(`Failed to register Service Worker: ${error}`);
        });
      } else {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          for (let registration of registrations) {
            unregister(registration);
          }
        });
      }
    }
  }
  function unregister(registration) {
    if ((0, _getUrl.isAbsoluteURL)(registration.scope)) {
      registration.unregister();
    }
  }
});