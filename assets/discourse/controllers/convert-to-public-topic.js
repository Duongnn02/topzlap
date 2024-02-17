define("discourse/controllers/convert-to-public-topic", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "discourse/lib/ajax-error"], function (_exports, _controller, _modalFunctionality, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  var _default = _controller.default.extend(_modalFunctionality.default, {
    publicCategoryId: null,
    saving: true,
    onShow() {
      this.setProperties({
        publicCategoryId: null,
        saving: false
      });
    },
    actions: {
      makePublic() {
        let topic = this.model;
        topic.convertTopic("public", {
          categoryId: this.publicCategoryId
        }).then(() => {
          topic.set("archetype", "regular");
          topic.set("category_id", this.publicCategoryId);
          this.appEvents.trigger("header:show-topic", topic);
          this.send("closeModal");
        }).catch(_ajaxError.popupAjaxError);
      }
    }
  });
  _exports.default = _default;
});