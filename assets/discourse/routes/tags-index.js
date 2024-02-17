define("discourse/routes/tags-index", ["exports", "discourse/routes/discourse", "I18n", "discourse/models/tag", "@ember/object"], function (_exports, _discourse, _I18n, _tag, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n",0,"discourse/models/tag",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    model() {
      return this.store.findAll("tag").then(result => {
        if (result.extras) {
          if (result.extras.categories) {
            result.extras.categories.forEach(category => {
              category.tags = category.tags.map(t => _tag.default.create(t));
            });
          }
          if (result.extras.tag_groups) {
            result.extras.tag_groups.forEach(tagGroup => {
              tagGroup.tags = tagGroup.tags.map(t => _tag.default.create(t));
            });
          }
        }
        return result;
      });
    },
    titleToken() {
      return _I18n.default.t("tagging.tags");
    },
    setupController(controller, model) {
      this.controllerFor("tags.index").setProperties({
        model,
        sortProperties: this.siteSettings.tags_sort_alphabetically ? ["id"] : ["totalCount:desc", "id"]
      });
    },
    didTransition() {
      this.controllerFor("application").set("showFooter", true);
      return true;
    },
    showTagGroups() {
      this.transitionTo("tagGroups");
      return true;
    },
    triggerRefresh() {
      this.refresh();
    }
  }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj), _applyDecoratedDescriptor(_obj, "showTagGroups", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showTagGroups"), _obj), _applyDecoratedDescriptor(_obj, "triggerRefresh", [_object.action], Object.getOwnPropertyDescriptor(_obj, "triggerRefresh"), _obj)), _obj));
  _exports.default = _default;
});