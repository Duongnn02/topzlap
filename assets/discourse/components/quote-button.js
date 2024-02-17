define("discourse/components/quote-button", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/computed", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse/lib/utilities", "I18n", "discourse-common/config/environment", "discourse/mixins/key-enter-escape", "discourse/lib/sharing", "@ember/object", "@ember/object/computed", "discourse-common/utils/decorators", "discourse-common/lib/debounce", "discourse-common/lib/get-url", "@ember/runloop", "discourse/lib/to-markdown", "discourse-common/utils/escape-regexp", "@popperjs/core", "discourse/lib/virtual-element-from-text-range"], function (_exports, _component, _templateFactory, _computed, _ajax, _ajaxError, _utilities, _I18n, _environment, _keyEnterEscape, _sharing, _object, _computed2, _decorators, _debounce, _getUrl, _runloop, _toMarkdown, _escapeRegexp, _core, _virtualElementFromTextRange) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/lib/computed",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error",0,"discourse/lib/utilities",0,"@ember/component",0,"I18n",0,"discourse-common/config/environment",0,"discourse/mixins/key-enter-escape",0,"discourse/lib/sharing",0,"@ember/object",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse-common/lib/debounce",0,"discourse-common/lib/get-url",0,"@ember/runloop",0,"discourse/lib/to-markdown",0,"discourse-common/utils/escape-regexp",0,"@popperjs/core",0,"discourse/lib/virtual-element-from-text-range"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="buttons">
    {{#if this.embedQuoteButton}}
      <DButton
        @class="btn-flat insert-quote"
        @action={{action "insertQuote"}}
        @icon="quote-left"
        @label="post.quote_reply"
        @title="post.quote_reply_shortcut"
      />
    {{/if}}
  
    {{#if this.siteSettings.enable_fast_edit}}
      {{#if this._canEditPost}}
        <DButton
          @icon="pencil-alt"
          @action={{action "_toggleFastEditForm"}}
          @label="post.quote_edit"
          @class="btn-flat quote-edit-label"
          @title="post.quote_edit_shortcut"
        />
      {{/if}}
    {{/if}}
  
    {{#if this.quoteSharingEnabled}}
      <span class="quote-sharing">
        {{#if this.quoteSharingShowLabel}}
          <DButton
            @icon="share"
            @label="post.quote_share"
            @class="btn-flat quote-share-label"
          />
        {{/if}}
  
        <span class="quote-share-buttons">
          {{#each this.quoteSharingSources as |source|}}
            <DButton
              @class="btn-flat"
              @action={{action "share" source}}
              @translatedTitle={{source.title}}
              @icon={{source.icon}}
            />
          {{/each}}
          <PluginOutlet
            @name="quote-share-buttons-after"
            @connectorTagName="div"
          />
        </span>
      </span>
    {{/if}}
  </div>
  
  <div class="extra">
    {{#if this.siteSettings.enable_fast_edit}}
      {{#if this._displayFastEditInput}}
        <div class="fast-edit-container">
          <Textarea id="fast-edit-input" @value={{this._fastEditNewSelection}} />
          <DButton
            @action={{action "_saveFastEdit"}}
            @class="btn-small btn-primary save-fast-edit"
            @icon="pencil-alt"
            @label="composer.save_edit"
            @translatedTitle={{this._saveEditButtonTitle}}
            @disabled={{this._saveFastEditDisabled}}
            @isLoading={{this._isSavingFastEdit}}
          />
        </div>
      {{/if}}
    {{/if}}
    <PluginOutlet @name="quote-button-after" @connectorTagName="div" />
  </div>
  */
  {
    "id": "F+9didTg",
    "block": "[[[10,0],[14,0,\"buttons\"],[12],[1,\"\\n\"],[41,[30,0,[\"embedQuoteButton\"]],[[[1,\"    \"],[8,[39,1],null,[[\"@class\",\"@action\",\"@icon\",\"@label\",\"@title\"],[\"btn-flat insert-quote\",[28,[37,2],[[30,0],\"insertQuote\"],null],\"quote-left\",\"post.quote_reply\",\"post.quote_reply_shortcut\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"enable_fast_edit\"]],[[[41,[30,0,[\"_canEditPost\"]],[[[1,\"      \"],[8,[39,1],null,[[\"@icon\",\"@action\",\"@label\",\"@class\",\"@title\"],[\"pencil-alt\",[28,[37,2],[[30,0],\"_toggleFastEditForm\"],null],\"post.quote_edit\",\"btn-flat quote-edit-label\",\"post.quote_edit_shortcut\"]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n\"],[41,[30,0,[\"quoteSharingEnabled\"]],[[[1,\"    \"],[10,1],[14,0,\"quote-sharing\"],[12],[1,\"\\n\"],[41,[30,0,[\"quoteSharingShowLabel\"]],[[[1,\"        \"],[8,[39,1],null,[[\"@icon\",\"@label\",\"@class\"],[\"share\",\"post.quote_share\",\"btn-flat quote-share-label\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[10,1],[14,0,\"quote-share-buttons\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"quoteSharingSources\"]]],null]],null],null,[[[1,\"          \"],[8,[39,1],null,[[\"@class\",\"@action\",\"@translatedTitle\",\"@icon\"],[\"btn-flat\",[28,[37,2],[[30,0],\"share\",[30,1]],null],[30,1,[\"title\"]],[30,1,[\"icon\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"        \"],[8,[39,5],null,[[\"@name\",\"@connectorTagName\"],[\"quote-share-buttons-after\",\"div\"]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"extra\"],[12],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"enable_fast_edit\"]],[[[41,[30,0,[\"_displayFastEditInput\"]],[[[1,\"      \"],[10,0],[14,0,\"fast-edit-container\"],[12],[1,\"\\n        \"],[8,[39,6],[[24,1,\"fast-edit-input\"]],[[\"@value\"],[[30,0,[\"_fastEditNewSelection\"]]]],null],[1,\"        \"],[8,[39,1],null,[[\"@action\",\"@class\",\"@icon\",\"@label\",\"@translatedTitle\",\"@disabled\",\"@isLoading\"],[[28,[37,2],[[30,0],\"_saveFastEdit\"],null],\"btn-small btn-primary save-fast-edit\",\"pencil-alt\",\"composer.save_edit\",[30,0,[\"_saveEditButtonTitle\"]],[30,0,[\"_saveFastEditDisabled\"]],[30,0,[\"_isSavingFastEdit\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"  \"],[8,[39,5],null,[[\"@name\",\"@connectorTagName\"],[\"quote-button-after\",\"div\"]],null],[1,\"\\n\"],[13]],[\"source\"],false,[\"if\",\"d-button\",\"action\",\"each\",\"-track-array\",\"plugin-outlet\",\"textarea\"]]",
    "moduleName": "discourse/components/quote-button.hbs",
    "isStrictMode": false
  });
  function getQuoteTitle(element) {
    const titleEl = element.querySelector(".title");
    if (!titleEl) {
      return;
    }
    const titleLink = titleEl.querySelector("a:not(.back)");
    if (titleLink) {
      return titleLink.textContent.trim();
    }
    return titleEl.textContent.trim().replace(/:$/, "");
  }
  function fixQuotes(str) {
    // u+201c, u+201d = “ ”
    // u+2018, u+2019 = ‘ ’
    return str.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_keyEnterEscape.default, (_dec = (0, _decorators.default)("topic.{isPrivateMessage,invisible,category}"), _dec2 = (0, _decorators.default)("topic.isPrivateMessage"), _dec3 = (0, _decorators.default)("topic.{isPrivateMessage,invisible,category}"), _dec4 = (0, _decorators.default)("topic.{id,slug}", "quoteState"), _dec5 = (0, _decorators.default)("topic.details.can_create_post", "topic.details.can_reply_as_new_topic"), (_obj = {
    classNames: ["quote-button"],
    classNameBindings: ["visible", "_displayFastEditInput:fast-editing", "animated"],
    visible: false,
    animated: false,
    privateCategory: (0, _computed2.alias)("topic.category.read_restricted"),
    editPost: null,
    _popper: null,
    popperPlacement: "top-start",
    popperOffset: [0, 3],
    _isFastEditable: false,
    _displayFastEditInput: false,
    _fastEditInitialSelection: null,
    _fastEditNewSelection: null,
    _isSavingFastEdit: false,
    _canEditPost: false,
    _saveEditButtonTitle: _I18n.default.t("composer.title", {
      modifier: (0, _utilities.translateModKey)("Meta+")
    }),
    _isMouseDown: false,
    _reselected: false,
    _hideButton() {
      this.quoteState.clear();
      this.set("visible", false);
      this.set("animated", false);
      this.set("_isFastEditable", false);
      this.set("_displayFastEditInput", false);
      this.set("_fastEditInitialSelection", null);
      this.set("_fastEditNewSelection", null);
      this._teardownSelectionListeners();
    },
    _selectionChanged() {
      if (this._displayFastEditInput) {
        this.textRange = (0, _virtualElementFromTextRange.default)();
        return;
      }
      const quoteState = this.quoteState;
      const selection = window.getSelection();
      if (selection.isCollapsed) {
        if (this.visible) {
          this._hideButton();
        }
        return;
      }

      // ensure we selected content inside 1 post *only*
      let firstRange, postId;
      for (let r = 0; r < selection.rangeCount; r++) {
        const range = selection.getRangeAt(r);
        const $selectionStart = $(range.startContainer);
        const $ancestor = $(range.commonAncestorContainer);
        if ($selectionStart.closest(".cooked").length === 0) {
          return;
        }
        firstRange = firstRange || range;
        postId = postId || $ancestor.closest(".boxed, .reply").data("post-id");
        if ($ancestor.closest(".contents").length === 0 || !postId) {
          if (this.visible) {
            this._hideButton();
          }
          return;
        }
      }
      const _selectedElement = (0, _utilities.selectedElement)();
      const _selectedText = (0, _utilities.selectedText)();
      const $selectedElement = $(_selectedElement);
      const cooked = $selectedElement.find(".cooked")[0] || $selectedElement.closest(".cooked")[0];

      // computing markdown takes a lot of time on long posts
      // this code attempts to compute it only when we can't fast track
      let opts = {
        full: (0, _utilities.selectedRange)().startOffset > 0 ? false : _selectedText === (0, _toMarkdown.default)(cooked.innerHTML)
      };
      for (let element = _selectedElement; element && element.tagName !== "ARTICLE"; element = element.parentElement) {
        if (element.tagName === "ASIDE" && element.classList.contains("quote")) {
          opts.username = element.dataset.username || getQuoteTitle(element);
          opts.post = element.dataset.post;
          opts.topic = element.dataset.topic;
          break;
        }
      }
      quoteState.selected(postId, _selectedText, opts);
      this.set("visible", quoteState.buffer.length > 0);
      if (this.siteSettings.enable_fast_edit) {
        this.set("_canEditPost", this.topic.postStream.findLoadedPost(postId)?.can_edit);
        if (this._canEditPost) {
          const regexp = new RegExp((0, _escapeRegexp.default)(quoteState.buffer), "gi");
          const matches = cooked.innerHTML.match(regexp);
          if (quoteState.buffer.length < 1 || quoteState.buffer.includes("|") ||
          // tables are too complex
          quoteState.buffer.match(/\n/g) ||
          // linebreaks are too complex
          matches?.length > 1 // duplicates are too complex
          ) {
            this.set("_isFastEditable", false);
            this.set("_fastEditInitialSelection", null);
            this.set("_fastEditNewSelection", null);
          } else if (matches?.length === 1) {
            this.set("_isFastEditable", true);
            this.set("_fastEditInitialSelection", quoteState.buffer);
            this.set("_fastEditNewSelection", quoteState.buffer);
          }
        }
      }

      // avoid hard loops in quote selection unconditionally
      // this can happen if you triple click text in firefox
      if (this._prevSelection === _selectedText) {
        return;
      }
      this._prevSelection = _selectedText;

      // on Desktop, shows the button at the beginning of the selection
      // on Mobile, shows the button at the end of the selection
      const isMobileDevice = this.site.isMobileDevice;
      const {
        isIOS,
        isAndroid,
        isOpera
      } = this.capabilities;
      const showAtEnd = isMobileDevice || isIOS || isAndroid || isOpera;
      if (showAtEnd) {
        this.popperPlacement = "bottom-start";
        this.popperOffset = [0, 25];
      }

      // change the position of the button
      (0, _runloop.schedule)("afterRender", () => {
        if (!this.element || this.isDestroying || this.isDestroyed) {
          return;
        }
        this.textRange = (0, _virtualElementFromTextRange.default)();
        this._setupSelectionListeners();
        this._popper = (0, _core.createPopper)(this.textRange, this.element, {
          placement: this.popperPlacement,
          modifiers: [{
            name: "computeStyles",
            options: {
              adaptive: false
            }
          }, {
            name: "offset",
            options: {
              offset: this.popperOffset
            }
          }]
        });
        if (!this.animated) {
          // We only enable CSS transitions after the initial positioning
          // otherwise the button can appear to fly in from off-screen
          (0, _runloop.next)(() => this.set("animated", true));
        }
      });
    },
    _updateRect() {
      this.textRange?.updateRect();
    },
    _setupSelectionListeners() {
      document.body.addEventListener("mouseup", this._updateRect);
      window.addEventListener("scroll", this._updateRect);
      document.scrollingElement.addEventListener("scroll", this._updateRect);
    },
    _teardownSelectionListeners() {
      document.body.removeEventListener("mouseup", this._updateRect);
      window.removeEventListener("scroll", this._updateRect);
      document.scrollingElement.removeEventListener("scroll", this._updateRect);
    },
    didInsertElement() {
      this._super(...arguments);
      const {
        isWinphone,
        isAndroid
      } = this.capabilities;
      const wait = isWinphone || isAndroid ? _environment.INPUT_DELAY : 25;
      const onSelectionChanged = () => {
        (0, _debounce.default)(this, this._selectionChanged, wait);
      };
      $(document).on("mousedown.quote-button", e => {
        this._prevSelection = null;
        this._isMouseDown = true;
        this._reselected = false;

        // prevents fast-edit input event to trigger mousedown
        if (e.target.classList.contains("fast-edit-input")) {
          return;
        }
        if ($(e.target).closest(".quote-button, .create, .share, .reply-new").length === 0) {
          this._hideButton();
        }
      }).on("mouseup.quote-button", e => {
        // prevents fast-edit input event to trigger mouseup
        if (e.target.classList.contains("fast-edit-input")) {
          return;
        }
        this._prevSelection = null;
        this._isMouseDown = false;
        onSelectionChanged();
      }).on("selectionchange.quote-button", () => {
        if (!this._isMouseDown && !this._reselected) {
          onSelectionChanged();
        }
      });
      this.appEvents.on("quote-button:quote", this, "insertQuote");
      this.appEvents.on("quote-button:edit", this, "_toggleFastEditForm");
    },
    willDestroyElement() {
      this._popper?.destroy();
      $(document).off("mousedown.quote-button").off("mouseup.quote-button").off("selectionchange.quote-button");
      this.appEvents.off("quote-button:quote", this, "insertQuote");
      this.appEvents.off("quote-button:edit", this, "_toggleFastEditForm");
      this._teardownSelectionListeners();
    },
    quoteSharingEnabled(topic) {
      if (this.site.mobileView || this.siteSettings.share_quote_visibility === "none" || this.currentUser && this.siteSettings.share_quote_visibility === "anonymous" || this.quoteSharingSources.length === 0 || this.privateCategory || this.currentUser && topic.invisible) {
        return false;
      }
      return true;
    },
    quoteSharingSources(isPM) {
      return _sharing.default.activeSources(this.siteSettings.share_quote_buttons, this.siteSettings.login_required || isPM);
    },
    quoteSharingShowLabel() {
      return this.quoteSharingSources.length > 1;
    },
    shareUrl(topic, quoteState) {
      const postId = quoteState.postId;
      const postNumber = topic.postStream.findLoadedPost(postId).post_number;
      return (0, _getUrl.getAbsoluteURL)((0, _utilities.postUrl)(topic.slug, topic.id, postNumber));
    },
    embedQuoteButton(canCreatePost, canReplyAsNewTopic) {
      return (canCreatePost || canReplyAsNewTopic) && this.currentUser?.get("user_option.enable_quoting");
    },
    _saveFastEditDisabled: (0, _computed.propertyEqual)("_fastEditInitialSelection", "_fastEditNewSelection"),
    insertQuote() {
      this.attrs.selectText().then(() => this._hideButton());
    },
    _toggleFastEditForm() {
      if (this._isFastEditable) {
        this.toggleProperty("_displayFastEditInput");
        (0, _runloop.schedule)("afterRender", () => {
          if (this.site.mobileView) {
            this.element.style.left = `${(window.innerWidth - this.element.clientWidth) / 2}px`;
          }
          document.querySelector("#fast-edit-input")?.focus();
        });
      } else {
        const postId = this.quoteState.postId;
        const postModel = this.topic.postStream.findLoadedPost(postId);
        return (0, _ajax.ajax)(`/posts/${postModel.id}`, {
          type: "GET",
          cache: false
        }).then(result => {
          let bestIndex = 0;
          const rows = result.raw.split("\n");

          // selecting even a part of the text of a list item will include
          // "* " at the beginning of the buffer, we remove it to be able
          // to find it in row
          const buffer = fixQuotes(this.quoteState.buffer.split("\n")[0].replace(/^\* /, ""));
          rows.some((row, index) => {
            if (row.length && row.includes(buffer)) {
              bestIndex = index;
              return true;
            }
          });
          this.editPost(postModel);
          document.querySelector("#reply-control")?.addEventListener("transitionend", () => {
            const textarea = document.querySelector(".d-editor-input");
            if (!textarea || this.isDestroyed || this.isDestroying) {
              return;
            }

            // best index brings us to one row before as slice start from 1
            // we add 1 to be at the beginning of next line, unless we start from top
            (0, _utilities.setCaretPosition)(textarea, rows.slice(0, bestIndex).join("\n").length + (bestIndex > 0 ? 1 : 0));

            // ensures we correctly scroll to caret and reloads composer
            // if we do another selection/edit
            textarea.blur();
            textarea.focus();
          });
        });
      }
    },
    _saveFastEdit() {
      const postId = this.quoteState?.postId;
      const postModel = this.topic.postStream.findLoadedPost(postId);
      this.set("_isSavingFastEdit", true);
      return (0, _ajax.ajax)(`/posts/${postModel.id}`, {
        type: "GET",
        cache: false
      }).then(result => {
        const newRaw = result.raw.replace(fixQuotes(this._fastEditInitialSelection), fixQuotes(this._fastEditNewSelection));
        postModel.save({
          raw: newRaw
        }).catch(_ajaxError.popupAjaxError).finally(() => {
          this.set("_isSavingFastEdit", false);
          this._hideButton();
        });
      }).catch(_ajaxError.popupAjaxError);
    },
    save() {
      if (this._displayFastEditInput && !this._saveFastEditDisabled) {
        this._saveFastEdit();
      }
    },
    cancelled() {
      this._hideButton();
    },
    share(source) {
      _sharing.default.shareSource(source, {
        url: this.shareUrl,
        title: this.topic.title,
        quote: window.getSelection().toString()
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "_updateRect", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_updateRect"), _obj), _applyDecoratedDescriptor(_obj, "quoteSharingEnabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "quoteSharingEnabled"), _obj), _applyDecoratedDescriptor(_obj, "quoteSharingSources", [_dec2], Object.getOwnPropertyDescriptor(_obj, "quoteSharingSources"), _obj), _applyDecoratedDescriptor(_obj, "quoteSharingShowLabel", [_dec3], Object.getOwnPropertyDescriptor(_obj, "quoteSharingShowLabel"), _obj), _applyDecoratedDescriptor(_obj, "shareUrl", [_dec4], Object.getOwnPropertyDescriptor(_obj, "shareUrl"), _obj), _applyDecoratedDescriptor(_obj, "embedQuoteButton", [_dec5], Object.getOwnPropertyDescriptor(_obj, "embedQuoteButton"), _obj), _applyDecoratedDescriptor(_obj, "insertQuote", [_object.action], Object.getOwnPropertyDescriptor(_obj, "insertQuote"), _obj), _applyDecoratedDescriptor(_obj, "_toggleFastEditForm", [_object.action], Object.getOwnPropertyDescriptor(_obj, "_toggleFastEditForm"), _obj), _applyDecoratedDescriptor(_obj, "_saveFastEdit", [_object.action], Object.getOwnPropertyDescriptor(_obj, "_saveFastEdit"), _obj), _applyDecoratedDescriptor(_obj, "save", [_object.action], Object.getOwnPropertyDescriptor(_obj, "save"), _obj), _applyDecoratedDescriptor(_obj, "cancelled", [_object.action], Object.getOwnPropertyDescriptor(_obj, "cancelled"), _obj), _applyDecoratedDescriptor(_obj, "share", [_object.action], Object.getOwnPropertyDescriptor(_obj, "share"), _obj)), _obj))));
  _exports.default = _default;
});