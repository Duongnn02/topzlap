define("discourse/initializers/sniff-capabilities", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    name: "sniff-capabilities",
    after: "export-application-global",
    initialize(container) {
      const caps = container.lookup("service:capabilities");
      const html = document.documentElement;
      if (caps.touch) {
        html.classList.add("touch", "discourse-touch");
      } else {
        html.classList.add("no-touch", "discourse-no-touch");
      }
    }
  };
  _exports.default = _default;
});