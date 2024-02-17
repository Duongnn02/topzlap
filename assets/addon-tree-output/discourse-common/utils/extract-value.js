define("discourse-common/utils/extract-value", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = extractValue;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function extractValue(desc) {
    return desc.value || typeof desc.initializer === "function" && desc.initializer();
  }
});