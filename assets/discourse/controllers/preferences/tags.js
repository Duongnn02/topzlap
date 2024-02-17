define("discourse/controllers/preferences/tags", ["exports", "@ember/controller", "discourse-common/utils/decorators", "discourse/lib/ajax-error"], function (_exports, _controller, _decorators, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("model.watched_tags.[]", "model.watching_first_post_tags.[]", "model.tracked_tags.[]", "model.muted_tags.[]"), (_obj = {
    init() {
      this._super(...arguments);
      this.saveAttrNames = ["muted_tags", "tracked_tags", "watched_tags", "watching_first_post_tags"];
    },
    selectedTags(watched, watchedFirst, tracked, muted) {
      return [].concat(watched, watchedFirst, tracked, muted).filter(t => t);
    },
    actions: {
      save() {
        this.set("saved", false);
        return this.model.save(this.saveAttrNames).then(() => {
          this.set("saved", true);
        }).catch(_ajaxError.popupAjaxError);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "selectedTags", [_dec], Object.getOwnPropertyDescriptor(_obj, "selectedTags"), _obj)), _obj)));
  _exports.default = _default;
});