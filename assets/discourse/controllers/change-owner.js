define("discourse/controllers/change-owner", ["exports", "@ember/controller", "discourse/lib/url", "I18n", "discourse/mixins/modal-functionality", "discourse/models/topic", "@ember/object/computed", "discourse-common/utils/decorators", "@ember/utils", "@ember/runloop"], function (_exports, _controller, _url, _I18n, _modalFunctionality, _topic, _computed, _decorators, _utils, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/lib/url",0,"I18n",0,"discourse/mixins/modal-functionality",0,"discourse/models/topic",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"@ember/utils",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("saving", "newOwner"), (_obj = {
    topicController: (0, _controller.inject)("topic"),
    saving: false,
    newOwner: null,
    selectedPostsCount: (0, _computed.alias)("topicController.selectedPostsCount"),
    selectedPostsUsername: (0, _computed.alias)("topicController.selectedPostsUsername"),
    buttonDisabled(saving, newUser) {
      return saving || (0, _utils.isEmpty)(newUser);
    },
    onShow() {
      this.setProperties({
        saving: false,
        newOwner: null
      });
    },
    actions: {
      changeOwnershipOfPosts() {
        this.set("saving", true);
        const options = {
          post_ids: this.get("topicController.selectedPostIds"),
          username: this.newOwner
        };
        _topic.default.changeOwners(this.get("topicController.model.id"), options).then(() => {
          this.send("closeModal");
          this.topicController.send("deselectAll");
          if (this.get("topicController.multiSelect")) {
            this.topicController.send("toggleMultiSelect");
          }
          (0, _runloop.next)(() => _url.default.routeTo(this.get("topicController.model.url")));
        }, () => {
          this.flash(_I18n.default.t("topic.change_owner.error"), "error");
          this.set("saving", false);
        });
        return false;
      },
      updateNewOwner(selected) {
        this.set("newOwner", selected.firstObject);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "buttonDisabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "buttonDisabled"), _obj)), _obj)));
  _exports.default = _default;
});