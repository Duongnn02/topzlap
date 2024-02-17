define("discourse/adapters/post-reply-history", ["exports", "discourse/adapters/rest", "discourse/lib/ajax"], function (_exports, _rest, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/adapters/rest",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  var _default = _rest.default.extend({
    find(store, type, findArgs) {
      const maxReplies = this.siteSettings.max_reply_history;
      return (0, _ajax.ajax)(`/posts/${findArgs.postId}/reply-history?max_replies=${maxReplies}`).then(replies => {
        return {
          post_reply_histories: replies
        };
      });
    }
  });
  _exports.default = _default;
});