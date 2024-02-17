define("discourse/plugins/discourse-canned-replies/connectors/editor-preview/canned-replies", ["exports", "discourse/lib/show-modal", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse-common/lib/get-owner", "@ember/runloop"], function (_exports, _showModal, _ajax, _ajaxError, _getOwner, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/show-modal",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error",0,"discourse-common/lib/get-owner",0,"@ember/runloop"eaimeta@70e063a35619d71f
  var _default = {
    setupComponent(args, component) {
      const currentUser = this.get("currentUser");
      const everyoneCanEdit = this.get("siteSettings.canned_replies_everyone_enabled") && this.get("siteSettings.canned_replies_everyone_can_edit");
      const currentUserCanEdit = this.get("siteSettings.canned_replies_enabled") && currentUser && currentUser.can_edit_canned_replies;
      const canEdit = currentUserCanEdit ? currentUserCanEdit : everyoneCanEdit;
      this.set("canEdit", canEdit);
      component.setProperties({
        cannedVisible: false,
        loadingReplies: false,
        replies: [],
        filteredReplies: []
      });
      if (!component.appEvents.has("canned-replies:show")) {
        this.showCanned = () => component.send("show");
        component.appEvents.on("canned-replies:show", this, this.showCanned);
      }
      if (!component.appEvents.has("canned-replies:hide")) {
        this.hideCanned = () => component.send("hide");
        component.appEvents.on("canned-replies:hide", this, this.hideCanned);
      }
      component.addObserver("listFilter", function () {
        const filterTitle = component.listFilter.toLowerCase();
        const filtered = component.replies.map(reply => {
          /* Give a relevant score to each reply. */
          reply.score = 0;
          if (reply.title.toLowerCase().indexOf(filterTitle) !== -1) {
            reply.score += 2;
          } else if (reply.content.toLowerCase().indexOf(filterTitle) !== -1) {
            reply.score += 1;
          }
          return reply;
        }).filter(reply => reply.score !== 0) // Filter irrelevant replies.
        .sort((a, b) => {
          /* Sort replies by relevance and title. */
          if (a.score !== b.score) {
            return a.score > b.score ? -1 : 1; /* descending */
          } else if (a.title !== b.title) {
            return a.title < b.title ? -1 : 1; /* ascending */
          }

          return 0;
        });
        component.set("filteredReplies", filtered);
      });
    },
    teardownComponent(component) {
      if (component.appEvents.has("canned-replies:show") && this.showCanned) {
        component.appEvents.off("canned-replies:show", this, this.showCanned);
        component.appEvents.off("canned-replies:hide", this, this.hideCanned);
      }
    },
    actions: {
      show() {
        $("#reply-control .d-editor-preview-wrapper > .d-editor-preview").hide();
        this.setProperties({
          cannedVisible: true,
          loadingReplies: true
        });
        (0, _ajax.ajax)("/canned_replies").then(results => {
          this.setProperties({
            replies: results.replies,
            filteredReplies: results.replies
          });
        }).catch(_ajaxError.popupAjaxError).finally(() => {
          this.set("loadingReplies", false);
          if (this.canEdit) {
            (0, _runloop.schedule)("afterRender", () => document.querySelector(".canned-replies-filter").focus());
          }
        });
      },
      hide() {
        $(".d-editor-preview-wrapper > .d-editor-preview").show();
        this.set("cannedVisible", false);
      },
      newReply() {
        const composer = (0, _getOwner.getOwner)(this).lookup("controller:composer");
        composer.send("closeModal");
        (0, _showModal.default)("new-reply").set("newContent", composer.model.reply);
      }
    }
  };
  _exports.default = _default;
});