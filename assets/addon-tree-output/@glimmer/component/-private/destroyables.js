define("@glimmer/component/-private/destroyables", ["exports", "ember"], function (_exports, _ember) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isDestroying = _exports.isDestroyed = void 0;
  const isDestroying = _ember.default._isDestroying;
  _exports.isDestroying = isDestroying;
  const isDestroyed = _ember.default._isDestroyed;
  _exports.isDestroyed = isDestroyed;
});