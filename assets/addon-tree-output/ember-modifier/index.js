define("ember-modifier/index", ["exports", "ember-modifier/-private/class/modifier", "ember-modifier/-private/function-based/modifier"], function (_exports, _modifier, _modifier2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _modifier.default;
    }
  });
  Object.defineProperty(_exports, "modifier", {
    enumerable: true,
    get: function () {
      return _modifier2.default;
    }
  });
});