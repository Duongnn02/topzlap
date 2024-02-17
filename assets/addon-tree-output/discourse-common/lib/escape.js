define("discourse-common/lib/escape", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = escape;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  const ESCAPE_REPLACEMENTS = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };
  const BAD_CHARS = /[&<>"'`]/g;
  const POSSIBLE_CHARS = /[&<>"'`]/;
  function escapeChar(chr) {
    return ESCAPE_REPLACEMENTS[chr];
  }
  function escape(string) {
    if (string === null) {
      return "";
    } else if (!string) {
      return string + "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = "" + string;
    if (!POSSIBLE_CHARS.test(string)) {
      return string;
    }
    return string.replace(BAD_CHARS, escapeChar);
  }
});