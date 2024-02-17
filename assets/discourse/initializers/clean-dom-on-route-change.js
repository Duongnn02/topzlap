define("discourse/initializers/clean-dom-on-route-change", ["exports", "@ember/runloop"], function (_exports, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _clean(transition) {
    if (window.MiniProfiler && transition.from) {
      window.MiniProfiler.pageTransition();
    }

    // Close some elements that may be open
    document.querySelectorAll("header ul.icons li").forEach(element => {
      element.classList.remove("active");
    });
    document.querySelectorAll(`[data-toggle="dropdown"]`).forEach(element => {
      element.parentElement.classList.remove("open");
    });

    // Close the lightbox
    if ($.magnificPopup?.instance) {
      $.magnificPopup.instance.close();
      document.body.classList.remove("mfp-zoom-out-cur");
    }

    // Remove any link focus
    const {
      activeElement
    } = document;
    if (activeElement && !activeElement.classList.contains("no-blur")) {
      activeElement.blur();
    }
    this.lookup("route:application").send("closeModal");
    this.lookup("service:app-events").trigger("dom:clean");
    this.lookup("service:document-title").updateContextCount(0);
  }
  var _default = {
    name: "clean-dom-on-route-change",
    after: "inject-objects",
    initialize(container) {
      const router = container.lookup("router:main");
      router.on("routeDidChange", transition => {
        if (transition.isAborted) {
          return;
        }
        (0, _runloop.scheduleOnce)("afterRender", container, _clean, transition);
      });
    }
  };
  _exports.default = _default;
});