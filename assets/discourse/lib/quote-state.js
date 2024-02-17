define("discourse/lib/quote-state", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class QuoteState {
    constructor() {
      this.clear();
    }
    selected(postId, buffer, opts) {
      this.postId = postId;
      this.buffer = buffer;
      this.opts = opts;
    }
    clear() {
      this.buffer = "";
      this.postId = null;
      this.opts = null;
    }
  }
  _exports.default = QuoteState;
});