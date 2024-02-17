define("discourse/routes/invites-show", ["exports", "discourse/routes/discourse", "I18n", "discourse/lib/preload-store", "discourse-common/lib/object"], function (_exports, _discourse, _I18n, _preloadStore, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n",0,"discourse/lib/preload-store",0,"discourse-common/lib/object"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    titleToken() {
      return _I18n.default.t("invites.accept_title");
    },
    model(params) {
      if (_preloadStore.default.get("invite_info")) {
        return _preloadStore.default.getAndRemove("invite_info").then(json => (0, _object.deepMerge)(params, json));
      } else {
        return {};
      }
    },
    setupController(controller, model) {
      this._super(...arguments);
      if (model.user_fields) {
        controller.userFields.forEach(userField => {
          if (model.user_fields[userField.field.id]) {
            userField.value = model.user_fields[userField.field.id];
          }
        });
      }
    }
  });
  _exports.default = _default;
});