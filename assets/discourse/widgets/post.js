define("discourse/widgets/post", ["exports", "discourse/widgets/widget", "discourse/lib/utilities", "discourse-common/lib/get-url", "discourse/widgets/decorator-helper", "discourse/lib/url", "I18n", "discourse/widgets/post-cooked", "rsvp", "discourse/widgets/raw-html", "discourse/helpers/node", "virtual-dom", "discourse-common/lib/icon-library", "discourse/widgets/post-stream", "discourse/lib/settings", "discourse/lib/formatter", "discourse/lib/transform-post", "discourse/lib/avatar-flair", "discourse/lib/show-modal", "discourse/lib/pwa-utils", "discourse/lib/user-tips"], function (_exports, _widget, _utilities, _getUrl, _decoratorHelper, _url, _I18n, _postCooked, _rsvp, _rawHtml, _node, _virtualDom, _iconLibrary, _postStream, _settings, _formatter, _transformPost, _avatarFlair, _showModal, _pwaUtils, _userTips) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addPostClassesCallback = addPostClassesCallback;
  _exports.avatarFor = avatarFor;
  _exports.avatarImg = avatarImg;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/widget",0,"discourse/lib/utilities",0,"discourse-common/lib/get-url",0,"discourse/widgets/decorator-helper",0,"discourse/lib/url",0,"I18n",0,"discourse/widgets/post-cooked",0,"rsvp",0,"discourse/widgets/raw-html",0,"discourse/helpers/node",0,"virtual-dom",0,"discourse/widgets/hbs-compiler",0,"discourse-common/lib/icon-library",0,"discourse/widgets/post-stream",0,"discourse/lib/settings",0,"discourse/lib/formatter",0,"discourse/lib/transform-post",0,"discourse/lib/avatar-flair",0,"discourse/lib/show-modal",0,"discourse/lib/pwa-utils",0,"discourse/lib/user-tips"eaimeta@70e063a35619d71f
  function transformWithCallbacks(post) {
    let transformed = (0, _transformPost.transformBasicPost)(post);
    (0, _postStream.postTransformCallbacks)(transformed);
    return transformed;
  }
  function avatarImg(wanted, attrs) {
    const size = (0, _utilities.translateSize)(wanted);
    const url = (0, _utilities.avatarUrl)(attrs.template, size);

    // We won't render an invalid url
    if (!url || url.length === 0) {
      return;
    }
    let title;
    if (!attrs.hideTitle) {
      title = attrs.name || (0, _utilities.formatUsername)(attrs.username);
    }
    let alt = "";
    if (attrs.alt) {
      alt = _I18n.default.t(attrs.alt);
    }
    let className = "avatar" + (attrs.extraClasses ? " " + attrs.extraClasses : "");
    const properties = {
      attributes: {
        alt,
        width: size,
        height: size,
        src: (0, _getUrl.getURLWithCDN)(url),
        title,
        "aria-label": title,
        loading: "lazy",
        tabindex: "-1"
      },
      className
    };
    return (0, _virtualDom.h)("img", properties);
  }
  function avatarFor(wanted, attrs, linkAttrs) {
    const attributes = {
      href: attrs.url,
      "data-user-card": attrs.username,
      "aria-hidden": true
    };
    if (linkAttrs) {
      Object.assign(attributes, linkAttrs);
    }
    return (0, _virtualDom.h)("a", {
      className: `trigger-user-card ${attrs.className || ""}`,
      attributes
    }, avatarImg(wanted, attrs));
  }
  (0, _widget.createWidget)("select-post", {
    tagName: "div.select-posts",
    html(attrs) {
      const buttons = [];
      if (!attrs.selected && attrs.post_number > 1) {
        if (attrs.replyCount > 0) {
          buttons.push(this.attach("button", {
            label: "topic.multi_select.select_replies.label",
            title: "topic.multi_select.select_replies.title",
            action: "selectReplies",
            className: "select-replies"
          }));
        }
        buttons.push(this.attach("button", {
          label: "topic.multi_select.select_below.label",
          title: "topic.multi_select.select_below.title",
          action: "selectBelow",
          className: "select-below"
        }));
      }
      const key = `topic.multi_select.${attrs.selected ? "selected" : "select"}_post`;
      buttons.push(this.attach("button", {
        label: key + ".label",
        title: key + ".title",
        action: "togglePostSelection",
        className: "select-post"
      }));
      return buttons;
    }
  });
  (0, _widget.createWidget)("reply-to-tab", {
    tagName: "a.reply-to-tab",
    buildKey: attrs => `reply-to-tab-${attrs.id}`,
    title: "post.in_reply_to",
    defaultState() {
      return {
        loading: false
      };
    },
    buildAttributes(attrs) {
      let result = {
        tabindex: "0"
      };
      if (!this.attrs.mobileView) {
        result["aria-controls"] = `embedded-posts__top--${attrs.post_number}`;
        result["aria-expanded"] = this.attrs.repliesAbove.length ? "true" : "false";
      }
      return result;
    },
    html(attrs, state) {
      const icon = state.loading ? (0, _virtualDom.h)("div.spinner.small") : (0, _iconLibrary.iconNode)("share");
      const name = (0, _settings.prioritizeNameFallback)(attrs.replyToName, attrs.replyToUsername);
      return [icon, " ", avatarImg("small", {
        template: attrs.replyToAvatarTemplate,
        username: name
      }), " ", (0, _virtualDom.h)("span", (0, _utilities.formatUsername)(name))];
    },
    click() {
      this.state.loading = true;
      this.sendWidgetAction("toggleReplyAbove").then(() => this.state.loading = false);
    }
  });
  (0, _widget.createWidget)("post-avatar-user-info", {
    tagName: "div.post-avatar-user-info",
    html(attrs) {
      return this.attach("poster-name", attrs);
    }
  });
  (0, _widget.createWidget)("post-avatar", {
    tagName: "div.topic-avatar",
    settings: {
      size: "large",
      displayPosterName: false
    },
    html(attrs) {
      let body;
      let hideFromAnonUser = this.siteSettings.hide_user_profiles_from_public && !this.currentUser;
      if (!attrs.user_id) {
        body = (0, _iconLibrary.iconNode)("far-trash-alt", {
          class: "deleted-user-avatar"
        });
      } else {
        body = avatarFor.call(this, this.settings.size, {
          template: attrs.avatar_template,
          username: attrs.username,
          name: attrs.name,
          url: attrs.usernameUrl,
          className: `main-avatar ${hideFromAnonUser ? "non-clickable" : ""}`,
          hideTitle: true
        }, {
          tabindex: "-1"
        });
      }
      const postAvatarBody = [body];
      if (attrs.flair_group_id) {
        if (attrs.flair_url || attrs.flair_bg_color) {
          postAvatarBody.push(this.attach("avatar-flair", attrs));
        } else {
          const autoFlairAttrs = (0, _avatarFlair.default)(this.site, attrs);
          if (autoFlairAttrs) {
            postAvatarBody.push(this.attach("avatar-flair", autoFlairAttrs));
          }
        }
      }
      const result = [(0, _virtualDom.h)("div.post-avatar", postAvatarBody)];
      if (this.settings.displayPosterName) {
        result.push(this.attach("post-avatar-user-info", attrs));
      }
      return result;
    }
  });
  (0, _widget.createWidget)("post-locked-indicator", {
    tagName: "div.post-info.post-locked",
    template: function (attrs, state) {
      var __h1 = __widget_helpers.iconNode;
      var _r = [];
      _r.push(__h1("lock"));
      return _r;
    },
    title: () => _I18n.default.t("post.locked")
  });
  (0, _widget.createWidget)("post-email-indicator", {
    tagName: "div.post-info.via-email",
    title(attrs) {
      return attrs.isAutoGenerated ? _I18n.default.t("post.via_auto_generated_email") : _I18n.default.t("post.via_email");
    },
    buildClasses(attrs) {
      return attrs.canViewRawEmail ? "raw-email" : null;
    },
    html(attrs) {
      return attrs.isAutoGenerated ? (0, _iconLibrary.iconNode)("envelope") : (0, _iconLibrary.iconNode)("far-envelope");
    },
    click() {
      if (this.attrs.canViewRawEmail) {
        this.sendWidgetAction("showRawEmail");
      }
    }
  });
  function showReplyTab(attrs, siteSettings) {
    return attrs.replyToUsername && (!attrs.replyDirectlyAbove || !siteSettings.suppress_reply_directly_above);
  }
  (0, _widget.createWidget)("post-meta-data", {
    tagName: "div.topic-meta-data",
    buildAttributes() {
      return {
        role: "heading",
        "aria-level": "2"
      };
    },
    settings: {
      displayPosterName: true
    },
    html(attrs) {
      let postInfo = [];
      if (attrs.isWhisper) {
        const groups = this.site.get("whispers_allowed_groups_names");
        let title = "";
        if (groups?.length > 0) {
          title = _I18n.default.t("post.whisper_groups", {
            groupNames: groups.join(", ")
          });
        } else {
          title = _I18n.default.t("post.whisper");
        }
        postInfo.push((0, _virtualDom.h)("div.post-info.whisper", {
          attributes: {
            title
          }
        }, (0, _iconLibrary.iconNode)("far-eye-slash")));
      }
      if (attrs.via_email) {
        postInfo.push(this.attach("post-email-indicator", attrs));
      }
      if (attrs.locked) {
        postInfo.push(this.attach("post-locked-indicator", attrs));
      }
      if (attrs.version > 1 || attrs.wiki) {
        postInfo.push(this.attach("post-edits-indicator", attrs));
      }
      if (attrs.multiSelect) {
        postInfo.push(this.attach("select-post", attrs));
      }
      if (showReplyTab(attrs, this.siteSettings)) {
        postInfo.push(this.attach("reply-to-tab", attrs));
      }
      postInfo.push(this.attach("post-date", attrs));
      postInfo.push((0, _virtualDom.h)("div.read-state", {
        className: attrs.read ? "read" : null,
        attributes: {
          title: _I18n.default.t("post.unread")
        }
      }, (0, _iconLibrary.iconNode)("circle")));
      let result = [];
      if (this.settings.displayPosterName) {
        result.push(this.attach("poster-name", attrs));
      }
      result.push((0, _virtualDom.h)("div.post-infos", postInfo));
      return result;
    }
  });
  (0, _widget.createWidget)("expand-hidden", {
    tagName: "a.expand-hidden",
    html() {
      return _I18n.default.t("post.show_hidden");
    },
    click() {
      this.sendWidgetAction("expandHidden");
    }
  });
  (0, _widget.createWidget)("post-date", {
    tagName: "div.post-info.post-date",
    html(attrs) {
      let date,
        linkClassName = "post-date";
      if (attrs.wiki && attrs.lastWikiEdit) {
        linkClassName += " last-wiki-edit";
        date = new Date(attrs.lastWikiEdit);
      } else {
        date = new Date(attrs.created_at);
      }
      return this.attach("link", {
        rawLabel: (0, _node.dateNode)(date),
        className: linkClassName,
        omitSpan: true,
        title: "post.sr_date",
        href: attrs.shareUrl,
        action: "showShareModal"
      });
    },
    showShareModal() {
      const post = this.findAncestorModel();
      const topic = post.topic;
      const controller = (0, _showModal.default)("share-topic", {
        model: topic.category
      });
      controller.setProperties({
        topic,
        post
      });
    }
  });
  (0, _widget.createWidget)("expand-post-button", {
    tagName: "button.btn.expand-post",
    buildKey: attrs => `expand-post-button-${attrs.id}`,
    defaultState() {
      return {
        loadingExpanded: false
      };
    },
    html(attrs, state) {
      if (state.loadingExpanded) {
        return _I18n.default.t("loading");
      } else {
        return [_I18n.default.t("post.show_full"), "..."];
      }
    },
    click() {
      this.state.loadingExpanded = true;
      this.sendWidgetAction("expandFirstPost");
    }
  });
  (0, _widget.createWidget)("post-group-request", {
    buildKey: attrs => `post-group-request-${attrs.id}`,
    buildClasses() {
      return ["group-request"];
    },
    html(attrs) {
      const href = (0, _getUrl.default)("/g/" + attrs.requestedGroupName + "/requests?filter=" + attrs.username);
      return (0, _virtualDom.h)("a", {
        attributes: {
          href
        }
      }, _I18n.default.t("groups.requests.handle"));
    }
  });
  (0, _widget.createWidget)("post-contents", {
    buildKey: attrs => `post-contents-${attrs.id}`,
    defaultState(attrs) {
      const defaultState = {
        expandedFirstPost: false,
        repliesBelow: []
      };
      if (this.siteSettings.enable_filtered_replies_view) {
        const topicController = this.register.lookup("controller:topic");
        if (attrs.post_number) {
          defaultState.filteredRepliesShown = topicController.replies_to_post_number === attrs.post_number.toString();
        }
      }
      return defaultState;
    },
    buildClasses(attrs) {
      const classes = ["regular"];
      if (!this.state.repliesShown) {
        classes.push("contents");
      }
      if (showReplyTab(attrs, this.siteSettings)) {
        classes.push("avoid-tab");
      }
      return classes;
    },
    html(attrs, state) {
      let result = [new _postCooked.default(attrs, new _decoratorHelper.default(this), this.currentUser)];
      if (attrs.requestedGroupName) {
        result.push(this.attach("post-group-request", attrs));
      }
      result = result.concat((0, _widget.applyDecorators)(this, "after-cooked", attrs, state));
      if (attrs.cooked_hidden && (this.currentUser?.isLeader || attrs.user_id === this.currentUser?.id)) {
        result.push(this.attach("expand-hidden", attrs));
      }
      if (!state.expandedFirstPost && attrs.expandablePost) {
        result.push(this.attach("expand-post-button", attrs));
      }
      const extraState = {
        state: {
          repliesShown: !!state.repliesBelow.length,
          filteredRepliesShown: state.filteredRepliesShown
        }
      };
      result.push(this.attach("post-menu", attrs, extraState));
      const repliesBelow = state.repliesBelow;
      if (repliesBelow.length) {
        result.push((0, _virtualDom.h)(`section.embedded-posts.bottom#embedded-posts__bottom--${this.attrs.post_number}`, [repliesBelow.map(p => {
          return this.attach("embedded-post", p, {
            model: p.asPost,
            state: {
              role: "region",
              "aria-label": _I18n.default.t("post.sr_embedded_reply_description", {
                post_number: attrs.post_number,
                username: p.username
              })
            }
          });
        }), this.attach("button", {
          title: "post.collapse",
          icon: "chevron-up",
          action: "toggleRepliesBelow",
          actionParam: "true",
          className: "btn collapse-up",
          translatedAriaLabel: _I18n.default.t("post.sr_collapse_replies")
        })]));
      }
      return result;
    },
    _date(attrs) {
      const lastWikiEdit = attrs.wiki && attrs.lastWikiEdit && new Date(attrs.lastWikiEdit);
      const createdAt = new Date(attrs.created_at);
      return lastWikiEdit ? lastWikiEdit : createdAt;
    },
    toggleFilteredRepliesView() {
      const post = this.findAncestorModel(),
        controller = this.register.lookup("controller:topic"),
        currentFilterPostNumber = post.get("topic.postStream.filterRepliesToPostNumber");
      if (currentFilterPostNumber && currentFilterPostNumber === post.post_number) {
        controller.send("cancelFilter", currentFilterPostNumber);
        this.state.filteredRepliesShown = false;
        return _rsvp.Promise.resolve();
      } else {
        this.state.filteredRepliesShown = true;
        return post.get("topic.postStream").filterReplies(post.post_number, post.id).then(() => {
          controller.updateQueryParams();
        });
      }
    },
    toggleRepliesBelow() {
      let goToPost = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "false";
      if (this.state.repliesBelow.length) {
        this.state.repliesBelow = [];
        if (goToPost === "true") {
          _url.default.routeTo(`${this.attrs.topicUrl}/${this.attrs.post_number}`);
        }
        return;
      }
      const post = this.findAncestorModel();
      const topicUrl = post ? post.get("topic.url") : null;
      return this.store.find("post-reply", {
        postId: this.attrs.id
      }).then(posts => {
        this.state.repliesBelow = posts.map(p => {
          let result = transformWithCallbacks(p);

          // these would conflict with computed properties with identical names
          // in the post model if we kept them.
          delete result.new_user;
          delete result.deleted;
          delete result.shareUrl;
          delete result.firstPost;
          delete result.usernameUrl;
          result.customShare = `${topicUrl}/${p.post_number}`;
          result.asPost = this.store.createRecord("post", result);
          return result;
        });
      });
    },
    expandFirstPost() {
      const post = this.findAncestorModel();
      return post.expand().then(() => this.state.expandedFirstPost = true);
    },
    share() {
      if (this.currentUser && this.siteSettings.enable_user_tips) {
        this.currentUser.hideUserTipForever("post_menu");
      }
      const post = this.findAncestorModel();
      (0, _pwaUtils.nativeShare)(this.capabilities, {
        url: post.shareUrl
      }).catch(() => {
        const topic = post.topic;
        const controller = (0, _showModal.default)("share-topic", {
          model: topic.category
        });
        controller.setProperties({
          topic,
          post
        });
      });
    },
    init() {
      this.postContentsDestroyCallbacks = [];
    },
    destroy() {
      this.postContentsDestroyCallbacks.forEach(c => c());
    }
  });
  (0, _widget.createWidget)("post-notice", {
    tagName: "div.post-notice",
    buildClasses(attrs) {
      const classes = [attrs.notice.type.replace(/_/g, "-")];
      if (new Date() - new Date(attrs.created_at) > this.siteSettings.old_post_notice_days * 86400000) {
        classes.push("old");
      }
      return classes;
    },
    html(attrs) {
      if (attrs.notice.type === "custom") {
        return [(0, _iconLibrary.iconNode)("user-shield"), new _rawHtml.default({
          html: `<div>${attrs.notice.cooked}</div>`
        })];
      }
      const user = this.siteSettings.display_name_on_posts && (0, _settings.prioritizeNameInUx)(attrs.name) ? attrs.name : attrs.username;
      if (attrs.notice.type === "new_user") {
        return [(0, _iconLibrary.iconNode)("hands-helping"), (0, _virtualDom.h)("p", _I18n.default.t("post.notice.new_user", {
          user
        }))];
      }
      if (attrs.notice.type === "returning_user") {
        const timeAgo = (new Date() - new Date(attrs.notice.lastPostedAt)) / 1000;
        const time = (0, _formatter.relativeAgeMediumSpan)(timeAgo, true);
        return [(0, _iconLibrary.iconNode)("far-smile"), (0, _virtualDom.h)("p", _I18n.default.t("post.notice.returning_user", {
          user,
          time
        }))];
      }
    }
  });
  (0, _widget.createWidget)("post-body", {
    tagName: "div.topic-body.clearfix",
    html(attrs, state) {
      const postContents = this.attach("post-contents", attrs);
      let result = [this.attach("post-meta-data", attrs)];
      result = result.concat((0, _widget.applyDecorators)(this, "after-meta-data", attrs, state));
      result.push(postContents);
      result.push(this.attach("actions-summary", attrs));
      result.push(this.attach("post-links", attrs));
      if (attrs.showTopicMap) {
        result.push(this.attach("topic-map", attrs));
      }
      return result;
    }
  });
  (0, _widget.createWidget)("post-article", {
    tagName: "article.boxed.onscreen-post",
    buildKey: attrs => `post-article-${attrs.id}`,
    defaultState() {
      return {
        repliesAbove: []
      };
    },
    buildId(attrs) {
      return `post_${attrs.post_number}`;
    },
    buildClasses(attrs) {
      let classNames = [];
      if (attrs.via_email) {
        classNames.push("via-email");
      }
      if (attrs.isAutoGenerated) {
        classNames.push("is-auto-generated");
      }
      return classNames;
    },
    buildAttributes(attrs) {
      return {
        "aria-label": _I18n.default.t("share.post", {
          postNumber: attrs.post_number,
          username: attrs.username
        }),
        role: "region",
        "data-post-id": attrs.id,
        "data-topic-id": attrs.topicId,
        "data-user-id": attrs.user_id
      };
    },
    html(attrs, state) {
      const rows = [(0, _virtualDom.h)("span.tabLoc", {
        attributes: {
          "aria-hidden": true,
          tabindex: -1
        }
      })];
      if (state.repliesAbove.length) {
        const replies = state.repliesAbove.map(p => {
          return this.attach("embedded-post", p, {
            model: p.asPost,
            state: {
              above: true
            }
          });
        });
        rows.push((0, _virtualDom.h)("div.row", (0, _virtualDom.h)(`section.embedded-posts.top.topic-body#embedded-posts__top--${attrs.post_number}`, [this.attach("button", {
          title: "post.collapse",
          icon: "chevron-down",
          action: "toggleReplyAbove",
          actionParam: "true",
          className: "btn collapse-down"
        }), replies])));
      }
      if (!attrs.deleted_at && attrs.notice) {
        rows.push((0, _virtualDom.h)("div.row", [this.attach("post-notice", attrs)]));
      }
      rows.push((0, _virtualDom.h)("div.row", [this.attach("post-avatar", attrs), this.attach("post-body", {
        ...attrs,
        repliesAbove: state.repliesAbove
      })]));
      return rows;
    },
    _getTopicUrl() {
      const post = this.findAncestorModel();
      return post ? post.get("topic.url") : null;
    },
    toggleReplyAbove() {
      let goToPost = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "false";
      const replyPostNumber = this.attrs.reply_to_post_number;
      if (this.siteSettings.enable_filtered_replies_view) {
        const post = this.findAncestorModel();
        const controller = this.register.lookup("controller:topic");
        return post.get("topic.postStream").filterUpwards(this.attrs.id).then(() => {
          controller.updateQueryParams();
        });
      }

      // jump directly on mobile
      if (this.attrs.mobileView) {
        const topicUrl = this._getTopicUrl();
        if (topicUrl) {
          _url.default.routeTo(`${topicUrl}/${replyPostNumber}`);
        }
        return _rsvp.Promise.resolve();
      }
      if (this.state.repliesAbove.length) {
        this.state.repliesAbove = [];
        if (goToPost === "true") {
          _url.default.routeTo(`${this.attrs.topicUrl}/${this.attrs.post_number}`);
        }
        return _rsvp.Promise.resolve();
      } else {
        const topicUrl = this._getTopicUrl();
        return this.store.find("post-reply-history", {
          postId: this.attrs.id
        }).then(posts => {
          this.state.repliesAbove = posts.map(p => {
            let result = transformWithCallbacks(p);

            // We don't want to overwrite CPs - we are doing something a bit weird
            // here by creating a post object from a transformed post. They aren't
            // 100% the same.
            delete result.new_user;
            delete result.deleted;
            delete result.shareUrl;
            delete result.firstPost;
            delete result.usernameUrl;
            result.customShare = `${topicUrl}/${p.post_number}`;
            result.asPost = this.store.createRecord("post", result);
            return result;
          });
        });
      }
    }
  });
  let addPostClassesCallbacks = null;
  function addPostClassesCallback(callback) {
    addPostClassesCallbacks = addPostClassesCallbacks || [];
    addPostClassesCallbacks.push(callback);
  }
  var _default = (0, _widget.createWidget)("post", {
    buildKey: attrs => `post-${attrs.id}`,
    services: ["dialog"],
    shadowTree: true,
    buildAttributes(attrs) {
      return attrs.height ? {
        style: `min-height: ${attrs.height}px`
      } : undefined;
    },
    buildId(attrs) {
      return attrs.cloaked ? `post_${attrs.post_number}` : undefined;
    },
    buildClasses(attrs) {
      if (attrs.cloaked) {
        return "cloaked-post";
      }
      const classNames = ["topic-post", "clearfix"];
      if (attrs.id === -1 || attrs.isSaving || attrs.staged) {
        classNames.push("staged");
      }
      if (attrs.selected) {
        classNames.push("selected");
      }
      if (attrs.topicOwner) {
        classNames.push("topic-owner");
      }
      if (this.currentUser && attrs.user_id === this.currentUser.id) {
        classNames.push("current-user-post");
      }
      if (attrs.groupModerator) {
        classNames.push("category-moderator");
      }
      if (attrs.hidden) {
        classNames.push("post-hidden");
      }
      if (attrs.deleted) {
        classNames.push("deleted");
      }
      if (attrs.primary_group_name) {
        classNames.push(`group-${attrs.primary_group_name}`);
      }
      if (attrs.wiki) {
        classNames.push(`wiki`);
      }
      if (attrs.isWhisper) {
        classNames.push("whisper");
      }
      if (attrs.isModeratorAction || attrs.isWarning && attrs.firstPost) {
        classNames.push("moderator");
      } else {
        classNames.push("regular");
      }
      if (attrs.userSuspended) {
        classNames.push("user-suspended");
      }
      if (addPostClassesCallbacks) {
        for (let i = 0; i < addPostClassesCallbacks.length; i++) {
          let pluginClasses = addPostClassesCallbacks[i].call(this, attrs);
          if (pluginClasses) {
            classNames.push.apply(classNames, pluginClasses);
          }
        }
      }
      return classNames;
    },
    html(attrs) {
      if (attrs.cloaked) {
        return "";
      }
      return this.attach("post-article", attrs);
    },
    toggleLike() {
      const post = this.model;
      const likeAction = post.get("likeAction");
      if (likeAction && likeAction.get("canToggle")) {
        return likeAction.togglePromise(post).then(result => {
          this.appEvents.trigger("page:like-toggled", post, likeAction);
          return this._warnIfClose(result);
        });
      }
    },
    _warnIfClose(result) {
      if (!result || !result.acted) {
        return;
      }
      const kvs = this.keyValueStore;
      const lastWarnedLikes = kvs.get("lastWarnedLikes");

      // only warn once per day
      const yesterday = Date.now() - 1000 * 60 * 60 * 24;
      if (lastWarnedLikes && parseInt(lastWarnedLikes, 10) > yesterday) {
        return;
      }
      const {
        remaining,
        max
      } = result;
      const threshold = Math.ceil(max * 0.1);
      if (remaining === threshold) {
        this.dialog.alert(_I18n.default.t("post.few_likes_left"));
        kvs.set({
          key: "lastWarnedLikes",
          value: Date.now()
        });
      }
    },
    didRenderWidget() {
      if (!this.currentUser || !this.siteSettings.enable_user_tips) {
        return;
      }
      const reference = document.querySelector(".post-controls .actions .show-more-actions");
      this.currentUser.showUserTip({
        id: "post_menu",
        titleText: _I18n.default.t("user_tips.post_menu.title"),
        contentText: _I18n.default.t("user_tips.post_menu.content"),
        reference,
        appendTo: reference?.closest(".post-controls"),
        placement: "top"
      });
    },
    destroy() {
      (0, _userTips.hideUserTip)("post_menu");
    },
    willRerenderWidget() {
      (0, _userTips.hideUserTip)("post_menu");
    }
  });
  _exports.default = _default;
});