define("discourse/routes/user-notifications", ["exports", "discourse/routes/discourse", "discourse/mixins/viewing-action-type", "@ember/object", "I18n"], function (_exports, _discourse, _viewingActionType, _object, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/mixins/viewing-action-type",0,"@ember/object",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend(_viewingActionType.default, (_obj = {
    controllerName: "user-notifications",
    queryParams: {
      filter: {
        refreshModel: true
      }
    },
    didTransition() {
      this.controllerFor("user-notifications")._showFooter();
      return true;
    },
    model(params) {
      const username = this.modelFor("user").get("username");
      if (this.get("currentUser.username") === username || this.get("currentUser.admin")) {
        return this.store.find("notification", {
          username,
          filter: params.filter
        });
      }
    },
    setupController(controller, model) {
      controller.set("model", model);
      controller.set("user", this.modelFor("user"));
      this.viewingActionType(-1);
    },
    titleToken() {
      return _I18n.default.t("user.notifications");
    }
  }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  _exports.default = _default;
});