define("discourse/routes/group-activity-posts", ["exports", "discourse/routes/discourse", "I18n", "@ember/object"], function (_exports, _discourse, _I18n, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.buildGroupPage = buildGroupPage;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function buildGroupPage(type) {
    var _obj;
    return _discourse.default.extend((_obj = {
      type,
      titleToken() {
        return _I18n.default.t(`groups.${type}`);
      },
      model(params, transition) {
        let categoryId = (0, _object.get)(transition.to, "queryParams.category_id");
        return this.modelFor("group").findPosts({
          type,
          categoryId
        });
      },
      setupController(controller, model) {
        let loadedAll = model.length < 20;
        this.controllerFor("group-activity-posts").setProperties({
          model,
          type,
          canLoadMore: !loadedAll
        });
        this.controllerFor("application").set("showFooter", loadedAll);
      },
      renderTemplate() {
        this.render("group-activity-posts");
      },
      didTransition() {
        return true;
      }
    }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  }
  var _default = buildGroupPage("posts");
  _exports.default = _default;
});