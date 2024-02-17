define("discourse/controllers/feature-topic-on-profile", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "discourse/lib/ajax", "@ember/object/computed", "discourse/lib/ajax-error"], function (_exports, _controller, _modalFunctionality, _ajax, _computed, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"discourse/lib/ajax",0,"@ember/object/computed",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  var _default = _controller.default.extend(_modalFunctionality.default, {
    newFeaturedTopic: null,
    saving: false,
    noTopicSelected: (0, _computed.none)("newFeaturedTopic"),
    onClose() {
      this.set("newFeaturedTopic", null);
    },
    onShow() {
      this.set("modal.modalClass", "choose-topic-modal");
    },
    actions: {
      save() {
        return (0, _ajax.ajax)(`/u/${this.model.username}/feature-topic`, {
          type: "PUT",
          data: {
            topic_id: this.newFeaturedTopic.id
          }
        }).then(() => {
          this.model.set("featured_topic", this.newFeaturedTopic);
          this.send("closeModal");
        }).catch(_ajaxError.popupAjaxError);
      },
      newTopicSelected(topic) {
        this.set("newFeaturedTopic", topic);
      }
    }
  });
  _exports.default = _default;
});