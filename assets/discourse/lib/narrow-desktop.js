define("discourse/lib/narrow-desktop", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  let narrowDesktopForced = false;
  const NarrowDesktop = {
    narrowDesktopView: false,
    init() {
      this.narrowDesktopView = narrowDesktopForced || this.isNarrowDesktopView(document.body.getBoundingClientRect().width);
    },
    isNarrowDesktopView(width) {
      return width < 768;
    }
  };
  var _default = NarrowDesktop;
  _exports.default = _default;
});