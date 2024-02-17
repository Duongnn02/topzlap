define("discourse-common/utils/escape-regexp", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = escapeRegExp;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }
});