define("discourse/routes/user-activity-stream", ["exports", "discourse/routes/discourse", "discourse/mixins/viewing-action-type", "@ember/object", "I18n"], function (_exports, _discourse, _viewingActionType, _object, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/mixins/viewing-action-type",0,"@ember/object",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend(_viewingActionType.default, (_obj = {
    queryParams: {
      acting_username: {
        refreshModel: true
      }
    },
    model() {
      const user = this.modelFor("user");
      const stream = user.get("stream");
      return {
        stream,
        emptyState: this.emptyState()
      };
    },
    afterModel(model, transition) {
      if (!this.isPoppedState(transition)) {
        this.session.set("userStreamScrollPosition", null);
      }
      return model.stream.filterBy({
        filter: this.userActionType,
        actingUsername: transition.to.queryParams.acting_username
      });
    },
    renderTemplate() {
      this.render("user_stream");
    },
    setupController(controller, model) {
      controller.set("model", model);
      this.viewingActionType(this.userActionType);
    },
    emptyState() {
      const title = _I18n.default.t("user_activity.no_activity_title");
      const body = "";
      return {
        title,
        body
      };
    },
    didTransition() {
      this.controllerFor("user-activity")._showFooter();
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  _exports.default = _default;
});