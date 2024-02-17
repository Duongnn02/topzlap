define("discourse/lib/sidebar/route-info-helper", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  var _getParameters = /*#__PURE__*/new WeakMap();
  class RouteInfoHelper {
    constructor(router, url) {
      /**
       * Extracted from https://github.com/emberjs/rfcs/issues/658
       * Retrieves all parameters for a `RouteInfo` object and its parents in
       * correct oder, so that you can pass them to e.g.
       * `transitionTo(routeName, ...params)`.
       */
      _classPrivateFieldInitSpec(this, _getParameters, {
        get: _get_getParameters,
        set: void 0
      });
      this.routeInfo = router.recognize(url);
    }
    get route() {
      return this.routeInfo.name;
    }
    get models() {
      return _classPrivateFieldGet(this, _getParameters);
    }
    get query() {
      return this.routeInfo.queryParams;
    }
  }
  _exports.default = RouteInfoHelper;
  function _get_getParameters() {
    let allParameters = [];
    let current = this.routeInfo;
    do {
      const {
        params,
        paramNames
      } = current;
      const currentParameters = paramNames.map(n => params[n]);
      allParameters = [...currentParameters, ...allParameters];
    } while (current = current.parent);
    return allParameters;
  }
});