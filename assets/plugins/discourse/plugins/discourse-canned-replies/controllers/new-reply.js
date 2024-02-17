define("discourse/plugins/discourse-canned-replies/controllers/new-reply", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "discourse/lib/show-modal", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse/lib/ajax-error"], function (_exports, _controller, _modalFunctionality, _showModal, _ajax, _decorators, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"discourse/lib/show-modal",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("newTitle", "newContent"), (_obj = {
    newTitle: "",
    newContent: "",
    onShow() {
      this.setProperties({
        newTitle: "",
        newContent: ""
      });
    },
    disableSaveButton(newTitle, newContent) {
      return newTitle === "" || newContent === "";
    },
    actions: {
      save() {
        (0, _ajax.ajax)("/canned_replies", {
          type: "POST",
          data: {
            title: this.newTitle,
            content: this.newContent
          }
        }).then(() => {
          this.send("closeModal");
          if (this.site.mobileView) {
            (0, _showModal.default)("canned-replies");
          } else {
            this.appEvents.trigger("canned-replies:show");
          }
        }).catch(_ajaxError.popupAjaxError);
      },
      cancel() {
        this.send("closeModal");
        if (this.site.mobileView) {
          (0, _showModal.default)("canned-replies");
        } else {
          this.appEvents.trigger("canned-replies:show");
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "disableSaveButton", [_dec], Object.getOwnPropertyDescriptor(_obj, "disableSaveButton"), _obj)), _obj)));
  _exports.default = _default;
});