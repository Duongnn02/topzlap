define("discourse/models/topic", ["exports", "@ember/object/computed", "discourse/lib/computed", "discourse/models/action-summary", "discourse-common/utils/category-macro", "discourse/models/bookmark", "@ember/object", "I18n", "discourse/lib/preload-store", "rsvp", "discourse/models/rest", "discourse/models/site", "discourse/models/user", "discourse/lib/ajax", "discourse-common/lib/object", "discourse-common/utils/decorators", "discourse/lib/text", "discourse/lib/topic-fancy-title", "discourse/services/store", "discourse-common/lib/get-url", "discourse/lib/formatter", "discourse/lib/ajax-error", "discourse/helpers/share-url", "discourse/lib/url", "discourse-common/lib/deprecated", "discourse/lib/model-transformers"], function (_exports, _computed, _computed2, _actionSummary, _categoryMacro, _bookmark, _object, _I18n, _preloadStore, _rsvp, _rest, _site, _user, _ajax, _object2, _decorators, _text, _topicFancyTitle, _store, _getUrl, _formatter, _ajaxError, _shareUrl, _url, _deprecated, _modelTransformers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ID_CONSTRAINT = void 0;
  _exports.clearCustomLastUnreadUrlCallbacks = clearCustomLastUnreadUrlCallbacks;
  _exports.default = void 0;
  _exports.loadTopicView = loadTopicView;
  _exports.mergeTopic = mergeTopic;
  _exports.movePosts = movePosts;
  _exports.registerCustomLastUnreadUrlCallback = registerCustomLastUnreadUrlCallback;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"discourse/lib/computed",0,"discourse/models/action-summary",0,"discourse-common/utils/category-macro",0,"discourse/models/bookmark",0,"@ember/object",0,"I18n",0,"discourse/lib/preload-store",0,"rsvp",0,"discourse/models/rest",0,"discourse/models/site",0,"discourse/models/user",0,"discourse/lib/ajax",0,"discourse-common/lib/object",0,"discourse-common/utils/decorators",0,"discourse/lib/text",0,"discourse/lib/topic-fancy-title",0,"discourse/services/store",0,"discourse-common/lib/get-url",0,"discourse/lib/formatter",0,"discourse/lib/ajax-error",0,"discourse/helpers/share-url",0,"discourse/lib/url",0,"discourse-common/lib/deprecated",0,"discourse/lib/model-transformers"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function loadTopicView(topic, args) {
    const data = (0, _object2.deepMerge)({}, args);
    const url = `/t/${topic.id}`;
    const jsonUrl = (data.nearPost ? `${url}/${data.nearPost}` : url) + ".json";
    delete data.nearPost;
    delete data.__type;
    delete data.store;
    return _preloadStore.default.getAndRemove(`topic_${topic.id}`, () => (0, _ajax.ajax)(jsonUrl, {
      data
    })).then(json => {
      topic.updateFromJson(json);
      return json;
    });
  }
  const ID_CONSTRAINT = /^\d+$/;
  _exports.ID_CONSTRAINT = ID_CONSTRAINT;
  let _customLastUnreadUrlCallbacks = [];
  const Topic = _rest.default.extend((_dec = (0, _decorators.default)("last_read_post_number", "highest_post_number"), _dec2 = (0, _decorators.default)("posters.firstObject"), _dec3 = (0, _decorators.default)("posters.[]"), _dec4 = (0, _decorators.default)("posters.[]", "participants.[]", "allowed_user_count"), _dec5 = (0, _decorators.default)("fancy_title"), _dec6 = (0, _decorators.default)("bumped_at", "createdAt"), _dec7 = (0, _decorators.default)("bumpedAt", "createdAt"), _dec8 = (0, _decorators.default)("created_at"), _dec9 = (0, _decorators.default)("tags"), _dec10 = (0, _decorators.default)("related_messages"), _dec11 = (0, _decorators.default)("suggested_topics"), _dec12 = (0, _decorators.default)("posts_count"), _dec13 = (0, _decorators.default)("visible"), _dec14 = (0, _decorators.default)("id"), _dec15 = (0, _decorators.default)("url"), _dec16 = (0, _decorators.default)("id", "slug"), _dec17 = (0, _decorators.default)("unread_posts", "new_posts"), _dec18 = (0, _decorators.default)("unread_posts", "new_posts"), _dec19 = (0, _decorators.default)("last_read_post_number", "url"), _dec20 = (0, _decorators.default)("last_read_post_number", "highest_post_number", "url"), _dec21 = (0, _decorators.default)("highest_post_number", "url"), _dec22 = (0, _decorators.default)("url"), _dec23 = (0, _decorators.default)("url"), _dec24 = (0, _decorators.default)("last_poster.username"), _dec25 = (0, _decorators.default)("views"), _dec26 = (0, _decorators.default)("archetype"), _dec27 = (0, _decorators.default)("excerpt"), _dec28 = (0, _decorators.default)("excerpt"), (_obj = {
    message: null,
    errorLoading: false,
    visited(lastReadPostNumber, highestPostNumber) {
      // >= to handle case where there are deleted posts at the end of the topic
      return lastReadPostNumber >= highestPostNumber;
    },
    creator(poster) {
      return poster && poster.user;
    },
    lastPoster(posters) {
      if (posters && posters.length > 0) {
        const latest = posters.filter(p => p.extras?.includes("latest"))[0];
        return latest || posters.firstObject;
      }
    },
    lastPosterUser: (0, _computed.alias)("lastPoster.user"),
    lastPosterGroup: (0, _computed.alias)("lastPoster.primary_group"),
    allowedGroups: (0, _computed.alias)("details.allowed_groups"),
    featuredUsers(posters, participants, allowedUserCount) {
      let users = posters;
      const maxUserCount = 5;
      const posterCount = users.length;
      if (this.isPrivateMessage && participants && posterCount < maxUserCount) {
        let pushOffset = 0;
        if (posterCount > 1) {
          const lastUser = users[posterCount - 1];
          if (lastUser.extras && lastUser.extras.includes("latest")) {
            pushOffset = 1;
          }
        }
        const poster_ids = posters.map(p => p.user && p.user.id).filter(id => id);
        participants.some(p => {
          if (!poster_ids.includes(p.user_id)) {
            users.splice(users.length - pushOffset, 0, p);
            if (users.length === maxUserCount) {
              return true;
            }
          }
          return false;
        });
      }
      if (this.isPrivateMessage && allowedUserCount > maxUserCount) {
        users.splice(maxUserCount - 2, 1); // remove second-last avatar
        users.push({
          moreCount: `+${allowedUserCount - maxUserCount + 1}`
        });
      }
      return users;
    },
    fancyTitle(title) {
      return (0, _topicFancyTitle.fancyTitle)(title, this.siteSettings.support_mixed_text_direction);
    },
    bumpedAt(bumped_at, createdAt) {
      if (bumped_at) {
        return new Date(bumped_at);
      } else {
        return createdAt;
      }
    },
    bumpedAtTitle(bumpedAt, createdAt) {
      return _I18n.default.t("topic.bumped_at_title", {
        createdAtDate: (0, _formatter.longDate)(createdAt),
        bumpedAtDate: (0, _formatter.longDate)(bumpedAt)
      });
    },
    createdAt(created_at) {
      return new Date(created_at);
    },
    postStream() {
      return this.store.createRecord("postStream", {
        id: this.id,
        topic: this
      });
    },
    visibleListTags(tags) {
      if (!tags || !this.siteSettings.suppress_overlapping_tags_in_list) {
        return tags;
      }
      const title = this.title.toLowerCase();
      const newTags = [];
      tags.forEach(function (tag) {
        if (!title.includes(tag.toLowerCase())) {
          newTags.push(tag);
        }
      });
      return newTags;
    },
    relatedMessages(relatedMessages) {
      if (relatedMessages) {
        return relatedMessages.map(st => this.store.createRecord("topic", st));
      }
    },
    suggestedTopics(suggestedTopics) {
      if (suggestedTopics) {
        return suggestedTopics.map(st => this.store.createRecord("topic", st));
      }
    },
    replyCount(postsCount) {
      return postsCount - 1;
    },
    get details() {
      return this._details ??= this.store.createRecord("topicDetails", {
        id: this.id,
        topic: this
      });
    },
    set details(value) {
      return this._details = value;
    },
    invisible(visible) {
      return visible !== undefined ? !visible : undefined;
    },
    deleted: (0, _computed.notEmpty)("deleted_at"),
    searchContext(id) {
      return {
        type: "topic",
        id
      };
    },
    category: (0, _categoryMacro.default)("category_id"),
    shareUrl(url) {
      const user = _user.default.current();
      return (0, _shareUrl.resolveShareUrl)(url, user);
    },
    printUrl: (0, _computed2.fmt)("url", "%@/print"),
    url(id, slug) {
      slug = slug || "";
      if (slug.trim().length === 0) {
        slug = "topic";
      }
      return `${(0, _getUrl.default)("/t/")}${slug}/${id}`;
    },
    // Helper to build a Url with a post number
    urlForPostNumber(postNumber) {
      let url = this.url;
      if (postNumber > 0) {
        url += `/${postNumber}`;
      }
      return url;
    },
    totalUnread(unreadPosts, newPosts) {
      (0, _deprecated.default)("The totalUnread property of the topic model is deprecated", {
        id: "discourse.topic.totalUnread"
      });
      return unreadPosts || newPosts;
    },
    displayNewPosts(unreadPosts, newPosts) {
      (0, _deprecated.default)("The displayNewPosts property of the topic model is deprecated", {
        id: "discourse.topic.totalUnread"
      });
      return unreadPosts || newPosts;
    },
    lastReadUrl(lastReadPostNumber) {
      return this.urlForPostNumber(lastReadPostNumber);
    },
    lastUnreadUrl(lastReadPostNumber, highestPostNumber) {
      let customUrl = null;
      _customLastUnreadUrlCallbacks.some(cb => {
        const result = cb(this);
        if (result) {
          customUrl = result;
          return true;
        }
      });
      if (customUrl) {
        return customUrl;
      }
      if (lastReadPostNumber >= highestPostNumber && this.get("category.navigate_to_first_post_after_read")) {
        return this.urlForPostNumber(1);
      }
      let postNumber = lastReadPostNumber + 1;
      if (postNumber > highestPostNumber) {
        postNumber = highestPostNumber;
      }
      return this.urlForPostNumber(postNumber);
    },
    lastPostUrl(highestPostNumber) {
      return this.urlForPostNumber(highestPostNumber);
    },
    firstPostUrl() {
      return this.urlForPostNumber(1);
    },
    summaryUrl() {
      const summaryQueryString = this.has_summary ? "?filter=summary" : "";
      return `${this.urlForPostNumber(1)}${summaryQueryString}`;
    },
    lastPosterUrl(username) {
      return (0, _url.userPath)(username);
    },
    viewsHeat(v) {
      if (v >= this.siteSettings.topic_views_heat_high) {
        return "heatmap-high";
      }
      if (v >= this.siteSettings.topic_views_heat_medium) {
        return "heatmap-med";
      }
      if (v >= this.siteSettings.topic_views_heat_low) {
        return "heatmap-low";
      }
      return null;
    },
    archetypeObject(archetype) {
      return _site.default.currentProp("archetypes").findBy("id", archetype);
    },
    isPrivateMessage: (0, _computed.equal)("archetype", "private_message"),
    isBanner: (0, _computed.equal)("archetype", "banner"),
    toggleStatus(property) {
      this.toggleProperty(property);
      return this.saveStatus(property, !!this.get(property));
    },
    saveStatus(property, value, until) {
      if (property === "closed") {
        this.incrementProperty("posts_count");
      }
      return (0, _ajax.ajax)(`${this.url}/status`, {
        type: "PUT",
        data: {
          status: property,
          enabled: !!value,
          until
        }
      });
    },
    makeBanner() {
      return (0, _ajax.ajax)(`/t/${this.id}/make-banner`, {
        type: "PUT"
      }).then(() => this.set("archetype", "banner"));
    },
    removeBanner() {
      return (0, _ajax.ajax)(`/t/${this.id}/remove-banner`, {
        type: "PUT"
      }).then(() => this.set("archetype", "regular"));
    },
    afterPostBookmarked(post) {
      post.set("bookmarked", true);
    },
    firstPost() {
      const postStream = this.postStream;
      let firstPost = postStream.get("posts.firstObject");
      if (firstPost && firstPost.post_number === 1) {
        return _rsvp.Promise.resolve(firstPost);
      }
      const postId = postStream.findPostIdForPostNumber(1);
      if (postId) {
        return this.postById(postId);
      } else {
        return this.postStream.loadPostByPostNumber(1);
      }
    },
    postById(id) {
      const loaded = this.postStream.findLoadedPost(id);
      if (loaded) {
        return _rsvp.Promise.resolve(loaded);
      }
      return this.postStream.loadPost(id);
    },
    deleteBookmarks() {
      return (0, _ajax.ajax)(`/t/${this.id}/remove_bookmarks`, {
        type: "PUT"
      });
    },
    bookmarkCount: (0, _computed.alias)("bookmarks.length"),
    removeBookmark(id) {
      if (!this.bookmarks) {
        this.set("bookmarks", []);
      }
      this.set("bookmarks", this.bookmarks.filter(bookmark => {
        if (bookmark.id === id && bookmark.bookmarkable_type === "Topic") {
          this.appEvents.trigger("bookmarks:changed", null, bookmark.attachedTo());
        }
        return bookmark.id !== id;
      }));
      this.set("bookmarked", this.bookmarks.length);
      this.incrementProperty("bookmarksWereChanged");
    },
    clearBookmarks() {
      this.toggleProperty("bookmarked");
      const postIds = this.bookmarks.filterBy("bookmarkable_type", "Post").mapBy("bookmarkable_id");
      postIds.forEach(postId => {
        const loadedPost = this.postStream.findLoadedPost(postId);
        if (loadedPost) {
          loadedPost.clearBookmark();
        }
      });
      this.set("bookmarks", []);
      return postIds;
    },
    createGroupInvite(group) {
      return (0, _ajax.ajax)(`/t/${this.id}/invite-group`, {
        type: "POST",
        data: {
          group
        }
      });
    },
    createInvite(user, group_ids, custom_message) {
      return (0, _ajax.ajax)(`/t/${this.id}/invite`, {
        type: "POST",
        data: {
          user,
          group_ids,
          custom_message
        }
      });
    },
    generateInviteLink(email, group_ids, topic_id) {
      return (0, _ajax.ajax)("/invites", {
        type: "POST",
        data: {
          email,
          skip_email: true,
          group_ids,
          topic_id
        }
      });
    },
    // Delete this topic
    destroy(deleted_by) {
      let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return (0, _ajax.ajax)(`/t/${this.id}`, {
        data: {
          context: window.location.pathname,
          ...opts
        },
        type: "DELETE"
      }).then(() => {
        this.setProperties({
          deleted_at: new Date(),
          deleted_by,
          "details.can_delete": false,
          "details.can_recover": true,
          "details.can_permanently_delete": this.siteSettings.can_permanently_delete && deleted_by.admin
        });
        if (opts.force_destroy || !deleted_by.staff && !deleted_by.groups.some(group => group.name === this.category?.reviewable_by_group_name) && !(this.siteSettings.tl4_delete_posts_and_topics && deleted_by.trust_level >= 4)) {
          _url.default.redirectTo("/");
        }
      }).catch(_ajaxError.popupAjaxError);
    },
    // Recover this topic if deleted
    recover() {
      this.setProperties({
        deleted_at: null,
        deleted_by: null,
        "details.can_delete": true,
        "details.can_recover": false
      });
      return (0, _ajax.ajax)(`/t/${this.id}/recover`, {
        data: {
          context: window.location.pathname
        },
        type: "PUT"
      });
    },
    // Update our attributes from a JSON result
    updateFromJson(json) {
      const keys = Object.keys(json);
      if (!json.view_hidden) {
        this.details.updateFromJson(json.details);
        keys.removeObjects(["details", "post_stream"]);
        if (json.published_page) {
          this.set("publishedPage", this.store.createRecord("published-page", json.published_page));
        }
      }
      keys.forEach(key => this.set(key, json[key]));
      if (this.bookmarks.length) {
        this.set("bookmarks", this.bookmarks.map(bm => _bookmark.default.create(bm)));
      }
      return this;
    },
    reload() {
      return (0, _ajax.ajax)(`/t/${this.id}`, {
        type: "GET"
      }).then(topic_json => this.updateFromJson(topic_json));
    },
    isPinnedUncategorized: (0, _computed.and)("pinned", "category.isUncategorizedCategory"),
    clearPin() {
      // Clear the pin optimistically from the object
      this.setProperties({
        pinned: false,
        unpinned: true
      });
      (0, _ajax.ajax)(`/t/${this.id}/clear-pin`, {
        type: "PUT"
      }).then(null, () => {
        // On error, put the pin back
        this.setProperties({
          pinned: true,
          unpinned: false
        });
      });
    },
    togglePinnedForUser() {
      if (this.pinned) {
        this.clearPin();
      } else {
        this.rePin();
      }
    },
    rePin() {
      // Clear the pin optimistically from the object
      this.setProperties({
        pinned: true,
        unpinned: false
      });
      (0, _ajax.ajax)(`/t/${this.id}/re-pin`, {
        type: "PUT"
      }).then(null, () => {
        // On error, put the pin back
        this.setProperties({
          pinned: true,
          unpinned: false
        });
      });
    },
    escapedExcerpt(excerpt) {
      return (0, _text.emojiUnescape)(excerpt);
    },
    hasExcerpt: (0, _computed.notEmpty)("excerpt"),
    excerptTruncated(excerpt) {
      return excerpt && excerpt.slice(-8) === "&hellip;";
    },
    readLastPost: (0, _computed2.propertyEqual)("last_read_post_number", "highest_post_number"),
    canClearPin: (0, _computed.and)("pinned", "readLastPost"),
    canEditTags: (0, _computed.or)("details.can_edit", "details.can_edit_tags"),
    archiveMessage() {
      this.set("archiving", true);
      const promise = (0, _ajax.ajax)(`/t/${this.id}/archive-message`, {
        type: "PUT"
      });
      promise.then(msg => {
        this.set("message_archived", true);
        if (msg && msg.group_name) {
          this.set("inboxGroupName", msg.group_name);
        }
      }).finally(() => this.set("archiving", false));
      return promise;
    },
    moveToInbox() {
      this.set("archiving", true);
      const promise = (0, _ajax.ajax)(`/t/${this.id}/move-to-inbox`, {
        type: "PUT"
      });
      promise.then(msg => {
        this.set("message_archived", false);
        if (msg && msg.group_name) {
          this.set("inboxGroupName", msg.group_name);
        }
      }).finally(() => this.set("archiving", false));
      return promise;
    },
    publish() {
      return (0, _ajax.ajax)(`/t/${this.id}/publish`, {
        type: "PUT",
        data: this.getProperties("destination_category_id")
      }).then(() => this.set("destination_category_id", null)).catch(_ajaxError.popupAjaxError);
    },
    updateDestinationCategory(categoryId) {
      this.set("destination_category_id", categoryId);
      return (0, _ajax.ajax)(`/t/${this.id}/shared-draft`, {
        type: "PUT",
        data: {
          category_id: categoryId
        }
      });
    },
    convertTopic(type, opts) {
      let args = {
        type: "PUT"
      };
      if (opts && opts.categoryId) {
        args.data = {
          category_id: opts.categoryId
        };
      }
      return (0, _ajax.ajax)(`/t/${this.id}/convert-topic/${type}`, args);
    },
    resetBumpDate() {
      return (0, _ajax.ajax)(`/t/${this.id}/reset-bump-date`, {
        type: "PUT"
      }).catch(_ajaxError.popupAjaxError);
    },
    updateTags(tags) {
      if (!tags || tags.length === 0) {
        tags = [""];
      }
      return (0, _ajax.ajax)(`/t/${this.id}/tags`, {
        type: "PUT",
        data: {
          tags
        }
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "visited", [_dec], Object.getOwnPropertyDescriptor(_obj, "visited"), _obj), _applyDecoratedDescriptor(_obj, "creator", [_dec2], Object.getOwnPropertyDescriptor(_obj, "creator"), _obj), _applyDecoratedDescriptor(_obj, "lastPoster", [_dec3], Object.getOwnPropertyDescriptor(_obj, "lastPoster"), _obj), _applyDecoratedDescriptor(_obj, "featuredUsers", [_dec4], Object.getOwnPropertyDescriptor(_obj, "featuredUsers"), _obj), _applyDecoratedDescriptor(_obj, "fancyTitle", [_dec5], Object.getOwnPropertyDescriptor(_obj, "fancyTitle"), _obj), _applyDecoratedDescriptor(_obj, "bumpedAt", [_dec6], Object.getOwnPropertyDescriptor(_obj, "bumpedAt"), _obj), _applyDecoratedDescriptor(_obj, "bumpedAtTitle", [_dec7], Object.getOwnPropertyDescriptor(_obj, "bumpedAtTitle"), _obj), _applyDecoratedDescriptor(_obj, "createdAt", [_dec8], Object.getOwnPropertyDescriptor(_obj, "createdAt"), _obj), _applyDecoratedDescriptor(_obj, "postStream", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "postStream"), _obj), _applyDecoratedDescriptor(_obj, "visibleListTags", [_dec9], Object.getOwnPropertyDescriptor(_obj, "visibleListTags"), _obj), _applyDecoratedDescriptor(_obj, "relatedMessages", [_dec10], Object.getOwnPropertyDescriptor(_obj, "relatedMessages"), _obj), _applyDecoratedDescriptor(_obj, "suggestedTopics", [_dec11], Object.getOwnPropertyDescriptor(_obj, "suggestedTopics"), _obj), _applyDecoratedDescriptor(_obj, "replyCount", [_dec12], Object.getOwnPropertyDescriptor(_obj, "replyCount"), _obj), _applyDecoratedDescriptor(_obj, "invisible", [_dec13], Object.getOwnPropertyDescriptor(_obj, "invisible"), _obj), _applyDecoratedDescriptor(_obj, "searchContext", [_dec14], Object.getOwnPropertyDescriptor(_obj, "searchContext"), _obj), _applyDecoratedDescriptor(_obj, "shareUrl", [_dec15], Object.getOwnPropertyDescriptor(_obj, "shareUrl"), _obj), _applyDecoratedDescriptor(_obj, "url", [_dec16], Object.getOwnPropertyDescriptor(_obj, "url"), _obj), _applyDecoratedDescriptor(_obj, "totalUnread", [_dec17], Object.getOwnPropertyDescriptor(_obj, "totalUnread"), _obj), _applyDecoratedDescriptor(_obj, "displayNewPosts", [_dec18], Object.getOwnPropertyDescriptor(_obj, "displayNewPosts"), _obj), _applyDecoratedDescriptor(_obj, "lastReadUrl", [_dec19], Object.getOwnPropertyDescriptor(_obj, "lastReadUrl"), _obj), _applyDecoratedDescriptor(_obj, "lastUnreadUrl", [_dec20], Object.getOwnPropertyDescriptor(_obj, "lastUnreadUrl"), _obj), _applyDecoratedDescriptor(_obj, "lastPostUrl", [_dec21], Object.getOwnPropertyDescriptor(_obj, "lastPostUrl"), _obj), _applyDecoratedDescriptor(_obj, "firstPostUrl", [_dec22], Object.getOwnPropertyDescriptor(_obj, "firstPostUrl"), _obj), _applyDecoratedDescriptor(_obj, "summaryUrl", [_dec23], Object.getOwnPropertyDescriptor(_obj, "summaryUrl"), _obj), _applyDecoratedDescriptor(_obj, "lastPosterUrl", [_dec24], Object.getOwnPropertyDescriptor(_obj, "lastPosterUrl"), _obj), _applyDecoratedDescriptor(_obj, "viewsHeat", [_dec25], Object.getOwnPropertyDescriptor(_obj, "viewsHeat"), _obj), _applyDecoratedDescriptor(_obj, "archetypeObject", [_dec26], Object.getOwnPropertyDescriptor(_obj, "archetypeObject"), _obj), _applyDecoratedDescriptor(_obj, "escapedExcerpt", [_dec27], Object.getOwnPropertyDescriptor(_obj, "escapedExcerpt"), _obj), _applyDecoratedDescriptor(_obj, "excerptTruncated", [_dec28], Object.getOwnPropertyDescriptor(_obj, "excerptTruncated"), _obj)), _obj)));
  Topic.reopenClass({
    NotificationLevel: {
      WATCHING: 3,
      TRACKING: 2,
      REGULAR: 1,
      MUTED: 0
    },
    munge(json) {
      // ensure we are not overriding category computed property
      delete json.category;
      json.bookmarks = json.bookmarks || [];
      return json;
    },
    createActionSummary(result) {
      if (result.actions_summary) {
        const lookup = _object.default.create();
        result.actions_summary = result.actions_summary.map(a => {
          a.post = result;
          a.actionType = _site.default.current().postActionTypeById(a.id);
          const actionSummary = _actionSummary.default.create(a);
          lookup.set(a.actionType.get("name_key"), actionSummary);
          return actionSummary;
        });
        result.set("actionByName", lookup);
      }
    },
    update(topic, props) {
      let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // We support `category_id` and `categoryId` for compatibility
      if (typeof props.categoryId !== "undefined") {
        props.category_id = props.categoryId;
        delete props.categoryId;
      }

      // Make sure we never change the category for private messages
      if (topic.get("isPrivateMessage")) {
        delete props.category_id;
      }
      const data = {
        ...props
      };
      if (opts.fastEdit) {
        data.keep_existing_draft = true;
      }
      return (0, _ajax.ajax)(topic.get("url"), {
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json"
      }).then(result => {
        // The title can be cleaned up server side
        props.title = result.basic_topic.title;
        props.fancy_title = result.basic_topic.fancy_title;
        if (topic.is_shared_draft) {
          props.destination_category_id = props.category_id;
          delete props.category_id;
        }
        topic.setProperties(props);
      });
    },
    create() {
      const result = this._super.apply(this, arguments);
      this.createActionSummary(result);
      return result;
    },
    // Load a topic, but accepts a set of filters
    find(topicId, opts) {
      let url = (0, _getUrl.default)("/t/") + topicId;
      if (opts.nearPost) {
        url += `/${opts.nearPost}`;
      }
      const data = {};
      if (opts.postsAfter) {
        data.posts_after = opts.postsAfter;
      }
      if (opts.postsBefore) {
        data.posts_before = opts.postsBefore;
      }
      if (opts.trackVisit) {
        data.track_visit = true;
      }

      // Add username filters if we have them
      if (opts.userFilters && opts.userFilters.length > 0) {
        data.username_filters = [];
        opts.userFilters.forEach(function (username) {
          data.username_filters.push(username);
        });
      }

      // Add the summary of filter if we have it
      if (opts.summary === true) {
        data.summary = true;
      }

      // Check the preload store. If not, load it via JSON
      return (0, _ajax.ajax)(`${url}.json`, {
        data
      });
    },
    changeOwners(topicId, opts) {
      const promise = (0, _ajax.ajax)(`/t/${topicId}/change-owner`, {
        type: "POST",
        data: opts
      }).then(result => {
        if (result.success) {
          return result;
        }
        promise.reject(new Error("error changing ownership of posts"));
      });
      return promise;
    },
    changeTimestamp(topicId, timestamp) {
      const promise = (0, _ajax.ajax)(`/t/${topicId}/change-timestamp`, {
        type: "PUT",
        data: {
          timestamp
        }
      }).then(result => {
        if (result.success) {
          return result;
        }
        promise.reject(new Error("error updating timestamp of topic"));
      });
      return promise;
    },
    bulkOperation(topics, operation, tracked) {
      const data = {
        topic_ids: topics.mapBy("id"),
        operation,
        tracked
      };
      return (0, _ajax.ajax)("/topics/bulk", {
        type: "PUT",
        data
      });
    },
    bulkOperationByFilter(filter, operation, options, tracked) {
      const data = {
        filter,
        operation,
        tracked
      };
      if (options) {
        if (options.categoryId) {
          data.category_id = options.categoryId;
        }
        if (options.includeSubcategories) {
          data.include_subcategories = true;
        }
        if (options.tagName) {
          data.tag_name = options.tagName;
        }
        if (options.private_message_inbox) {
          data.private_message_inbox = options.private_message_inbox;
          if (options.group_name) {
            data.group_name = options.group_name;
          }
        }
      }
      return (0, _ajax.ajax)("/topics/bulk", {
        type: "PUT",
        data
      });
    },
    resetNew(category, include_subcategories) {
      let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      let {
        tracked,
        tag,
        topicIds
      } = {
        tracked: false,
        tag: null,
        topicIds: null,
        ...opts
      };
      const data = {
        tracked
      };
      if (category) {
        data.category_id = category.id;
        data.include_subcategories = include_subcategories;
      }
      if (tag) {
        data.tag_id = tag.id;
      }
      if (topicIds) {
        data.topic_ids = topicIds;
      }
      return (0, _ajax.ajax)("/topics/reset-new", {
        type: "PUT",
        data
      });
    },
    pmResetNew() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const data = {};
      if (opts.topicIds) {
        data.topic_ids = opts.topicIds;
      }
      if (opts.inbox) {
        data.inbox = opts.inbox;
        if (opts.groupName) {
          data.group_name = opts.groupName;
        }
      }
      return (0, _ajax.ajax)("/topics/pm-reset-new", {
        type: "PUT",
        data
      });
    },
    idForSlug(slug) {
      return (0, _ajax.ajax)(`/t/id_for/${slug}`);
    },
    setSlowMode(topicId, seconds, enabledUntil) {
      const data = {
        seconds
      };
      data.enabled_until = enabledUntil;
      return (0, _ajax.ajax)(`/t/${topicId}/slow_mode`, {
        type: "PUT",
        data
      });
    },
    async applyTransformations(topics) {
      await (0, _modelTransformers.applyModelTransformations)("topic", topics);
    }
  });
  function moveResult(result) {
    if (result.success) {
      // We should be hesitant to flush the map but moving ids is one rare case
      (0, _store.flushMap)();
      return result;
    }
    throw new Error("error moving posts topic");
  }
  function movePosts(topicId, data) {
    return (0, _ajax.ajax)(`/t/${topicId}/move-posts`, {
      type: "POST",
      data
    }).then(moveResult);
  }
  function mergeTopic(topicId, data) {
    return (0, _ajax.ajax)(`/t/${topicId}/merge-topic`, {
      type: "POST",
      data
    }).then(moveResult);
  }
  function registerCustomLastUnreadUrlCallback(fn) {
    _customLastUnreadUrlCallbacks.push(fn);
  }

  // Should only be used in tests
  function clearCustomLastUnreadUrlCallbacks() {
    _customLastUnreadUrlCallbacks.clear();
  }
  var _default = Topic;
  _exports.default = _default;
});