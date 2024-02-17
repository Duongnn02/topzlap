define("discourse/lib/round", ["exports", "discourse/lib/decimal-adjust"], function (_exports, _decimalAdjust) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/decimal-adjust"eaimeta@70e063a35619d71f
  function _default(value, exp) {
    return (0, _decimalAdjust.default)("round", value, exp);
  }
});