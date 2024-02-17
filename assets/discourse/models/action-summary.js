define("discourse/models/action-summary", ["exports", "discourse/models/rest", "discourse/lib/ajax", "@ember/object/computed", "discourse/lib/ajax-error"], function (_exports, _rest, _ajax, _computed, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/rest",0,"discourse/lib/ajax",0,"@ember/object/computed",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  var _default = _rest.default.extend({
    canToggle: (0, _computed.or)("can_undo", "can_act"),
    // Remove it
    removeAction() {
      this.setProperties({
        acted: false,
        count: this.count - 1,
        can_act: true,
        can_undo: false
      });
    },
    togglePromise(post) {
      return this.acted ? this.undo(post) : this.act(post);
    },
    toggle(post) {
      if (!this.acted) {
        this.act(post);
        return true;
      } else {
        this.undo(post);
        return false;
      }
    },
    // Perform this action
    act(post, opts) {
      if (!opts) {
        opts = {};
      }

      // Mark it as acted
      this.setProperties({
        acted: true,
        count: this.count + 1,
        can_act: false,
        can_undo: true
      });

      // Create our post action
      return (0, _ajax.ajax)("/post_actions", {
        type: "POST",
        data: {
          id: this.flagTopic ? this.get("flagTopic.id") : post.get("id"),
          post_action_type_id: this.id,
          message: opts.message,
          is_warning: opts.isWarning,
          take_action: opts.takeAction,
          queue_for_review: opts.queue_for_review,
          flag_topic: this.flagTopic ? true : false
        },
        returnXHR: true
      }).then(data => {
        if (!this.flagTopic) {
          post.updateActionsSummary(data.result);
        }
        const remaining = parseInt(data.xhr.getResponseHeader("Discourse-Actions-Remaining") || 0, 10);
        const max = parseInt(data.xhr.getResponseHeader("Discourse-Actions-Max") || 0, 10);
        return {
          acted: true,
          remaining,
          max
        };
      }).catch(error => {
        (0, _ajaxError.popupAjaxError)(error);
        this.removeAction(post);
      });
    },
    // Undo this action
    undo(post) {
      this.removeAction(post);

      // Remove our post action
      return (0, _ajax.ajax)("/post_actions/" + post.get("id"), {
        type: "DELETE",
        data: {
          post_action_type_id: this.id
        }
      }).then(result => {
        post.updateActionsSummary(result);
        return {
          acted: false
        };
      });
    }
  });
  _exports.default = _default;
});