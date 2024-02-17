define("@ember/-internals/routing/lib/system/cache", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  /**
    A two-tiered cache with support for fallback values when doing lookups.
    Uses "buckets" and then "keys" to cache values.
  
    @private
    @class BucketCache
  */
  class BucketCache {
    constructor() {
      this.cache = new Map();
    }
    has(bucketKey) {
      return this.cache.has(bucketKey);
    }
    stash(bucketKey, key, value) {
      var bucket = this.cache.get(bucketKey);
      if (bucket === undefined) {
        bucket = new Map();
        this.cache.set(bucketKey, bucket);
      }
      bucket.set(key, value);
    }
    lookup(bucketKey, prop, defaultValue) {
      if (!this.has(bucketKey)) {
        return defaultValue;
      }
      var bucket = this.cache.get(bucketKey);
      if (bucket.has(prop)) {
        return bucket.get(prop);
      } else {
        return defaultValue;
      }
    }
  }
  _exports.default = BucketCache;
});