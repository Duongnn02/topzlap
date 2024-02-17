define("discourse/initializers/d-popover", ["exports", "discourse/lib/d-popover"], function (_exports, _dPopover) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/d-popover"eaimeta@70e063a35619d71f
  var _default = {
    name: "d-popover",
    initialize() {
      ["click", "mouseover"].forEach(eventType => {
        document.addEventListener(eventType, e => {
          if (e.target.dataset.tooltip || e.target.dataset.popover) {
            (0, _dPopover.showPopover)(e, {
              interactive: false,
              content: reference => reference.dataset.tooltip || reference.dataset.popover
            });
          }
        });
      });
    }
  };
  _exports.default = _default;
});