define("pretty-text/oneboxer-cache", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.localCache = _exports.failedCache = void 0;
  _exports.lookupCache = lookupCache;
  _exports.normalize = normalize;
  _exports.resetFailedCache = resetFailedCache;
  _exports.resetLocalCache = resetLocalCache;
  _exports.setFailedCache = setFailedCache;
  _exports.setLocalCache = setLocalCache;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  let localCache = {};
  _exports.localCache = localCache;
  let failedCache = {};

  // Sometimes jQuery will return URLs with trailing slashes when the
  // `href` didn't have them.
  _exports.failedCache = failedCache;
  function resetLocalCache() {
    _exports.localCache = localCache = {};
  }
  function resetFailedCache() {
    _exports.failedCache = failedCache = {};
  }
  function setLocalCache(key, value) {
    localCache[key] = value;
  }
  function setFailedCache(key, value) {
    failedCache[key] = value;
  }
  function normalize(url) {
    return url.replace(/\/$/, "");
  }
  function lookupCache(url) {
    return localCache[normalize(url)]?.outerHTML;
  }
});