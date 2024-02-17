define("discourse/initializers/csrf-token", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  //  Append our CSRF token to AJAX requests when necessary.

  let installed = false;
  let callbacks = $.Callbacks();
  var _default = {
    name: "csrf-token",
    initialize(container) {
      // Add a CSRF token to all AJAX requests
      let session = container.lookup("service:session");
      session.set("csrfToken", document.head.querySelector("meta[name=csrf-token]")?.content);
      if (!installed) {
        $.ajaxPrefilter(callbacks.fire);
        installed = true;
      }
      callbacks.add(function (options, originalOptions, xhr) {
        if (!options.crossDomain) {
          xhr.setRequestHeader("X-CSRF-Token", session.get("csrfToken"));
        }
      });
    },
    teardown() {
      callbacks.empty();
    }
  };
  _exports.default = _default;
});