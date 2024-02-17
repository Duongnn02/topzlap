define("discourse/services/composer", ["exports", "discourse/models/composer", "@ember/controller", "@ember/object", "@ember/object/computed", "discourse/lib/uploads", "@ember/runloop", "discourse/helpers/slow-mode", "discourse-common/utils/decorators", "@ember-decorators/object", "discourse/lib/url", "discourse/models/draft", "I18n", "rsvp", "discourse/lib/quote", "discourse-common/lib/deprecated", "discourse-common/lib/debounce", "discourse/lib/text", "discourse/lib/utilities", "discourse-common/lib/get-owner", "discourse-common/lib/get-url", "@ember/utils", "discourse-common/config/environment", "@ember/service", "discourse/lib/formatter", "discourse/lib/show-modal", "discourse/helpers/category-link", "discourse/lib/render-tags", "@ember/template", "discourse-common/lib/icon-library"], function (_exports, _composer, _controller, _object, _computed, _uploads, _runloop, _slowMode, _decorators, _object2, _url, _draft, _I18n, _rsvp, _quote, _deprecated, _debounce, _text, _utilities, _getOwner, _getUrl, _utils, _environment, _service, _formatter, _showModal, _categoryLink, _renderTags, _template, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addComposerSaveErrorCallback = addComposerSaveErrorCallback;
  _exports.addPopupMenuOptionsCallback = addPopupMenuOptionsCallback;
  _exports.clearComposerSaveErrorCallback = clearComposerSaveErrorCallback;
  _exports.clearPopupMenuOptionsCallback = clearPopupMenuOptionsCallback;
  _exports.default = void 0;
  _exports.toggleCheckDraftPopup = toggleCheckDraftPopup;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/composer",0,"@ember/controller",0,"@ember/object",0,"@ember/object/computed",0,"discourse/lib/uploads",0,"@ember/runloop",0,"discourse/helpers/slow-mode",0,"discourse-common/utils/decorators",0,"@ember-decorators/object",0,"discourse/lib/url",0,"discourse/models/draft",0,"I18n",0,"rsvp",0,"discourse/lib/quote",0,"discourse-common/lib/deprecated",0,"discourse-common/lib/debounce",0,"discourse/lib/text",0,"discourse/lib/utilities",0,"discourse-common/lib/get-owner",0,"discourse-common/lib/get-url",0,"@ember/utils",0,"discourse-common/config/environment",0,"@ember/service",0,"discourse/lib/formatter",0,"discourse/lib/show-modal",0,"discourse/helpers/category-link",0,"discourse/lib/render-tags",0,"@ember/template",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  async function loadDraft(store) {
    let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let {
      draft,
      draftKey,
      draftSequence
    } = opts;
    try {
      if (draft && typeof draft === "string") {
        draft = JSON.parse(draft);
      }
    } catch (error) {
      draft = null;
      _draft.default.clear(draftKey, draftSequence);
    }
    if (!draft?.title && !draft?.reply) {
      return;
    }
    let attrs = {
      draftKey,
      draftSequence,
      draft: true,
      composerState: _composer.default.DRAFT,
      topic: opts.topic
    };
    _composer.default.serializedFieldsForDraft().forEach(f => {
      attrs[f] = draft[f] || opts[f];
    });
    const composer = store.createRecord("composer");
    await composer.open(attrs);
    return composer;
  }
  const _popupMenuOptionsCallbacks = [];
  const _composerSaveErrorCallbacks = [];
  let _checkDraftPopup = !(0, _environment.isTesting)();
  function toggleCheckDraftPopup(enabled) {
    _checkDraftPopup = enabled;
  }
  function clearPopupMenuOptionsCallback() {
    _popupMenuOptionsCallbacks.length = 0;
  }
  function addPopupMenuOptionsCallback(callback) {
    _popupMenuOptionsCallbacks.push(callback);
  }
  function clearComposerSaveErrorCallback() {
    _composerSaveErrorCallbacks.length = 0;
  }
  function addComposerSaveErrorCallback(callback) {
    _composerSaveErrorCallbacks.push(callback);
  }
  let ComposerController = (_dec = (0, _computed.and)("site.mobileView", "showPreview"), _dec2 = (0, _computed.or)("isWhispering", "model.unlistTopic"), _dec3 = (0, _computed.alias)("site.categoriesList"), _dec4 = (0, _computed.alias)("topicController.model"), _dec5 = (0, _computed.reads)("currentUser.staff"), _dec6 = (0, _computed.reads)("currentUser.whisperer"), _dec7 = (0, _computed.and)("model.creatingTopic", "isStaffUser"), _dec8 = (0, _computed.or)("replyingToWhisper", "model.whisper"), _dec9 = (0, _object2.on)("init"), _dec10 = (0, _object.computed)("model.loading", "isUploading", "isProcessingUpload", "_disableSubmit"), _dec11 = (0, _decorators.default)("showPreview"), _dec12 = (0, _object2.observes)("showPreview"), _dec13 = (0, _decorators.default)("model.replyingToTopic", "model.creatingPrivateMessage", "model.targetRecipients", "model.composeState"), _dec14 = (0, _decorators.default)("model.canEditTitle", "model.creatingPrivateMessage"), _dec15 = (0, _decorators.default)("model.editingPost", "model.topic.details.can_edit"), _dec16 = (0, _decorators.default)("model.editingPost", "model.topic.canEditTags"), _dec17 = (0, _decorators.default)("canWhisper", "replyingToWhisper"), _dec18 = (0, _decorators.default)("model.post"), _dec19 = (0, _decorators.default)("model.action", "isWhispering", "model.privateMessage"), _dec20 = (0, _decorators.default)("model.action", "isWhispering", "model.editConflict", "model.privateMessage", "model.tags", "model.category"), _dec21 = (0, _decorators.default)("whisperer", "model.action"), _dec22 = (0, _decorators.default)("model.requiredCategoryMissing", "model.replyLength"), _dec23 = (0, _decorators.default)("model.composeState", "model.creatingTopic", "model.post"), _dec24 = (0, _decorators.default)("model.creatingPrivateMessage", "model.targetRecipients"), _dec25 = (0, _decorators.default)("model.topic.title"), _dec26 = (0, _decorators.default)(), _dec27 = (0, _object2.observes)("model.reply", "model.title"), _dec28 = (0, _decorators.default)("model.categoryId", "lastValidatedAt"), _dec29 = (0, _decorators.default)("model.category", "model.tags", "lastValidatedAt"), _dec30 = (0, _decorators.default)("model.viewFullscreen", "model.showFullScreenExitPrompt"), _dec31 = (0, _decorators.default)("model.action"), _dec32 = (0, _decorators.default)("model.composeState"), (_class = class ComposerController extends _controller.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "router", _descriptor, this);
      _initializerDefineProperty(this, "dialog", _descriptor2, this);
      _initializerDefineProperty(this, "site", _descriptor3, this);
      _initializerDefineProperty(this, "store", _descriptor4, this);
      _initializerDefineProperty(this, "appEvents", _descriptor5, this);
      _defineProperty(this, "checkedMessages", false);
      _defineProperty(this, "messageCount", null);
      _defineProperty(this, "showEditReason", false);
      _defineProperty(this, "editReason", null);
      _defineProperty(this, "scopedCategoryId", null);
      _defineProperty(this, "prioritizedCategoryId", null);
      _defineProperty(this, "lastValidatedAt", null);
      _defineProperty(this, "isUploading", false);
      _defineProperty(this, "isProcessingUpload", false);
      _defineProperty(this, "topic", null);
      _defineProperty(this, "linkLookup", null);
      _defineProperty(this, "showPreview", true);
      _defineProperty(this, "composerHeight", null);
      _initializerDefineProperty(this, "forcePreview", _descriptor6, this);
      _initializerDefineProperty(this, "whisperOrUnlistTopic", _descriptor7, this);
      _initializerDefineProperty(this, "categories", _descriptor8, this);
      _initializerDefineProperty(this, "topicModel", _descriptor9, this);
      _initializerDefineProperty(this, "isStaffUser", _descriptor10, this);
      _initializerDefineProperty(this, "whisperer", _descriptor11, this);
      _initializerDefineProperty(this, "canUnlistTopic", _descriptor12, this);
      _initializerDefineProperty(this, "isWhispering", _descriptor13, this);
    }
    get topicController() {
      return (0, _getOwner.getOwner)(this).lookup("controller:topic");
    }
    get capabilities() {
      return (0, _getOwner.getOwner)(this).lookup("capabilities:main");
    }
    _setupPreview() {
      const val = this.site.mobileView ? false : this.keyValueStore.get("composer.showPreview") || "true";
      this.set("showPreview", val === "true");
    }
    get disableSubmit() {
      return this.model?.loading || this.isUploading || this.isProcessingUpload || this._disableSubmit;
    }
    set disableSubmit(value) {
      return this.set("_disableSubmit", value);
    }
    toggleText(showPreview) {
      return showPreview ? _I18n.default.t("composer.hide_preview") : _I18n.default.t("composer.show_preview");
    }
    showPreviewChanged() {
      if (!this.site.mobileView) {
        this.keyValueStore.set({
          key: "composer.showPreview",
          value: this.showPreview
        });
      }
    }
    focusTarget(replyingToTopic, creatingPM, usernames, composeState) {
      // Focus on usernames if it's blank or if it's just you
      usernames = usernames || "";
      if (creatingPM && usernames.length === 0 || usernames === this.currentUser.username) {
        return "usernames";
      }
      if (replyingToTopic) {
        return "reply";
      }
      if (composeState === _composer.default.FULLSCREEN) {
        return "editor";
      }
      return "title";
    }
    get showToolbar() {
      const keyValueStore = (0, _getOwner.getOwner)(this).lookup("service:key-value-store");
      const storedVal = keyValueStore.get("toolbar-enabled");
      if (this._toolbarEnabled === undefined && storedVal === undefined) {
        // iPhone 6 is 375, anything narrower and toolbar should
        // be default disabled.
        // That said we should remember the state
        this._toolbarEnabled = window.innerWidth > 370 && !this.capabilities.isAndroid;
      }
      return this._toolbarEnabled || storedVal === "true";
    }
    set showToolbar(val) {
      const keyValueStore = (0, _getOwner.getOwner)(this).lookup("service:key-value-store");
      this._toolbarEnabled = val;
      keyValueStore.set({
        key: "toolbar-enabled",
        value: val ? "true" : "false"
      });
      return val;
    }
    canEditTags(canEditTitle, creatingPrivateMessage) {
      if (creatingPrivateMessage && this.site.mobileView) {
        return false;
      }
      const isPrivateMessage = creatingPrivateMessage || this.get("model.topic.isPrivateMessage");
      return canEditTitle && this.site.can_tag_topics && (!isPrivateMessage || this.site.can_tag_pms);
    }
    disableCategoryChooser(editingPost, canEditTopic) {
      return editingPost && !canEditTopic;
    }
    disableTagsChooser(editingPost, canEditTags) {
      return editingPost && !canEditTags;
    }
    showWhisperToggle(canWhisper, replyingToWhisper) {
      return canWhisper && !replyingToWhisper;
    }
    replyingToWhisper(repliedToPost) {
      return repliedToPost && repliedToPost.post_type === this.site.post_types.whisper;
    }
    saveIcon(modelAction, isWhispering, privateMessage) {
      if (isWhispering) {
        return "far-eye-slash";
      }
      if (privateMessage && modelAction === _composer.default.REPLY) {
        return "envelope";
      }
      return _composer.SAVE_ICONS[modelAction];
    }

    // Note we update when some other attributes like tag/category change to allow
    // text customizations to use those.
    saveLabel(modelAction, isWhispering, editConflict, privateMessage) {
      let result = this.model.customizationFor("saveLabel");
      if (result) {
        return result;
      }
      if (editConflict) {
        return "composer.overwrite_edit";
      } else if (isWhispering) {
        return "composer.create_whisper";
      } else if (privateMessage && modelAction === _composer.default.REPLY) {
        return "composer.create_pm";
      }
      return _composer.SAVE_LABELS[modelAction];
    }
    canWhisper(whisperer, modelAction) {
      return whisperer && modelAction === _composer.default.REPLY;
    }
    _setupPopupMenuOption(callback) {
      let option = callback(this);
      if (typeof option === "undefined") {
        return null;
      }
      if (typeof option.condition === "undefined") {
        option.condition = true;
      } else if (typeof option.condition === "boolean") {
        // uses existing value
      } else {
        option.condition = this.get(option.condition);
      }
      return option;
    }
    disableTextarea(requiredCategoryMissing, replyLength) {
      return requiredCategoryMissing && replyLength === 0;
    }
    popupMenuOptions(composeState) {
      if (composeState === "open" || composeState === "fullscreen") {
        const options = [];
        options.push(this._setupPopupMenuOption(() => {
          return {
            action: "toggleInvisible",
            icon: "far-eye-slash",
            label: "composer.toggle_unlisted",
            condition: "canUnlistTopic"
          };
        }));
        if (this.capabilities.touch) {
          options.push(this._setupPopupMenuOption(() => {
            return {
              action: "applyFormatCode",
              icon: "code",
              label: "composer.code_title"
            };
          }));
          options.push(this._setupPopupMenuOption(() => {
            return {
              action: "applyUnorderedList",
              icon: "list-ul",
              label: "composer.ulist_title"
            };
          }));
          options.push(this._setupPopupMenuOption(() => {
            return {
              action: "applyOrderedList",
              icon: "list-ol",
              label: "composer.olist_title"
            };
          }));
        }
        options.push(this._setupPopupMenuOption(() => {
          return {
            action: "toggleWhisper",
            icon: "far-eye-slash",
            label: "composer.toggle_whisper",
            condition: "showWhisperToggle"
          };
        }));
        return options.concat(_popupMenuOptionsCallbacks.map(callback => this._setupPopupMenuOption(callback)).filter(o => o));
      }
    }
    showWarning(creatingPrivateMessage, usernames) {
      if (!this.get("currentUser.staff")) {
        return false;
      }
      const hasTargetGroups = this.get("model.hasTargetGroups");

      // We need exactly one user to issue a warning
      if ((0, _utils.isEmpty)(usernames) || usernames.split(",").length !== 1 || hasTargetGroups) {
        return false;
      }
      return creatingPrivateMessage;
    }
    draftTitle(topicTitle) {
      return (0, _text.emojiUnescape)((0, _utilities.escapeExpression)(topicTitle));
    }
    allowUpload() {
      return (0, _uploads.authorizesOneOrMoreExtensions)(this.currentUser.staff, this.siteSettings);
    }
    uploadIcon() {
      return (0, _uploads.uploadIcon)(this.currentUser.staff, this.siteSettings);
    }

    // Use this to open the composer when you are not sure whether it is
    // already open and whether it already has a draft being worked on. Supports
    // options to append text once the composer is open if required.
    //
    // opts:
    //
    // - topic: if this is present, the composer will be opened with the reply
    // action and the current topic key and draft sequence
    // - fallbackToNewTopic: if true, and there is no draft and no topic,
    // the composer will be opened with the create_topic action and a new
    // topic draft key
    // - insertText: the text to append to the composer once it is opened
    // - openOpts: this object will be passed to this.open if fallbackToNewTopic is
    // true or topic is provided
    async focusComposer() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      await this._openComposerForFocus(opts);
      this._focusAndInsertText(opts.insertText);
    }
    async _openComposerForFocus(opts) {
      if (this.get("model.viewOpen")) {
        return;
      }
      const opened = this.openIfDraft();
      if (opened) {
        return;
      }
      if (opts.topic) {
        return await this.open({
          action: _composer.default.REPLY,
          draftKey: opts.topic.get("draft_key"),
          draftSequence: opts.topic.get("draft_sequence"),
          topic: opts.topic,
          ...(opts.openOpts || {})
        });
      }
      if (opts.fallbackToNewTopic) {
        return await this.open({
          action: _composer.default.CREATE_TOPIC,
          draftKey: _composer.default.NEW_TOPIC_KEY,
          ...(opts.openOpts || {})
        });
      }
    }
    _focusAndInsertText(insertText) {
      (0, _runloop.scheduleOnce)("afterRender", () => {
        document.querySelector("textarea.d-editor-input")?.focus();
        if (insertText) {
          this.model.appendText(insertText, null, {
            new_line: true
          });
        }
      });
    }
    openIfDraft(event) {
      if (!this.get("model.viewDraft")) {
        return false;
      }

      // when called from shortcut, ensure we don't propagate the key to
      // the composer input title
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.set("model.composeState", _composer.default.OPEN);
      document.documentElement.style.setProperty("--composer-height", this.get("model.composerHeight"));
      return true;
    }
    removeFullScreenExitPrompt() {
      this.set("model.showFullScreenExitPrompt", false);
    }
    async cancel(event) {
      event?.preventDefault();
      await this.cancelComposer();
    }
    cancelUpload(event) {
      event?.preventDefault();
      this.set("model.uploadCancelled", true);
    }
    togglePreview(event) {
      event?.preventDefault();
      this.toggleProperty("showPreview");
    }
    viewNewReply(event) {
      if (event && (0, _utilities.modKeysPressed)(event).length > 0) {
        return false;
      }
      event?.preventDefault();
      _url.default.routeTo(this.get("model.createdPost.url"));
      this.close();
    }
    closeComposer() {
      this.close();
    }
    async openComposer(options, post, topic) {
      await this.open(options);
      let url = post?.url || topic?.url;
      const topicTitle = topic?.title;
      if (!url || !topicTitle) {
        return;
      }
      url = `${location.protocol}//${location.host}${url}`;
      const link = `[${(0, _utilities.escapeExpression)(topicTitle)}](${url})`;
      const continueDiscussion = _I18n.default.t("post.continue_discussion", {
        postLink: link
      });
      const reply = this.get("model.reply");
      if (reply?.includes(continueDiscussion)) {
        return;
      }
      this.model.prependText(continueDiscussion, {
        new_line: true
      });
    }
    onPopupMenuAction(menuAction) {
      return (this.actions?.[menuAction]?.bind(this) ||
      // Legacy-style contributions from themes/plugins
      this[menuAction])();
    }
    storeToolbarState(toolbarEvent) {
      this.set("toolbarEvent", toolbarEvent);
    }
    typed() {
      this.checkReplyLength();
      this.model.typing();
    }
    cancelled() {
      this.hitEsc();
    }
    addLinkLookup(linkLookup) {
      this.set("linkLookup", linkLookup);
    }
    afterRefresh($preview) {
      const topic = this.get("model.topic");
      const linkLookup = this.linkLookup;
      if (!topic || !linkLookup) {
        return;
      }

      // Don't check if there's only one post
      if (topic.posts_count === 1) {
        return;
      }
      const post = this.get("model.post");
      const $links = $("a[href]", $preview);
      $links.each((idx, l) => {
        const href = l.href;
        if (href && href.length) {
          // skip links added by watched words
          if (l.dataset.word !== undefined) {
            return true;
          }

          // skip links in quotes and oneboxes
          for (let element = l; element; element = element.parentElement) {
            if (element.tagName === "DIV" && element.classList.contains("d-editor-preview")) {
              break;
            }
            if (element.tagName === "ASIDE" && element.classList.contains("quote")) {
              return true;
            }
            if (element.tagName === "ASIDE" && element.classList.contains("onebox") && href !== element.dataset["onebox-src"]) {
              return true;
            }
          }
          const [linkWarn, linkInfo] = linkLookup.check(post, href);
          if (linkWarn && !this.isWhispering) {
            if (linkInfo.username === this.currentUser.username) {
              this.appEvents.trigger("composer-messages:create", {
                extraClass: "custom-body",
                templateName: "education",
                body: _I18n.default.t("composer.duplicate_link_same_user", {
                  domain: linkInfo.domain,
                  post_url: topic.urlForPostNumber(linkInfo.post_number),
                  ago: (0, _formatter.shortDate)(linkInfo.posted_at)
                })
              });
            } else {
              this.appEvents.trigger("composer-messages:create", {
                extraClass: "custom-body duplicate-link-message",
                templateName: "education",
                body: _I18n.default.t("composer.duplicate_link", {
                  domain: linkInfo.domain,
                  username: linkInfo.username,
                  post_url: topic.urlForPostNumber(linkInfo.post_number),
                  ago: (0, _formatter.shortDate)(linkInfo.posted_at)
                })
              });
            }
            return false;
          }
        }
        return true;
      });
    }
    toggleWhisper() {
      this.toggleProperty("model.whisper");
    }
    toggleInvisible() {
      this.toggleProperty("model.unlistTopic");
    }
    toggleToolbar() {
      this.toggleProperty("showToolbar");
    }

    // Toggle the reply view
    async toggle() {
      this.closeAutocomplete();
      const composer = this.model;
      if ((0, _utils.isEmpty)(composer?.reply) && (0, _utils.isEmpty)(composer?.title)) {
        this.close();
      } else if (composer?.viewOpenOrFullscreen) {
        this.shrink();
      } else {
        await this.cancelComposer();
      }
    }
    fullscreenComposer() {
      this.toggleFullscreen();
      return false;
    }

    // Import a quote from the post
    async importQuote(toolbarEvent) {
      const postStream = this.get("topic.postStream");
      let postId = this.get("model.post.id");

      // If there is no current post, use the first post id from the stream
      if (!postId && postStream) {
        postId = postStream.get("stream.firstObject");
      }

      // If we're editing a post, fetch the reply when importing a quote
      if (this.get("model.editingPost")) {
        const replyToPostNumber = this.get("model.post.reply_to_post_number");
        if (replyToPostNumber) {
          const replyPost = postStream.posts.findBy("post_number", replyToPostNumber);
          if (replyPost) {
            postId = replyPost.id;
          }
        }
      }
      if (!postId) {
        return;
      }
      this.set("model.loading", true);
      const post = await this.store.find("post", postId);
      const quote = (0, _quote.buildQuote)(post, post.raw, {
        full: true
      });
      toolbarEvent.addText(quote);
      this.set("model.loading", false);
    }
    saveAction(ignore, event) {
      this.save(false, {
        jump: !(event?.shiftKey && this.get("model.replyingToTopic")) && !this.skipJumpOnSave
      });
    }
    displayEditReason() {
      this.set("showEditReason", true);
    }
    hitEsc() {
      if (document.querySelectorAll(".emoji-picker-modal.fadeIn").length === 1) {
        this.appEvents.trigger("emoji-picker:close");
        return;
      }
      if ((this.messageCount || 0) > 0) {
        this.appEvents.trigger("composer-messages:close");
        return;
      }
      const composer = this.model;
      if (composer?.viewOpen) {
        this.shrink();
      }
      if (composer?.viewFullscreen) {
        this.toggleFullscreen();
        this.focusComposer();
      }
    }
    groupsMentioned(_ref) {
      let {
        name,
        userCount,
        maxMentions
      } = _ref;
      if (this.get("model.creatingPrivateMessage") || this.get("model.topic.isPrivateMessage")) {
        return;
      }
      maxMentions = parseInt(maxMentions, 10);
      userCount = parseInt(userCount, 10);
      let body;
      const groupLink = (0, _getUrl.default)(`/g/${name}/members`);
      if (userCount > maxMentions) {
        body = _I18n.default.t("composer.group_mentioned_limit", {
          group: `@${name}`,
          count: maxMentions,
          group_link: groupLink
        });
      } else if (userCount > 0) {
        body = _I18n.default.t("composer.group_mentioned", {
          group: `@${name}`,
          count: userCount,
          group_link: groupLink
        });
      }
      if (body) {
        this.appEvents.trigger("composer-messages:create", {
          extraClass: "custom-body",
          templateName: "education",
          body
        });
      }
    }
    cannotSeeMention(_ref2) {
      let {
        name,
        reason,
        notifiedCount,
        isGroup
      } = _ref2;
      notifiedCount = parseInt(notifiedCount, 10);
      let body;
      if (isGroup) {
        body = _I18n.default.t(`composer.cannot_see_group_mention.${reason}`, {
          group: name,
          count: notifiedCount
        });
      } else {
        body = _I18n.default.t(`composer.cannot_see_mention.${reason}`, {
          username: name
        });
      }
      this.appEvents.trigger("composer-messages:create", {
        extraClass: "custom-body",
        templateName: "education",
        body
      });
    }
    hereMention(count) {
      this.appEvents.trigger("composer-messages:create", {
        extraClass: "custom-body",
        templateName: "education",
        body: _I18n.default.t("composer.here_mention", {
          here: this.siteSettings.here_mention,
          count
        })
      });
    }
    applyFormatCode() {
      this.toolbarEvent.formatCode();
    }
    applyUnorderedList() {
      this.toolbarEvent.applyList("* ", "list_item");
    }
    applyOrderedList() {
      this.toolbarEvent.applyList(i => !i ? "1. " : `${parseInt(i, 10) + 1}. `, "list_item");
    }
    save(force) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this.disableSubmit) {
        return;
      }

      // Clear the warning state if we're not showing the checkbox anymore
      if (!this.showWarning) {
        this.set("model.isWarning", false);
      }
      if (this.site.mobileView && this.showPreview) {
        this.set("showPreview", false);
      }
      const composer = this.model;
      if (composer?.cantSubmitPost) {
        if (composer?.viewFullscreen) {
          this.toggleFullscreen();
        }
        this.set("lastValidatedAt", Date.now());
        return;
      }
      const topic = composer.topic;
      const slowModePost = topic && topic.slow_mode_seconds && topic.user_last_posted_at;
      const notEditing = this.get("model.action") !== "edit";

      // Editing a topic in slow mode is directly handled by the backend.
      if (slowModePost && notEditing) {
        if ((0, _slowMode.cannotPostAgain)(this.currentUser, topic.slow_mode_seconds, topic.user_last_posted_at)) {
          const canPostAt = new moment(topic.user_last_posted_at).add(topic.slow_mode_seconds, "seconds");
          const timeLeft = moment().diff(canPostAt, "seconds");
          const message = _I18n.default.t("composer.slow_mode.error", {
            timeLeft: (0, _slowMode.durationTextFromSeconds)(timeLeft)
          });
          this.dialog.alert(message);
          return;
        } else {
          // Edge case where the user tries to post again immediately.
          topic.set("user_last_posted_at", new Date().toISOString());
        }
      }
      composer.set("disableDrafts", true);

      // for now handle a very narrow use case
      // if we are replying to a topic
      // AND are on on a different topic
      // AND topic is open (or we are staff)
      // --> pop the window up
      if (!force && composer.replyingToTopic) {
        const currentTopic = this.topicModel;
        const originalTopic = this.model.topic;
        if (!currentTopic) {
          this.save(true);
          return;
        }
        const topicLabelContent = function (topicOption) {
          const topicClosed = topicOption.closed ? `<span class="topic-status">${(0, _iconLibrary.iconHTML)("lock")}</span>` : "";
          const topicPinned = topicOption.pinned ? `<span class="topic-status">${(0, _iconLibrary.iconHTML)("thumbtack")}</span>` : "";
          const topicBookmarked = topicOption.bookmarked ? `<span class="topic-status">${(0, _iconLibrary.iconHTML)("bookmark")}</span>` : "";
          const topicPM = topicOption.archetype === "private_message" ? `<span class="topic-status">${(0, _iconLibrary.iconHTML)("envelope")}</span>` : "";
          return `<div class='topic-title'>
                  <div class="topic-title__top-line">
                    <span class='topic-statuses'>
                      ${topicPM}${topicBookmarked}${topicClosed}${topicPinned}
                    </span>
                    <span class='fancy-title'>
                      ${topicOption.fancyTitle}
                    </span>
                  </div>
                  <div class="topic-title__bottom-line">
                    ${(0, _categoryLink.categoryBadgeHTML)(topicOption.category, {
            link: false
          })}${(0, _template.htmlSafe)((0, _renderTags.default)(topicOption))}
                  </div>
                </div>`;
        };
        if (currentTopic.id !== composer.get("topic.id") && (this.isStaffUser || !currentTopic.closed)) {
          this.dialog.alert({
            title: _I18n.default.t("composer.posting_not_on_topic"),
            buttons: [{
              label: topicLabelContent(originalTopic),
              class: "btn-primary btn-reply-where btn-reply-on-original",
              action: () => this.save(true)
            }, {
              label: topicLabelContent(currentTopic),
              class: "btn-reply-where btn-reply-here",
              action: () => {
                composer.setProperties({
                  topic: currentTopic,
                  post: null
                });
                this.save(true);
              }
            }, {
              label: _I18n.default.t("composer.cancel"),
              class: "btn-flat btn-text btn-reply-where__cancel"
            }],
            class: "reply-where-modal"
          });
          return;
        }
      }
      let staged = false;

      // TODO: This should not happen in model
      const imageSizes = {};
      document.querySelectorAll("#reply-control .d-editor-preview img:not(.avatar, .emoji)").forEach(e => {
        const src = e.src;
        if (src && src.length) {
          imageSizes[src] = {
            width: e.naturalWidth,
            height: e.naturalHeight
          };
        }
      });
      const promise = composer.save({
        imageSizes,
        editReason: this.editReason
      }).then(result => {
        this.appEvents.trigger("composer:saved");
        if (result.responseJson.action === "enqueued") {
          this.postWasEnqueued(result.responseJson);
          if (result.responseJson.pending_post) {
            let pendingPosts = this.get("topicController.model.pending_posts");
            if (pendingPosts) {
              pendingPosts.pushObject(result.responseJson.pending_post);
            }
          }
          return this.destroyDraft().then(() => {
            this.close();
            this.appEvents.trigger("post-stream:refresh");
            return result;
          });
        }
        if (this.get("model.editingPost")) {
          this.appEvents.trigger("composer:edited-post");
          this.appEvents.trigger("post-stream:refresh", {
            id: parseInt(result.responseJson.id, 10)
          });
          if (result.responseJson.post.post_number === 1) {
            this.appEvents.trigger("header:update-topic", composer.topic);
          }
        } else {
          this.appEvents.trigger("post-stream:refresh");
        }
        if (result.responseJson.action === "create_post") {
          this.appEvents.trigger("composer:created-post");
          this.appEvents.trigger("post:highlight", result.payload.post_number, options);
        }
        if (this.get("model.draftKey") === _composer.default.NEW_TOPIC_KEY) {
          this.currentUser.set("has_topic_draft", false);
        }
        if (result.responseJson.route_to) {
          // TODO: await this:
          this.destroyDraft();
          if (result.responseJson.message) {
            return this.dialog.alert({
              message: result.responseJson.message,
              didConfirm: () => {
                _url.default.routeTo(result.responseJson.route_to);
              }
            });
          }
          return _url.default.routeTo(result.responseJson.route_to);
        }
        this.close();
        this.currentUser.set("any_posts", true);
        const post = result.target;
        if (post && !staged && options.jump !== false) {
          _url.default.routeTo(post.url, {
            keepFilter: true,
            skipIfOnScreen: true
          });
        }
      }).catch(error => {
        composer.set("disableDrafts", false);
        if (error) {
          this.appEvents.one("composer:will-open", () => {
            if (_composerSaveErrorCallbacks.length === 0 || !_composerSaveErrorCallbacks.map(c => {
              return c.call(this, error);
            }).some(i => {
              return i;
            })) {
              this.dialog.alert(error);
            }
          });
        }
      });
      if (this.router.currentRouteName.split(".")[0] === "topic" && composer.get("topic.id") === this.get("topicModel.id")) {
        staged = composer.get("stagedPost");
      }
      this.appEvents.trigger("post-stream:posted", staged);
      this.messageBus.pause();
      promise.finally(() => this.messageBus.resume());
      return promise;
    }
    postWasEnqueued(details) {
      (0, _showModal.default)("post-enqueued", {
        model: details,
        title: "review.approval.title"
      });
    }

    // Notify the composer messages controller that a reply has been typed. Some
    // messages only appear after typing.
    checkReplyLength() {
      if (!(0, _utils.isEmpty)("model.reply")) {
        this.appEvents.trigger("composer:typed-reply");
      }
    }

    /**
      Open the composer view
       @method open
      @param {Object} opts Options for creating a post
        @param {String} opts.action The action we're performing: edit, reply, createTopic, createSharedDraft, privateMessage
        @param {String} opts.draftKey
        @param {Post} [opts.post] The post we're replying to
        @param {Topic} [opts.topic] The topic we're replying to
        @param {String} [opts.quote] If we're opening a reply from a quote, the quote we're making
        @param {Boolean} [opts.ignoreIfChanged]
        @param {Boolean} [opts.disableScopedCategory]
        @param {Number} [opts.categoryId] Sets `scopedCategoryId` and `categoryId` on the Composer model
        @param {Number} [opts.prioritizedCategoryId]
        @param {String} [opts.draftSequence]
        @param {Boolean} [opts.skipDraftCheck]
        @param {Boolean} [opts.skipJumpOnSave] Option to skip navigating to the post when saved in this composer session
    **/
    async open() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!opts.draftKey) {
        throw new Error("composer opened without a proper draft key");
      }
      let composerModel = this.model;
      if (opts.ignoreIfChanged && composerModel && composerModel.composeState !== _composer.default.CLOSED) {
        return;
      }
      this.setProperties({
        showEditReason: false,
        editReason: null,
        scopedCategoryId: null,
        prioritizedCategoryId: null,
        skipAutoSave: true
      });
      this.set("skipJumpOnSave", !!opts.skipJumpOnSave);

      // Scope the categories drop down to the category we opened the composer with.
      if (opts.categoryId && !opts.disableScopedCategory) {
        const category = this.site.categories.findBy("id", opts.categoryId);
        if (category) {
          this.set("scopedCategoryId", opts.categoryId);
        }
      }
      if (opts.prioritizedCategoryId) {
        const category = this.site.categories.findBy("id", opts.prioritizedCategoryId);
        if (category) {
          this.set("prioritizedCategoryId", opts.prioritizedCategoryId);
        }
      }

      // If we want a different draft than the current composer, close it and clear our model.
      if (composerModel && opts.draftKey !== composerModel.draftKey && composerModel.composeState === _composer.default.DRAFT) {
        this.close();
        composerModel = null;
      }
      try {
        if (composerModel?.replyDirty) {
          // If we're already open, we don't have to do anything
          if (composerModel.composeState === _composer.default.OPEN && composerModel.draftKey === opts.draftKey && !opts.action) {
            return;
          }

          // If it's the same draft, just open it up again.
          if (composerModel.composeState === _composer.default.DRAFT && composerModel.draftKey === opts.draftKey) {
            composerModel.set("composeState", _composer.default.OPEN);
            if (!opts.action) {
              return;
            }
          }
          await this.cancelComposer();
          await this.open(opts);
          return;
        }
        if (composerModel && composerModel.action !== opts.action) {
          composerModel.setProperties({
            unlistTopic: false,
            whisper: false
          });
        }

        // we need a draft sequence for the composer to work
        if (opts.draftSequence === undefined) {
          let data = await _draft.default.get(opts.draftKey);
          if (opts.skipDraftCheck) {
            data.draft = undefined;
          } else {
            data = await this.confirmDraftAbandon(data);
          }
          opts.draft ||= data.draft;
          opts.draftSequence = data.draft_sequence;
          await this._setModel(composerModel, opts);
          return;
        }

        // otherwise, do the draft check async
        if (!opts.draft && !opts.skipDraftCheck) {
          let data = await _draft.default.get(opts.draftKey);
          data = await this.confirmDraftAbandon(data);
          if (data.draft) {
            opts.draft = data.draft;
            opts.draftSequence = data.draft_sequence;
            await this.open(opts);
          }
        }
        await this._setModel(composerModel, opts);
      } finally {
        this.skipAutoSave = false;
      }
    }

    // Given a potential instance and options, set the model for this composer.
    async _setModel(optionalComposerModel, opts) {
      this.set("linkLookup", null);
      let composerModel;
      if (opts.draft) {
        composerModel = await loadDraft(this.store, opts);
        if (!composerModel) {
          throw new Error("draft was not found");
        }
      } else {
        const model = optionalComposerModel || this.store.createRecord("composer");
        await model.open(opts);
        composerModel = model;
      }
      this.set("model", composerModel);
      composerModel.setProperties({
        composeState: _composer.default.OPEN,
        isWarning: false,
        hasTargetGroups: opts.hasGroups
      });
      if (!this.model.targetRecipients) {
        if (opts.usernames) {
          (0, _deprecated.default)("`usernames` is deprecated, use `recipients` instead.", {
            id: "discourse.composer.usernames"
          });
          this.model.set("targetRecipients", opts.usernames);
        } else if (opts.recipients) {
          this.model.set("targetRecipients", opts.recipients);
        }
      }
      if (opts.topicTitle && opts.topicTitle.length <= this.siteSettings.max_topic_title_length) {
        this.model.set("title", opts.topicTitle);
      }
      if (opts.topicCategoryId) {
        this.model.set("categoryId", opts.topicCategoryId);
      }
      if (opts.topicTags && this.site.can_tag_topics) {
        let tags = (0, _utilities.escapeExpression)(opts.topicTags).split(",").slice(0, this.siteSettings.max_tags_per_topic);
        tags.forEach((tag, index, array) => array[index] = tag.substring(0, this.siteSettings.max_tag_length));
        this.model.set("tags", tags);
      }
      if (opts.topicBody) {
        this.model.set("reply", opts.topicBody);
      }
      const defaultComposerHeight = this._getDefaultComposerHeight();
      this.set("model.composerHeight", defaultComposerHeight);
      document.documentElement.style.setProperty("--composer-height", defaultComposerHeight);
    }
    _getDefaultComposerHeight() {
      if (this.keyValueStore.getItem("composerHeight")) {
        return this.keyValueStore.getItem("composerHeight");
      }

      // The two custom properties below can be overriden by themes/plugins to set different default composer heights.
      if (this.model.action === "reply") {
        return "var(--reply-composer-height, 300px)";
      } else {
        return "var(--new-topic-composer-height, 400px)";
      }
    }
    async destroyDraft() {
      let draftSequence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      const key = this.get("model.draftKey");
      if (!key) {
        return;
      }
      if (key === _composer.default.NEW_TOPIC_KEY) {
        this.currentUser.set("has_topic_draft", false);
      }
      if (this._saveDraftPromise) {
        await this._saveDraftPromise;
        return await this.destroyDraft();
      }
      const sequence = draftSequence || this.get("model.draftSequence");
      await _draft.default.clear(key, sequence);
      this.appEvents.trigger("draft:destroyed", key);
    }
    confirmDraftAbandon(data) {
      if (!data.draft) {
        return data;
      }

      // do not show abandon dialog if old draft is clean
      const draft = JSON.parse(data.draft);
      if (draft.reply === draft.originalText) {
        data.draft = null;
        return data;
      }
      if (!_checkDraftPopup) {
        data.draft = null;
        return data;
      }
      return new _rsvp.Promise(resolve => {
        this.dialog.alert({
          message: _I18n.default.t("drafts.abandon.confirm"),
          buttons: [{
            label: _I18n.default.t("drafts.abandon.yes_value"),
            class: "btn-danger",
            icon: "far-trash-alt",
            action: () => {
              this.destroyDraft(data.draft_sequence).finally(() => {
                data.draft = null;
                resolve(data);
              });
            }
          }, {
            label: _I18n.default.t("drafts.abandon.no_value"),
            class: "btn-resume-editing",
            action: () => resolve(data)
          }]
        });
      });
    }
    cancelComposer() {
      this.skipAutoSave = true;
      if (this._saveDraftDebounce) {
        (0, _runloop.cancel)(this._saveDraftDebounce);
      }
      return new _rsvp.Promise(resolve => {
        if (this.get("model.hasMetaData") || this.get("model.replyDirty")) {
          const modal = (0, _showModal.default)("discard-draft", {
            model: this.model,
            modalClass: "discard-draft-modal"
          });
          modal.setProperties({
            onDestroyDraft: () => {
              return this.destroyDraft().then(() => {
                this.model.clearState();
                this.close();
              }).finally(() => {
                this.appEvents.trigger("composer:cancelled");
                resolve();
              });
            },
            onSaveDraft: () => {
              this._saveDraft();
              this.model.clearState();
              this.close();
              this.appEvents.trigger("composer:cancelled");
              return resolve();
            }
          });
        } else {
          // it is possible there is some sort of crazy draft with no body ... just give up on it
          this.destroyDraft().then(() => {
            this.model.clearState();
            this.close();
          }).finally(() => {
            this.appEvents.trigger("composer:cancelled");
            resolve();
          });
        }
      }).finally(() => {
        this.skipAutoSave = false;
      });
    }
    shrink() {
      if (this.get("model.replyDirty") || this.get("model.canEditTitle") && this.get("model.titleDirty")) {
        this.collapse();
      } else {
        this.close();
      }
    }
    _saveDraft() {
      if (!this.model) {
        return;
      }
      if (this.model.draftSaving) {
        this._saveDraftDebounce = (0, _debounce.default)(this, this._saveDraft, 2000);
      } else {
        this._saveDraftPromise = this.model.saveDraft(this.currentUser).finally(() => {
          this._lastDraftSaved = Date.now();
          this._saveDraftPromise = null;
        });
      }
    }
    _shouldSaveDraft() {
      if (this.model && !this.model.loading && !this.skipAutoSave && !this.model.disableDrafts) {
        if (!this._lastDraftSaved) {
          // pretend so we get a save unconditionally in 15 secs
          this._lastDraftSaved = Date.now();
        }
        if (Date.now() - this._lastDraftSaved > 15000) {
          this._saveDraft();
        } else {
          this._saveDraftDebounce = (0, _debounce.default)(this, this._saveDraft, 2000);
        }
      }
    }
    categoryValidation(categoryId, lastValidatedAt) {
      if (!this.siteSettings.allow_uncategorized_topics && !categoryId) {
        return _object.default.create({
          failed: true,
          reason: _I18n.default.t("composer.error.category_missing"),
          lastShownAt: lastValidatedAt
        });
      }
    }
    tagValidation(category, tags, lastValidatedAt) {
      const tagsArray = tags || [];
      if (this.site.can_tag_topics && !this.currentUser.staff && category) {
        // category.minimumRequiredTags incorporates both minimum_required_tags, and required_tag_groups
        if (category.minimumRequiredTags > tagsArray.length) {
          return _object.default.create({
            failed: true,
            reason: _I18n.default.t("composer.error.tags_missing", {
              count: category.minimumRequiredTags
            }),
            lastShownAt: lastValidatedAt
          });
        }
      }
    }
    collapse() {
      this._saveDraft();
      this.set("model.composeState", _composer.default.DRAFT);
      document.documentElement.style.setProperty("--composer-height", "40px");
    }
    toggleFullscreen() {
      this._saveDraft();
      const composer = this.model;
      if (composer?.viewFullscreen) {
        composer?.set("composeState", _composer.default.OPEN);
      } else {
        composer?.set("composeState", _composer.default.FULLSCREEN);
        composer?.set("showFullScreenExitPrompt", true);
      }
    }
    showFullScreenPrompt(isFullscreen, showExitPrompt) {
      return isFullscreen && showExitPrompt && !this.capabilities.touch;
    }
    close() {
      // the 'fullscreen-composer' class is added to remove scrollbars from the
      // document while in fullscreen mode. If the composer is closed for any reason
      // this class should be removed

      const elem = document.querySelector("html");
      elem.classList.remove("fullscreen-composer");
      elem.classList.remove("composer-open");
      document.activeElement?.blur();
      document.documentElement.style.removeProperty("--composer-height");
      this.setProperties({
        model: null,
        lastValidatedAt: null
      });
    }
    closeAutocomplete() {
      $(".d-editor-input").autocomplete({
        cancel: true
      });
    }
    canEdit(modelAction) {
      return modelAction === "edit" && this.currentUser.can_edit;
    }
    visible(state) {
      return state && state !== "closed";
    }
    clearLastValidatedAt() {
      this.set("lastValidatedAt", null);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "dialog", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "site", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "store", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "appEvents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "forcePreview", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "whisperOrUnlistTopic", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "categories", [_dec3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "topicModel", [_dec4], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "isStaffUser", [_dec5], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "whisperer", [_dec6], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "canUnlistTopic", [_dec7], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "isWhispering", [_dec8], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "_setupPreview", [_dec9], Object.getOwnPropertyDescriptor(_class.prototype, "_setupPreview"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "disableSubmit", [_dec10], Object.getOwnPropertyDescriptor(_class.prototype, "disableSubmit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleText", [_dec11], Object.getOwnPropertyDescriptor(_class.prototype, "toggleText"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "showPreviewChanged", [_dec12], Object.getOwnPropertyDescriptor(_class.prototype, "showPreviewChanged"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "focusTarget", [_dec13], Object.getOwnPropertyDescriptor(_class.prototype, "focusTarget"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "showToolbar", [_object.computed], Object.getOwnPropertyDescriptor(_class.prototype, "showToolbar"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "canEditTags", [_dec14], Object.getOwnPropertyDescriptor(_class.prototype, "canEditTags"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "disableCategoryChooser", [_dec15], Object.getOwnPropertyDescriptor(_class.prototype, "disableCategoryChooser"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "disableTagsChooser", [_dec16], Object.getOwnPropertyDescriptor(_class.prototype, "disableTagsChooser"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "showWhisperToggle", [_dec17], Object.getOwnPropertyDescriptor(_class.prototype, "showWhisperToggle"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "replyingToWhisper", [_dec18], Object.getOwnPropertyDescriptor(_class.prototype, "replyingToWhisper"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "saveIcon", [_dec19], Object.getOwnPropertyDescriptor(_class.prototype, "saveIcon"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "saveLabel", [_dec20], Object.getOwnPropertyDescriptor(_class.prototype, "saveLabel"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "canWhisper", [_dec21], Object.getOwnPropertyDescriptor(_class.prototype, "canWhisper"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "disableTextarea", [_dec22], Object.getOwnPropertyDescriptor(_class.prototype, "disableTextarea"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "popupMenuOptions", [_dec23], Object.getOwnPropertyDescriptor(_class.prototype, "popupMenuOptions"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "showWarning", [_dec24], Object.getOwnPropertyDescriptor(_class.prototype, "showWarning"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "draftTitle", [_dec25], Object.getOwnPropertyDescriptor(_class.prototype, "draftTitle"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "allowUpload", [_decorators.default], Object.getOwnPropertyDescriptor(_class.prototype, "allowUpload"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "uploadIcon", [_dec26], Object.getOwnPropertyDescriptor(_class.prototype, "uploadIcon"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "focusComposer", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "focusComposer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "openIfDraft", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "openIfDraft"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "removeFullScreenExitPrompt", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "removeFullScreenExitPrompt"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "cancel", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "cancel"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "cancelUpload", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "cancelUpload"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "togglePreview", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "togglePreview"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "viewNewReply", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "viewNewReply"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "closeComposer", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "closeComposer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "openComposer", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "openComposer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onPopupMenuAction", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onPopupMenuAction"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "storeToolbarState", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "storeToolbarState"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "typed", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "typed"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "cancelled", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "cancelled"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "addLinkLookup", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "addLinkLookup"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "afterRefresh", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "afterRefresh"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleWhisper", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleWhisper"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleInvisible", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleInvisible"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleToolbar", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleToolbar"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggle", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "toggle"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "fullscreenComposer", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "fullscreenComposer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "importQuote", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "importQuote"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "saveAction", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "saveAction"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "displayEditReason", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "displayEditReason"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hitEsc", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "hitEsc"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "groupsMentioned", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "groupsMentioned"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "cannotSeeMention", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "cannotSeeMention"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hereMention", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "hereMention"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "applyFormatCode", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "applyFormatCode"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "applyUnorderedList", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "applyUnorderedList"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "applyOrderedList", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "applyOrderedList"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "postWasEnqueued", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "postWasEnqueued"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_shouldSaveDraft", [_dec27], Object.getOwnPropertyDescriptor(_class.prototype, "_shouldSaveDraft"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "categoryValidation", [_dec28], Object.getOwnPropertyDescriptor(_class.prototype, "categoryValidation"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "tagValidation", [_dec29], Object.getOwnPropertyDescriptor(_class.prototype, "tagValidation"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "showFullScreenPrompt", [_dec30], Object.getOwnPropertyDescriptor(_class.prototype, "showFullScreenPrompt"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "canEdit", [_dec31], Object.getOwnPropertyDescriptor(_class.prototype, "canEdit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "visible", [_dec32], Object.getOwnPropertyDescriptor(_class.prototype, "visible"), _class.prototype)), _class));
  _exports.default = ComposerController;
});