define("discourse/initializers/webview-background", ["exports", "discourse/lib/utilities", "discourse-common/lib/later"], function (_exports, _utilities, _later) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/utilities",0,"discourse-common/lib/later"eaimeta@70e063a35619d71f
  // Send bg color to webview so iOS status bar matches site theme
  var _default = {
    name: "webview-background",
    after: "inject-objects",
    initialize(container) {
      const caps = container.lookup("service:capabilities");
      if (caps.isAppWebview) {
        window.matchMedia("(prefers-color-scheme: dark)").addListener(this.updateAppBackground);
        this.updateAppBackground();
      }
    },
    updateAppBackground() {
      (0, _later.default)(() => {
        const header = document.querySelector(".d-header-wrap .d-header");
        if (header) {
          const styles = window.getComputedStyle(header);
          (0, _utilities.postRNWebviewMessage)("headerBg", styles.backgroundColor);
        }
      }, 500);
    }
  };
  _exports.default = _default;
});