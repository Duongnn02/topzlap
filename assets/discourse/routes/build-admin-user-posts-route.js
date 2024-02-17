define("discourse/routes/build-admin-user-posts-route", ["exports", "discourse/routes/discourse", "discourse/lib/text", "discourse/lib/utilities", "@ember/object"], function (_exports, _discourse, _text, _utilities, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/lib/text",0,"discourse/lib/utilities",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _default(filter) {
    var _obj;
    return _discourse.default.extend((_obj = {
      didTransition() {
        this.controllerFor("user-posts")._showFooter();
        return true;
      },
      model() {
        return this.modelFor("user").get("postsStream");
      },
      afterModel(model) {
        return model.filterBy({
          filter
        });
      },
      setupController(controller, model) {
        // initialize "canLoadMore"
        model.set("canLoadMore", model.get("itemsLoaded") === 60);
        model.get("content").forEach(item => {
          if (item.get("title")) {
            item.set("title", (0, _text.emojiUnescape)((0, _utilities.escapeExpression)(item.title)));
          }
        });
        this.controllerFor("user-posts").set("model", model);
      },
      renderTemplate() {
        this.render("user/posts");
      }
    }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  }
});