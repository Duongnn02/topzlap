define("discourse-common/utils/is-descriptor", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = isDescriptor;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function isDescriptor(item) {
    return item && typeof item === "object" && "writable" in item && "enumerable" in item && "configurable" in item;
  }
});