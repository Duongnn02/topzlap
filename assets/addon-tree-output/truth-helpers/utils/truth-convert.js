define("truth-helpers/utils/truth-convert", ["exports", "@ember/array", "@ember/object"], function (_exports, _array, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = truthConvert;
  0; //eaimeta@70e063a35619d71f0,"@ember/array",0,"@ember/object"eaimeta@70e063a35619d71f
  function truthConvert(result) {
    const truthy = result && (0, _object.get)(result, "isTruthy");
    if (typeof truthy === "boolean") {
      return truthy;
    }
    if ((0, _array.isArray)(result)) {
      return (0, _object.get)(result, "length") !== 0;
    } else {
      return !!result;
    }
  }
});