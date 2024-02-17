define("discourse/initializers/keyboard-shortcuts", ["exports", "discourse/lib/keyboard-shortcuts", "@discourse/itsatrap"], function (_exports, _keyboardShortcuts, _itsatrap) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/keyboard-shortcuts",0,"@discourse/itsatrap"eaimeta@70e063a35619d71f
  var _default = {
    name: "keyboard-shortcuts",
    initialize(container) {
      _keyboardShortcuts.default.init(_itsatrap.default, container);
      _keyboardShortcuts.default.bindEvents();
    },
    teardown() {
      _keyboardShortcuts.default.teardown();
    }
  };
  _exports.default = _default;
});