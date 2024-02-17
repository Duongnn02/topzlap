define("discourse/routes/preferences-second-factor", ["exports", "discourse/routes/restricted-user", "@ember/object"], function (_exports, _restrictedUser, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/restricted-user",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _restrictedUser.default.extend((_obj = {
    showFooter: true,
    model() {
      return this.modelFor("user");
    },
    renderTemplate() {
      return this.render({
        into: "user"
      });
    },
    setupController(controller, model) {
      controller.setProperties({
        model,
        newUsername: model.get("username")
      });
      controller.set("loading", true);
      model.loadSecondFactorCodes("").then(response => {
        if (response.error) {
          controller.set("errorMessage", response.error);
        } else {
          controller.setProperties({
            errorMessage: null,
            loaded: !response.password_required,
            dirty: !!response.password_required,
            totps: response.totps,
            security_keys: response.security_keys
          });
        }
      }).catch(controller.popupAjaxError).finally(() => controller.set("loading", false));
    },
    willTransition(transition) {
      this._super(...arguments);
      const controller = this.controllerFor("preferences/second-factor");
      const user = controller.get("currentUser");
      const settings = controller.get("siteSettings");
      if (transition.targetName === "preferences.second-factor" || !user || user.is_anonymous || user.second_factor_enabled || settings.enforce_second_factor === "staff" && !user.staff || settings.enforce_second_factor === "no") {
        return true;
      }
      transition.abort();
      return false;
    }
  }, (_applyDecoratedDescriptor(_obj, "willTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "willTransition"), _obj)), _obj));
  _exports.default = _default;
});