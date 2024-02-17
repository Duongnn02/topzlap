define("discourse/lib/highlight-search", ["exports", "discourse/lib/constants", "discourse/lib/highlight-html", "@ember/utils"], function (_exports, _constants, _highlightHtml, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.CLASS_NAME = void 0;
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/constants",0,"discourse/lib/highlight-html",0,"@ember/utils"eaimeta@70e063a35619d71f
  const CLASS_NAME = "search-highlight";
  _exports.CLASS_NAME = CLASS_NAME;
  function _default(elem, term) {
    let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!(0, _utils.isEmpty)(term)) {
      // special case ignore "l" which is used for magic sorting
      let words = term.match(new RegExp(`${_constants.SEARCH_PHRASE_REGEXP}|[^\\s]+`, "g")).filter(t => t !== "l").map(w => w.replace(/^"(.*)"$/, "$1"));
      const highlightOpts = {};
      if (!opts.defaultClassName) {
        highlightOpts.className = CLASS_NAME;
      }
      (0, _highlightHtml.default)(elem, words, highlightOpts);
    }
  }
});