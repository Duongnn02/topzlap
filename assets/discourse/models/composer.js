define("discourse/models/composer", ["exports", "@ember/object", "@ember/object/computed", "@ember/runloop", "discourse-common/utils/decorators", "discourse/lib/utilities", "discourse/models/draft", "I18n", "rsvp", "discourse/lib/quote", "discourse/models/rest", "discourse/models/site", "discourse/models/topic", "discourse/models/user", "@ember/service", "discourse-common/lib/deprecated", "@ember/utils", "discourse/lib/computed", "discourse/lib/ajax-error", "discourse/lib/settings"], function (_exports, _object, _computed, _runloop, _decorators, _utilities, _draft, _I18n, _rsvp, _quote, _rest, _site, _topic, _user, _service, _deprecated, _utils, _computed2, _ajaxError, _settings) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.SAVE_LABELS = _exports.SAVE_ICONS = _exports.REPLY = _exports.PRIVATE_MESSAGE = _exports.NEW_TOPIC_KEY = _exports.NEW_PRIVATE_MESSAGE_KEY = _exports.EDIT_SHARED_DRAFT = _exports.EDIT = _exports.CREATE_TOPIC = _exports.CREATE_SHARED_DRAFT = void 0;
  _exports.registerCustomizationCallback = registerCustomizationCallback;
  _exports.resetComposerCustomizations = resetComposerCustomizations;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _obj, _init, _init2, _init3;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/object/computed",0,"@ember/runloop",0,"discourse-common/utils/decorators",0,"discourse/lib/utilities",0,"discourse/models/draft",0,"I18n",0,"rsvp",0,"discourse/lib/quote",0,"discourse/models/rest",0,"discourse/models/site",0,"discourse/models/topic",0,"discourse/models/user",0,"@ember/service",0,"discourse-common/lib/deprecated",0,"@ember/utils",0,"discourse/lib/computed",0,"discourse/lib/ajax-error",0,"discourse/lib/settings"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let _customizations = [];
  function registerCustomizationCallback(cb) {
    _customizations.push(cb);
  }
  function resetComposerCustomizations() {
    _customizations = [];
  }

  // The actions the composer can take
  const CREATE_TOPIC = "createTopic",
    CREATE_SHARED_DRAFT = "createSharedDraft",
    EDIT_SHARED_DRAFT = "editSharedDraft",
    PRIVATE_MESSAGE = "privateMessage",
    REPLY = "reply",
    EDIT = "edit",
    NEW_PRIVATE_MESSAGE_KEY = "new_private_message",
    NEW_TOPIC_KEY = "new_topic";
  _exports.NEW_TOPIC_KEY = NEW_TOPIC_KEY;
  _exports.NEW_PRIVATE_MESSAGE_KEY = NEW_PRIVATE_MESSAGE_KEY;
  _exports.EDIT = EDIT;
  _exports.REPLY = REPLY;
  _exports.PRIVATE_MESSAGE = PRIVATE_MESSAGE;
  _exports.EDIT_SHARED_DRAFT = EDIT_SHARED_DRAFT;
  _exports.CREATE_SHARED_DRAFT = CREATE_SHARED_DRAFT;
  _exports.CREATE_TOPIC = CREATE_TOPIC;
  function isEdit(action) {
    return action === EDIT || action === EDIT_SHARED_DRAFT;
  }
  const CLOSED = "closed",
    SAVING = "saving",
    OPEN = "open",
    DRAFT = "draft",
    FULLSCREEN = "fullscreen",
    // When creating, these fields are moved into the post model from the composer model
    _create_serializer = {
      raw: "reply",
      title: "title",
      unlist_topic: "unlistTopic",
      category: "categoryId",
      topic_id: "topic.id",
      is_warning: "isWarning",
      whisper: "whisper",
      archetype: "archetypeId",
      target_recipients: "targetRecipients",
      typing_duration_msecs: "typingTime",
      composer_open_duration_msecs: "composerTime",
      tags: "tags",
      featured_link: "featuredLink",
      shared_draft: "sharedDraft",
      no_bump: "noBump",
      draft_key: "draftKey"
    },
    _update_serializer = {
      raw: "reply",
      topic_id: "topic.id",
      raw_old: "rawOld"
    },
    _edit_topic_serializer = {
      title: "topic.title",
      categoryId: "topic.category.id",
      tags: "topic.tags",
      featuredLink: "topic.featured_link"
    },
    _draft_serializer = {
      reply: "reply",
      action: "action",
      title: "title",
      categoryId: "categoryId",
      tags: "tags",
      archetypeId: "archetypeId",
      whisper: "whisper",
      metaData: "metaData",
      composerTime: "composerTime",
      typingTime: "typingTime",
      postId: "post.id",
      recipients: "targetRecipients"
    },
    _add_draft_fields = {},
    FAST_REPLY_LENGTH_THRESHOLD = 10000;
  const SAVE_LABELS = {
    [EDIT]: "composer.save_edit",
    [REPLY]: "composer.reply",
    [CREATE_TOPIC]: "composer.create_topic",
    [PRIVATE_MESSAGE]: "composer.create_pm",
    [CREATE_SHARED_DRAFT]: "composer.create_shared_draft",
    [EDIT_SHARED_DRAFT]: "composer.save_edit"
  };
  _exports.SAVE_LABELS = SAVE_LABELS;
  const SAVE_ICONS = {
    [EDIT]: "pencil-alt",
    [EDIT_SHARED_DRAFT]: "far-clipboard",
    [REPLY]: "reply",
    [CREATE_TOPIC]: "plus",
    [PRIVATE_MESSAGE]: "envelope",
    [CREATE_SHARED_DRAFT]: "far-clipboard"
  };
  _exports.SAVE_ICONS = SAVE_ICONS;
  const Composer = _rest.default.extend((_dec = (0, _decorators.default)("categoryId"), _dec2 = (0, _decorators.default)("category.minimumRequiredTags"), _dec3 = (0, _decorators.default)("editingPost", "topic.details.can_edit"), _dec4 = (0, _decorators.default)("privateMessage", "archetype.hasOptions"), _dec5 = (0, _decorators.default)("creatingPrivateMessage", "topic"), _dec6 = (0, _decorators.default)("action"), _dec7 = (0, _decorators.observes)("composeState"), _dec8 = (0, _decorators.default)("archetypeId"), _dec9 = (0, _decorators.observes)("archetype"), _dec10 = (0, _decorators.default)("canEditTitle", "creatingPrivateMessage", "categoryId", "user.trust_level"), _dec11 = (0, _decorators.default)("canEditTopicFeaturedLink"), _dec12 = (0, _decorators.default)("action", "post", "topic", "topic.title"), _dec13 = (0, _decorators.default)("targetRecipients"), _dec14 = (0, _decorators.default)("loading", "canEditTitle", "titleLength", "targetRecipients", "targetRecipientsArray", "replyLength", "categoryId", "missingReplyCharacters", "tags", "topicFirstPost", "minimumRequiredTags", "user.staff"), _dec15 = (0, _decorators.default)("canCategorize", "categoryId"), _dec16 = (0, _decorators.default)("minimumTitleLength", "titleLength", "post.static_doc"), _dec17 = (0, _decorators.default)("metaData"), _dec18 = (0, _decorators.default)("minimumTitleLength", "titleLength"), _dec19 = (0, _decorators.default)("privateMessage"), _dec20 = (0, _decorators.default)("minimumPostLength", "replyLength", "canEditTopicFeaturedLink"), _dec21 = (0, _decorators.default)("privateMessage", "topicFirstPost", "topic.pm_with_non_human_user"), _dec22 = (0, _decorators.default)("title"), _dec23 = (0, _decorators.default)("reply"), _dec24 = (0, _decorators.on)("init"), _dec25 = (0, _decorators.default)("editConflict", "originalText"), _dec26 = (0, _decorators.default)("draftSaving", "disableDrafts", "canEditTitle", "title", "reply", "titleLengthValid", "replyLength", "minimumPostLength"), (_obj = {
    dialog: (0, _service.inject)(),
    _categoryId: null,
    unlistTopic: false,
    noBump: false,
    draftSaving: false,
    draftForceSave: false,
    showFullScreenExitPrompt: false,
    archetypes: (0, _computed.reads)("site.archetypes"),
    sharedDraft: (0, _computed.equal)("action", CREATE_SHARED_DRAFT),
    categoryId: {
      get() {
        return this._categoryId;
      },
      // We wrap categoryId this way so we can fire `applyTopicTemplate` with
      // the previous value as well as the new value
      set(categoryId) {
        const oldCategoryId = this._categoryId;
        if (this.privateMessage) {
          categoryId = null;
        } else if ((0, _utils.isEmpty)(categoryId)) {
          // Check if there is a default composer category to set
          const defaultComposerCategoryId = parseInt(this.siteSettings.default_composer_category, 10);
          categoryId = defaultComposerCategoryId && defaultComposerCategoryId > 0 ? defaultComposerCategoryId : null;
        }
        this._categoryId = categoryId;
        if (oldCategoryId !== categoryId) {
          this.applyTopicTemplate(oldCategoryId, categoryId);
        }
        return categoryId;
      }
    },
    category(categoryId) {
      return categoryId ? this.site.categories.findBy("id", categoryId) : null;
    },
    minimumRequiredTags(minimumRequiredTags) {
      return minimumRequiredTags || 0;
    },
    creatingTopic: (0, _computed.equal)("action", CREATE_TOPIC),
    creatingSharedDraft: (0, _computed.equal)("action", CREATE_SHARED_DRAFT),
    creatingPrivateMessage: (0, _computed.equal)("action", PRIVATE_MESSAGE),
    notCreatingPrivateMessage: (0, _computed.not)("creatingPrivateMessage"),
    notPrivateMessage: (0, _computed.not)("privateMessage"),
    disableTitleInput(editingPost, canEditTopic) {
      return editingPost && !canEditTopic;
    },
    showCategoryChooser(isPrivateMessage, hasOptions) {
      const manyCategories = this.site.categories.length > 1;
      return !isPrivateMessage && (hasOptions || manyCategories);
    },
    privateMessage(creatingPrivateMessage, topic) {
      return creatingPrivateMessage || topic && topic.archetype === "private_message";
    },
    topicFirstPost: (0, _computed.or)("creatingTopic", "editingFirstPost"),
    editingPost: isEdit,
    replyingToTopic: (0, _computed.equal)("action", REPLY),
    viewOpen: (0, _computed.equal)("composeState", OPEN),
    viewDraft: (0, _computed.equal)("composeState", DRAFT),
    viewFullscreen: (0, _computed.equal)("composeState", FULLSCREEN),
    viewOpenOrFullscreen: (0, _computed.or)("viewOpen", "viewFullscreen"),
    composeStateChanged() {
      const oldOpen = this.composerOpened;
      const elem = document.querySelector("html");
      if (this.composeState === FULLSCREEN) {
        elem.classList.add("fullscreen-composer");
      } else {
        elem.classList.remove("fullscreen-composer");
      }
      if (this.composeState === OPEN) {
        this.set("composerOpened", oldOpen || new Date());
        elem.classList.add("composer-open");
      } else {
        if (oldOpen) {
          const oldTotal = this.composerTotalOpened || 0;
          this.set("composerTotalOpened", oldTotal + (new Date() - oldOpen));
        }
        this.set("composerOpened", null);
        elem.classList.remove("composer-open");
      }
    },
    composerTime: {
      get() {
        let total = this.composerTotalOpened || 0;
        const oldOpen = this.composerOpened;
        if (oldOpen) {
          total += new Date() - oldOpen;
        }
        return total;
      }
    },
    archetype(archetypeId) {
      return this.archetypes.findBy("id", archetypeId);
    },
    archetypeChanged() {
      return this.set("metaData", _object.default.create());
    },
    // called whenever the user types to update the typing time
    typing() {
      (0, _runloop.throttle)(this, function () {
        const typingTime = this.typingTime || 0;
        this.set("typingTime", typingTime + 100);
      }, 100, false);
    },
    editingFirstPost: (0, _computed.and)("editingPost", "post.firstPost"),
    canEditTitle: (0, _computed.or)("creatingTopic", "creatingPrivateMessage", "editingFirstPost", "creatingSharedDraft"),
    canCategorize: (0, _computed.and)("canEditTitle", "notCreatingPrivateMessage", "notPrivateMessage"),
    canEditTopicFeaturedLink(canEditTitle, creatingPrivateMessage, categoryId, userTrustLevel) {
      if (userTrustLevel === 0) {
        return false;
      }
      if (!this.siteSettings.topic_featured_link_enabled || !canEditTitle || creatingPrivateMessage) {
        return false;
      }
      const categoryIds = this.site.topic_featured_link_allowed_category_ids;
      if (!categoryId && categoryIds && (categoryIds.includes(this.site.uncategorized_category_id) || !this.siteSettings.allow_uncategorized_topics)) {
        return true;
      }
      return categoryIds === undefined || !categoryIds.length || categoryIds.includes(categoryId);
    },
    titlePlaceholder(canEditTopicFeaturedLink) {
      return canEditTopicFeaturedLink ? "composer.title_or_link_placeholder" : "composer.title_placeholder";
    },
    replyOptions(action, post, topic, topicTitle) {
      const options = {
        userLink: null,
        topicLink: null,
        postLink: null,
        userAvatar: null,
        originalUser: null
      };
      if (topic) {
        options.topicLink = {
          href: topic.url,
          anchor: topic.fancyTitle || (0, _utilities.escapeExpression)(topicTitle)
        };
      }
      if (post) {
        options.label = _I18n.default.t(`post.${action}`);
        options.userAvatar = (0, _utilities.tinyAvatar)(post.avatar_template);
        if (!this.site.mobileView) {
          const originalUserName = post.get("reply_to_user.username");
          const originalUserAvatar = post.get("reply_to_user.avatar_template");
          if (originalUserName && originalUserAvatar && isEdit(action)) {
            options.originalUser = {
              username: originalUserName,
              avatar: (0, _utilities.tinyAvatar)(originalUserAvatar)
            };
          }
        }
      }
      if (topic && post) {
        const postNumber = post.post_number;
        options.postLink = {
          href: `${topic.url}/${postNumber}`,
          anchor: _I18n.default.t("post.post_number", {
            number: postNumber
          })
        };
        const name = (0, _settings.prioritizeNameFallback)(post.name, post.username);
        options.userLink = {
          href: `${topic.url}/${postNumber}`,
          anchor: name
        };
      }
      return options;
    },
    targetRecipientsArray(targetRecipients) {
      const recipients = targetRecipients ? targetRecipients.split(",") : [];
      const groups = new Set(this.site.groups.map(g => g.name));
      return recipients.map(item => {
        if (groups.has(item)) {
          return {
            type: "group",
            name: item
          };
        } else if ((0, _utilities.emailValid)(item)) {
          return {
            type: "email",
            name: item
          };
        } else {
          return {
            type: "user",
            name: item
          };
        }
      });
    },
    cantSubmitPost(loading, canEditTitle, titleLength, targetRecipients, targetRecipientsArray, replyLength, categoryId, missingReplyCharacters, tags, topicFirstPost, minimumRequiredTags, isStaffUser) {
      // can't submit while loading
      if (loading) {
        return true;
      }

      // title is required when
      //  - creating a new topic/private message
      //  - editing the 1st post
      if (canEditTitle && !this.titleLengthValid) {
        return true;
      }

      // reply is always required
      if (missingReplyCharacters > 0) {
        return true;
      }
      if (this.site.can_tag_topics && !isStaffUser && topicFirstPost && minimumRequiredTags) {
        const tagsArray = tags || [];
        if (tagsArray.length < minimumRequiredTags) {
          return true;
        }
      }
      if (topicFirstPost) {
        // user should modify topic template
        const category = this.category;
        if (category && category.topic_template) {
          if (this.reply.trim() === category.topic_template.trim()) {
            this.dialog.alert(_I18n.default.t("composer.error.topic_template_not_modified"));
            return true;
          }
        }
      }
      if (this.privateMessage) {
        // need at least one user when sending a PM
        return targetRecipients && targetRecipientsArray.length === 0;
      } else {
        // has a category? (when needed)
        return this.requiredCategoryMissing;
      }
    },
    requiredCategoryMissing(canCategorize, categoryId) {
      return canCategorize && !categoryId && !this.siteSettings.allow_uncategorized_topics && !!this._hasTopicTemplates;
    },
    titleLengthValid(minTitleLength, titleLength, staticDoc) {
      if (this.user.admin && staticDoc && titleLength > 0) {
        return true;
      }
      if (titleLength < minTitleLength) {
        return false;
      }
      return titleLength <= this.siteSettings.max_topic_title_length;
    },
    hasMetaData(metaData) {
      return metaData ? (0, _utils.isEmpty)(Object.keys(metaData)) : false;
    },
    replyDirty: (0, _computed2.propertyNotEqual)("reply", "originalText"),
    titleDirty: (0, _computed2.propertyNotEqual)("title", "originalTitle"),
    missingTitleCharacters(minimumTitleLength, titleLength) {
      return minimumTitleLength - titleLength;
    },
    minimumTitleLength(privateMessage) {
      if (privateMessage) {
        return this.siteSettings.min_personal_message_title_length;
      } else {
        return this.siteSettings.min_topic_title_length;
      }
    },
    missingReplyCharacters(minimumPostLength, replyLength, canEditTopicFeaturedLink) {
      if (this.get("post.post_type") === this.site.get("post_types.small_action") || canEditTopicFeaturedLink && this.featuredLink) {
        return 0;
      }
      return minimumPostLength - replyLength;
    },
    minimumPostLength(privateMessage, topicFirstPost, pmWithNonHumanUser) {
      if (pmWithNonHumanUser) {
        return 1;
      } else if (privateMessage) {
        return this.siteSettings.min_personal_message_post_length;
      } else if (topicFirstPost) {
        // first post (topic body)
        return this.siteSettings.min_first_post_length;
      } else {
        return this.siteSettings.min_post_length;
      }
    },
    titleLength(title) {
      title = title || "";
      return title.replace(/\s+/gim, " ").trim().length;
    },
    replyLength(reply) {
      reply = reply || "";
      if (reply.length > FAST_REPLY_LENGTH_THRESHOLD) {
        return reply.length;
      }
      const commentsRegexp = /<!--(.*?)-->/gm;
      while (commentsRegexp.test(reply)) {
        reply = reply.replace(commentsRegexp, "");
      }
      while (_quote.QUOTE_REGEXP.test(reply)) {
        // make it global so we can strip as many quotes at once
        // keep in mind nested quotes mean we still need a loop here
        const regex = new RegExp(_quote.QUOTE_REGEXP.source, "img");
        reply = reply.replace(regex, "");
      }

      // This is in place so we do not generate any intermediate
      // strings while calculating the length, this is issued
      // every keypress in the composer so it needs to be very fast
      let len = 0,
        skipSpace = true;
      for (let i = 0; i < reply.length; i++) {
        const code = reply.charCodeAt(i);
        let isSpace = false;
        if (code >= 0x2000 && code <= 0x200a) {
          isSpace = true;
        } else {
          switch (code) {
            case 0x09: // \t
            case 0x0a: // \n
            case 0x0b: // \v
            case 0x0c: // \f
            case 0x0d: // \r
            case 0x20:
            case 0xa0:
            case 0x1680:
            case 0x202f:
            case 0x205f:
            case 0x3000:
              isSpace = true;
          }
        }
        if (isSpace) {
          if (!skipSpace) {
            len++;
            skipSpace = true;
          }
        } else {
          len++;
          skipSpace = false;
        }
      }
      if (len > 0 && skipSpace) {
        len--;
      }
      return len;
    },
    _setupComposer() {
      this.set("archetypeId", this.site.default_archetype);
    },
    appendText(text, position, opts) {
      const reply = this.reply || "";
      position = typeof position === "number" ? position : reply.length;
      let before = reply.slice(0, position) || "";
      let after = reply.slice(position) || "";
      let stripped, i;
      if (opts && opts.block) {
        if (before.trim() !== "") {
          stripped = before.replace(/\r/g, "");
          for (i = 0; i < 2; i++) {
            if (stripped[stripped.length - 1 - i] !== "\n") {
              before += "\n";
              position++;
            }
          }
        }
        if (after.trim() !== "") {
          stripped = after.replace(/\r/g, "");
          for (i = 0; i < 2; i++) {
            if (stripped[i] !== "\n") {
              after = "\n" + after;
            }
          }
        }
      }
      if (opts && opts.space) {
        if (before.length > 0 && !before[before.length - 1].match(/\s/)) {
          before = before + " ";
        }
        if (after.length > 0 && !after[0].match(/\s/)) {
          after = " " + after;
        }
      }
      if (opts && opts.new_line) {
        if (before.length > 0) {
          text = "\n\n" + text.trim();
        } else {
          text = text.trim();
        }
      }
      this.set("reply", before + text + after);
      return before.length + text.length;
    },
    prependText(text, opts) {
      const reply = this.reply || "";
      if (opts && opts.new_line && reply.length > 0) {
        text = text.trim() + "\n\n";
      }
      this.set("reply", text + reply);
    },
    applyTopicTemplate(oldCategoryId, categoryId) {
      if (this.action !== CREATE_TOPIC) {
        return;
      }
      let reply = this.reply;

      // If the user didn't change the template, clear it
      if (oldCategoryId) {
        const oldCat = this.site.categories.findBy("id", oldCategoryId);
        if (oldCat && oldCat.topic_template === reply) {
          reply = "";
        }
      }
      if (!(0, _utils.isEmpty)(reply)) {
        return;
      }
      const category = this.site.categories.findBy("id", categoryId);
      if (category) {
        this.set("reply", category.topic_template || "");
      }
    },
    /**
      Open a composer
       @method open
      @param {Object} opts
        @param {String} opts.action The action we're performing: edit, reply, createTopic, createSharedDraft, privateMessage
        @param {String} opts.draftKey
        @param {String} opts.draftSequence
        @param {Post} [opts.post] The post we're replying to, if present
        @param {Topic} [opts.topic] The topic we're replying to, if present
        @param {String} [opts.quote] If we're opening a reply from a quote, the quote we're making
        @param {String} [opts.reply]
        @param {String} [opts.recipients]
        @param {Number} [opts.composerTime]
        @param {Number} [opts.typingTime]
        @param {Boolean} [opts.whisper]
        @param {Boolean} [opts.noBump]
        @param {String} [opts.archetypeId] One of `site.archetypes` e.g. `regular` or `private_message`
        @param {Object} [opts.metaData]
        @param {Number} [opts.categoryId]
        @param {Number} [opts.postId]
        @param {Number} [opts.destinationCategoryId]
        @param {String} [opts.title]
    **/
    open(opts) {
      let promise = _rsvp.Promise.resolve();
      if (!opts) {
        opts = {};
      }
      this.set("loading", true);
      if (!(0, _utils.isEmpty)(this.reply) && (opts.reply || isEdit(opts.action)) && this.replyDirty) {
        return promise;
      }
      if (opts.action === REPLY && isEdit(this.action)) {
        this.set("reply", "");
      }
      if (!opts.draftKey) {
        throw new Error("draft key is required");
      }
      if (opts.draftSequence === null) {
        throw new Error("draft sequence is required");
      }
      if (opts.usernames) {
        (0, _deprecated.default)("`usernames` is deprecated, use `recipients` instead.", {
          id: "discourse.composer.usernames"
        });
      }
      this.setProperties({
        draftKey: opts.draftKey,
        draftSequence: opts.draftSequence,
        composeState: opts.composerState || OPEN,
        action: opts.action,
        topic: opts.topic,
        targetRecipients: opts.usernames || opts.recipients,
        composerTotalOpened: opts.composerTime,
        typingTime: opts.typingTime,
        whisper: opts.whisper,
        tags: opts.tags,
        noBump: opts.noBump
      });
      if (opts.post) {
        this.setProperties({
          post: opts.post,
          whisper: opts.post.post_type === this.site.post_types.whisper
        });
        if (!this.topic) {
          this.set("topic", opts.post.topic);
        }
      } else if (opts.postId) {
        promise = promise.then(() => this.store.find("post", opts.postId).then(post => {
          this.set("post", post);
          if (post) {
            this.set("topic", post.topic);
          }
        }));
      } else {
        this.set("post", null);
      }
      this.setProperties({
        archetypeId: opts.archetypeId || this.site.default_archetype,
        metaData: opts.metaData ? _object.default.create(opts.metaData) : null,
        reply: opts.reply || this.reply || ""
      });

      // We set the category id separately for topic templates on opening of composer
      this.set("categoryId", opts.categoryId || this.get("topic.category.id"));
      if (!this.categoryId && this.creatingTopic) {
        const categories = this.site.categories;
        if (categories.length === 1) {
          this.set("categoryId", categories[0].id);
        }
      }
      this._hasTopicTemplates = this.site.categories.some(c => c.topic_template);

      // If we are editing a post, load it.
      if (isEdit(opts.action) && this.post) {
        const topicProps = this.serialize(_edit_topic_serializer);
        topicProps.loading = true;

        // When editing a shared draft, use its category
        if (opts.action === EDIT_SHARED_DRAFT && opts.destinationCategoryId) {
          topicProps.categoryId = opts.destinationCategoryId;
        }
        this.setProperties(topicProps);
        promise = promise.then(() => {
          let rawPromise = this.store.find("post", opts.post.id).then(post => {
            this.setProperties({
              post,
              reply: post.raw,
              originalText: post.raw
            });
          });

          // edge case ... make a post then edit right away
          // store does not have topic for the post
          if (this.topic && this.topic.id === this.post.topic_id) {
            // nothing to do ... we have the right topic
          } else {
            rawPromise = this.store.find("topic", this.post.topic_id).then(topic => {
              this.set("topic", topic);
            });
          }
          return rawPromise.then(() => {
            this.appEvents.trigger("composer:reply-reloaded", this);
          });
        });
      } else if (opts.action === REPLY && opts.quote) {
        this.setProperties({
          reply: opts.quote,
          originalText: opts.quote
        });
      }
      if (opts.title) {
        this.set("title", opts.title);
      }
      const isDraft = opts.draft || opts.skipDraftCheck;
      this.set("originalText", isDraft ? "" : this.reply);
      if (this.canEditTitle) {
        if ((0, _utils.isEmpty)(this.title) && this.title !== "") {
          this.set("title", "");
        }
        this.set("originalTitle", this.title);
      }
      if (!isEdit(opts.action) || !opts.post) {
        promise = promise.then(() => this.appEvents.trigger("composer:reply-reloaded", this));
      }

      // Ensure additional draft fields are set
      Object.keys(_add_draft_fields).forEach(f => {
        this.set(_add_draft_fields[f], opts[f]);
      });
      return promise.finally(() => {
        this.set("loading", false);
      });
    },
    // Overwrite to implement custom logic
    beforeSave() {
      return _rsvp.Promise.resolve();
    },
    save(opts) {
      return this.beforeSave().then(() => {
        if (!this.cantSubmitPost) {
          // change category may result in some effect for topic featured link
          if (!this.canEditTopicFeaturedLink) {
            this.set("featuredLink", null);
          }
          return this.editingPost ? this.editPost(opts) : this.createPost(opts);
        }
      });
    },
    clearState() {
      this.setProperties({
        originalText: null,
        reply: null,
        post: null,
        title: null,
        unlistTopic: false,
        editReason: null,
        stagedPost: false,
        typingTime: 0,
        composerOpened: null,
        composerTotalOpened: 0,
        featuredLink: null,
        noBump: false,
        editConflict: false
      });
    },
    rawOld(editConflict, originalText) {
      return editConflict ? null : originalText;
    },
    editPost(opts) {
      const post = this.post;
      const oldCooked = post.cooked;
      let promise = _rsvp.Promise.resolve();

      // Update the topic if we're editing the first post
      if (this.title && post.post_number === 1) {
        const topic = this.topic;
        if (topic.details.can_edit) {
          const topicProps = this.getProperties(Object.keys(_edit_topic_serializer));
          // frontend should have featuredLink but backend needs featured_link
          if (topicProps.featuredLink) {
            topicProps.featured_link = topicProps.featuredLink;
            delete topicProps.featuredLink;
          }

          // If we're editing a shared draft, keep the original category
          if (this.action === EDIT_SHARED_DRAFT) {
            const destinationCategoryId = topicProps.categoryId;
            promise = promise.then(() => topic.updateDestinationCategory(destinationCategoryId));
            topicProps.categoryId = topic.get("category.id");
          }
          promise = promise.then(() => _topic.default.update(topic, topicProps));
        } else if (topic.details.can_edit_tags) {
          promise = promise.then(() => topic.updateTags(this.tags));
        }
      }
      const props = {
        edit_reason: opts.editReason,
        image_sizes: opts.imageSizes,
        cooked: this.getCookedHtml()
      };
      this.serialize(_update_serializer, props);
      this.set("composeState", SAVING);
      const rollback = (0, _ajaxError.throwAjaxError)(error => {
        post.setProperties("cooked", oldCooked);
        this.set("composeState", OPEN);
        if (error.jqXHR && error.jqXHR.status === 409) {
          this.set("editConflict", true);
        }
      });
      post.setProperties({
        cooked: props.cooked,
        staged: true
      });
      this.appEvents.trigger("post-stream:refresh", {
        id: post.id
      });
      return promise.then(() => {
        return post.save(props).then(result => {
          this.clearState();
          return result;
        });
      }).catch(rollback).finally(() => {
        post.set("staged", false);
        this.appEvents.trigger("post-stream:refresh", {
          id: post.id
        });
      });
    },
    serialize(serializer, dest) {
      dest = dest || {};
      Object.keys(serializer).forEach(f => {
        const val = this.get(serializer[f]);
        if (typeof val !== "undefined") {
          (0, _object.set)(dest, f, val);
        }
      });
      return dest;
    },
    async createPost(opts) {
      if (CREATE_TOPIC === this.action || PRIVATE_MESSAGE === this.action) {
        this.set("topic", null);
      }
      const post = this.post;
      const topic = this.topic;
      const user = this.user;
      const postStream = this.get("topic.postStream");
      const postTypes = this.site.post_types;
      const postType = this.whisper ? postTypes.whisper : postTypes.regular;

      // Build the post object
      const createdPost = this.store.createRecord("post", {
        imageSizes: opts.imageSizes,
        cooked: this.getCookedHtml(),
        reply_count: 0,
        name: user.name,
        display_username: user.name,
        username: user.username,
        user_id: user.id,
        user_title: user.title,
        avatar_template: user.avatar_template,
        user_custom_fields: user.custom_fields,
        post_type: postType,
        actions_summary: [],
        moderator: user.moderator,
        admin: user.admin,
        yours: true,
        read: true,
        wiki: false,
        typingTime: this.typingTime,
        composerTime: this.composerTime
      });
      this.serialize(_create_serializer, createdPost);
      if (post) {
        createdPost.setProperties({
          reply_to_post_number: post.post_number,
          reply_to_user: post.getProperties("username", "avatar_template")
        });
      }
      let state = null;

      // If we're in a topic, we can append the post instantly.
      if (postStream) {
        // If it's in reply to another post, increase the reply count
        post?.setProperties({
          reply_count: (post.reply_count || 0) + 1,
          replies: []
        });

        // We do not stage posts in mobile view, we do not have the "cooked"
        // Furthermore calculating cooked is very complicated, especially since
        // we would need to handle oneboxes and other bits that are not even in the
        // engine, staging will just cause a blank post to render
        if (!(0, _utils.isEmpty)(createdPost.cooked)) {
          state = postStream.stagePost(createdPost, user);
          if (state === "alreadyStaging") {
            return;
          }
        }
      }
      this.setProperties({
        composeState: SAVING,
        stagedPost: state === "staged" && createdPost
      });
      try {
        const result = await createdPost.save();
        let saving = true;
        if (result.responseJson.action === "enqueued") {
          postStream?.undoPost(createdPost);
          return result;
        }

        // We sometimes want to hide the `reply_to_user` if the post contains a quote
        if (result.responseJson.post && !result.responseJson.post.reply_to_user) {
          createdPost.set("reply_to_user", null);
        }
        let addedToStream = false;
        if (topic) {
          // It's no longer a new post
          topic.set("draft_sequence", result.target.draft_sequence);
          postStream.commitPost(createdPost);
          addedToStream = true;
        } else {
          // We created a new topic, let's show it.
          this.set("composeState", CLOSED);
          saving = false;

          // Update topic_count for the category
          const postCategoryId = parseInt(createdPost.category, 10) || 1;
          const category = this.site.categories.find(x => x.id === postCategoryId);
          category?.incrementProperty("topic_count");
        }
        this.clearState();
        this.set("createdPost", createdPost);
        if (this.replyingToTopic) {
          this.appEvents.trigger("post:created", createdPost);
        } else {
          this.appEvents.trigger("topic:created", createdPost, this);
        }
        if (addedToStream) {
          this.set("composeState", CLOSED);
        } else if (saving) {
          this.set("composeState", SAVING);
        }
        return result;
      } catch (error) {
        if (postStream) {
          postStream.undoPost(createdPost);
          post?.set("reply_count", post.reply_count - 1);
        }
        (0, _runloop.next)(() => this.set("composeState", OPEN));
        throw (0, _ajaxError.extractError)(error);
      }
    },
    getCookedHtml() {
      const editorPreviewNode = document.querySelector("#reply-control .d-editor-preview");
      if (editorPreviewNode) {
        return editorPreviewNode.innerHTML.replace(/<span class="marker"><\/span>/g, "");
      }
      return "";
    },
    canSaveDraft() {
      if (this.draftSaving) {
        return false;
      }

      // Do not save when drafts are disabled
      if (this.disableDrafts) {
        return false;
      }
      if (this.canEditTitle) {
        // Save title and/or post body
        if ((0, _utils.isEmpty)(this.title) && (0, _utils.isEmpty)(this.reply)) {
          return false;
        }

        // Do not save when both title and reply's length are too small
        if (!this.titleLengthValid && this.replyLength < this.minimumPostLength) {
          return false;
        }
      } else {
        // Do not save when there is no reply
        if ((0, _utils.isEmpty)(this.reply)) {
          return false;
        }
      }
      return true;
    },
    saveDraft(user) {
      if (!this.canSaveDraft) {
        return _rsvp.Promise.resolve();
      }
      this.setProperties({
        draftSaving: true,
        draftConflictUser: null
      });
      let data = this.serialize(_draft_serializer);
      if (data.postId && !(0, _utils.isEmpty)(this.originalText)) {
        data.originalText = this.originalText;
      }
      const draftSequence = this.draftSequence;
      this.set("draftSequence", this.draftSequence + 1);
      return _draft.default.save(this.draftKey, draftSequence, data, this.messageBus.clientId, {
        forceSave: this.draftForceSave
      }).then(result => {
        if ("draft_sequence" in result) {
          this.set("draftSequence", result.draft_sequence);
        }
        if (result.conflict_user) {
          this.setProperties({
            draftStatus: _I18n.default.t("composer.edit_conflict"),
            draftConflictUser: result.conflict_user
          });
        } else {
          if (this.draftKey === NEW_TOPIC_KEY && user) {
            user.set("has_topic_draft", true);
          }
          this.setProperties({
            draftStatus: null,
            draftConflictUser: null,
            draftForceSave: false
          });
        }
      }).catch(e => {
        let draftStatus;
        const xhr = e && e.jqXHR;
        if (xhr && xhr.status === 409 && xhr.responseJSON && xhr.responseJSON.errors && xhr.responseJSON.errors.length) {
          const json = e.jqXHR.responseJSON;
          draftStatus = json.errors[0];
          if (json.extras?.description) {
            this.dialog.alert({
              message: json.extras.description,
              buttons: [{
                label: _I18n.default.t("composer.reload"),
                class: "btn-primary",
                action: () => window.location.reload()
              }, {
                label: _I18n.default.t("composer.ignore"),
                class: "btn",
                action: () => this.set("draftForceSave", true)
              }]
            });
          }
        }
        this.setProperties({
          draftStatus: draftStatus || _I18n.default.t("composer.drafts_offline"),
          draftConflictUser: null
        });
      }).finally(() => {
        this.set("draftSaving", false);
      });
    },
    customizationFor(type) {
      for (let i = 0; i < _customizations.length; i++) {
        let cb = _customizations[i][type];
        if (cb) {
          let result = cb(this);
          if (result) {
            return result;
          }
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "categoryId", [_decorators.default], (_init = Object.getOwnPropertyDescriptor(_obj, "categoryId"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "category", [_dec], Object.getOwnPropertyDescriptor(_obj, "category"), _obj), _applyDecoratedDescriptor(_obj, "minimumRequiredTags", [_dec2], Object.getOwnPropertyDescriptor(_obj, "minimumRequiredTags"), _obj), _applyDecoratedDescriptor(_obj, "disableTitleInput", [_dec3], Object.getOwnPropertyDescriptor(_obj, "disableTitleInput"), _obj), _applyDecoratedDescriptor(_obj, "showCategoryChooser", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showCategoryChooser"), _obj), _applyDecoratedDescriptor(_obj, "privateMessage", [_dec5], Object.getOwnPropertyDescriptor(_obj, "privateMessage"), _obj), _applyDecoratedDescriptor(_obj, "editingPost", [_dec6], (_init2 = Object.getOwnPropertyDescriptor(_obj, "editingPost"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "composeStateChanged", [_dec7], Object.getOwnPropertyDescriptor(_obj, "composeStateChanged"), _obj), _applyDecoratedDescriptor(_obj, "composerTime", [_decorators.default], (_init3 = Object.getOwnPropertyDescriptor(_obj, "composerTime"), _init3 = _init3 ? _init3.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init3;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "archetype", [_dec8], Object.getOwnPropertyDescriptor(_obj, "archetype"), _obj), _applyDecoratedDescriptor(_obj, "archetypeChanged", [_dec9], Object.getOwnPropertyDescriptor(_obj, "archetypeChanged"), _obj), _applyDecoratedDescriptor(_obj, "canEditTopicFeaturedLink", [_dec10], Object.getOwnPropertyDescriptor(_obj, "canEditTopicFeaturedLink"), _obj), _applyDecoratedDescriptor(_obj, "titlePlaceholder", [_dec11], Object.getOwnPropertyDescriptor(_obj, "titlePlaceholder"), _obj), _applyDecoratedDescriptor(_obj, "replyOptions", [_dec12], Object.getOwnPropertyDescriptor(_obj, "replyOptions"), _obj), _applyDecoratedDescriptor(_obj, "targetRecipientsArray", [_dec13], Object.getOwnPropertyDescriptor(_obj, "targetRecipientsArray"), _obj), _applyDecoratedDescriptor(_obj, "cantSubmitPost", [_dec14], Object.getOwnPropertyDescriptor(_obj, "cantSubmitPost"), _obj), _applyDecoratedDescriptor(_obj, "requiredCategoryMissing", [_dec15], Object.getOwnPropertyDescriptor(_obj, "requiredCategoryMissing"), _obj), _applyDecoratedDescriptor(_obj, "titleLengthValid", [_dec16], Object.getOwnPropertyDescriptor(_obj, "titleLengthValid"), _obj), _applyDecoratedDescriptor(_obj, "hasMetaData", [_dec17], Object.getOwnPropertyDescriptor(_obj, "hasMetaData"), _obj), _applyDecoratedDescriptor(_obj, "missingTitleCharacters", [_dec18], Object.getOwnPropertyDescriptor(_obj, "missingTitleCharacters"), _obj), _applyDecoratedDescriptor(_obj, "minimumTitleLength", [_dec19], Object.getOwnPropertyDescriptor(_obj, "minimumTitleLength"), _obj), _applyDecoratedDescriptor(_obj, "missingReplyCharacters", [_dec20], Object.getOwnPropertyDescriptor(_obj, "missingReplyCharacters"), _obj), _applyDecoratedDescriptor(_obj, "minimumPostLength", [_dec21], Object.getOwnPropertyDescriptor(_obj, "minimumPostLength"), _obj), _applyDecoratedDescriptor(_obj, "titleLength", [_dec22], Object.getOwnPropertyDescriptor(_obj, "titleLength"), _obj), _applyDecoratedDescriptor(_obj, "replyLength", [_dec23], Object.getOwnPropertyDescriptor(_obj, "replyLength"), _obj), _applyDecoratedDescriptor(_obj, "_setupComposer", [_dec24], Object.getOwnPropertyDescriptor(_obj, "_setupComposer"), _obj), _applyDecoratedDescriptor(_obj, "rawOld", [_dec25], Object.getOwnPropertyDescriptor(_obj, "rawOld"), _obj), _applyDecoratedDescriptor(_obj, "canSaveDraft", [_dec26], Object.getOwnPropertyDescriptor(_obj, "canSaveDraft"), _obj)), _obj)));
  Composer.reopenClass({
    // TODO: Replace with injection
    create(args) {
      args = args || {};
      args.user = args.user || _user.default.current();
      args.site = args.site || _site.default.current();
      return this._super(args);
    },
    serializeToTopic(fieldName, property) {
      if (!property) {
        property = fieldName;
      }
      _edit_topic_serializer[fieldName] = property;
    },
    serializeOnCreate(fieldName, property) {
      if (!property) {
        property = fieldName;
      }
      _create_serializer[fieldName] = property;
    },
    serializedFieldsForCreate() {
      return Object.keys(_create_serializer);
    },
    serializeOnUpdate(fieldName, property) {
      if (!property) {
        property = fieldName;
      }
      _update_serializer[fieldName] = property;
    },
    serializedFieldsForUpdate() {
      return Object.keys(_update_serializer);
    },
    serializeToDraft(fieldName, property) {
      if (!property) {
        property = fieldName;
      }
      _draft_serializer[fieldName] = property;
      _add_draft_fields[fieldName] = property;
    },
    serializedFieldsForDraft() {
      return Object.keys(_draft_serializer);
    },
    // The status the compose view can have
    CLOSED,
    SAVING,
    OPEN,
    DRAFT,
    FULLSCREEN,
    // The actions the composer can take
    CREATE_TOPIC,
    CREATE_SHARED_DRAFT,
    EDIT_SHARED_DRAFT,
    PRIVATE_MESSAGE,
    REPLY,
    EDIT,
    // Draft key
    NEW_PRIVATE_MESSAGE_KEY,
    NEW_TOPIC_KEY
  });
  var _default = Composer;
  _exports.default = _default;
});