define("discourse/routes/user-activity-pending", ["exports", "discourse/routes/discourse", "discourse/lib/text", "discourse/lib/utilities"], function (_exports, _discourse, _text, _utilities) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/lib/text",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    beforeModel() {
      this.username = this.modelFor("user").username_lower;
    },
    model() {
      return this.store.findAll("pending-post", {
        username: this.username
      }).then(pendingPosts => {
        for (let pendingPost of pendingPosts.content) {
          pendingPost.title = (0, _text.emojiUnescape)((0, _utilities.escapeExpression)(pendingPost.title));
        }
        return pendingPosts;
      });
    },
    activate() {
      this.appEvents.on(`count-updated:${this.username}:pending_posts_count`, this, "_handleCountChange");
    },
    deactivate() {
      this.appEvents.off(`count-updated:${this.username}:pending_posts_count`, this, "_handleCountChange");
    },
    _handleCountChange(count) {
      this.refresh();
      if (count <= 0) {
        this.transitionTo("userActivity");
      }
    }
  });
  _exports.default = _default;
});