define("discourse/widgets/post-stream", ["exports", "discourse/lib/url", "I18n", "discourse/lib/posts-with-placeholders", "discourse/components/mount-widget", "discourse/widgets/post", "discourse/widgets/widget", "discourse-common/lib/debounce", "virtual-dom", "discourse-common/lib/icon-library", "discourse/lib/transform-post"], function (_exports, _url, _I18n, _postsWithPlaceholders, _mountWidget, _post, _widget, _debounce, _virtualDom, _iconLibrary, _transformPost) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addPostTransformCallback = addPostTransformCallback;
  _exports.cloak = cloak;
  _exports.default = void 0;
  _exports.disableCloaking = disableCloaking;
  _exports.postTransformCallbacks = postTransformCallbacks;
  _exports.preventCloak = preventCloak;
  _exports.uncloak = uncloak;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"I18n",0,"discourse/lib/posts-with-placeholders",0,"discourse/components/mount-widget",0,"discourse/widgets/post",0,"discourse/widgets/widget",0,"discourse-common/lib/debounce",0,"virtual-dom",0,"discourse-common/lib/icon-library",0,"discourse/lib/transform-post"eaimeta@70e063a35619d71f
  let transformCallbacks = null;
  function postTransformCallbacks(transformed) {
    if (transformCallbacks === null) {
      return;
    }
    for (let i = 0; i < transformCallbacks.length; i++) {
      transformCallbacks[i].call(this, transformed);
    }
  }
  function addPostTransformCallback(callback) {
    transformCallbacks = transformCallbacks || [];
    transformCallbacks.push(callback);
  }
  let _enabled = true;
  const DAY = 1000 * 60 * 60 * 24;
  const _dontCloak = {};
  let _cloaked = {};
  let _heights = {};
  function disableCloaking() {
    _enabled = false;
  }
  function preventCloak(postId) {
    _dontCloak[postId] = true;
  }
  function cloak(post, component) {
    if (!_enabled || _cloaked[post.id] || _dontCloak[post.id]) {
      return;
    }
    const $post = $(`#post_${post.post_number}`).parent();
    _cloaked[post.id] = true;
    _heights[post.id] = $post.outerHeight();
    component.dirtyKeys.keyDirty(`post-${post.id}`);
    (0, _debounce.default)(component, "queueRerender", 1000);
  }
  function uncloak(post, component) {
    if (!_enabled || !_cloaked[post.id]) {
      return;
    }
    _cloaked[post.id] = null;
    component.dirtyKeys.keyDirty(`post-${post.id}`);
    component.queueRerender();
  }
  (0, _mountWidget.addWidgetCleanCallback)("post-stream", () => {
    _cloaked = {};
    _heights = {};
  });
  (0, _widget.createWidget)("posts-filtered-notice", {
    buildKey: attrs => `posts-filtered-notice-${attrs.id}`,
    buildClasses() {
      return ["posts-filtered-notice"];
    },
    html(attrs) {
      const filters = attrs.streamFilters;
      if (filters.filter_upwards_post_id || filters.mixedHiddenPosts) {
        return [(0, _virtualDom.h)("span.filtered-replies-viewing", _I18n.default.t("post.filtered_replies.viewing_subset")), this.attach("filter-show-all", attrs)];
      } else if (filters.replies_to_post_number) {
        const sourcePost = attrs.posts.findBy("post_number", filters.replies_to_post_number);
        return [(0, _virtualDom.h)("span.filtered-replies-viewing", _I18n.default.t("post.filtered_replies_viewing", {
          count: sourcePost.reply_count
        })), (0, _virtualDom.h)("span.filtered-user-row", [(0, _virtualDom.h)("span.filtered-avatar", _post.avatarFor.call(this, "small", {
          template: sourcePost.avatar_template,
          username: sourcePost.username,
          url: sourcePost.usernameUrl
        })), this.attach("filter-jump-to-post", {
          username: sourcePost.username,
          postNumber: filters.replies_to_post_number
        })]), this.attach("filter-show-all", attrs)];
      } else if (filters.filter && filters.filter === "summary") {
        return [(0, _virtualDom.h)("span.filtered-replies-viewing", _I18n.default.t("post.filtered_replies.viewing_summary")), this.attach("filter-show-all", attrs)];
      } else if (filters.username_filters) {
        const firstUserPost = attrs.posts[1],
          userPostsCount = parseInt(attrs.filteredPostsCount, 10) - 1;
        return [(0, _virtualDom.h)("span.filtered-replies-viewing", _I18n.default.t("post.filtered_replies.viewing_posts_by", {
          post_count: userPostsCount
        })), (0, _virtualDom.h)("span.filtered-avatar", _post.avatarFor.call(this, "small", {
          template: firstUserPost.avatar_template,
          username: firstUserPost.username,
          url: firstUserPost.usernameUrl
        })), this.attach("poster-name", firstUserPost), this.attach("filter-show-all", attrs)];
      }
      return [];
    }
  });
  (0, _widget.createWidget)("filter-jump-to-post", {
    tagName: "a.filtered-jump-to-post",
    buildKey: attrs => `jump-to-post-${attrs.id}`,
    html(attrs) {
      return _I18n.default.t("post.filtered_replies.post_number", {
        username: attrs.username,
        post_number: attrs.postNumber
      });
    },
    click() {
      _url.default.jumpToPost(this.attrs.postNumber);
    }
  });
  (0, _widget.createWidget)("filter-show-all", {
    tagName: "button.filtered-replies-show-all",
    buildKey: attrs => `filtered-show-all-${attrs.id}`,
    buildClasses() {
      return ["btn", "btn-primary"];
    },
    html() {
      return [(0, _iconLibrary.iconNode)("arrows-alt-v"), _I18n.default.t("post.filtered_replies.show_all")];
    },
    click() {
      this.sendWidgetAction("cancelFilter");
      this.appEvents.trigger("post-stream:filter-show-all", this.attrs.streamFilters);
    }
  });
  var _default = (0, _widget.createWidget)("post-stream", {
    tagName: "div.post-stream",
    html(attrs) {
      const posts = attrs.posts || [];
      const postArray = posts.toArray();
      const postArrayLength = postArray.length;
      const maxPostNumber = postArrayLength > 0 ? postArray[postArrayLength - 1].post_number : 0;
      const result = [];
      const before = attrs.gaps && attrs.gaps.before ? attrs.gaps.before : {};
      const after = attrs.gaps && attrs.gaps.after ? attrs.gaps.after : {};
      const mobileView = this.site.mobileView;
      let prevPost;
      let prevDate;
      for (let i = 0; i < postArrayLength; i++) {
        const post = postArray[i];
        if (post instanceof _postsWithPlaceholders.Placeholder) {
          result.push(this.attach("post-placeholder"));
          continue;
        }
        const nextPost = i < postArray.length - 1 ? postArray[i + 1] : null;
        const transformed = (0, _transformPost.default)(this.currentUser, this.site, post, prevPost, nextPost);
        transformed.canCreatePost = attrs.canCreatePost;
        transformed.mobileView = mobileView;
        if (transformed.canManage || transformed.canSplitMergeTopic) {
          transformed.multiSelect = attrs.multiSelect;
          if (attrs.multiSelect) {
            transformed.selected = attrs.selectedQuery(post);
          }
        }
        if (attrs.searchService) {
          transformed.highlightTerm = attrs.searchService.highlightTerm;
        }

        // Post gap - before
        const beforeGap = before[post.id];
        if (beforeGap) {
          result.push(this.attach("post-gap", {
            pos: "before",
            postId: post.id,
            gap: beforeGap
          }, {
            model: post
          }));
        }

        // Handle time gaps
        const curTime = new Date(transformed.created_at).getTime();
        if (prevDate) {
          const daysSince = Math.floor((curTime - prevDate) / DAY);
          if (daysSince > this.siteSettings.show_time_gap_days) {
            result.push(this.attach("time-gap", {
              daysSince
            }));
          }
        }
        prevDate = curTime;
        transformed.height = _heights[post.id];
        transformed.cloaked = _cloaked[post.id];
        postTransformCallbacks(transformed);
        if (transformed.isSmallAction) {
          result.push(this.attach("post-small-action", transformed, {
            model: post
          }));
        } else {
          transformed.showReadIndicator = attrs.showReadIndicator;
          result.push(this.attach("post", transformed, {
            model: post
          }));
        }

        // Post gap - after
        const afterGap = after[post.id];
        if (afterGap) {
          result.push(this.attach("post-gap", {
            pos: "after",
            postId: post.id,
            gap: afterGap
          }, {
            model: post
          }));
        }
        if (i !== postArrayLength - 1 && maxPostNumber <= attrs.highestPostNumber && attrs.lastReadPostNumber === post.post_number) {
          result.push(this.attach("topic-post-visited-line", {
            post_number: post.post_number
          }));
        }
        prevPost = post;
      }
      if (attrs.streamFilters && Object.keys(attrs.streamFilters).length && (Object.keys(before).length > 0 || Object.keys(after).length > 0)) {
        result.push(this.attach("posts-filtered-notice", {
          posts: postArray,
          streamFilters: attrs.streamFilters,
          filteredPostsCount: attrs.filteredPostsCount
        }));
      }
      return result;
    }
  });
  _exports.default = _default;
});