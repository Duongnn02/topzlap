define("discourse/lib/virtual-element-from-text-range", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = virtualElementFromTextRange;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class VirtualElementFromTextRange {
    constructor() {
      this.updateRect();
    }
    updateRect() {
      const selection = document.getSelection();
      this.range = selection && selection.rangeCount && selection.getRangeAt(0);
      if (!this.range) {
        return;
      }
      this.rect = this.range.getBoundingClientRect();
      return this.rect;
    }
    getBoundingClientRect() {
      return this.rect;
    }
    get clientWidth() {
      return this.rect.width;
    }
    get clientHeight() {
      return this.rect.height;
    }
  }
  function virtualElementFromTextRange() {
    return new VirtualElementFromTextRange();
  }
});