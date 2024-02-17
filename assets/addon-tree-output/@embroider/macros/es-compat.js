define("@embroider/macros/es-compat", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = esCompat;
  function esCompat(m) {
    return m?.__esModule ? m : {
      default: m
    };
  }
});