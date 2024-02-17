define("discourse/routes/user-private-messages", ["exports", "discourse/models/composer", "discourse/routes/discourse", "discourse/models/draft", "@ember/object", "@ember/service"], function (_exports, _composer, _discourse, _draft, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/composer",0,"discourse/routes/discourse",0,"discourse/models/draft",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    composer: (0, _service.inject)(),
    renderTemplate() {
      this.render("user/messages");
    },
    model() {
      return this.modelFor("user");
    },
    afterModel() {
      return this.pmTopicTrackingState.startTracking();
    },
    setupController(controller, model) {
      controller.set("model", model);
      if (this.currentUser) {
        _draft.default.get("new_private_message").then(data => {
          if (data.draft) {
            this.composer.open({
              draft: data.draft,
              draftKey: _composer.default.NEW_PRIVATE_MESSAGE_KEY,
              ignoreIfChanged: true,
              draftSequence: data.draft_sequence
            });
          }
        });
      }
    },
    triggerRefresh() {
      this.refresh();
    },
    willTransition() {
      this._super(...arguments);
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "triggerRefresh", [_object.action], Object.getOwnPropertyDescriptor(_obj, "triggerRefresh"), _obj), _applyDecoratedDescriptor(_obj, "willTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "willTransition"), _obj)), _obj));
  _exports.default = _default;
});