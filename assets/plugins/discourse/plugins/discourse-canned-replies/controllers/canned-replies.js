define("discourse/plugins/discourse-canned-replies/controllers/canned-replies", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "discourse/lib/show-modal", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse/lib/ajax-error", "discourse/plugins/discourse-canned-replies/lib/apply-reply"], function (_exports, _controller, _modalFunctionality, _showModal, _ajax, _decorators, _ajaxError, _applyReply) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"discourse/lib/show-modal",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error",0,"discourse/plugins/discourse-canned-replies/lib/apply-reply"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.observes)("selectedReplyId"), (_obj = {
    selectedReply: null,
    selectedReplyId: "",
    loadingReplies: true,
    canEdit: false,
    init() {
      this._super(...arguments);
      const currentUser = this.get("currentUser");
      const everyoneCanEdit = this.siteSettings.canned_replies_everyone_enabled && this.siteSettings.canned_replies_everyone_can_edit;
      const currentUserCanEdit = this.siteSettings.canned_replies_enabled && currentUser && currentUser.can_edit_canned_replies;
      const canEdit = currentUserCanEdit ? currentUserCanEdit : everyoneCanEdit;
      this.set("canEdit", canEdit);
      this.replies = [];
    },
    _updateSelection() {
      this.selectionChange();
    },
    onShow() {
      (0, _ajax.ajax)("/canned_replies").then(results => {
        this.set("replies", results.replies);
        // trigger update of the selected reply
        this.selectionChange();
      }).catch(_ajaxError.popupAjaxError).finally(() => this.set("loadingReplies", false));
    },
    selectionChange() {
      const localSelectedReplyId = this.get("selectedReplyId");
      let localSelectedReply = "";
      this.get("replies").forEach(entry => {
        if (entry.id === localSelectedReplyId) {
          localSelectedReply = entry;
          return;
        }
      });
      this.set("selectedReply", localSelectedReply);
    },
    actions: {
      apply() {
        (0, _applyReply.default)(this.get("selectedReplyId"), this.selectedReply.title, this.selectedReply.content, this.composerModel);
        this.send("closeModal");
      },
      newReply() {
        this.send("closeModal");
        (0, _showModal.default)("new-reply").set("newContent", this.composerModel.reply);
      },
      editReply() {
        this.send("closeModal");
        (0, _showModal.default)("edit-reply").setProperties({
          replyId: this.selectedReplyId,
          replyTitle: this.get("selectedReply.title"),
          replyContent: this.get("selectedReply.content")
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_updateSelection", [_dec], Object.getOwnPropertyDescriptor(_obj, "_updateSelection"), _obj)), _obj)));
  _exports.default = _default;
});