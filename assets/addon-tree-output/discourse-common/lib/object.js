define("discourse-common/lib/object", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.cloneJSON = cloneJSON;
  _exports.deepEqual = deepEqual;
  _exports.deepMerge = deepMerge;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function isObject(obj) {
    return obj && typeof obj === "object";
  }

  // a fairly simple deep merge based on: https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6
  // note: this approach might reference the original object. If you mutate an object once you've deep
  // cloned it, say in a test, it might remain modified. Consider `cloneJSON` instead.
  function deepMerge() {
    function deepMergeInner(target, source) {
      Object.keys(source).forEach(key => {
        const targetValue = target[key];
        const sourceValue = source[key];
        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
          target[key] = targetValue.concat(sourceValue);
        } else if (isObject(targetValue) && isObject(sourceValue)) {
          target[key] = deepMergeInner(Object.assign({}, targetValue), sourceValue);
        } else {
          target[key] = sourceValue;
        }
      });
      return target;
    }
    for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
      objects[_key] = arguments[_key];
    }
    if (objects.some(object => object && !isObject(object))) {
      throw new Error('deepMerge: all values should be of type "object"');
    }
    const target = objects.shift();
    let source;
    while (source = objects.shift()) {
      deepMergeInner(target, source || {});
    }
    return target;
  }
  function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
      return true;
    } else if (isObject(obj1) && isObject(obj2)) {
      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
      }
      for (let prop in obj1) {
        if (!deepEqual(obj1[prop], obj2[prop])) {
          return false;
        }
      }
      return true;
    }
  }
  function cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
});