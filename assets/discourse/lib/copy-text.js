define("discourse/lib/copy-text", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  /**
   * Copy text to the clipboard. Must be called from within a user gesture (Chrome).
   */
  function _default(text, element) {
    let supported = false;
    try {
      // Chrome: This only returns true within a user gesture.
      // Chrome: queryCommandEnabled() only returns true if a selection is
      //   present, so we use queryCommandSupported() instead for the fail-fast.
      if (document.queryCommandSupported("copy")) {
        supported = true;
      }
    } catch (e) {
      // Ignore
    }
    if (!supported) {
      return;
    }
    let newRange = document.createRange();
    newRange.selectNode(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(newRange);
    try {
      if (document.execCommand("copy")) {
        return true;
      }
    } catch (e) {
      // Ignore
    }
    return false;
  }
});