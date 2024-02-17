define("discourse/controllers/review-settings", ["exports", "@ember/controller", "I18n", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse/lib/ajax-error"], function (_exports, _controller, _I18n, _ajax, _decorators, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("settings.reviewable_score_types"), (_obj = {
    saving: false,
    saved: false,
    actions: {
      save() {
        let priorities = {};
        this.scoreTypes.forEach(st => {
          priorities[st.id] = parseFloat(st.reviewable_priority);
        });
        this.set("saving", true);
        (0, _ajax.ajax)("/review/settings", {
          type: "PUT",
          data: {
            reviewable_priorities: priorities
          }
        }).then(() => {
          this.set("saved", true);
        }).catch(_ajaxError.popupAjaxError).finally(() => this.set("saving", false));
      }
    },
    scoreTypes(types) {
      const username = _I18n.default.t("review.example_username");
      return types.map(type => Object.assign({}, type, {
        title: type.title.replace("%{username}", username)
      }));
    }
  }, (_applyDecoratedDescriptor(_obj, "scoreTypes", [_dec], Object.getOwnPropertyDescriptor(_obj, "scoreTypes"), _obj)), _obj)));
  _exports.default = _default;
});