define("discourse/models/post", ["exports", "@ember/object", "@ember/object/computed", "discourse/models/action-summary", "discourse/models/composer", "I18n", "rsvp", "discourse/models/rest", "discourse/models/site", "discourse/models/user", "discourse/lib/ajax", "discourse/lib/text", "discourse-common/utils/decorators", "discourse/lib/topic-fancy-title", "@ember/utils", "discourse/lib/ajax-error", "discourse/lib/utilities", "discourse/lib/computed", "discourse/helpers/share-url", "discourse/lib/url"], function (_exports, _object, _computed, _actionSummary, _composer, _I18n, _rsvp, _rest, _site, _user, _ajax, _text, _decorators, _topicFancyTitle, _utils, _ajaxError, _utilities, _computed2, _shareUrl, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/object/computed",0,"discourse/models/action-summary",0,"discourse/models/composer",0,"I18n",0,"rsvp",0,"discourse/models/rest",0,"discourse/models/site",0,"discourse/models/user",0,"discourse/lib/ajax",0,"discourse/lib/text",0,"discourse-common/utils/decorators",0,"discourse/lib/topic-fancy-title",0,"@ember/utils",0,"discourse/lib/ajax-error",0,"discourse/lib/utilities",0,"discourse/lib/computed",0,"discourse/helpers/share-url",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const Post = _rest.default.extend((_dec = (0, _decorators.default)("url", "customShare"), _dec2 = (0, _decorators.default)("name", "username"), _dec3 = (0, _decorators.default)("firstPost", "deleted_by", "topic.deleted_by"), _dec4 = (0, _decorators.default)("firstPost", "deleted_at", "topic.deleted_at"), _dec5 = (0, _decorators.default)("post_number", "topic_id", "topic.slug"), _dec6 = (0, _decorators.default)("post_number", "url"), _dec7 = (0, _decorators.default)("username"), _dec8 = (0, _decorators.default)("link_counts.@each.internal"), _dec9 = (0, _decorators.default)("actions_summary.@each.can_act"), _dec10 = (0, _decorators.default)("siteSettings.use_pg_headlines_for_excerpt", "topic_title_headline"), _dec11 = (0, _decorators.default)("topic_title_headline"), (_obj = {
    customShare: null,
    shareUrl(url) {
      if (this.customShare) {
        return this.customShare;
      }
      const user = _user.default.current();
      return (0, _shareUrl.resolveShareUrl)(url, user);
    },
    new_user: (0, _computed.equal)("trust_level", 0),
    firstPost: (0, _computed.equal)("post_number", 1),
    // Posts can show up as deleted if the topic is deleted
    deletedViaTopic: (0, _computed.and)("firstPost", "topic.deleted_at"),
    deleted: (0, _computed.or)("deleted_at", "deletedViaTopic"),
    notDeleted: (0, _computed.not)("deleted"),
    showName(name, username) {
      return name && name !== username && this.siteSettings.display_name_on_posts;
    },
    postDeletedBy(firstPost, deletedBy, topicDeletedBy) {
      return firstPost ? topicDeletedBy : deletedBy;
    },
    postDeletedAt(firstPost, deletedAt, topicDeletedAt) {
      return firstPost ? topicDeletedAt : deletedAt;
    },
    url(post_number, topic_id, topicSlug) {
      return (0, _utilities.postUrl)(topicSlug || this.topic_slug, topic_id || this.get("topic.id"), post_number);
    },
    urlWithNumber(postNumber, baseUrl) {
      return postNumber === 1 ? `${baseUrl}/1` : baseUrl;
    },
    usernameUrl: _url.userPath,
    topicOwner: (0, _computed2.propertyEqual)("topic.details.created_by.id", "user_id"),
    updatePostField(field, value) {
      const data = {};
      data[field] = value;
      return (0, _ajax.ajax)(`/posts/${this.id}/${field}`, {
        type: "PUT",
        data
      }).then(() => this.set(field, value)).catch(_ajaxError.popupAjaxError);
    },
    internalLinks() {
      if ((0, _utils.isEmpty)(this.link_counts)) {
        return null;
      }
      return this.link_counts.filterBy("internal").filterBy("title");
    },
    flagsAvailable() {
      // TODO: Investigate why `this.site` is sometimes null when running
      // Search - Search with context
      if (!this.site) {
        return [];
      }
      return this.site.flagTypes.filter(item => this.get(`actionByName.${item.name_key}.can_act`));
    },
    useTopicTitleHeadline(enabled, title) {
      return enabled && title;
    },
    topicTitleHeadline(title) {
      return (0, _topicFancyTitle.fancyTitle)(title, this.siteSettings.support_mixed_text_direction);
    },
    afterUpdate(res) {
      if (res.category) {
        this.site.updateCategory(res.category);
      }
    },
    updateProperties() {
      return {
        post: {
          raw: this.raw,
          edit_reason: this.editReason
        },
        image_sizes: this.imageSizes
      };
    },
    createProperties() {
      // composer only used once, defer the dependency
      const data = this.getProperties(_composer.default.serializedFieldsForCreate());
      data.reply_to_post_number = this.reply_to_post_number;
      data.image_sizes = this.imageSizes;
      const metaData = this.metaData;

      // Put the metaData into the request
      if (metaData) {
        data.meta_data = {};
        Object.keys(metaData).forEach(key => data.meta_data[key] = metaData[key]);
      }
      return data;
    },
    // Expands the first post's content, if embedded and shortened.
    expand() {
      return (0, _ajax.ajax)(`/posts/${this.id}/expand-embed`).then(post => {
        this.set("cooked", `<section class="expanded-embed">${post.cooked}</section>`);
      });
    },
    // Recover a deleted post
    recover() {
      const initProperties = this.getProperties("deleted_at", "deleted_by", "user_deleted", "can_delete");
      this.setProperties({
        deleted_at: null,
        deleted_by: null,
        user_deleted: false,
        can_delete: false
      });
      return (0, _ajax.ajax)(`/posts/${this.id}/recover`, {
        type: "PUT"
      }).then(data => {
        this.setProperties({
          cooked: data.cooked,
          raw: data.raw,
          user_deleted: false,
          can_delete: true,
          version: data.version
        });
      }).catch(error => {
        (0, _ajaxError.popupAjaxError)(error);
        this.setProperties(initProperties);
      });
    },
    /**
      Changes the state of the post to be deleted. Does not call the server, that should be
      done elsewhere.
    **/
    setDeletedState(deletedBy) {
      let promise;
      this.set("oldCooked", this.cooked);

      // Moderators can delete posts. Users can only trigger a deleted at message, unless delete_removed_posts_after is 0.
      if (deletedBy.staff || this.siteSettings.delete_removed_posts_after === 0) {
        this.setProperties({
          deleted_at: new Date(),
          deleted_by: deletedBy,
          can_delete: false,
          can_permanently_delete: this.siteSettings.can_permanently_delete && deletedBy.admin,
          can_recover: true
        });
      } else {
        const key = this.post_number === 1 ? "topic.deleted_by_author_simple" : "post.deleted_by_author_simple";
        promise = (0, _text.cookAsync)(_I18n.default.t(key)).then(cooked => {
          this.setProperties({
            cooked,
            can_delete: false,
            can_permanently_delete: false,
            version: this.version + 1,
            can_recover: true,
            can_edit: false,
            user_deleted: true
          });
        });
      }
      return promise || _rsvp.Promise.resolve();
    },
    /**
      Changes the state of the post to NOT be deleted. Does not call the server.
      This can only be called after setDeletedState was called, but the delete
      failed on the server.
    **/
    undoDeleteState() {
      if (this.oldCooked) {
        this.setProperties({
          deleted_at: null,
          deleted_by: null,
          cooked: this.oldCooked,
          version: this.version - 1,
          can_recover: false,
          can_delete: true,
          user_deleted: false
        });
      }
    },
    destroy(deletedBy, opts) {
      return this.setDeletedState(deletedBy).then(() => {
        return (0, _ajax.ajax)("/posts/" + this.id, {
          data: {
            context: window.location.pathname,
            ...opts
          },
          type: "DELETE"
        });
      });
    },
    /**
      Updates a post from another's attributes. This will normally happen when a post is loading but
      is already found in an identity map.
    **/
    updateFromPost(otherPost) {
      Object.keys(otherPost).forEach(key => {
        let value = otherPost[key],
          oldValue = this[key];
        if (!value) {
          value = null;
        }
        if (!oldValue) {
          oldValue = null;
        }
        let skip = false;
        if (typeof value !== "function" && oldValue !== value) {
          // wishing for an identity map
          if (key === "reply_to_user" && value && oldValue) {
            skip = value.username === oldValue.username || (0, _object.get)(value, "username") === (0, _object.get)(oldValue, "username");
          }
          if (!skip) {
            this.set(key, value);
          }
        }
      });
    },
    expandHidden() {
      return (0, _ajax.ajax)(`/posts/${this.id}/cooked.json`).then(result => {
        this.setProperties({
          cooked: result.cooked,
          cooked_hidden: false
        });
      });
    },
    rebake() {
      return (0, _ajax.ajax)(`/posts/${this.id}/rebake`, {
        type: "PUT"
      }).catch(_ajaxError.popupAjaxError);
    },
    unhide() {
      return (0, _ajax.ajax)(`/posts/${this.id}/unhide`, {
        type: "PUT"
      });
    },
    createBookmark(data) {
      this.setProperties({
        "topic.bookmarked": true,
        bookmarked: true,
        bookmark_reminder_at: data.reminder_at,
        bookmark_auto_delete_preference: data.auto_delete_preference,
        bookmark_name: data.name,
        bookmark_id: data.id
      });
      this.topic.incrementProperty("bookmarksWereChanged");
      this.appEvents.trigger("bookmarks:changed", data, {
        target: "post",
        targetId: this.id
      });
      this.appEvents.trigger("post-stream:refresh", {
        id: this.id
      });
    },
    deleteBookmark(bookmarked) {
      this.set("topic.bookmarked", bookmarked);
      this.clearBookmark();
    },
    clearBookmark() {
      this.setProperties({
        bookmark_reminder_at: null,
        bookmark_name: null,
        bookmark_id: null,
        bookmarked: false,
        bookmark_auto_delete_preference: null
      });
      this.topic.incrementProperty("bookmarksWereChanged");
      this.appEvents.trigger("bookmarks:changed", null, {
        target: "post",
        targetId: this.id
      });
    },
    updateActionsSummary(json) {
      if (json && json.id === this.id) {
        json = Post.munge(json);
        this.set("actions_summary", json.actions_summary);
      }
    },
    updateLikeCount(count, userId, eventType) {
      let ownAction = _user.default.current()?.id === userId;
      let ownLike = ownAction && eventType === "liked";
      let current_actions_summary = this.get("actions_summary");
      let likeActionID = _site.default.current().post_action_types.find(a => a.name_key === "like").id;
      const newActionObject = {
        id: likeActionID,
        count,
        acted: ownLike
      };
      if (!this.actions_summary.find(entry => entry.id === likeActionID)) {
        let json = Post.munge({
          id: this.id,
          actions_summary: [newActionObject]
        });
        this.set("actions_summary", Object.assign(current_actions_summary, json.actions_summary));
        this.set("actionByName", json.actionByName);
        this.set("likeAction", json.likeAction);
      } else {
        newActionObject.acted = (ownLike || this.likeAction.acted) && !(eventType === "unliked" && ownAction);
        Object.assign(this.actions_summary.find(entry => entry.id === likeActionID), newActionObject);
        Object.assign(this.actionByName["like"], newActionObject);
        Object.assign(this.likeAction, newActionObject);
      }
    },
    revertToRevision(version) {
      return (0, _ajax.ajax)(`/posts/${this.id}/revisions/${version}/revert`, {
        type: "PUT"
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "shareUrl", [_dec], Object.getOwnPropertyDescriptor(_obj, "shareUrl"), _obj), _applyDecoratedDescriptor(_obj, "showName", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showName"), _obj), _applyDecoratedDescriptor(_obj, "postDeletedBy", [_dec3], Object.getOwnPropertyDescriptor(_obj, "postDeletedBy"), _obj), _applyDecoratedDescriptor(_obj, "postDeletedAt", [_dec4], Object.getOwnPropertyDescriptor(_obj, "postDeletedAt"), _obj), _applyDecoratedDescriptor(_obj, "url", [_dec5], Object.getOwnPropertyDescriptor(_obj, "url"), _obj), _applyDecoratedDescriptor(_obj, "urlWithNumber", [_dec6], Object.getOwnPropertyDescriptor(_obj, "urlWithNumber"), _obj), _applyDecoratedDescriptor(_obj, "usernameUrl", [_dec7], (_init = Object.getOwnPropertyDescriptor(_obj, "usernameUrl"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "internalLinks", [_dec8], Object.getOwnPropertyDescriptor(_obj, "internalLinks"), _obj), _applyDecoratedDescriptor(_obj, "flagsAvailable", [_dec9], Object.getOwnPropertyDescriptor(_obj, "flagsAvailable"), _obj), _applyDecoratedDescriptor(_obj, "useTopicTitleHeadline", [_dec10], Object.getOwnPropertyDescriptor(_obj, "useTopicTitleHeadline"), _obj), _applyDecoratedDescriptor(_obj, "topicTitleHeadline", [_dec11], Object.getOwnPropertyDescriptor(_obj, "topicTitleHeadline"), _obj)), _obj)));
  Post.reopenClass({
    munge(json) {
      if (json.actions_summary) {
        const lookup = _object.default.create();

        // this area should be optimized, it is creating way too many objects per post
        json.actions_summary = json.actions_summary.map(a => {
          a.actionType = _site.default.current().postActionTypeById(a.id);
          a.count = a.count || 0;
          const actionSummary = _actionSummary.default.create(a);
          lookup[a.actionType.name_key] = actionSummary;
          if (a.actionType.name_key === "like") {
            json.likeAction = actionSummary;
          }
          return actionSummary;
        });
        json.actionByName = lookup;
      }
      if (json && json.reply_to_user) {
        json.reply_to_user = _user.default.create(json.reply_to_user);
      }
      return json;
    },
    updateBookmark(postId, bookmarked) {
      return (0, _ajax.ajax)(`/posts/${postId}/bookmark`, {
        type: "PUT",
        data: {
          bookmarked
        }
      });
    },
    destroyBookmark(postId) {
      return (0, _ajax.ajax)(`/posts/${postId}/bookmark`, {
        type: "DELETE"
      });
    },
    deleteMany(post_ids) {
      let {
        agreeWithFirstReplyFlag = true
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return (0, _ajax.ajax)("/posts/destroy_many", {
        type: "DELETE",
        data: {
          post_ids,
          agree_with_first_reply_flag: agreeWithFirstReplyFlag
        }
      });
    },
    mergePosts(post_ids) {
      return (0, _ajax.ajax)("/posts/merge_posts", {
        type: "PUT",
        data: {
          post_ids
        }
      }).catch(_ajaxError.popupAjaxError);
    },
    loadRevision(postId, version) {
      return (0, _ajax.ajax)(`/posts/${postId}/revisions/${version}.json`).then(result => _object.default.create(result));
    },
    hideRevision(postId, version) {
      return (0, _ajax.ajax)(`/posts/${postId}/revisions/${version}/hide`, {
        type: "PUT"
      });
    },
    permanentlyDeleteRevisions(postId) {
      return (0, _ajax.ajax)(`/posts/${postId}/revisions/permanently_delete`, {
        type: "DELETE"
      });
    },
    showRevision(postId, version) {
      return (0, _ajax.ajax)(`/posts/${postId}/revisions/${version}/show`, {
        type: "PUT"
      });
    },
    loadRawEmail(postId) {
      return (0, _ajax.ajax)(`/posts/${postId}/raw-email.json`);
    }
  });
  var _default = Post;
  _exports.default = _default;
});