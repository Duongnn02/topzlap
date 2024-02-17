define("@ember/-internals/routing/lib/system/router_state", ["exports", "@ember/polyfills", "@ember/-internals/routing/lib/utils"], function (_exports, _polyfills, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  class RouterState {
    constructor(emberRouter, router, routerJsState) {
      this.emberRouter = emberRouter;
      this.router = router;
      this.routerJsState = routerJsState;
    }
    isActiveIntent(routeName, models, queryParams) {
      var state = this.routerJsState;
      if (!this.router.isActiveIntent(routeName, models, undefined, state)) {
        return false;
      }
      if (queryParams !== undefined && Object.keys(queryParams).length > 0) {
        var visibleQueryParams = (0, _polyfills.assign)({}, queryParams);
        this.emberRouter._prepareQueryParams(routeName, models, visibleQueryParams);
        return (0, _utils.shallowEqual)(visibleQueryParams, state.queryParams);
      }
      return true;
    }
  }
  _exports.default = RouterState;
});