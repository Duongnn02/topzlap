define("discourse/widgets/raw-html", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class RawHtml {
    constructor(attrs) {
      this.html = attrs.html;
    }
    init() {
      const $html = $(this.html);
      this.decorate($html);
      return $html[0];
    }
    decorate() {}
    update(prev) {
      if (prev.html === this.html) {
        return;
      }
      return this.init();
    }
    destroy() {}
  }
  _exports.default = RawHtml;
  RawHtml.prototype.type = "Widget";
});