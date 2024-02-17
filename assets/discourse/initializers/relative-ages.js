define("discourse/initializers/relative-ages", ["exports", "discourse/lib/formatter"], function (_exports, _formatter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/formatter"eaimeta@70e063a35619d71f
  // Updates the relative ages of dates on the screen.
  var _default = {
    name: "relative-ages",
    initialize() {
      this._interval = setInterval(function () {
        (0, _formatter.updateRelativeAge)(document.querySelectorAll(".relative-date"));
      }, 60 * 1000);
    },
    teardown() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }
  };
  _exports.default = _default;
});