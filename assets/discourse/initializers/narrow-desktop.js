define("discourse/initializers/narrow-desktop", ["exports", "discourse/lib/narrow-desktop"], function (_exports, _narrowDesktop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/narrow-desktop"eaimeta@70e063a35619d71f
  var _default = {
    name: "narrow-desktop",
    initialize(container) {
      _narrowDesktop.default.init();
      let site;
      if (!container.isDestroyed) {
        site = container.lookup("service:site");
        site.set("narrowDesktopView", _narrowDesktop.default.narrowDesktopView);
      }
      if ("ResizeObserver" in window) {
        this._resizeObserver = new ResizeObserver(entries => {
          if (container.isDestroyed) {
            return;
          }
          for (let entry of entries) {
            const oldNarrowDesktopView = site.narrowDesktopView;
            const newNarrowDesktopView = _narrowDesktop.default.isNarrowDesktopView(entry.contentRect.width);
            if (oldNarrowDesktopView !== newNarrowDesktopView) {
              const applicationController = container.lookup("controller:application");
              site.set("narrowDesktopView", newNarrowDesktopView);
              applicationController.set("showSidebar", applicationController.calculateShowSidebar());
              applicationController.appEvents.trigger("site-header:force-refresh");
            }
          }
        });
        const bodyElement = document.querySelector("body");
        if (bodyElement) {
          this._resizeObserver.observe(bodyElement);
        }
      }
    }
  };
  _exports.default = _default;
});