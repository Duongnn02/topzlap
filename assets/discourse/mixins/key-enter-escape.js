define("discourse/mixins/key-enter-escape", ["exports", "discourse/lib/utilities"], function (_exports, _utilities) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  // A mixin where hitting ESC calls `cancelled` and ctrl+enter calls `save.
  var _default = {
    keyDown(e) {
      if (document.body.classList.contains("modal-open")) {
        return;
      }
      if (e.which === 27) {
        this.cancelled();
        return false;
      } else if (e.which === 13 && (e.ctrlKey || e.metaKey || (0, _utilities.isiPad)() && e.altKey)) {
        // CTRL+ENTER or CMD+ENTER
        //
        // iPad physical keyboard does not offer Command or Control detection
        // so use ALT-ENTER
        this.save(undefined, e);
        return false;
      }
    }
  };
  _exports.default = _default;
});