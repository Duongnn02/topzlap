define("@glimmer/tracking/primitives/cache", ["exports", "@ember/-internals/metal"], function (_exports, _metal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "createCache", {
    enumerable: true,
    get: function () {
      return _metal.createCache;
    }
  });
  Object.defineProperty(_exports, "getValue", {
    enumerable: true,
    get: function () {
      return _metal.getValue;
    }
  });
  Object.defineProperty(_exports, "isConst", {
    enumerable: true,
    get: function () {
      return _metal.isConst;
    }
  });
});