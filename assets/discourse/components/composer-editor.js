define("discourse/components/composer-editor", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/uploads", "@ember/object/computed", "@uppy/core", "pretty-text/upload-short-url", "discourse/lib/utilities", "discourse-common/utils/decorators", "discourse/lib/link-hashtags", "discourse/lib/hashtag-autocomplete", "discourse/lib/link-mentions", "@ember/runloop", "discourse-common/lib/later", "discourse/models/composer", "discourse/mixins/composer-upload-uppy", "discourse/mixins/composer-video-thumbnail-uppy", "@ember/object", "I18n", "discourse/lib/ajax", "discourse-common/lib/debounce", "discourse-common/lib/raw-templates", "discourse-common/lib/icon-library", "discourse-common/config/environment", "discourse/lib/load-oneboxes", "discourse/lib/put-cursor-at-end", "discourse/lib/user-search"], function (_exports, _component, _templateFactory, _uploads, _computed, _core, _uploadShortUrl, _utilities, _decorators, _linkHashtags, _hashtagAutocomplete, _linkMentions, _runloop, _later, _composer, _composerUploadUppy, _composerVideoThumbnailUppy, _object, _I18n, _ajax, _debounce, _rawTemplates, _iconLibrary, _environment, _loadOneboxes, _putCursorAtEnd, _userSearch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addComposerUploadHandler = addComposerUploadHandler;
  _exports.addComposerUploadMarkdownResolver = addComposerUploadMarkdownResolver;
  _exports.addComposerUploadPreProcessor = addComposerUploadPreProcessor;
  _exports.cleanUpComposerUploadHandler = cleanUpComposerUploadHandler;
  _exports.cleanUpComposerUploadMarkdownResolver = cleanUpComposerUploadMarkdownResolver;
  _exports.cleanUpComposerUploadPreProcessor = cleanUpComposerUploadPreProcessor;
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/lib/uploads",0,"@ember/object/computed",0,"@uppy/core",0,"pretty-text/upload-short-url",0,"discourse/lib/utilities",0,"discourse-common/utils/decorators",0,"discourse/lib/link-hashtags",0,"discourse/lib/hashtag-autocomplete",0,"discourse/lib/link-mentions",0,"@ember/runloop",0,"discourse-common/lib/later",0,"@ember/component",0,"discourse/models/composer",0,"discourse/mixins/composer-upload-uppy",0,"discourse/mixins/composer-video-thumbnail-uppy",0,"@ember/object",0,"I18n",0,"discourse/lib/ajax",0,"discourse-common/lib/debounce",0,"discourse-common/lib/raw-templates",0,"discourse-common/lib/icon-library",0,"discourse-common/config/environment",0,"discourse/lib/load-oneboxes",0,"discourse/lib/put-cursor-at-end",0,"discourse/lib/user-search"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <DEditor
    @value={{this.composer.reply}}
    @placeholder={{this.replyPlaceholder}}
    @previewUpdated={{action "previewUpdated"}}
    @markdownOptions={{this.markdownOptions}}
    @extraButtons={{action "extraButtons"}}
    @importQuote={{action "importQuote"}}
    @showUploadModal={{this.showUploadModal}}
    @togglePreview={{action "togglePreview"}}
    @processPreview={{this.processPreview}}
    @validation={{this.validation}}
    @loading={{this.composer.loading}}
    @forcePreview={{this.forcePreview}}
    @showLink={{this.showLink}}
    @composerEvents={{true}}
    @onExpandPopupMenuOptions={{action "onExpandPopupMenuOptions"}}
    @onPopupMenuAction={{this.onPopupMenuAction}}
    @popupMenuOptions={{this.popupMenuOptions}}
    @disabled={{this.disableTextarea}}
    @outletArgs={{hash composer=this.composer editorType="composer"}}
  >
    {{yield}}
  </DEditor>
  
  {{#if this.allowUpload}}
    <PickFilesButton
      @fileInputId="file-uploader"
      @allowMultiple={{true}}
      name="file-uploader"
    />
  {{/if}}
  */
  {
    "id": "Wdwo5z58",
    "block": "[[[8,[39,0],null,[[\"@value\",\"@placeholder\",\"@previewUpdated\",\"@markdownOptions\",\"@extraButtons\",\"@importQuote\",\"@showUploadModal\",\"@togglePreview\",\"@processPreview\",\"@validation\",\"@loading\",\"@forcePreview\",\"@showLink\",\"@composerEvents\",\"@onExpandPopupMenuOptions\",\"@onPopupMenuAction\",\"@popupMenuOptions\",\"@disabled\",\"@outletArgs\"],[[30,0,[\"composer\",\"reply\"]],[30,0,[\"replyPlaceholder\"]],[28,[37,1],[[30,0],\"previewUpdated\"],null],[30,0,[\"markdownOptions\"]],[28,[37,1],[[30,0],\"extraButtons\"],null],[28,[37,1],[[30,0],\"importQuote\"],null],[30,0,[\"showUploadModal\"]],[28,[37,1],[[30,0],\"togglePreview\"],null],[30,0,[\"processPreview\"]],[30,0,[\"validation\"]],[30,0,[\"composer\",\"loading\"]],[30,0,[\"forcePreview\"]],[30,0,[\"showLink\"]],true,[28,[37,1],[[30,0],\"onExpandPopupMenuOptions\"],null],[30,0,[\"onPopupMenuAction\"]],[30,0,[\"popupMenuOptions\"]],[30,0,[\"disableTextarea\"]],[28,[37,2],null,[[\"composer\",\"editorType\"],[[30,0,[\"composer\"]],\"composer\"]]]]],[[\"default\"],[[[[1,\"\\n  \"],[18,1,null],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[41,[30,0,[\"allowUpload\"]],[[[1,\"  \"],[8,[39,5],[[24,3,\"file-uploader\"]],[[\"@fileInputId\",\"@allowMultiple\"],[\"file-uploader\",true]],null],[1,\"\\n\"]],[]],null]],[\"&default\"],false,[\"d-editor\",\"action\",\"hash\",\"yield\",\"if\",\"pick-files-button\"]]",
    "moduleName": "discourse/components/composer-editor.hbs",
    "isStrictMode": false
  });
  // original string `![image|foo=bar|690x220, 50%|bar=baz](upload://1TjaobgKObzpU7xRMw2HuUc87vO.png "image title")`
  // group 1 `image|foo=bar`
  // group 2 `690x220`
  // group 3 `, 50%`
  // group 4 '|bar=baz'
  // group 5 'upload://1TjaobgKObzpU7xRMw2HuUc87vO.png "image title"'

  // Notes:
  // Group 3 is optional. group 4 can match images with or without a markdown title.
  // All matches are whitespace tolerant as long it's still valid markdown.
  // If the image is inside a code block, we'll ignore it `(?!(.*`))`.
  const IMAGE_MARKDOWN_REGEX = /!\[(.*?)\|(\d{1,4}x\d{1,4})(,\s*\d{1,3}%)?(.*?)\]\((upload:\/\/.*?)\)(?!(.*`))/g;
  let uploadHandlers = [];
  function addComposerUploadHandler(extensions, method) {
    uploadHandlers.push({
      extensions,
      method
    });
  }
  function cleanUpComposerUploadHandler() {
    // we cannot set this to uploadHandlers = [] because that messes with
    // the references to the original array that the component has. this only
    // really affects tests, but without doing this you could addComposerUploadHandler
    // in a beforeEach function in a test but then it's not adding to the
    // existing reference that the component has, because an earlier test ran
    // cleanUpComposerUploadHandler and lost it. setting the length to 0 empties
    // the array but keeps the reference
    uploadHandlers.length = 0;
  }
  let uploadPreProcessors = [];
  function addComposerUploadPreProcessor(pluginClass, optionsResolverFn) {
    if (!(pluginClass.prototype instanceof _core.BasePlugin)) {
      throw new Error("Composer upload preprocessors must inherit from the Uppy BasePlugin class.");
    }
    uploadPreProcessors.push({
      pluginClass,
      optionsResolverFn
    });
  }
  function cleanUpComposerUploadPreProcessor() {
    uploadPreProcessors = [];
  }
  let uploadMarkdownResolvers = [];
  function addComposerUploadMarkdownResolver(resolver) {
    uploadMarkdownResolvers.push(resolver);
  }
  function cleanUpComposerUploadMarkdownResolver() {
    uploadMarkdownResolvers = [];
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_composerUploadUppy.default, _composerVideoThumbnailUppy.default, (_dec = (0, _decorators.default)("composer.requiredCategoryMissing"), _dec2 = (0, _decorators.observes)("focusTarget"), _dec3 = (0, _decorators.on)("didInsertElement"), _dec4 = (0, _decorators.default)("composer.reply", "composer.replyLength", "composer.missingReplyCharacters", "composer.minimumPostLength", "lastValidatedAt"), _dec5 = (0, _decorators.debounce)(2000), _dec6 = (0, _decorators.debounce)(2000), _dec7 = (0, _decorators.on)("willDestroyElement"), (_obj = {
    classNameBindings: ["showToolbar:toolbar-visible", ":wmd-controls"],
    editorClass: ".d-editor",
    fileUploadElementId: "file-uploader",
    mobileFileUploaderId: "mobile-file-upload",
    composerEventPrefix: "composer",
    uploadType: "composer",
    uppyId: "composer-editor-uppy",
    composerModel: (0, _computed.alias)("composer"),
    composerModelContentKey: "reply",
    editorInputClass: ".d-editor-input",
    shouldBuildScrollMap: true,
    scrollMap: null,
    processPreview: true,
    uploadMarkdownResolvers,
    uploadPreProcessors,
    uploadHandlers,
    init() {
      this._super(...arguments);
      this.warnedCannotSeeMentions = [];
      this.warnedGroupMentions = [];
    },
    replyPlaceholder(requiredCategoryMissing) {
      if (requiredCategoryMissing) {
        return "composer.reply_placeholder_choose_category";
      } else {
        const key = (0, _uploads.authorizesOneOrMoreImageExtensions)(this.currentUser.staff, this.siteSettings) ? "reply_placeholder" : "reply_placeholder_no_images";
        return `composer.${key}`;
      }
    },
    showLink() {
      return this.currentUser && this.currentUser.link_posting_access !== "none";
    },
    setFocus() {
      if (this.focusTarget === "editor") {
        (0, _putCursorAtEnd.default)(this.element.querySelector("textarea"));
      }
    },
    markdownOptions() {
      return {
        previewing: true,
        formatUsername: _utilities.formatUsername,
        lookupAvatarByPostNumber: (postNumber, topicId) => {
          const topic = this.topic;
          if (!topic) {
            return;
          }
          const posts = topic.get("postStream.posts");
          if (posts && topicId === topic.get("id")) {
            const quotedPost = posts.findBy("post_number", postNumber);
            if (quotedPost) {
              return (0, _utilities.tinyAvatar)(quotedPost.get("avatar_template"));
            }
          }
        },
        lookupPrimaryUserGroupByPostNumber: (postNumber, topicId) => {
          const topic = this.topic;
          if (!topic) {
            return;
          }
          const posts = topic.get("postStream.posts");
          if (posts && topicId === topic.get("id")) {
            const quotedPost = posts.findBy("post_number", postNumber);
            if (quotedPost) {
              return quotedPost.primary_group_name;
            }
          }
        },
        hashtagTypesInPriorityOrder: this.site.hashtag_configurations["topic-composer"],
        hashtagIcons: this.site.hashtag_icons
      };
    },
    _afterMentionComplete(value) {
      this.composer.set("reply", value);

      // ensures textarea scroll position is correct
      (0, _runloop.schedule)("afterRender", () => {
        const input = this.element.querySelector(".d-editor-input");
        input?.blur();
        input?.focus();
      });
    },
    _composerEditorInit() {
      const $input = $(this.element.querySelector(".d-editor-input"));
      if (this.siteSettings.enable_mentions) {
        $input.autocomplete({
          template: (0, _rawTemplates.findRawTemplate)("user-selector-autocomplete"),
          dataSource: term => (0, _userSearch.default)({
            term,
            topicId: this.topic?.id,
            categoryId: this.topic?.category_id || this.composer?.categoryId,
            includeGroups: true
          }),
          key: "@",
          transformComplete: v => v.username || v.name,
          afterComplete: this._afterMentionComplete,
          triggerRule: textarea => !(0, _utilities.inCodeBlock)(textarea.value, (0, _utilities.caretPosition)(textarea))
        });
      }
      this.element.querySelector(".d-editor-input")?.addEventListener("scroll", this._throttledSyncEditorAndPreviewScroll);

      // Focus on the body unless we have a title
      if (!this.get("composer.canEditTitle")) {
        (0, _putCursorAtEnd.default)(this.element.querySelector(".d-editor-input"));
      }
      if (this.allowUpload) {
        this._bindUploadTarget();
        this._bindMobileUploadButton();
      }
      this.appEvents.trigger("composer:will-open");
    },
    validation(reply, replyLength, missingReplyCharacters, minimumPostLength, lastValidatedAt) {
      const postType = this.get("composer.post.post_type");
      if (postType === this.site.get("post_types.small_action")) {
        return;
      }
      let reason;
      if (replyLength < 1) {
        reason = _I18n.default.t("composer.error.post_missing");
      } else if (missingReplyCharacters > 0) {
        reason = _I18n.default.t("composer.error.post_length", {
          count: minimumPostLength
        });
        const tl = this.get("currentUser.trust_level");
        if (tl === 0 || tl === 1) {
          reason += "<br/>" + _I18n.default.t("composer.error.try_like", {
            heart: (0, _iconLibrary.iconHTML)("heart", {
              label: _I18n.default.t("likes_lowercase", {
                count: 1
              })
            })
          });
        }
      }
      if (reason) {
        return _object.default.create({
          failed: true,
          reason,
          lastShownAt: lastValidatedAt
        });
      }
    },
    _resetShouldBuildScrollMap() {
      this.set("shouldBuildScrollMap", true);
    },
    _handleInputInteraction(event) {
      const preview = this.element.querySelector(".d-editor-preview-wrapper");
      if (!$(preview).is(":visible")) {
        return;
      }
      preview.removeEventListener("scroll", this._handleInputOrPreviewScroll);
      event.target.addEventListener("scroll", this._handleInputOrPreviewScroll);
    },
    _handleInputOrPreviewScroll(event) {
      this._syncScroll(this._syncEditorAndPreviewScroll, $(event.target), $(this.element.querySelector(".d-editor-preview-wrapper")));
    },
    _handlePreviewInteraction(event) {
      this.element.querySelector(".d-editor-input")?.removeEventListener("scroll", this._handleInputOrPreviewScroll);
      event.target?.addEventListener("scroll", this._handleInputOrPreviewScroll);
    },
    _syncScroll($callback, $input, $preview) {
      if (!this.scrollMap || this.shouldBuildScrollMap) {
        this.set("scrollMap", this._buildScrollMap($input, $preview));
        this.set("shouldBuildScrollMap", false);
      }
      (0, _runloop.throttle)(this, $callback, $input, $preview, this.scrollMap, 20);
    },
    // Adapted from https://github.com/markdown-it/markdown-it.github.io
    _buildScrollMap($input, $preview) {
      let sourceLikeDiv = $("<div />").css({
        position: "absolute",
        height: "auto",
        visibility: "hidden",
        width: $input[0].clientWidth,
        "font-size": $input.css("font-size"),
        "font-family": $input.css("font-family"),
        "line-height": $input.css("line-height"),
        "white-space": $input.css("white-space")
      }).appendTo("body");
      const linesMap = [];
      let numberOfLines = 0;
      $input.val().split("\n").forEach(text => {
        linesMap.push(numberOfLines);
        if (text.length === 0) {
          numberOfLines++;
        } else {
          sourceLikeDiv.text(text);
          let height;
          let lineHeight;
          height = parseFloat(sourceLikeDiv.css("height"));
          lineHeight = parseFloat(sourceLikeDiv.css("line-height"));
          numberOfLines += Math.round(height / lineHeight);
        }
      });
      linesMap.push(numberOfLines);
      sourceLikeDiv.remove();
      const previewOffsetTop = $preview.offset().top;
      const offset = $preview.scrollTop() - previewOffsetTop - ($input.offset().top - previewOffsetTop);
      const nonEmptyList = [];
      const scrollMap = [];
      for (let i = 0; i < numberOfLines; i++) {
        scrollMap.push(-1);
      }
      nonEmptyList.push(0);
      scrollMap[0] = 0;
      $preview.find(".preview-sync-line").each((_, element) => {
        let $element = $(element);
        let lineNumber = $element.data("line-number");
        let linesToTop = linesMap[lineNumber];
        if (linesToTop !== 0) {
          nonEmptyList.push(linesToTop);
        }
        scrollMap[linesToTop] = Math.round($element.offset().top + offset);
      });
      nonEmptyList.push(numberOfLines);
      scrollMap[numberOfLines] = $preview[0].scrollHeight;
      let position = 0;
      for (let i = 1; i < numberOfLines; i++) {
        if (scrollMap[i] !== -1) {
          position++;
          continue;
        }
        let top = nonEmptyList[position];
        let bottom = nonEmptyList[position + 1];
        scrollMap[i] = ((scrollMap[bottom] * (i - top) + scrollMap[top] * (bottom - i)) / (bottom - top)).toFixed(2);
      }
      return scrollMap;
    },
    _throttledSyncEditorAndPreviewScroll(event) {
      const $preview = $(this.element.querySelector(".d-editor-preview-wrapper"));
      (0, _runloop.throttle)(this, this._syncEditorAndPreviewScroll, $(event.target), $preview, 20);
    },
    _syncEditorAndPreviewScroll($input, $preview) {
      if (!$input) {
        return;
      }
      if ($input.scrollTop() === 0) {
        $preview.scrollTop(0);
        return;
      }
      const inputHeight = $input[0].scrollHeight;
      const previewHeight = $preview[0].scrollHeight;
      if ($input.height() + $input.scrollTop() + 100 > inputHeight) {
        // cheat, special case for bottom
        $preview.scrollTop(previewHeight);
        return;
      }
      const scrollPosition = $input.scrollTop();
      const factor = previewHeight / inputHeight;
      const desired = scrollPosition * factor;
      $preview.scrollTop(desired + 50);
    },
    _renderUnseenMentions(preview, unseen) {
      (0, _linkMentions.fetchUnseenMentions)({
        names: unseen,
        topicId: this.get("composer.topic.id"),
        allowedNames: this.get("composer.targetRecipients")?.split(",")
      }).then(response => {
        (0, _linkMentions.linkSeenMentions)(preview, this.siteSettings);
        this._warnMentionedGroups(preview);
        this._warnCannotSeeMention(preview);
        this._warnHereMention(response.here_count);
      });
    },
    _renderUnseenHashtags(preview) {
      let unseen;
      const hashtagContext = this.site.hashtag_configurations["topic-composer"];
      if (this.siteSettings.enable_experimental_hashtag_autocomplete) {
        unseen = (0, _hashtagAutocomplete.linkSeenHashtagsInContext)(hashtagContext, preview);
      } else {
        unseen = (0, _linkHashtags.linkSeenHashtags)(preview);
      }
      if (unseen.length > 0) {
        if (this.siteSettings.enable_experimental_hashtag_autocomplete) {
          (0, _hashtagAutocomplete.fetchUnseenHashtagsInContext)(hashtagContext, unseen).then(() => {
            (0, _hashtagAutocomplete.linkSeenHashtagsInContext)(hashtagContext, preview);
          });
        } else {
          (0, _linkHashtags.fetchUnseenHashtags)(unseen).then(() => {
            (0, _linkHashtags.linkSeenHashtags)(preview);
          });
        }
      }
    },
    _warnMentionedGroups(preview) {
      (0, _runloop.schedule)("afterRender", () => {
        preview.querySelectorAll(".mention-group[data-mentionable-user-count]").forEach(mention => {
          const {
            name
          } = mention.dataset;
          if (this.warnedGroupMentions.includes(name) || this._isInQuote(mention)) {
            return;
          }
          this.warnedGroupMentions.push(name);
          this.groupsMentioned({
            name,
            userCount: mention.dataset.mentionableUserCount,
            maxMentions: mention.dataset.maxMentions
          });
        });
      });
    },
    _warnCannotSeeMention(preview) {
      if (this.composer.draftKey === _composer.default.NEW_PRIVATE_MESSAGE_KEY) {
        return;
      }
      preview.querySelectorAll(".mention[data-reason]").forEach(mention => {
        const {
          name
        } = mention.dataset;
        if (this.warnedCannotSeeMentions.includes(name)) {
          return;
        }
        this.warnedCannotSeeMentions.push(name);
        this.cannotSeeMention({
          name,
          reason: mention.dataset.reason
        });
      });
      preview.querySelectorAll(".mention-group[data-reason]").forEach(mention => {
        const {
          name
        } = mention.dataset;
        if (this.warnedCannotSeeMentions.includes(name)) {
          return;
        }
        this.warnedCannotSeeMentions.push(name);
        this.cannotSeeMention({
          name,
          reason: mention.dataset.reason,
          notifiedCount: mention.dataset.notifiedUserCount,
          isGroup: true
        });
      });
    },
    _warnHereMention(hereCount) {
      if (!hereCount || hereCount === 0) {
        return;
      }
      this.hereMention(hereCount);
    },
    _handleImageScaleButtonClick(event) {
      if (!event.target.classList.contains("scale-btn")) {
        return;
      }
      const index = parseInt(event.target.closest(".button-wrapper").dataset.imageIndex, 10);
      const scale = event.target.dataset.scale;
      const matchingPlaceholder = this.get("composer.reply").match(IMAGE_MARKDOWN_REGEX);
      if (matchingPlaceholder) {
        const match = matchingPlaceholder[index];
        if (match) {
          const replacement = match.replace(IMAGE_MARKDOWN_REGEX, `![$1|$2, ${scale}%$4]($5)`);
          this.appEvents.trigger("composer:replace-text", matchingPlaceholder[index], replacement, {
            regex: IMAGE_MARKDOWN_REGEX,
            index
          });
        }
      }
      event.preventDefault();
      return;
    },
    resetImageControls(buttonWrapper) {
      const imageResize = buttonWrapper.querySelector(".scale-btn-container");
      const imageDelete = buttonWrapper.querySelector(".delete-image-button");
      const readonlyContainer = buttonWrapper.querySelector(".alt-text-readonly-container");
      const editContainer = buttonWrapper.querySelector(".alt-text-edit-container");
      imageResize.removeAttribute("hidden");
      imageDelete.removeAttribute("hidden");
      readonlyContainer.removeAttribute("hidden");
      buttonWrapper.removeAttribute("editing");
      editContainer.setAttribute("hidden", "true");
    },
    commitAltText(buttonWrapper) {
      const index = parseInt(buttonWrapper.getAttribute("data-image-index"), 10);
      const matchingPlaceholder = this.get("composer.reply").match(IMAGE_MARKDOWN_REGEX);
      const match = matchingPlaceholder[index];
      const input = buttonWrapper.querySelector("input.alt-text-input");
      const replacement = match.replace(IMAGE_MARKDOWN_REGEX, `![${input.value}|$2$3$4]($5)`);
      this.appEvents.trigger("composer:replace-text", match, replacement);
      this.resetImageControls(buttonWrapper);
    },
    _handleAltTextInputKeypress(event) {
      if (!event.target.classList.contains("alt-text-input")) {
        return;
      }
      if (event.key === "[" || event.key === "]") {
        event.preventDefault();
      }
      if (event.key === "Enter") {
        const buttonWrapper = event.target.closest(".button-wrapper");
        this.commitAltText(buttonWrapper);
      }
    },
    _handleAltTextEditButtonClick(event) {
      if (!event.target.classList.contains("alt-text-edit-btn")) {
        return;
      }
      const buttonWrapper = event.target.closest(".button-wrapper");
      const imageResize = buttonWrapper.querySelector(".scale-btn-container");
      const imageDelete = buttonWrapper.querySelector(".delete-image-button");
      const readonlyContainer = buttonWrapper.querySelector(".alt-text-readonly-container");
      const altText = readonlyContainer.querySelector(".alt-text");
      const editContainer = buttonWrapper.querySelector(".alt-text-edit-container");
      const editContainerInput = editContainer.querySelector(".alt-text-input");
      buttonWrapper.setAttribute("editing", "true");
      imageResize.setAttribute("hidden", "true");
      imageDelete.setAttribute("hidden", "true");
      readonlyContainer.setAttribute("hidden", "true");
      editContainerInput.value = altText.textContent;
      editContainer.removeAttribute("hidden");
      editContainerInput.focus();
      event.preventDefault();
    },
    _handleAltTextOkButtonClick(event) {
      if (!event.target.classList.contains("alt-text-edit-ok")) {
        return;
      }
      const buttonWrapper = event.target.closest(".button-wrapper");
      this.commitAltText(buttonWrapper);
    },
    _handleAltTextCancelButtonClick(event) {
      if (!event.target.classList.contains("alt-text-edit-cancel")) {
        return;
      }
      const buttonWrapper = event.target.closest(".button-wrapper");
      this.resetImageControls(buttonWrapper);
    },
    _handleImageDeleteButtonClick(event) {
      if (!event.target.classList.contains("delete-image-button")) {
        return;
      }
      const index = parseInt(event.target.closest(".button-wrapper").dataset.imageIndex, 10);
      const matchingPlaceholder = this.get("composer.reply").match(IMAGE_MARKDOWN_REGEX);
      this.appEvents.trigger("composer:replace-text", matchingPlaceholder[index], "", {
        regex: IMAGE_MARKDOWN_REGEX,
        index
      });
    },
    _registerImageAltTextButtonClick(preview) {
      preview.addEventListener("click", this._handleAltTextEditButtonClick);
      preview.addEventListener("click", this._handleAltTextOkButtonClick);
      preview.addEventListener("click", this._handleAltTextCancelButtonClick);
      preview.addEventListener("click", this._handleImageDeleteButtonClick);
      preview.addEventListener("keypress", this._handleAltTextInputKeypress);
    },
    _composerClosed() {
      this._unbindMobileUploadButton();
      this.appEvents.trigger("composer:will-close");
      (0, _runloop.next)(() => {
        // need to wait a bit for the "slide down" transition of the composer
        (0, _later.default)(() => this.appEvents.trigger("composer:closed"), (0, _environment.isTesting)() ? 0 : 400);
      });
      this.element.querySelector(".d-editor-input")?.removeEventListener("scroll", this._throttledSyncEditorAndPreviewScroll);
      const preview = this.element.querySelector(".d-editor-preview-wrapper");
      preview?.removeEventListener("click", this._handleImageScaleButtonClick);
      preview?.removeEventListener("click", this._handleAltTextEditButtonClick);
      preview?.removeEventListener("click", this._handleAltTextOkButtonClick);
      preview?.removeEventListener("click", this._handleAltTextCancelButtonClick);
      preview?.removeEventListener("keypress", this._handleAltTextInputKeypress);
    },
    onExpandPopupMenuOptions(toolbarEvent) {
      const selected = toolbarEvent.selected;
      toolbarEvent.selectText(selected.start, selected.end - selected.start);
      this.storeToolbarState(toolbarEvent);
    },
    showPreview() {
      this.send("togglePreview");
    },
    _isInQuote(element) {
      let parent = element.parentElement;
      while (parent && !this._isPreviewRoot(parent)) {
        if (this._isQuote(parent)) {
          return true;
        }
        parent = parent.parentElement;
      }
      return false;
    },
    _isPreviewRoot(element) {
      return element.tagName === "DIV" && element.classList.contains("d-editor-preview");
    },
    _isQuote(element) {
      return element.tagName === "ASIDE" && element.classList.contains("quote");
    },
    _cursorIsOnEmptyLine() {
      const textArea = this.element.querySelector(".d-editor-input");
      const selectionStart = textArea.selectionStart;
      if (selectionStart === 0) {
        return true;
      } else if (textArea.value.charAt(selectionStart - 1) === "\n") {
        return true;
      } else {
        return false;
      }
    },
    _findMatchingUploadHandler(fileName) {
      return this.uploadHandlers.find(handler => {
        const ext = handler.extensions.join("|");
        const regex = new RegExp(`\\.(${ext})$`, "i");
        return regex.test(fileName);
      });
    },
    actions: {
      importQuote(toolbarEvent) {
        this.importQuote(toolbarEvent);
      },
      onExpandPopupMenuOptions(toolbarEvent) {
        this.onExpandPopupMenuOptions(toolbarEvent);
      },
      togglePreview() {
        this.togglePreview();
      },
      extraButtons(toolbar) {
        toolbar.addButton({
          id: "quote",
          group: "fontStyles",
          icon: "far-comment",
          sendAction: this.importQuote,
          title: "composer.quote_post_title",
          unshift: true
        });
        if (this.allowUpload && this.uploadIcon && !this.site.mobileView) {
          toolbar.addButton({
            id: "upload",
            group: "insertions",
            icon: this.uploadIcon,
            title: "upload",
            sendAction: this.showUploadModal
          });
        }
        toolbar.addButton({
          id: "options",
          group: "extras",
          icon: "cog",
          title: "composer.options",
          sendAction: this.onExpandPopupMenuOptions.bind(this),
          popupMenu: true
        });
      },
      previewUpdated(preview) {
        // cache jquery objects for functions still using jquery
        const $preview = $(preview);

        // Paint mentions
        const unseenMentions = (0, _linkMentions.linkSeenMentions)(preview, this.siteSettings);
        if (unseenMentions.length) {
          (0, _debounce.default)(this, this._renderUnseenMentions, preview, unseenMentions, 450);
        }
        this._warnMentionedGroups(preview);
        this._warnCannotSeeMention(preview);

        // Paint category, tag, and other data source hashtags
        let unseenHashtags;
        const hashtagContext = this.site.hashtag_configurations["topic-composer"];
        if (this.siteSettings.enable_experimental_hashtag_autocomplete) {
          unseenHashtags = (0, _hashtagAutocomplete.linkSeenHashtagsInContext)(hashtagContext, preview);
        } else {
          unseenHashtags = (0, _linkHashtags.linkSeenHashtags)(preview);
        }
        if (unseenHashtags.length > 0) {
          (0, _debounce.default)(this, this._renderUnseenHashtags, preview, 450);
        }

        // Paint oneboxes
        const paintFunc = () => {
          const post = this.get("composer.post");
          let refresh = false;

          //If we are editing a post, we'll refresh its contents once.
          if (post && !post.get("refreshedPost")) {
            refresh = true;
          }
          const paintedCount = (0, _loadOneboxes.loadOneboxes)(preview, _ajax.ajax, this.get("composer.topic.id"), this.get("composer.category.id"), this.siteSettings.max_oneboxes_per_post, refresh);
          if (refresh && paintedCount > 0) {
            post.set("refreshedPost", true);
          }
        };
        (0, _debounce.default)(this, paintFunc, 450);

        // Short upload urls need resolution
        (0, _uploadShortUrl.resolveAllShortUrls)(_ajax.ajax, this.siteSettings, preview);
        preview.addEventListener("click", this._handleImageScaleButtonClick);
        this._registerImageAltTextButtonClick(preview);
        this.trigger("previewRefreshed", preview);
        this.afterRefresh($preview);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "replyPlaceholder", [_dec], Object.getOwnPropertyDescriptor(_obj, "replyPlaceholder"), _obj), _applyDecoratedDescriptor(_obj, "showLink", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "showLink"), _obj), _applyDecoratedDescriptor(_obj, "setFocus", [_dec2], Object.getOwnPropertyDescriptor(_obj, "setFocus"), _obj), _applyDecoratedDescriptor(_obj, "markdownOptions", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "markdownOptions"), _obj), _applyDecoratedDescriptor(_obj, "_afterMentionComplete", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_afterMentionComplete"), _obj), _applyDecoratedDescriptor(_obj, "_composerEditorInit", [_dec3], Object.getOwnPropertyDescriptor(_obj, "_composerEditorInit"), _obj), _applyDecoratedDescriptor(_obj, "validation", [_dec4], Object.getOwnPropertyDescriptor(_obj, "validation"), _obj), _applyDecoratedDescriptor(_obj, "_handleInputInteraction", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_handleInputInteraction"), _obj), _applyDecoratedDescriptor(_obj, "_handleInputOrPreviewScroll", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_handleInputOrPreviewScroll"), _obj), _applyDecoratedDescriptor(_obj, "_handlePreviewInteraction", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_handlePreviewInteraction"), _obj), _applyDecoratedDescriptor(_obj, "_throttledSyncEditorAndPreviewScroll", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_throttledSyncEditorAndPreviewScroll"), _obj), _applyDecoratedDescriptor(_obj, "_warnMentionedGroups", [_dec5], Object.getOwnPropertyDescriptor(_obj, "_warnMentionedGroups"), _obj), _applyDecoratedDescriptor(_obj, "_warnCannotSeeMention", [_dec6], Object.getOwnPropertyDescriptor(_obj, "_warnCannotSeeMention"), _obj), _applyDecoratedDescriptor(_obj, "_handleImageScaleButtonClick", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_handleImageScaleButtonClick"), _obj), _applyDecoratedDescriptor(_obj, "_handleAltTextInputKeypress", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_handleAltTextInputKeypress"), _obj), _applyDecoratedDescriptor(_obj, "_handleAltTextEditButtonClick", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_handleAltTextEditButtonClick"), _obj), _applyDecoratedDescriptor(_obj, "_handleAltTextOkButtonClick", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_handleAltTextOkButtonClick"), _obj), _applyDecoratedDescriptor(_obj, "_handleAltTextCancelButtonClick", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_handleAltTextCancelButtonClick"), _obj), _applyDecoratedDescriptor(_obj, "_handleImageDeleteButtonClick", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_handleImageDeleteButtonClick"), _obj), _applyDecoratedDescriptor(_obj, "_composerClosed", [_dec7], Object.getOwnPropertyDescriptor(_obj, "_composerClosed"), _obj)), _obj))));
  _exports.default = _default;
});