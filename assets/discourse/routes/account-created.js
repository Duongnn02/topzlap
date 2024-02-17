define("discourse/routes/account-created", ["exports", "discourse/lib/preload-store", "@ember/routing/route"], function (_exports, _preloadStore, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/preload-store",0,"@ember/routing/route"eaimeta@70e063a35619d71f
  var _default = _route.default.extend({
    setupController(controller) {
      controller.set("accountCreated", _preloadStore.default.get("accountCreated"));
    }
  });
  _exports.default = _default;
});