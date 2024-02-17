define("discourse/initializers/click-interceptor", ["exports", "discourse/lib/url", "discourse/lib/intercept-click"], function (_exports, _url, _interceptClick) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"discourse/lib/intercept-click"eaimeta@70e063a35619d71f
  var _default = {
    name: "click-interceptor",
    initialize(container, app) {
      this.selector = app.rootElement;
      $(this.selector).on("click.discourse", "a", _interceptClick.default);
      window.addEventListener("hashchange", this.hashChanged);
    },
    hashChanged() {
      _url.default.routeTo(document.location.hash);
    },
    teardown() {
      $(this.selector).off("click.discourse", "a", _interceptClick.default);
      window.removeEventListener("hashchange", this.hashChanged);
    }
  };
  _exports.default = _default;
});