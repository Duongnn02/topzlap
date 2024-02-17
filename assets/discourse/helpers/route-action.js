define("discourse/helpers/route-action", ["exports", "@ember/array", "@ember/component/helper", "@ember/object", "@ember/application", "@ember/runloop", "@ember/debug"], function (_exports, _array, _helper, _object, _application, _runloop, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.routeAction = routeAction;
  0; //eaimeta@70e063a35619d71f0,"@ember/array",0,"@ember/component/helper",0,"@ember/object",0,"@ember/application",0,"@ember/runloop",0,"@ember/debug"eaimeta@70e063a35619d71f
  function getCurrentRouteInfos(router) {
    let routerLib = router._routerMicrolib || router.router;
    return routerLib.currentRouteInfos;
  }
  function getRoutes(router) {
    return (0, _array.A)(getCurrentRouteInfos(router)).mapBy("_route").reverse();
  }
  function getRouteWithAction(router, actionName) {
    let action;
    let handler = (0, _array.A)(getRoutes(router)).find(route => {
      let actions = route.actions || route._actions;
      action = actions[actionName];
      return typeof action === "function";
    });
    return {
      action,
      handler
    };
  }
  function routeAction(actionName, router) {
    for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      params[_key - 2] = arguments[_key];
    }
    (false && !(router) && (0, _debug.assert)("[ember-route-action-helper] Unable to lookup router", router));
    (0, _debug.runInDebug)(() => {
      let {
        handler
      } = getRouteWithAction(router, actionName);
      (false && !(handler) && (0, _debug.assert)(`[ember-route-action-helper] Unable to find action ${actionName}`, handler));
    });
    return function () {
      let {
        action,
        handler
      } = getRouteWithAction(router, actionName);
      for (var _len2 = arguments.length, invocationArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        invocationArgs[_key2] = arguments[_key2];
      }
      let args = params.concat(invocationArgs);
      return (0, _runloop.join)(handler, action, ...args);
    };
  }
  var _default = _helper.default.extend({
    router: (0, _object.computed)({
      get() {
        return (0, _application.getOwner)(this).lookup("router:main");
      }
    }),
    compute(_ref) {
      let [actionName, ...params] = _ref;
      return routeAction(actionName, (0, _object.get)(this, "router"), ...params);
    }
  });
  _exports.default = _default;
});