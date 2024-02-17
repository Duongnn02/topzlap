define("discourse/plugins/discourse-canned-replies/components/canned-reply", ["exports", "@ember/component", "discourse/lib/show-modal", "discourse/plugins/discourse-canned-replies/lib/apply-reply", "discourse-common/lib/get-owner"], function (_exports, _component, _showModal, _applyReply, _getOwner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"discourse/lib/show-modal",0,"discourse/plugins/discourse-canned-replies/lib/apply-reply",0,"discourse-common/lib/get-owner"eaimeta@70e063a35619d71f
  var _default = _component.default.extend({
    canEdit: false,
    init() {
      this._super(...arguments);
      const currentUser = this.get("currentUser");
      const everyoneCanEdit = this.get("siteSettings.canned_replies_everyone_enabled") && this.get("siteSettings.canned_replies_everyone_can_edit");
      const currentUserCanEdit = this.get("siteSettings.canned_replies_enabled") && currentUser && currentUser.can_edit_canned_replies;
      const canEdit = currentUserCanEdit ? currentUserCanEdit : everyoneCanEdit;
      this.set("canEdit", canEdit);
    },
    actions: {
      apply() {
        const composer = (0, _getOwner.getOwner)(this).lookup("controller:composer");
        (0, _applyReply.default)(this.get("reply.id"), this.get("reply.title"), this.get("reply.content"), composer.model);
        this.appEvents.trigger("canned-replies:hide");
      },
      editReply() {
        const composer = (0, _getOwner.getOwner)(this).lookup("controller:composer");
        composer.send("closeModal");
        (0, _showModal.default)("edit-reply").setProperties({
          composerModel: composer.composerModel,
          replyId: this.get("reply.id"),
          replyTitle: this.get("reply.title"),
          replyContent: this.get("reply.content")
        });
      }
    }
  });
  _exports.default = _default;
});