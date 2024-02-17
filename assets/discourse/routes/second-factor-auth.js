define("discourse/routes/second-factor-auth", ["exports", "discourse/routes/discourse", "discourse/lib/preload-store", "discourse/lib/ajax", "discourse/lib/ajax-error"], function (_exports, _discourse, _preloadStore, _ajax, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/lib/preload-store",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    queryParams: {
      nonce: {
        refreshModel: true
      }
    },
    model(params) {
      if (_preloadStore.default.data.has("2fa_challenge_data")) {
        return _preloadStore.default.getAndRemove("2fa_challenge_data");
      } else {
        return (0, _ajax.ajax)("/session/2fa.json", {
          type: "GET",
          data: {
            nonce: params.nonce
          }
        }).catch(errorResponse => {
          const error = (0, _ajaxError.extractError)(errorResponse);
          if (error) {
            return {
              error
            };
          } else {
            throw errorResponse;
          }
        });
      }
    },
    activate() {
      this.controllerFor("application").setProperties({
        sidebarDisabledRouteOverride: true
      });
    },
    deactivate() {
      this.controllerFor("application").setProperties({
        sidebarDisabledRouteOverride: false
      });
    },
    setupController(controller, model) {
      this._super(...arguments);
      controller.resetState();
      if (model.error) {
        controller.displayError(model.error);
        controller.set("loadError", true);
      }
    }
  });
  _exports.default = _default;
});