define("discourse/components/highlight-text", ["exports", "discourse-common/lib/deprecated", "discourse/components/highlight-search"], function (_exports, _deprecated, _highlightSearch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/deprecated",0,"discourse/components/highlight-search"eaimeta@70e063a35619d71f
  var _default = _highlightSearch.default.extend({
    init() {
      this._super(...arguments);
      (0, _deprecated.default)("`highlight-text` component is deprecated,  use the `highlight-search` instead.", {
        id: "discourse.highlight-text-component"
      });
    }
  });
  _exports.default = _default;
});