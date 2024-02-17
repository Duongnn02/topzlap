define("discourse/plugins/discourse-canned-replies/lib/apply-reply", ["exports", "discourse/lib/ajax", "discourse/lib/ajax-error"], function (_exports, _ajax, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/ajax",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _default(replyId, replyTitle, replyContent, model) {
    // Replace variables with values.
    if (model) {
      const vars = {
        my_username: model.get("user.username"),
        my_name: model.get("user.name"),
        original_poster_username: model.get("topic.details.created_by.username"),
        original_poster_name: model.get("topic.details.created_by.name"),
        reply_to_username: model.get("post.username"),
        reply_to_name: model.get("post.name"),
        last_poster_username: model.get("topic.last_poster_username"),
        reply_to_or_last_poster_username: model.get("post.username") || model.get("topic.last_poster_username")
      };
      for (let key in vars) {
        if (vars[key]) {
          replyTitle = replyTitle.replace(new RegExp(`%{${key}(,fallback:.[^}]*)?}`, "g"), vars[key]);
          replyContent = replyContent.replace(new RegExp(`%{${key}(,fallback:.[^}]*)?}`, "g"), vars[key]);
        } else {
          replyTitle = replyTitle.replace(new RegExp(`%{${key},fallback:(.[^}]*)}`, "g"), "$1");
          replyTitle = replyTitle.replace(new RegExp(`%{${key}}`, "g"), "");
          replyContent = replyContent.replace(new RegExp(`%{${key},fallback:(.[^}]*)}`, "g"), "$1");
          replyContent = replyContent.replace(new RegExp(`%{${key}}`, "g"), "");
        }
      }
    }

    // Finally insert canned reply.
    model.appEvents.trigger("composer:insert-block", replyContent);
    if (model && !model.title) {
      model.set("title", replyTitle);
    }
    (0, _ajax.ajax)(`/canned_replies/${replyId}/use`, {
      type: "PATCH"
    }).catch(_ajaxError.popupAjaxError);
  }
});