define("discourse/controllers/delete-topic-confirm", ["exports", "@ember/controller", "I18n", "discourse/mixins/modal-functionality", "@ember/object", "discourse-common/utils/decorators"], function (_exports, _controller, _I18n, _modalFunctionality, _object, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"discourse/mixins/modal-functionality",0,"@ember/object",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // Modal that displays confirmation text when user deletes a topic
  // The modal will display only if the topic exceeds a certain amount of views
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("deletingTopic"), (_obj = {
    deletingTopic: false,
    buttonTitle(deletingTopic) {
      return deletingTopic ? _I18n.default.t("deleting") : _I18n.default.t("post.controls.delete_topic_confirm_modal_yes");
    },
    onShow() {
      this.set("deletingTopic", false);
    },
    deleteTopic() {
      this.set("deletingTopic", true);
      this.model.destroy(this.currentUser).then(() => this.send("closeModal")).catch(() => {
        this.flash(_I18n.default.t("post.controls.delete_topic_error"), "error");
        this.set("deletingTopic", false);
      });
      return false;
    }
  }, (_applyDecoratedDescriptor(_obj, "buttonTitle", [_dec], Object.getOwnPropertyDescriptor(_obj, "buttonTitle"), _obj), _applyDecoratedDescriptor(_obj, "deleteTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "deleteTopic"), _obj)), _obj)));
  _exports.default = _default;
});