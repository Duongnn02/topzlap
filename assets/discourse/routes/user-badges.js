define("discourse/routes/user-badges", ["exports", "discourse/routes/discourse", "discourse/models/user-badge", "discourse/mixins/viewing-action-type", "@ember/object", "I18n"], function (_exports, _discourse, _userBadge, _viewingActionType, _object, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/models/user-badge",0,"discourse/mixins/viewing-action-type",0,"@ember/object",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend(_viewingActionType.default, (_obj = {
    model() {
      return _userBadge.default.findByUsername(this.modelFor("user").get("username_lower"), {
        grouped: true
      });
    },
    setupController(controller, model) {
      this.viewingActionType(-1);
      controller.set("model", model);
    },
    renderTemplate() {
      this.render("user/badges");
    },
    titleToken() {
      return _I18n.default.t("badges.title");
    },
    didTransition() {
      this.controllerFor("application").set("showFooter", true);
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  _exports.default = _default;
});