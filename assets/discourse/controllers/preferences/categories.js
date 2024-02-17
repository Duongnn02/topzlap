define("discourse/controllers/preferences/categories", ["exports", "@ember/controller", "discourse-common/utils/decorators", "@ember/object/computed", "discourse/lib/ajax-error"], function (_exports, _controller, _decorators, _computed, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("siteSettings.mute_all_categories_by_default"), _dec2 = (0, _decorators.default)("siteSettings.mute_all_categories_by_default", "model.watchedCategories", "model.watchedFirstPostCategories", "model.trackedCategories", "model.mutedCategories", "model.regularCategories"), _dec3 = (0, _decorators.default)("siteSettings.remove_muted_tags_from_latest"), (_obj = {
    saveAttrNames(muteAllCategoriesByDefault) {
      return ["watched_category_ids", "tracked_category_ids", "watched_first_post_category_ids", muteAllCategoriesByDefault ? "regular_category_ids" : "muted_category_ids"];
    },
    selectedCategories(muteAllCategoriesByDefault, watched, watchedFirst, tracked, muted, regular) {
      let categories = [].concat(watched, watchedFirst, tracked);
      categories = categories.concat(muteAllCategoriesByDefault ? regular : muted);
      return categories.filter(t => t);
    },
    canSee() {
      return this.get("currentUser.id") === this.get("model.id");
    },
    hideMutedTags() {
      return this.siteSettings.remove_muted_tags_from_latest !== "never";
    },
    canSave: (0, _computed.or)("canSee", "currentUser.admin"),
    actions: {
      save() {
        this.set("saved", false);
        return this.model.save(this.saveAttrNames).then(() => {
          this.set("saved", true);
        }).catch(_ajaxError.popupAjaxError);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "saveAttrNames", [_dec], Object.getOwnPropertyDescriptor(_obj, "saveAttrNames"), _obj), _applyDecoratedDescriptor(_obj, "selectedCategories", [_dec2], Object.getOwnPropertyDescriptor(_obj, "selectedCategories"), _obj), _applyDecoratedDescriptor(_obj, "canSee", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "canSee"), _obj), _applyDecoratedDescriptor(_obj, "hideMutedTags", [_dec3], Object.getOwnPropertyDescriptor(_obj, "hideMutedTags"), _obj)), _obj)));
  _exports.default = _default;
});