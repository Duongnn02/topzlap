define("discourse/controllers/topic", ["exports", "discourse/models/category", "@ember/controller", "discourse/lib/url", "@ember/object/computed", "discourse-common/utils/decorators", "@ember/utils", "@ember/runloop", "discourse-common/lib/later", "discourse/models/bookmark", "discourse/models/composer", "@ember/object", "I18n", "discourse/models/post", "rsvp", "discourse/lib/quote-state", "discourse/models/topic", "discourse/models/topic-timer", "discourse/lib/ajax", "discourse/mixins/buffered-content", "discourse/lib/quote", "discourse-common/lib/object", "discourse/lib/utilities", "discourse/lib/render-topic-featured-link", "discourse/lib/ajax-error", "@ember/service", "discourse/lib/show-modal", "discourse/helpers/loading-spinner", "discourse/controllers/bookmark"], function (_exports, _category, _controller, _url, _computed, _decorators, _utils, _runloop, _later, _bookmark, _composer, _object, _I18n, _post, _rsvp, _quoteState, _topic, _topicTimer, _ajax, _bufferedContent, _quote, _object2, _utilities, _renderTopicFeaturedLink, _ajaxError, _service, _showModal, _loadingSpinner, _bookmark2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.registerCustomPostMessageCallback = registerCustomPostMessageCallback;
  _exports.resetCustomPostMessageCallbacks = resetCustomPostMessageCallbacks;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/category",0,"@ember/controller",0,"discourse/lib/url",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"@ember/utils",0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse/models/bookmark",0,"discourse/models/composer",0,"@ember/object",0,"I18n",0,"discourse/models/post",0,"rsvp",0,"discourse/lib/quote-state",0,"discourse/models/topic",0,"discourse/models/topic-timer",0,"discourse/lib/ajax",0,"discourse/mixins/buffered-content",0,"discourse/lib/quote",0,"discourse-common/lib/object",0,"discourse/lib/utilities",0,"discourse/lib/render-topic-featured-link",0,"discourse/lib/ajax-error",0,"@ember/service",0,"discourse/lib/show-modal",0,"discourse/helpers/loading-spinner",0,"discourse/controllers/bookmark"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let customPostMessageCallbacks = {};
  const RETRIES_ON_RATE_LIMIT = 4;
  function resetCustomPostMessageCallbacks() {
    customPostMessageCallbacks = {};
  }
  function registerCustomPostMessageCallback(type, callback) {
    if (customPostMessageCallbacks[type]) {
      throw new Error(`Error ${type} is an already registered post message!`);
    }
    customPostMessageCallbacks[type] = callback;
  }
  var _default = _controller.default.extend((0, _bufferedContent.bufferedProperty)("model"), (_dec = (0, _decorators.observes)("model.title", "category"), _dec2 = (0, _decorators.default)("model.postStream.loaded", "model.is_shared_draft"), _dec3 = (0, _decorators.default)("site.mobileView", "model.posts_count"), _dec4 = (0, _decorators.default)("model.postStream.posts", "model.postStream.postsWithPlaceholders"), _dec5 = (0, _decorators.default)("model.postStream.loadingFilter"), _dec6 = (0, _decorators.default)("model"), _dec7 = (0, _decorators.default)("model.isPrivateMessage", "model.category.id"), _dec8 = (0, _decorators.default)("model"), _dec9 = (0, _decorators.default)("model.isPrivateMessage"), _dec10 = (0, _decorators.default)("currentUser.can_send_private_messages"), _dec11 = (0, _decorators.default)("buffered.category_id"), _dec12 = (0, _decorators.default)("selectedPostIds", "model.postStream.posts", "selectedPostIds.[]", "model.postStream.posts.[]"), _dec13 = (0, _decorators.default)("selectedPostsCount", "selectedPosts", "selectedPosts.[]"), _dec14 = (0, _decorators.default)("selectedPostsCount", "model.postStream.isMegaTopic", "model.postStream.stream.length", "model.posts_count"), _dec15 = (0, _decorators.default)("selectedAllPosts", "model.postStream.isMegaTopic"), _dec16 = (0, _decorators.default)("currentUser.staff", "selectedPostsCount", "selectedAllPosts", "selectedPosts", "selectedPosts.[]"), _dec17 = (0, _decorators.default)("model.details.can_move_posts", "selectedPostsCount"), _dec18 = (0, _decorators.default)("currentUser.admin", "currentUser.staff", "siteSettings.moderators_change_post_ownership", "selectedPostsCount", "selectedPostsUsername"), _dec19 = (0, _decorators.default)("selectedPostsCount", "selectedPostsUsername", "selectedPosts", "selectedPosts.[]"), _dec20 = (0, _decorators.observes)("multiSelect"), _dec21 = (0, _decorators.observes)("model.postStream.loaded", "model.postStream.loadedAllPosts"), (_obj = {
    composer: (0, _service.inject)(),
    application: (0, _controller.inject)(),
    dialog: (0, _service.inject)(),
    documentTitle: (0, _service.inject)(),
    screenTrack: (0, _service.inject)(),
    multiSelect: false,
    selectedPostIds: null,
    editingTopic: false,
    queryParams: ["filter", "username_filters", "replies_to_post_number"],
    loadedAllPosts: (0, _computed.or)("model.postStream.loadedAllPosts", "model.postStream.loadingLastPost"),
    enteredAt: null,
    enteredIndex: null,
    retrying: false,
    userTriggeredProgress: null,
    _progressIndex: null,
    hasScrolled: null,
    username_filters: null,
    replies_to_post_number: null,
    filter: null,
    quoteState: null,
    currentPostId: null,
    userLastReadPostNumber: null,
    highestPostNumber: null,
    init() {
      this._super(...arguments);
      this._retryInProgress = false;
      this._retryRateLimited = false;
      this._newPostsInStream = [];
      this.appEvents.on("post:show-revision", this, "_showRevision");
      this.appEvents.on("post:created", this, () => {
        this._removeDeleteOnOwnerReplyBookmarks();
        this.appEvents.trigger("post-stream:refresh", {
          force: true
        });
      });
      this.setProperties({
        selectedPostIds: [],
        quoteState: new _quoteState.default()
      });
    },
    willDestroy() {
      this._super(...arguments);
      this.appEvents.off("post:show-revision", this, "_showRevision");
    },
    canRemoveTopicFeaturedLink: (0, _computed.and)("canEditTopicFeaturedLink", "buffered.featured_link"),
    updateQueryParams() {
      const filters = this.get("model.postStream.streamFilters");
      if (Object.keys(filters).length > 0) {
        this.setProperties(filters);
      } else {
        this.setProperties({
          username_filters: null,
          filter: null,
          replies_to_post_number: null
        });
      }
    },
    _titleChanged() {
      const title = this.get("model.title");
      if (!(0, _utils.isEmpty)(title)) {
        // force update lazily loaded titles
        this.send("refreshTitle");
      }
    },
    showSharedDraftControls(loaded, isSharedDraft) {
      return loaded && isSharedDraft;
    },
    showSelectedPostsAtBottom(mobileView, postsCount) {
      return mobileView && postsCount > 3;
    },
    postsToRender(posts, postsWithPlaceholders) {
      return this.capabilities.isAndroid ? posts : postsWithPlaceholders;
    },
    androidLoading(loading) {
      return this.capabilities.isAndroid && loading;
    },
    pmPath(topic) {
      return this.currentUser && this.currentUser.pmPath(topic);
    },
    _showRevision(postNumber, revision) {
      const post = this.model.get("postStream").postForPostNumber(postNumber);
      if (!post) {
        return;
      }
      (0, _runloop.schedule)("afterRender", () => this.send("showHistory", post, revision));
    },
    showCategoryChooser: (0, _computed.not)("model.isPrivateMessage"),
    gotoInbox(name) {
      let url = (0, _url.userPath)(`${this.get("currentUser.username_lower")}/messages`);
      if (name) {
        url = `${url}/group/${name}`;
      }
      _url.default.routeTo(url);
    },
    selectedQuery() {
      return post => this.postSelected(post);
    },
    canEditTopicFeaturedLink(isPrivateMessage, categoryId) {
      if (this.currentUser && this.currentUser.trust_level === 0) {
        return false;
      }
      if (!this.siteSettings.topic_featured_link_enabled || isPrivateMessage) {
        return false;
      }
      const categoryIds = this.site.get("topic_featured_link_allowed_category_ids");
      return categoryIds === undefined || !categoryIds.length || categoryIds.includes(categoryId);
    },
    featuredLinkDomain(topic) {
      return (0, _renderTopicFeaturedLink.extractLinkMeta)(topic).domain;
    },
    canEditTags(isPrivateMessage) {
      return this.site.get("can_tag_topics") && (!isPrivateMessage || this.site.get("can_tag_pms"));
    },
    canSendPms() {
      return this.currentUser?.can_send_private_messages;
    },
    minimumRequiredTags(categoryId) {
      return _category.default.findById(categoryId)?.minimumRequiredTags || 0;
    },
    _removeDeleteOnOwnerReplyBookmarks() {
      // the user has already navigated away from the topic. the PostCreator
      // in rails already handles deleting the bookmarks that need to be
      // based on auto_delete_preference; this is mainly used to clean up
      // the in-memory post stream and topic model
      if (!this.model) {
        return;
      }
      const posts = this.get("model.postStream.posts");
      if (posts) {
        posts.filter(post => post.bookmarked && post.bookmark_auto_delete_preference === _bookmark.AUTO_DELETE_PREFERENCES.ON_OWNER_REPLY).forEach(post => {
          post.clearBookmark();
          this.model.removeBookmark(post.bookmark_id);
        });
      }
      const forTopicBookmark = this.model.bookmarks.findBy("bookmarkable_type", "Topic");
      if (forTopicBookmark?.auto_delete_preference === _bookmark.AUTO_DELETE_PREFERENCES.ON_OWNER_REPLY) {
        this.model.removeBookmark(forTopicBookmark.id);
      }
    },
    _forceRefreshPostStream() {
      this.appEvents.trigger("post-stream:refresh", {
        force: true
      });
    },
    _updateSelectedPostIds(postIds) {
      const smallActionsPostIds = this._smallActionPostIds();
      this.selectedPostIds.pushObjects(postIds.filter(postId => !smallActionsPostIds.has(postId)));
      this.set("selectedPostIds", [...new Set(this.selectedPostIds)]);
      this._forceRefreshPostStream();
    },
    _smallActionPostIds() {
      const smallActionsPostIds = new Set();
      const posts = this.get("model.postStream.posts");
      if (posts && this.site) {
        const smallAction = this.site.get("post_types.small_action");
        const whisper = this.site.get("post_types.whisper");
        posts.forEach(post => {
          if (post.post_type === smallAction || !post.cooked && post.post_type === whisper) {
            smallActionsPostIds.add(post.id);
          }
        });
      }
      return smallActionsPostIds;
    },
    _loadPostIds(post) {
      if (this.loadingPostIds) {
        return;
      }
      const postStream = this.get("model.postStream");
      const url = `/t/${this.get("model.id")}/post_ids.json`;
      this.set("loadingPostIds", true);
      return (0, _ajax.ajax)(url, {
        data: (0, _object2.deepMerge)({
          post_number: post.get("post_number")
        }, postStream.get("streamFilters"))
      }).then(result => {
        result.post_ids.pushObject(post.get("id"));
        this._updateSelectedPostIds(result.post_ids);
      }).finally(() => {
        this.set("loadingPostIds", false);
      });
    },
    editTopic(event) {
      event?.preventDefault();
      if (this.get("model.details.can_edit")) {
        this.set("editingTopic", true);
      }
    },
    jumpTop(event) {
      if (event && (0, _utilities.modKeysPressed)(event).length > 0) {
        return false;
      }
      event?.preventDefault();
      _url.default.routeTo(this.get("model.firstPostUrl"), {
        skipIfOnScreen: false,
        keepFilter: true
      });
    },
    removeFeaturedLink(event) {
      event?.preventDefault();
      this.set("buffered.featured_link", null);
    },
    selectAll(event) {
      event?.preventDefault();
      const smallActionsPostIds = this._smallActionPostIds();
      this.set("selectedPostIds", [...this.get("model.postStream.stream").filter(postId => !smallActionsPostIds.has(postId))]);
      this._forceRefreshPostStream();
    },
    deselectAll(event) {
      event?.preventDefault();
      this.set("selectedPostIds", []);
      this._forceRefreshPostStream();
    },
    toggleMultiSelect(event) {
      event?.preventDefault();
      this.toggleProperty("multiSelect");
      this._forceRefreshPostStream();
    },
    actions: {
      topicCategoryChanged(categoryId) {
        this.set("buffered.category_id", categoryId);
      },
      topicTagsChanged(value) {
        this.set("buffered.tags", value);
      },
      deletePending(pending) {
        return (0, _ajax.ajax)(`/review/${pending.id}`, {
          type: "DELETE"
        }).then(() => {
          this.get("model.pending_posts").removeObject(pending);
        }).catch(_ajaxError.popupAjaxError);
      },
      showPostFlags(post) {
        return this.send("showFlags", post);
      },
      openFeatureTopic() {
        this.send("showFeatureTopic");
      },
      selectText() {
        const {
          postId,
          buffer,
          opts
        } = this.quoteState;
        const loadedPost = this.get("model.postStream").findLoadedPost(postId);
        const promise = loadedPost ? _rsvp.Promise.resolve(loadedPost) : this.get("model.postStream").loadPost(postId);
        return promise.then(post => {
          const composer = this.composer;
          const viewOpen = composer.get("model.viewOpen");

          // If we can't create a post, delegate to reply as new topic
          if (!viewOpen && !this.get("model.details.can_create_post")) {
            this.send("replyAsNewTopic", post);
            return;
          }
          const composerOpts = {
            action: _composer.default.REPLY,
            draftSequence: post.get("topic.draft_sequence"),
            draftKey: post.get("topic.draft_key")
          };
          if (post.get("post_number") === 1) {
            composerOpts.topic = post.get("topic");
          } else {
            composerOpts.post = post;
          }

          // If the composer is associated with a different post, we don't change it.
          const composerPost = composer.get("model.post");
          if (composerPost && composerPost.get("id") !== this.get("post.id")) {
            composerOpts.post = composerPost;
          }
          const quotedText = (0, _quote.buildQuote)(post, buffer, opts);
          composerOpts.quote = quotedText;
          if (composer.get("model.viewOpen")) {
            this.appEvents.trigger("composer:insert-block", quotedText);
          } else if (composer.get("model.viewDraft")) {
            const model = composer.get("model");
            model.set("reply", model.get("reply") + "\n" + quotedText);
            composer.send("openIfDraft");
          } else {
            composer.open(composerOpts);
          }
        });
      },
      fillGapBefore(args) {
        return this.get("model.postStream").fillGapBefore(args.post, args.gap);
      },
      fillGapAfter(args) {
        return this.get("model.postStream").fillGapAfter(args.post, args.gap);
      },
      currentPostChanged(event) {
        const {
          post
        } = event;
        if (!post) {
          return;
        }
        this.set("currentPostId", post.id);
        const postNumber = post.get("post_number");
        const topic = this.model;
        topic.set("currentPost", postNumber);
        if (postNumber > (topic.get("last_read_post_number") || 0)) {
          topic.set("last_read_post_id", post.get("id"));
          topic.set("last_read_post_number", postNumber);
        }
        this.send("postChangedRoute", postNumber);
        this._progressIndex = topic.get("postStream").progressIndexOfPost(post);
        this.appEvents.trigger("topic:current-post-changed", {
          post
        });
      },
      currentPostScrolled(event) {
        const total = this.get("model.postStream.filteredPostsCount");
        const percent = parseFloat(this._progressIndex + event.percent - 1) / total;
        this.appEvents.trigger("topic:current-post-scrolled", {
          postIndex: this._progressIndex,
          percent: Math.max(Math.min(percent, 1.0), 0.0)
        });
      },
      // Called when the topmost visible post on the page changes.
      topVisibleChanged(event) {
        const {
          post,
          refresh
        } = event;
        if (!post) {
          return;
        }
        const postStream = this.get("model.postStream");
        const firstLoadedPost = postStream.get("posts.firstObject");
        if (post.get && post.get("post_number") === 1) {
          return;
        }
        if (firstLoadedPost && firstLoadedPost === post) {
          postStream.prependMore().then(() => refresh());
        }
      },
      // Called the the bottommost visible post on the page changes.
      bottomVisibleChanged(event) {
        const {
          post,
          refresh
        } = event;
        const postStream = this.get("model.postStream");
        const lastLoadedPost = postStream.get("posts.lastObject");
        if (lastLoadedPost && lastLoadedPost === post && postStream.get("canAppendMore")) {
          postStream.appendMore().then(() => refresh());
          // show loading stuff
          refresh();
        }
      },
      showSummary() {
        return this.get("model.postStream").showSummary().then(() => {
          this.updateQueryParams();
        });
      },
      cancelFilter() {
        let nearestPost = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        const postStream = this.get("model.postStream");
        if (!nearestPost) {
          const loadedPost = postStream.findLoadedPost(this.currentPostId);
          if (loadedPost) {
            nearestPost = loadedPost.post_number;
          } else {
            postStream.findPostsByIds([this.currentPostId]).then(arr => {
              nearestPost = arr[0].post_number;
            });
          }
        }
        postStream.cancelFilter();
        postStream.refresh({
          nearPost: nearestPost,
          forceLoad: true
        }).then(() => {
          _url.default.routeTo(this.model.urlForPostNumber(nearestPost));
          this.updateQueryParams();
        });
      },
      removeAllowedUser(user) {
        return this.get("model.details").removeAllowedUser(user).then(() => {
          if (this.currentUser.id === user.id) {
            this.transitionToRoute("userPrivateMessages", user);
          }
        });
      },
      removeAllowedGroup(group) {
        return this.get("model.details").removeAllowedGroup(group);
      },
      deleteTopic() {
        let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.deleteTopic(opts);
      },
      // Archive a PM (as opposed to archiving a topic)
      toggleArchiveMessage() {
        const topic = this.model;
        if (topic.get("archiving")) {
          return;
        }
        const backToInbox = () => this.gotoInbox(topic.get("inboxGroupName"));
        if (topic.get("message_archived")) {
          topic.moveToInbox().then(backToInbox);
        } else {
          topic.archiveMessage().then(backToInbox);
        }
      },
      deferTopic() {
        const {
          screenTrack,
          currentUser
        } = this;
        const topic = this.model;
        screenTrack.reset();
        screenTrack.stop();
        const goToPath = topic.get("isPrivateMessage") ? currentUser.pmPath(topic) : "/";
        (0, _ajax.ajax)("/t/" + topic.get("id") + "/timings.json?last=1", {
          type: "DELETE"
        }).then(() => {
          const highestSeenByTopic = this.session.get("highestSeenByTopic");
          highestSeenByTopic[topic.get("id")] = null;
          _url.default.routeTo(goToPath);
        }).catch(_ajaxError.popupAjaxError);
      },
      editFirstPost() {
        this.model.firstPost().then(firstPost => this.send("editPost", firstPost));
      },
      // Post related methods
      replyToPost(post) {
        if (this.currentUser && this.siteSettings.enable_user_tips) {
          this.currentUser.hideUserTipForever("post_menu");
        }
        const composerController = this.composer;
        const topic = post ? post.get("topic") : this.model;
        const quoteState = this.quoteState;
        const postStream = this.get("model.postStream");
        this.appEvents.trigger("page:compose-reply", topic);
        if (!postStream || !topic || !topic.get("details.can_create_post")) {
          return;
        }
        const quotedPost = postStream.findLoadedPost(quoteState.postId);
        const quotedText = (0, _quote.buildQuote)(quotedPost, quoteState.buffer, quoteState.opts);
        quoteState.clear();
        if (composerController.get("model.topic.id") === topic.get("id") && composerController.get("model.action") === _composer.default.REPLY) {
          composerController.set("model.post", post);
          composerController.set("model.composeState", _composer.default.OPEN);
          this.appEvents.trigger("composer:insert-block", quotedText.trim());
        } else {
          const opts = {
            action: _composer.default.REPLY,
            draftKey: topic.get("draft_key"),
            draftSequence: topic.get("draft_sequence")
          };
          if (quotedText) {
            opts.quote = quotedText;
          }
          if (post && post.get("post_number") !== 1) {
            opts.post = post;
          } else {
            opts.topic = topic;
          }
          composerController.open(opts);
        }
        return false;
      },
      recoverPost(post) {
        post.get("post_number") === 1 ? this.recoverTopic() : post.recover();
      },
      deletePost(post, opts) {
        if (post.get("post_number") === 1) {
          return this.deleteTopic(opts);
        } else if (!opts?.force_destroy && !post.can_delete || opts?.force_destroy && !post.can_permanently_delete) {
          return false;
        }
        const user = this.currentUser;
        const refresh = () => this.appEvents.trigger("post-stream:refresh");
        const hasReplies = post.get("reply_count") > 0;
        const loadedPosts = this.get("model.postStream.posts");
        if (user.get("staff") && hasReplies) {
          (0, _ajax.ajax)(`/posts/${post.id}/reply-ids.json`).then(replies => {
            if (replies.length === 0) {
              return post.destroy(user, opts).then(refresh).catch(error => {
                (0, _ajaxError.popupAjaxError)(error);
                post.undoDeleteState();
              });
            }
            const buttons = [];
            const directReplyIds = replies.filter(r => r.level === 1).map(r => r.id);
            buttons.push({
              label: _I18n.default.t("post.controls.delete_replies.direct_replies", {
                count: directReplyIds.length
              }),
              class: "btn-primary",
              action: () => {
                loadedPosts.forEach(p => (p === post || directReplyIds.includes(p.id)) && p.setDeletedState(user));
                _post.default.deleteMany([post.id, ...directReplyIds]).then(refresh).catch(_ajaxError.popupAjaxError);
              }
            });
            if (replies.some(r => r.level > 1)) {
              buttons.push({
                label: _I18n.default.t("post.controls.delete_replies.all_replies", {
                  count: replies.length
                }),
                action: () => {
                  loadedPosts.forEach(p => (p === post || replies.some(r => r.id === p.id)) && p.setDeletedState(user));
                  _post.default.deleteMany([post.id, ...replies.map(r => r.id)]).then(refresh).catch(_ajaxError.popupAjaxError);
                }
              });
            }
            buttons.push({
              label: _I18n.default.t("post.controls.delete_replies.just_the_post"),
              action: () => {
                post.destroy(user, opts).then(refresh).catch(error => {
                  (0, _ajaxError.popupAjaxError)(error);
                  post.undoDeleteState();
                });
              }
            });
            buttons.push({
              label: _I18n.default.t("cancel"),
              class: "btn-flat"
            });
            this.dialog.alert({
              title: _I18n.default.t("post.controls.delete_replies.confirm"),
              buttons
            });
          });
        } else {
          return post.destroy(user, opts).then(refresh).catch(error => {
            (0, _ajaxError.popupAjaxError)(error);
            post.undoDeleteState();
          });
        }
      },
      deletePostWithConfirmation(post, opts) {
        this.dialog.yesNoConfirm({
          message: _I18n.default.t("post.confirm_delete"),
          didConfirm: () => this.send("deletePost", post, opts)
        });
      },
      permanentlyDeletePost(post) {
        return this.dialog.yesNoConfirm({
          message: _I18n.default.t("post.controls.permanently_delete_confirmation"),
          didConfirm: () => {
            this.send("deletePost", post, {
              force_destroy: true
            });
          }
        });
      },
      editPost(post) {
        if (!this.currentUser) {
          return this.dialog.alert(_I18n.default.t("post.controls.edit_anonymous"));
        } else if (!post.can_edit) {
          return false;
        }
        const composer = this.composer;
        let topic = this.model;
        const composerModel = composer.get("model");
        let editingFirst = composerModel && (post.get("firstPost") || composerModel.get("editingFirstPost"));
        let editingSharedDraft = false;
        let draftsCategoryId = this.get("site.shared_drafts_category_id");
        if (draftsCategoryId && draftsCategoryId === topic.get("category.id")) {
          editingSharedDraft = post.get("firstPost");
        }
        const opts = {
          post,
          action: editingSharedDraft ? _composer.default.EDIT_SHARED_DRAFT : _composer.default.EDIT,
          draftKey: post.get("topic.draft_key"),
          draftSequence: post.get("topic.draft_sequence")
        };
        if (editingSharedDraft) {
          opts.destinationCategoryId = topic.get("destination_category_id");
        }

        // Cancel and reopen the composer for the first post
        if (editingFirst) {
          composer.cancelComposer().then(() => composer.open(opts));
        } else {
          composer.open(opts);
        }
      },
      toggleBookmark(post) {
        if (!this.currentUser) {
          return this.dialog.alert(_I18n.default.t("bookmarks.not_bookmarked"));
        } else if (post) {
          const bookmarkForPost = this.model.bookmarks.find(bookmark => bookmark.bookmarkable_id === post.id && bookmark.bookmarkable_type === "Post");
          return this._modifyPostBookmark(bookmarkForPost || _bookmark.default.createFor(this.currentUser, "Post", post.id), post);
        } else {
          return this._toggleTopicLevelBookmark().then(changedIds => {
            if (!changedIds) {
              return;
            }
            changedIds.forEach(id => this.appEvents.trigger("post-stream:refresh", {
              id
            }));
          });
        }
      },
      jumpToIndex(index) {
        this._jumpToIndex(index);
      },
      jumpToDate(date) {
        this._jumpToDate(date);
      },
      jumpToPostPrompt() {
        const topic = this.model;
        const modal = (0, _showModal.default)("jump-to-post", {
          modalClass: "jump-to-post-modal"
        });
        modal.setProperties({
          topic,
          postNumber: null,
          jumpToIndex: index => this.send("jumpToIndex", index),
          jumpToDate: date => this.send("jumpToDate", date)
        });
      },
      jumpToPost(postNumber) {
        this._jumpToPostNumber(postNumber);
      },
      jumpBottom() {
        // When a topic only has one lengthy post
        const jumpEnd = this.model.highest_post_number === 1 ? true : false;
        _url.default.routeTo(this.get("model.lastPostUrl"), {
          skipIfOnScreen: false,
          jumpEnd,
          keepFilter: true
        });
      },
      jumpEnd() {
        this.appEvents.trigger("topic:jump-to-post", this.get("model.highest_post_number"));
        _url.default.routeTo(this.get("model.lastPostUrl"), {
          jumpEnd: true,
          keepFilter: true
        });
      },
      jumpUnread() {
        this._jumpToPostId(this.get("model.last_read_post_id"));
      },
      jumpToPostId(postId) {
        this._jumpToPostId(postId);
      },
      togglePostSelection(post) {
        const selected = this.selectedPostIds;
        selected.includes(post.id) ? selected.removeObject(post.id) : selected.addObject(post.id);
      },
      selectReplies(post) {
        (0, _ajax.ajax)(`/posts/${post.id}/reply-ids.json`).then(replies => {
          const replyIds = replies.map(r => r.id);
          const postIds = [...this.selectedPostIds, post.id, ...replyIds];
          this.set("selectedPostIds", [...new Set(postIds)]);
          this._forceRefreshPostStream();
        });
      },
      selectBelow(post) {
        if (this.get("model.postStream.isMegaTopic")) {
          this._loadPostIds(post);
        } else {
          const stream = [...this.get("model.postStream.stream")];
          const below = stream.slice(stream.indexOf(post.id));
          this._updateSelectedPostIds(below);
        }
      },
      deleteSelected() {
        const user = this.currentUser;
        this.dialog.yesNoConfirm({
          message: _I18n.default.t("post.delete.confirm", {
            count: this.selectedPostsCount
          }),
          didConfirm: () => {
            // If all posts are selected, it's the same thing as deleting the topic
            if (this.selectedAllPosts) {
              return this.deleteTopic();
            }
            _post.default.deleteMany(this.selectedPostIds);
            this.get("model.postStream.posts").forEach(p => this.postSelected(p) && p.setDeletedState(user));
            this.send("toggleMultiSelect");
          }
        });
      },
      mergePosts() {
        this.dialog.yesNoConfirm({
          message: _I18n.default.t("post.merge.confirm", {
            count: this.selectedPostsCount
          }),
          didConfirm: () => {
            _post.default.mergePosts(this.selectedPostIds);
            this.send("toggleMultiSelect");
          }
        });
      },
      changePostOwner(post) {
        this.set("selectedPostIds", [post.id]);
        this.send("changeOwner");
      },
      lockPost(post) {
        return post.updatePostField("locked", true);
      },
      unlockPost(post) {
        return post.updatePostField("locked", false);
      },
      grantBadge(post) {
        this.set("selectedPostIds", [post.id]);
        this.send("showGrantBadgeModal");
      },
      changeNotice(post) {
        return new _rsvp.Promise(function (resolve, reject) {
          const modal = (0, _showModal.default)("change-post-notice", {
            model: post
          });
          modal.setProperties({
            resolve,
            reject,
            notice: post.notice ? post.notice.raw : ""
          });
        });
      },
      filterParticipant(user) {
        this.get("model.postStream").filterParticipant(user.username).then(() => this.updateQueryParams);
      },
      cancelEditingTopic() {
        this.set("editingTopic", false);
        this.rollbackBuffer();
      },
      finishedEditingTopic() {
        if (!this.editingTopic) {
          return;
        }

        // save the modifications
        const props = this.get("buffered.buffer");
        _topic.default.update(this.model, props, {
          fastEdit: true
        }).then(() => {
          // We roll back on success here because `update` saves the properties to the topic
          this.rollbackBuffer();
          this.set("editingTopic", false);
        }).catch(_ajaxError.popupAjaxError);
      },
      expandHidden(post) {
        return post.expandHidden();
      },
      toggleVisibility() {
        this.model.toggleStatus("visible");
      },
      toggleClosed() {
        const topic = this.model;
        this.model.toggleStatus("closed").then(result => {
          topic.set("topic_status_update", result.topic_status_update);
        });
      },
      makeBanner() {
        this.model.makeBanner();
      },
      removeBanner() {
        this.model.removeBanner();
      },
      togglePinned() {
        const value = this.get("model.pinned_at") ? false : true,
          topic = this.model,
          until = this.get("model.pinnedInCategoryUntil");

        // optimistic update
        topic.setProperties({
          pinned_at: value ? moment() : null,
          pinned_globally: false,
          pinned_until: value ? until : null
        });
        return topic.saveStatus("pinned", value, until);
      },
      pinGlobally() {
        const topic = this.model,
          until = this.get("model.pinnedGloballyUntil");

        // optimistic update
        topic.setProperties({
          pinned_at: moment(),
          pinned_globally: true,
          pinned_until: until
        });
        return topic.saveStatus("pinned_globally", true, until);
      },
      toggleArchived() {
        this.model.toggleStatus("archived");
      },
      clearPin() {
        this.model.clearPin();
      },
      togglePinnedForUser() {
        if (this.get("model.pinned_at")) {
          const topic = this.model;
          if (topic.get("pinned")) {
            topic.clearPin();
          } else {
            topic.rePin();
          }
        }
      },
      replyAsNewTopic(post) {
        const composerController = this.composer;
        const {
          quoteState
        } = this;
        const quotedText = (0, _quote.buildQuote)(post, quoteState.buffer, quoteState.opts);
        quoteState.clear();
        let options;
        if (this.get("model.isPrivateMessage")) {
          let users = this.get("model.details.allowed_users");
          let groups = this.get("model.details.allowed_groups");
          let recipients = [];
          users.forEach(user => recipients.push(user.username));
          groups.forEach(group => recipients.push(group.name));
          recipients = recipients.join();
          options = {
            action: _composer.default.PRIVATE_MESSAGE,
            archetypeId: "private_message",
            draftKey: post.topic.draft_key,
            recipients
          };
        } else {
          options = {
            action: _composer.default.CREATE_TOPIC,
            draftKey: post.topic.draft_key,
            topicCategoryId: this.get("model.category.id"),
            prioritizedCategoryId: this.get("model.category.id")
          };
        }
        composerController.open(options).then(() => {
          const title = (0, _utilities.escapeExpression)(this.model.title);
          const postUrl = `${location.protocol}//${location.host}${post.url}`;
          const postLink = `[${title}](${postUrl})`;
          const text = `${_I18n.default.t("post.continue_discussion", {
            postLink
          })}\n\n${quotedText}`;
          composerController.model.prependText(text, {
            new_line: true
          });
        });
      },
      retryLoading() {
        this.set("retrying", true);
        const rollback = () => this.set("retrying", false);
        this.get("model.postStream").refresh().then(rollback, rollback);
      },
      toggleWiki(post) {
        return post.updatePostField("wiki", !post.get("wiki"));
      },
      togglePostType(post) {
        const regular = this.site.get("post_types.regular");
        const moderator = this.site.get("post_types.moderator_action");
        return post.updatePostField("post_type", post.get("post_type") === moderator ? regular : moderator);
      },
      rebakePost(post) {
        return post.rebake();
      },
      unhidePost(post) {
        return post.unhide();
      },
      convertToPublicTopic() {
        (0, _showModal.default)("convert-to-public-topic", {
          model: this.model,
          modalClass: "convert-to-public-topic"
        });
      },
      convertToPrivateMessage() {
        this.model.convertTopic("private").then(() => window.location.reload()).catch(_ajaxError.popupAjaxError);
      },
      resetBumpDate() {
        this.model.resetBumpDate();
      },
      removeTopicTimer(statusType, topicTimer) {
        _topicTimer.default.update(this.get("model.id"), null, null, statusType, null).then(() => this.set(`model.${topicTimer}`, _object.default.create({}))).catch(error => (0, _ajaxError.popupAjaxError)(error));
      }
    },
    _jumpToIndex(index) {
      const postStream = this.get("model.postStream");
      if (postStream.get("isMegaTopic")) {
        this._jumpToPostNumber(index);
      } else {
        const stream = postStream.get("stream");
        const streamIndex = Math.max(1, Math.min(stream.length, index));
        this._jumpToPostId(stream[streamIndex - 1]);
      }
    },
    _jumpToDate(date) {
      const postStream = this.get("model.postStream");
      postStream.loadNearestPostToDate(date).then(post => {
        _url.default.routeTo(this.model.urlForPostNumber(post.get("post_number")));
      }).catch(() => {
        this._jumpToIndex(postStream.get("topic.highest_post_number"));
      });
    },
    _jumpToPostNumber(postNumber) {
      const postStream = this.get("model.postStream");
      const post = postStream.get("posts").findBy("post_number", postNumber);
      if (post) {
        _url.default.routeTo(this.model.urlForPostNumber(post.get("post_number")));
      } else {
        postStream.loadPostByPostNumber(postNumber).then(p => {
          _url.default.routeTo(this.model.urlForPostNumber(p.get("post_number")));
        });
      }
    },
    _jumpToPostId(postId) {
      if (!postId) {
        // eslint-disable-next-line no-console
        console.warn("jump-post code broken - requested an index outside the stream array");
        return;
      }
      this.appEvents.trigger("topic:jump-to-post", postId);
      const topic = this.model;
      const postStream = topic.get("postStream");
      const post = postStream.findLoadedPost(postId);
      if (post) {
        _url.default.routeTo(topic.urlForPostNumber(post.get("post_number")), {
          keepFilter: true
        });
      } else {
        // need to load it
        postStream.findPostsByIds([postId]).then(arr => {
          _url.default.routeTo(topic.urlForPostNumber(arr[0].get("post_number")), {
            keepFilter: true
          });
        });
      }
    },
    _modifyTopicBookmark(bookmark) {
      return (0, _bookmark2.openBookmarkModal)(bookmark, {
        onAfterSave: savedData => {
          this._syncBookmarks(savedData);
          this.model.set("bookmarking", false);
          this.model.set("bookmarked", true);
          this.model.incrementProperty("bookmarksWereChanged");
          this.appEvents.trigger("bookmarks:changed", savedData, bookmark.attachedTo());
        },
        onAfterDelete: (topicBookmarked, bookmarkId) => {
          this.model.removeBookmark(bookmarkId);
        }
      });
    },
    _modifyPostBookmark(bookmark, post) {
      return (0, _bookmark2.openBookmarkModal)(bookmark, {
        onCloseWithoutSaving: () => {
          post.appEvents.trigger("post-stream:refresh", {
            id: bookmark.bookmarkable_id
          });
        },
        onAfterSave: savedData => {
          this._syncBookmarks(savedData);
          this.model.set("bookmarking", false);
          post.createBookmark(savedData);
          this.model.afterPostBookmarked(post, savedData);
          return [post.id];
        },
        onAfterDelete: (topicBookmarked, bookmarkId) => {
          this.model.removeBookmark(bookmarkId);
          post.deleteBookmark(topicBookmarked);
        }
      });
    },
    _syncBookmarks(data) {
      if (!this.model.bookmarks) {
        this.model.set("bookmarks", []);
      }
      const bookmark = this.model.bookmarks.findBy("id", data.id);
      if (!bookmark) {
        this.model.bookmarks.pushObject(_bookmark.default.create(data));
      } else {
        bookmark.reminder_at = data.reminder_at;
        bookmark.name = data.name;
        bookmark.auto_delete_preference = data.auto_delete_preference;
      }
    },
    async _toggleTopicLevelBookmark() {
      if (this.model.bookmarking) {
        return _rsvp.Promise.resolve();
      }
      if (this.model.bookmarkCount > 1) {
        return this._maybeClearAllBookmarks();
      }
      if (this.model.bookmarkCount === 1) {
        const topicBookmark = this.model.bookmarks.findBy("bookmarkable_type", "Topic");
        if (topicBookmark) {
          return this._modifyTopicBookmark(topicBookmark);
        } else {
          const bookmark = this.model.bookmarks[0];
          const post = await this.model.postById(bookmark.bookmarkable_id);
          return this._modifyPostBookmark(bookmark, post);
        }
      }
      if (this.model.bookmarkCount === 0) {
        return this._modifyTopicBookmark(_bookmark.default.createFor(this.currentUser, "Topic", this.model.id));
      }
    },
    _maybeClearAllBookmarks() {
      return new _rsvp.Promise(resolve => {
        this.dialog.yesNoConfirm({
          message: _I18n.default.t("bookmarks.confirm_clear"),
          didConfirm: () => {
            return this.model.deleteBookmarks().then(() => resolve(this.model.clearBookmarks())).catch(_ajaxError.popupAjaxError).finally(() => {
              this.model.set("bookmarking", false);
            });
          },
          didCancel: () => {
            this.model.set("bookmarking", false);
            resolve();
          }
        });
      });
    },
    togglePinnedState() {
      this.send("togglePinnedForUser");
    },
    print() {
      if (this.siteSettings.max_prints_per_hour_per_user > 0) {
        window.open(this.get("model.printUrl"), "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=600,height=315");
      }
    },
    hasError: (0, _computed.or)("model.errorHtml", "model.errorMessage"),
    noErrorYet: (0, _computed.not)("hasError"),
    categories: (0, _computed.alias)("site.categoriesList"),
    selectedPostsCount: (0, _computed.alias)("selectedPostIds.length"),
    selectedPosts(selectedPostIds, loadedPosts) {
      return selectedPostIds.map(id => loadedPosts.find(p => p.id === id)).filter(post => post !== undefined);
    },
    selectedPostsUsername(selectedPostsCount, selectedPosts) {
      if (selectedPosts.length < 1 || selectedPostsCount > selectedPosts.length) {
        return undefined;
      }
      const username = selectedPosts[0].username;
      return selectedPosts.every(p => p.username === username) ? username : undefined;
    },
    selectedAllPosts(selectedPostsCount, isMegaTopic, postsCount, topicPostsCount) {
      if (isMegaTopic) {
        return selectedPostsCount >= topicPostsCount;
      } else {
        return selectedPostsCount >= postsCount;
      }
    },
    canSelectAll(selectedAllPosts, isMegaTopic) {
      return isMegaTopic ? false : !selectedAllPosts;
    },
    canDeselectAll: (0, _computed.alias)("selectedAllPosts"),
    canDeleteSelected(isStaff, selectedPostsCount, selectedAllPosts, selectedPosts) {
      return selectedPostsCount > 0 && (selectedAllPosts && isStaff || selectedPosts.every(p => p.can_delete));
    },
    canMergeTopic(canMovePosts, selectedPostsCount) {
      return canMovePosts && selectedPostsCount > 0;
    },
    canChangeOwner(isAdmin, isStaff, modChangePostOwner, selectedPostsCount, selectedPostsUsername) {
      return (isAdmin || modChangePostOwner && isStaff) && selectedPostsCount > 0 && selectedPostsUsername !== undefined;
    },
    canMergePosts(selectedPostsCount, selectedPostsUsername, selectedPosts) {
      return selectedPostsCount > 1 && selectedPostsUsername !== undefined && selectedPosts.every(p => p.can_delete);
    },
    _multiSelectChanged() {
      this.set("selectedPostIds", []);
    },
    postSelected(post) {
      return this.selectedAllPost || this.selectedPostIds.includes(post.id);
    },
    loadingHTML() {
      return _loadingSpinner.spinnerHTML;
    },
    recoverTopic() {
      this.model.recover();
    },
    deleteTopic() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (opts.force_destroy) {
        return this.model.destroy(this.currentUser, opts);
      }
      if (this.model.views > this.siteSettings.min_topic_views_for_delete_confirm) {
        this.deleteTopicModal();
      } else {
        this.model.destroy(this.currentUser, opts);
      }
    },
    deleteTopicModal() {
      (0, _showModal.default)("delete-topic-confirm", {
        model: this.model,
        title: "topic.actions.delete"
      });
    },
    retryOnRateLimit(times, promise, topicId) {
      const currentTopicId = this.get("model.id");
      topicId = topicId || currentTopicId;
      if (topicId !== currentTopicId) {
        // we navigated to another topic, so skip
        return;
      }
      if (this._retryRateLimited || times <= 0) {
        return;
      }
      if (this._retryInProgress) {
        (0, _later.default)(() => {
          this.retryOnRateLimit(times, promise, topicId);
        }, 100);
        return;
      }
      this._retryInProgress = true;
      promise().catch(e => {
        const xhr = e.jqXHR;
        if (xhr && xhr.status === 429 && xhr.responseJSON && xhr.responseJSON.extras && xhr.responseJSON.extras.wait_seconds) {
          let waitSeconds = xhr.responseJSON.extras.wait_seconds;
          if (waitSeconds < 5) {
            waitSeconds = 5;
          }
          this._retryRateLimited = true;
          (0, _later.default)(() => {
            this._retryRateLimited = false;
            this.retryOnRateLimit(times - 1, promise, topicId);
          }, waitSeconds * 1000);
        }
      }).finally(() => {
        this._retryInProgress = false;
      });
    },
    subscribe() {
      this.unsubscribe();
      this.messageBus.subscribe(`/topic/${this.get("model.id")}`, this.onMessage, this.get("model.message_bus_last_id"));
    },
    unsubscribe() {
      // never unsubscribe when navigating from topic to topic
      if (!this.get("model.id")) {
        return;
      }
      this.messageBus.unsubscribe("/topic/*", this.onMessage);
    },
    onMessage(data) {
      const topic = this.model;
      const refresh = args => this.appEvents.trigger("post-stream:refresh", args);
      if ((0, _utils.isPresent)(data.notification_level_change)) {
        topic.set("details.notification_level", data.notification_level_change);
        topic.set("details.notifications_reason_id", data.notifications_reason_id);
        return;
      }
      const postStream = this.get("model.postStream");
      if (data.reload_topic) {
        topic.reload().then(() => {
          this.send("postChangedRoute", topic.get("post_number") || 1);
          this.appEvents.trigger("header:update-topic", topic);
          if (data.refresh_stream) {
            postStream.refresh();
          }
        });
        return;
      }
      switch (data.type) {
        case "acted":
          postStream.triggerChangedPost(data.id, data.updated_at, {
            preserveCooked: true
          }).then(() => refresh({
            id: data.id,
            refreshLikes: true
          }));
          break;
        case "read":
          {
            postStream.triggerReadPost(data.id, data.readers_count).then(() => refresh({
              id: data.id,
              refreshLikes: true
            }));
            break;
          }
        case "liked":
        case "unliked":
          {
            postStream.triggerLikedPost(data.id, data.likes_count, data.user_id, data.type).then(() => refresh({
              id: data.id,
              refreshLikes: true
            }));
            break;
          }
        case "revised":
        case "rebaked":
          {
            postStream.triggerChangedPost(data.id, data.updated_at).then(() => refresh({
              id: data.id
            }));
            break;
          }
        case "deleted":
          {
            postStream.triggerDeletedPost(data.id).then(() => refresh({
              id: data.id
            }));
            break;
          }
        case "destroyed":
          {
            postStream.triggerDestroyedPost(data.id).then(() => refresh({
              id: data.id
            }));
            break;
          }
        case "recovered":
          {
            postStream.triggerRecoveredPost(data.id).then(() => refresh({
              id: data.id
            }));
            break;
          }
        case "created":
          {
            this._newPostsInStream.push(data.id);
            this.retryOnRateLimit(RETRIES_ON_RATE_LIMIT, () => {
              const postIds = this._newPostsInStream;
              this._newPostsInStream = [];
              return postStream.triggerNewPostsInStream(postIds, {
                background: true
              }).then(() => refresh()).catch(e => {
                this._newPostsInStream = postIds.concat(this._newPostsInStream);
                throw e;
              });
            });
            if (this.get("currentUser.id") !== data.user_id) {
              this.documentTitle.incrementBackgroundContextCount();
            }
            break;
          }
        case "move_to_inbox":
          {
            topic.set("message_archived", false);
            break;
          }
        case "archived":
          {
            topic.set("message_archived", true);
            break;
          }
        case "stats":
          {
            let updateStream = false;
            ["last_posted_at", "like_count", "posts_count"].forEach(property => {
              const value = data[property];
              if (typeof value !== "undefined") {
                topic.set(property, value);
                updateStream = true;
              }
            });
            if (data["last_poster"]) {
              topic.details.set("last_poster", data["last_poster"]);
              updateStream = true;
            }
            if (updateStream) {
              postStream.triggerChangedTopicStats().then(firstPostId => refresh({
                id: firstPostId
              }));
            }
            break;
          }
        default:
          {
            let callback = customPostMessageCallbacks[data.type];
            if (callback) {
              callback(this, data);
            } else {
              // eslint-disable-next-line no-console
              console.warn("unknown topic bus message type", data);
            }
          }
      }
    },
    reply() {
      this.replyToPost();
    },
    readPosts(topicId, postNumbers) {
      const topic = this.model;
      const postStream = topic.get("postStream");
      if (topic.get("id") === topicId) {
        postStream.get("posts").forEach(post => {
          if (!post.read && postNumbers.includes(post.post_number)) {
            post.set("read", true);
            this.appEvents.trigger("post-stream:refresh", {
              id: post.get("id")
            });
          }
        });
        if (this.siteSettings.automatically_unpin_topics && this.currentUser && this.currentUser.user_option.automatically_unpin_topics) {
          // automatically unpin topics when the user reaches the bottom
          const max = Math.max(...postNumbers);
          if (topic.get("pinned") && max >= topic.get("highest_post_number")) {
            (0, _runloop.next)(() => topic.clearPin());
          }
        }
      }
    },
    _showFooter() {
      const showFooter = this.get("model.postStream.loaded") && this.get("model.postStream.loadedAllPosts");
      this.set("application.showFooter", showFooter);
    }
  }, (_applyDecoratedDescriptor(_obj, "_titleChanged", [_dec], Object.getOwnPropertyDescriptor(_obj, "_titleChanged"), _obj), _applyDecoratedDescriptor(_obj, "showSharedDraftControls", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showSharedDraftControls"), _obj), _applyDecoratedDescriptor(_obj, "showSelectedPostsAtBottom", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showSelectedPostsAtBottom"), _obj), _applyDecoratedDescriptor(_obj, "postsToRender", [_dec4], Object.getOwnPropertyDescriptor(_obj, "postsToRender"), _obj), _applyDecoratedDescriptor(_obj, "androidLoading", [_dec5], Object.getOwnPropertyDescriptor(_obj, "androidLoading"), _obj), _applyDecoratedDescriptor(_obj, "pmPath", [_dec6], Object.getOwnPropertyDescriptor(_obj, "pmPath"), _obj), _applyDecoratedDescriptor(_obj, "selectedQuery", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "selectedQuery"), _obj), _applyDecoratedDescriptor(_obj, "canEditTopicFeaturedLink", [_dec7], Object.getOwnPropertyDescriptor(_obj, "canEditTopicFeaturedLink"), _obj), _applyDecoratedDescriptor(_obj, "featuredLinkDomain", [_dec8], Object.getOwnPropertyDescriptor(_obj, "featuredLinkDomain"), _obj), _applyDecoratedDescriptor(_obj, "canEditTags", [_dec9], Object.getOwnPropertyDescriptor(_obj, "canEditTags"), _obj), _applyDecoratedDescriptor(_obj, "canSendPms", [_dec10], Object.getOwnPropertyDescriptor(_obj, "canSendPms"), _obj), _applyDecoratedDescriptor(_obj, "minimumRequiredTags", [_dec11], Object.getOwnPropertyDescriptor(_obj, "minimumRequiredTags"), _obj), _applyDecoratedDescriptor(_obj, "editTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "editTopic"), _obj), _applyDecoratedDescriptor(_obj, "jumpTop", [_object.action], Object.getOwnPropertyDescriptor(_obj, "jumpTop"), _obj), _applyDecoratedDescriptor(_obj, "removeFeaturedLink", [_object.action], Object.getOwnPropertyDescriptor(_obj, "removeFeaturedLink"), _obj), _applyDecoratedDescriptor(_obj, "selectAll", [_object.action], Object.getOwnPropertyDescriptor(_obj, "selectAll"), _obj), _applyDecoratedDescriptor(_obj, "deselectAll", [_object.action], Object.getOwnPropertyDescriptor(_obj, "deselectAll"), _obj), _applyDecoratedDescriptor(_obj, "toggleMultiSelect", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleMultiSelect"), _obj), _applyDecoratedDescriptor(_obj, "selectedPosts", [_dec12], Object.getOwnPropertyDescriptor(_obj, "selectedPosts"), _obj), _applyDecoratedDescriptor(_obj, "selectedPostsUsername", [_dec13], Object.getOwnPropertyDescriptor(_obj, "selectedPostsUsername"), _obj), _applyDecoratedDescriptor(_obj, "selectedAllPosts", [_dec14], Object.getOwnPropertyDescriptor(_obj, "selectedAllPosts"), _obj), _applyDecoratedDescriptor(_obj, "canSelectAll", [_dec15], Object.getOwnPropertyDescriptor(_obj, "canSelectAll"), _obj), _applyDecoratedDescriptor(_obj, "canDeleteSelected", [_dec16], Object.getOwnPropertyDescriptor(_obj, "canDeleteSelected"), _obj), _applyDecoratedDescriptor(_obj, "canMergeTopic", [_dec17], Object.getOwnPropertyDescriptor(_obj, "canMergeTopic"), _obj), _applyDecoratedDescriptor(_obj, "canChangeOwner", [_dec18], Object.getOwnPropertyDescriptor(_obj, "canChangeOwner"), _obj), _applyDecoratedDescriptor(_obj, "canMergePosts", [_dec19], Object.getOwnPropertyDescriptor(_obj, "canMergePosts"), _obj), _applyDecoratedDescriptor(_obj, "_multiSelectChanged", [_dec20], Object.getOwnPropertyDescriptor(_obj, "_multiSelectChanged"), _obj), _applyDecoratedDescriptor(_obj, "loadingHTML", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "loadingHTML"), _obj), _applyDecoratedDescriptor(_obj, "recoverTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "recoverTopic"), _obj), _applyDecoratedDescriptor(_obj, "onMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onMessage"), _obj), _applyDecoratedDescriptor(_obj, "_showFooter", [_dec21], Object.getOwnPropertyDescriptor(_obj, "_showFooter"), _obj)), _obj)));
  _exports.default = _default;
});