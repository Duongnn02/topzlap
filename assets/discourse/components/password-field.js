define("discourse/components/password-field", ["exports", "discourse/components/text-field"], function (_exports, _textField) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/text-field"eaimeta@70e063a35619d71f
  /**
    Same as text-field, but with special features for a password input.
    Be sure to test on a variety of browsers and operating systems when changing this logic.
  **/
  var _default = _textField.default.extend({
    canToggle: false,
    keyPress(e) {
      if (e.which >= 65 && e.which <= 90 && !e.shiftKey || e.which >= 97 && e.which <= 122 && e.shiftKey) {
        this.set("canToggle", true);
        this.set("capsLockOn", true);
      } else if (e.which >= 65 && e.which <= 90 && e.shiftKey || e.which >= 97 && e.which <= 122 && !e.shiftKey) {
        this.set("canToggle", true);
        this.set("capsLockOn", false);
      }
    },
    keyUp(e) {
      if (e.which === 20 && this.canToggle) {
        this.toggleProperty("capsLockOn");
      }
    },
    focusOut() {
      this.set("capsLockOn", false);
    },
    focusIn() {
      this.set("canToggle", false); // can't know the state of caps lock yet. keyPress will figure it out.
    }
  });
  _exports.default = _default;
});