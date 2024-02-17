define("discourse/components/d-editor", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/ajax", "discourse/lib/utilities", "discourse-common/utils/decorators", "pretty-text/emoji", "discourse/lib/text", "@ember/runloop", "I18n", "@discourse/itsatrap", "rsvp", "discourse/lib/autocomplete", "discourse/lib/hashtag-autocomplete", "discourse-common/lib/deprecated", "discourse-common/lib/debounce", "discourse-common/lib/raw-templates", "discourse-common/lib/get-owner", "discourse-common/config/environment", "discourse/lib/link-hashtags", "discourse/lib/link-mentions", "discourse/lib/load-oneboxes", "discourse/lib/load-script", "pretty-text/upload-short-url", "@ember/service", "discourse/lib/show-modal", "discourse/lib/text-direction", "pretty-text/emoji/data", "discourse/lib/intercept-click", "@ember/object", "discourse/mixins/textarea-text-manipulation"], function (_exports, _component, _templateFactory, _ajax, _utilities, _decorators, _emoji, _text, _runloop, _I18n, _itsatrap, _rsvp, _autocomplete, _hashtagAutocomplete, _deprecated, _debounce, _rawTemplates, _getOwner, _environment, _linkHashtags, _linkMentions, _loadOneboxes, _loadScript, _uploadShortUrl, _service, _showModal, _textDirection, _data, _interceptClick, _object, _textareaTextManipulation) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addToolbarCallback = addToolbarCallback;
  _exports.clearToolbarCallbacks = clearToolbarCallbacks;
  _exports.default = void 0;
  _exports.onToolbarCreate = onToolbarCreate;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/lib/ajax",0,"discourse/lib/utilities",0,"discourse-common/utils/decorators",0,"pretty-text/emoji",0,"discourse/lib/text",0,"@ember/runloop",0,"@ember/component",0,"I18n",0,"@discourse/itsatrap",0,"rsvp",0,"discourse/lib/autocomplete",0,"discourse/lib/hashtag-autocomplete",0,"discourse-common/lib/deprecated",0,"discourse-common/lib/debounce",0,"discourse-common/lib/raw-templates",0,"discourse-common/lib/get-owner",0,"discourse-common/config/environment",0,"discourse/lib/link-hashtags",0,"discourse/lib/link-mentions",0,"discourse/lib/load-oneboxes",0,"discourse/lib/load-script",0,"pretty-text/upload-short-url",0,"@ember/service",0,"discourse/lib/show-modal",0,"discourse/lib/text-direction",0,"pretty-text/emoji/data",0,"discourse/lib/intercept-click",0,"@ember/object",0,"discourse/mixins/textarea-text-manipulation"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="d-editor-container">
    <div class="d-editor-textarea-column">
      {{yield}}
  
      <div
        class="d-editor-textarea-wrapper
          {{if this.disabled 'disabled'}}
          {{if this.isEditorFocused 'in-focus'}}"
      >
        <div class="d-editor-button-bar" role="toolbar">
          {{#each this.toolbar.groups as |group|}}
            {{#each group.buttons as |b|}}
              {{#if b.popupMenu}}
                <ToolbarPopupMenuOptions
                  @content={{this.popupMenuOptions}}
                  @onChange={{this.onPopupMenuAction}}
                  @onOpen={{action b.action b}}
                  @class={{b.className}}
                  @tabindex={{-1}}
                  @onKeydown={{this.rovingButtonBar}}
                  @options={{hash icon=b.icon focusAfterOnChange=false}}
                />
              {{else}}
                <DButton
                  @action={{b.action}}
                  @type="button"
                  @actionParam={{b}}
                  @translatedTitle={{b.title}}
                  @label={{b.label}}
                  @icon={{b.icon}}
                  @class={{b.className}}
                  @preventFocus={{b.preventFocus}}
                  @tabindex={{b.tabindex}}
                  @onKeyDown={{this.rovingButtonBar}}
                />
              {{/if}}
            {{/each}}
          {{/each}}
        </div>
  
        <ConditionalLoadingSpinner @condition={{this.loading}} />
        <DTextarea
          @autocomplete="off"
          @tabindex={{this.tabindex}}
          @value={{this.value}}
          @class="d-editor-input"
          @placeholder={{this.placeholderTranslated}}
          @aria-label={{this.placeholderTranslated}}
          @disabled={{this.disabled}}
          @input={{this.change}}
          @focusIn={{action "focusIn"}}
          @focusOut={{action "focusOut"}}
        />
        <PopupInputTip @validation={{this.validation}} />
        <PluginOutlet
          @name="after-d-editor"
          @connectorTagName="div"
          @outletArgs={{this.outletArgs}}
        />
      </div>
    </div>
  
    <div
      class="d-editor-preview-wrapper {{if this.forcePreview 'force-preview'}}"
    >
      <div class="d-editor-preview">
        {{#unless this.siteSettings.enable_diffhtml_preview}}
          {{html-safe this.preview}}
        {{/unless}}
      </div>
      <span class="d-editor-plugin">
        <PluginOutlet
          @name="editor-preview"
          @connectorTagName="div"
          @outletArgs={{this.outletArgs}}
        />
      </span>
    </div>
  </div>
  
  <EmojiPicker
    @isActive={{this.emojiPickerIsActive}}
    @isEditorFocused={{this.isEditorFocused}}
    @initialFilter={{this.emojiFilter}}
    @emojiSelected={{action "emojiSelected"}}
    @onEmojiPickerClose={{this.onEmojiPickerClose}}
  />
  */
  {
    "id": "b7EssG+H",
    "block": "[[[10,0],[14,0,\"d-editor-container\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"d-editor-textarea-column\"],[12],[1,\"\\n    \"],[18,3,null],[1,\"\\n\\n    \"],[10,0],[15,0,[29,[\"d-editor-textarea-wrapper\\n        \",[52,[30,0,[\"disabled\"]],\"disabled\"],\"\\n        \",[52,[30,0,[\"isEditorFocused\"]],\"in-focus\"]]]],[12],[1,\"\\n      \"],[10,0],[14,0,\"d-editor-button-bar\"],[14,\"role\",\"toolbar\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"toolbar\",\"groups\"]]],null]],null],null,[[[42,[28,[37,3],[[28,[37,3],[[30,1,[\"buttons\"]]],null]],null],null,[[[41,[30,2,[\"popupMenu\"]],[[[1,\"              \"],[8,[39,4],null,[[\"@content\",\"@onChange\",\"@onOpen\",\"@class\",\"@tabindex\",\"@onKeydown\",\"@options\"],[[30,0,[\"popupMenuOptions\"]],[30,0,[\"onPopupMenuAction\"]],[28,[37,5],[[30,0],[30,2,[\"action\"]],[30,2]],null],[30,2,[\"className\"]],-1,[30,0,[\"rovingButtonBar\"]],[28,[37,6],null,[[\"icon\",\"focusAfterOnChange\"],[[30,2,[\"icon\"]],false]]]]],null],[1,\"\\n\"]],[]],[[[1,\"              \"],[8,[39,7],null,[[\"@action\",\"@type\",\"@actionParam\",\"@translatedTitle\",\"@label\",\"@icon\",\"@class\",\"@preventFocus\",\"@tabindex\",\"@onKeyDown\"],[[30,2,[\"action\"]],\"button\",[30,2],[30,2,[\"title\"]],[30,2,[\"label\"]],[30,2,[\"icon\"]],[30,2,[\"className\"]],[30,2,[\"preventFocus\"]],[30,2,[\"tabindex\"]],[30,0,[\"rovingButtonBar\"]]]],null],[1,\"\\n\"]],[]]]],[2]],null]],[1]],null],[1,\"      \"],[13],[1,\"\\n\\n      \"],[8,[39,8],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],null],[1,\"\\n      \"],[8,[39,9],null,[[\"@autocomplete\",\"@tabindex\",\"@value\",\"@class\",\"@placeholder\",\"@aria-label\",\"@disabled\",\"@input\",\"@focusIn\",\"@focusOut\"],[\"off\",[30,0,[\"tabindex\"]],[30,0,[\"value\"]],\"d-editor-input\",[30,0,[\"placeholderTranslated\"]],[30,0,[\"placeholderTranslated\"]],[30,0,[\"disabled\"]],[30,0,[\"change\"]],[28,[37,5],[[30,0],\"focusIn\"],null],[28,[37,5],[[30,0],\"focusOut\"],null]]],null],[1,\"\\n      \"],[8,[39,10],null,[[\"@validation\"],[[30,0,[\"validation\"]]]],null],[1,\"\\n      \"],[8,[39,11],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"after-d-editor\",\"div\",[30,0,[\"outletArgs\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[15,0,[29,[\"d-editor-preview-wrapper \",[52,[30,0,[\"forcePreview\"]],\"force-preview\"]]]],[12],[1,\"\\n    \"],[10,0],[14,0,\"d-editor-preview\"],[12],[1,\"\\n\"],[41,[51,[30,0,[\"siteSettings\",\"enable_diffhtml_preview\"]]],[[[1,\"        \"],[1,[28,[35,13],[[30,0,[\"preview\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n    \"],[10,1],[14,0,\"d-editor-plugin\"],[12],[1,\"\\n      \"],[8,[39,11],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"editor-preview\",\"div\",[30,0,[\"outletArgs\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,14],null,[[\"@isActive\",\"@isEditorFocused\",\"@initialFilter\",\"@emojiSelected\",\"@onEmojiPickerClose\"],[[30,0,[\"emojiPickerIsActive\"]],[30,0,[\"isEditorFocused\"]],[30,0,[\"emojiFilter\"]],[28,[37,5],[[30,0],\"emojiSelected\"],null],[30,0,[\"onEmojiPickerClose\"]]]],null]],[\"group\",\"b\",\"&default\"],false,[\"yield\",\"if\",\"each\",\"-track-array\",\"toolbar-popup-menu-options\",\"action\",\"hash\",\"d-button\",\"conditional-loading-spinner\",\"d-textarea\",\"popup-input-tip\",\"plugin-outlet\",\"unless\",\"html-safe\",\"emoji-picker\"]]",
    "moduleName": "discourse/components/d-editor.hbs",
    "isStrictMode": false
  });
  function getButtonLabel(labelKey, defaultLabel) {
    // use the Font Awesome icon if the label matches the default
    return _I18n.default.t(labelKey) === defaultLabel ? null : labelKey;
  }
  const FOUR_SPACES_INDENT = "4-spaces-indent";
  let _createCallbacks = [];
  class Toolbar {
    constructor(opts) {
      var _this = this;
      const {
        siteSettings,
        capabilities
      } = opts;
      this.shortcuts = {};
      this.context = null;
      this.groups = [{
        group: "fontStyles",
        buttons: []
      }, {
        group: "insertions",
        buttons: []
      }, {
        group: "extras",
        buttons: []
      }];
      this.addButton({
        id: "bold",
        group: "fontStyles",
        icon: "bold",
        label: getButtonLabel("composer.bold_label", "B"),
        shortcut: "B",
        preventFocus: true,
        trimLeading: true,
        perform: e => e.applySurround("**", "**", "bold_text")
      });
      this.addButton({
        id: "italic",
        group: "fontStyles",
        icon: "italic",
        label: getButtonLabel("composer.italic_label", "I"),
        shortcut: "I",
        preventFocus: true,
        trimLeading: true,
        perform: e => e.applySurround("*", "*", "italic_text")
      });
      if (opts.showLink) {
        this.addButton({
          id: "link",
          group: "insertions",
          shortcut: "K",
          preventFocus: true,
          trimLeading: true,
          sendAction: event => this.context.send("showLinkModal", event)
        });
      }
      this.addButton({
        id: "blockquote",
        group: "insertions",
        icon: "quote-right",
        shortcut: "Shift+9",
        preventFocus: true,
        perform: e => e.applyList("> ", "blockquote_text", {
          applyEmptyLines: true,
          multiline: true
        })
      });
      if (!capabilities.touch) {
        this.addButton({
          id: "code",
          group: "insertions",
          shortcut: "E",
          preventFocus: true,
          trimLeading: true,
          action: function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return _this.context.send("formatCode", args);
          }
        });
        this.addButton({
          id: "bullet",
          group: "extras",
          icon: "list-ul",
          shortcut: "Shift+8",
          title: "composer.ulist_title",
          preventFocus: true,
          perform: e => e.applyList("* ", "list_item")
        });
        this.addButton({
          id: "list",
          group: "extras",
          icon: "list-ol",
          shortcut: "Shift+7",
          title: "composer.olist_title",
          preventFocus: true,
          perform: e => e.applyList(i => !i ? "1. " : `${parseInt(i, 10) + 1}. `, "list_item")
        });
      }
      if (siteSettings.support_mixed_text_direction) {
        this.addButton({
          id: "toggle-direction",
          group: "extras",
          icon: "exchange-alt",
          shortcut: "Shift+6",
          title: "composer.toggle_direction",
          preventFocus: true,
          perform: e => e.toggleDirection()
        });
      }
      this.groups[this.groups.length - 1].lastGroup = true;
    }
    addButton(button) {
      const g = this.groups.findBy("group", button.group);
      if (!g) {
        throw new Error(`Couldn't find toolbar group ${button.group}`);
      }
      const createdButton = {
        id: button.id,
        tabindex: button.tabindex || "-1",
        className: button.className || button.id,
        label: button.label,
        icon: button.label ? null : button.icon || button.id,
        action: button.action || (a => this.context.send("toolbarButton", a)),
        perform: button.perform || function () {},
        trimLeading: button.trimLeading,
        popupMenu: button.popupMenu || false,
        preventFocus: button.preventFocus || false
      };
      if (button.sendAction) {
        createdButton.sendAction = button.sendAction;
      }
      const title = _I18n.default.t(button.title || `composer.${button.id}_title`);
      if (button.shortcut) {
        const mac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
        const mod = mac ? "Meta" : "Ctrl";
        const shortcutTitle = `${(0, _utilities.translateModKey)(mod + "+")}${(0, _utilities.translateModKey)(button.shortcut)}`;
        createdButton.title = `${title} (${shortcutTitle})`;
        this.shortcuts[`${mod}+${button.shortcut}`.toLowerCase()] = createdButton;
      } else {
        createdButton.title = title;
      }
      if (button.unshift) {
        g.buttons.unshift(createdButton);
      } else {
        g.buttons.push(createdButton);
      }
    }
  }
  function addToolbarCallback(func) {
    _createCallbacks.push(func);
  }
  function clearToolbarCallbacks() {
    _createCallbacks = [];
  }
  function onToolbarCreate(func) {
    (0, _deprecated.default)("`onToolbarCreate` is deprecated, use the plugin api instead.", {
      id: "discourse.d-editor.on-toolbar-create"
    });
    addToolbarCallback(func);
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_textareaTextManipulation.default, (_dec = (0, _decorators.default)("placeholder"), _dec2 = (0, _decorators.on)("willDestroyElement"), _dec3 = (0, _decorators.default)(), _dec4 = (0, _decorators.observes)("ready", "value", "processPreview"), (_obj = {
    classNames: ["d-editor"],
    ready: false,
    lastSel: null,
    _itsatrap: null,
    showLink: true,
    emojiPickerIsActive: false,
    emojiFilter: "",
    emojiStore: (0, _service.inject)("emoji-store"),
    isEditorFocused: false,
    processPreview: true,
    composerFocusSelector: "#reply-control .d-editor-input",
    placeholderTranslated(placeholder) {
      if (placeholder) {
        return _I18n.default.t(placeholder);
      }
      return null;
    },
    _readyNow() {
      this.set("ready", true);
      if (this.autofocus) {
        this._textarea.focus();
      }
    },
    init() {
      this._super(...arguments);
      this.register = (0, _getOwner.getRegister)(this);
    },
    didInsertElement() {
      this._super(...arguments);
      this._previewMutationObserver = this._disablePreviewTabIndex();
      this._textarea = this.element.querySelector("textarea.d-editor-input");
      this._$textarea = $(this._textarea);
      this._applyEmojiAutocomplete(this._$textarea);
      this._applyHashtagAutocomplete(this._$textarea);
      (0, _runloop.scheduleOnce)("afterRender", this, this._readyNow);
      this._itsatrap = new _itsatrap.default(this._textarea);
      const shortcuts = this.get("toolbar.shortcuts");
      Object.keys(shortcuts).forEach(sc => {
        const button = shortcuts[sc];
        this._itsatrap.bind(sc, () => {
          button.action(button);
          return false;
        });
      });
      this._itsatrap.bind("tab", () => this.indentSelection("right"));
      this._itsatrap.bind("shift+tab", () => this.indentSelection("left"));
      const mac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const mod = mac ? "meta" : "ctrl";
      this._itsatrap.bind(`${mod}+shift+.`, () => this.send("insertCurrentTime"));

      // disable clicking on links in the preview
      this.element.querySelector(".d-editor-preview").addEventListener("click", this._handlePreviewLinkClick);
      if (this.composerEvents) {
        this.appEvents.on("composer:insert-block", this, "insertBlock");
        this.appEvents.on("composer:insert-text", this, "insertText");
        this.appEvents.on("composer:replace-text", this, "replaceText");
        this.appEvents.on("composer:indent-selected-text", this, "indentSelection");
      }
    },
    _handlePreviewLinkClick(event) {
      if ((0, _interceptClick.wantsNewWindow)(event)) {
        return;
      }
      if (event.target.tagName === "A") {
        if (event.target.classList.contains("mention")) {
          this.appEvents.trigger("click.discourse-preview-user-card-mention", $(event.target));
        }
        if (event.target.classList.contains("mention-group")) {
          this.appEvents.trigger("click.discourse-preview-group-card-mention-group", $(event.target));
        }
        event.preventDefault();
        return false;
      }
    },
    _shutDown() {
      if (this.composerEvents) {
        this.appEvents.off("composer:insert-block", this, "insertBlock");
        this.appEvents.off("composer:insert-text", this, "insertText");
        this.appEvents.off("composer:replace-text", this, "replaceText");
        this.appEvents.off("composer:indent-selected-text", this, "indentSelection");
      }
      this._itsatrap?.destroy();
      this._itsatrap = null;
      this.element.querySelector(".d-editor-preview")?.removeEventListener("click", this._handlePreviewLinkClick);
      this._previewMutationObserver?.disconnect();
      if ((0, _environment.isTesting)()) {
        this.element.removeEventListener("paste", this.paste);
      }
      this._cachedCookFunction = null;
    },
    toolbar() {
      const toolbar = new Toolbar(this.getProperties("site", "siteSettings", "showLink", "capabilities"));
      toolbar.context = this;
      _createCallbacks.forEach(cb => cb(toolbar));
      if (this.extraButtons) {
        this.extraButtons(toolbar);
      }
      const firstButton = toolbar.groups.mapBy("buttons").flat().firstObject;
      if (firstButton) {
        firstButton.tabindex = 0;
      }
      return toolbar;
    },
    cachedCookAsync(text) {
      if (this._cachedCookFunction) {
        return _rsvp.Promise.resolve(this._cachedCookFunction(text));
      }
      const markdownOptions = this.markdownOptions || {};
      return (0, _text.generateCookFunction)(markdownOptions).then(cook => {
        this._cachedCookFunction = cook;
        return cook(text);
      });
    },
    _updatePreview() {
      if (this._state !== "inDOM" || !this.processPreview) {
        return;
      }
      const value = this.value;
      this.cachedCookAsync(value).then(cooked => {
        if (this.isDestroyed) {
          return;
        }
        if (this.preview === cooked) {
          return;
        }
        this.set("preview", cooked);
        let previewPromise = _rsvp.Promise.resolve();
        if (this.siteSettings.enable_diffhtml_preview) {
          const cookedElement = document.createElement("div");
          cookedElement.innerHTML = cooked;
          (0, _linkHashtags.linkSeenHashtags)(cookedElement);
          (0, _linkMentions.linkSeenMentions)(cookedElement, this.siteSettings);
          (0, _uploadShortUrl.resolveCachedShortUrls)(this.siteSettings, cookedElement);
          (0, _loadOneboxes.loadOneboxes)(cookedElement, _ajax.ajax, null, null, this.siteSettings.max_oneboxes_per_post, false, true);
          previewPromise = (0, _loadScript.default)("/javascripts/diffhtml.min.js").then(() => {
            window.diff.innerHTML(this.element.querySelector(".d-editor-preview"), cookedElement.innerHTML);
          });
        }
        previewPromise.then(() => {
          (0, _runloop.schedule)("afterRender", () => {
            if (this._state !== "inDOM" || !this.element) {
              return;
            }
            const preview = this.element.querySelector(".d-editor-preview");
            if (!preview) {
              return;
            }
            if (this.previewUpdated) {
              this.previewUpdated(preview);
            }
          });
        });
      });
    },
    _watchForChanges() {
      if (!this.ready) {
        return;
      }

      // Debouncing in test mode is complicated
      if ((0, _environment.isTesting)()) {
        this._updatePreview();
      } else {
        (0, _debounce.default)(this, this._updatePreview, 30);
      }
    },
    _applyHashtagAutocomplete() {
      (0, _hashtagAutocomplete.setupHashtagAutocomplete)(this.site.hashtag_configurations["topic-composer"], this._$textarea, this.siteSettings, {
        afterComplete: value => {
          this.set("value", value);
          (0, _runloop.schedule)("afterRender", this, this.focusTextArea);
        }
      });
    },
    _applyEmojiAutocomplete($textarea) {
      if (!this.siteSettings.enable_emoji) {
        return;
      }
      $textarea.autocomplete({
        template: (0, _rawTemplates.findRawTemplate)("emoji-selector-autocomplete"),
        key: ":",
        afterComplete: text => {
          this.set("value", text);
          (0, _runloop.schedule)("afterRender", this, this.focusTextArea);
        },
        onKeyUp: (text, cp) => {
          if ((0, _utilities.inCodeBlock)(text, cp)) {
            return false;
          }
          const matches = /(?:^|[\s.\?,@\/#!%&*;:\[\]{}=\-_()])(:(?!:).?[\w-]*:?(?!:)(?:t\d?)?:?) ?$/gi.exec(text.substring(0, cp));
          if (matches && matches[1]) {
            return [matches[1]];
          }
        },
        transformComplete: v => {
          if (v.code) {
            this.emojiStore.track(v.code);
            return `${v.code}:`;
          } else {
            $textarea.autocomplete({
              cancel: true
            });
            this.set("emojiPickerIsActive", true);
            this.set("emojiFilter", v.term);
            return "";
          }
        },
        dataSource: term => {
          return new _rsvp.Promise(resolve => {
            const full = `:${term}`;
            term = term.toLowerCase();
            if (term.length < this.siteSettings.emoji_autocomplete_min_chars) {
              return resolve(_autocomplete.SKIP);
            }
            if (term === "") {
              if (this.emojiStore.favorites.length) {
                return resolve(this.emojiStore.favorites.filter(f => !this.site.denied_emojis?.includes(f)).slice(0, 5));
              } else {
                return resolve(["slight_smile", "smile", "wink", "sunny", "blush"]);
              }
            }

            // note this will only work for emojis starting with :
            // eg: :-)
            const emojiTranslation = this.get("site.custom_emoji_translation") || {};
            const allTranslations = Object.assign({}, _data.translations, emojiTranslation);
            if (allTranslations[full]) {
              return resolve([allTranslations[full]]);
            }
            const emojiDenied = this.get("site.denied_emojis") || [];
            const match = term.match(/^:?(.*?):t([2-6])?$/);
            if (match) {
              const name = match[1];
              const scale = match[2];
              if ((0, _emoji.isSkinTonableEmoji)(name) && !emojiDenied.includes(name)) {
                if (scale) {
                  return resolve([`${name}:t${scale}`]);
                } else {
                  return resolve([2, 3, 4, 5, 6].map(x => `${name}:t${x}`));
                }
              }
            }
            const options = (0, _emoji.emojiSearch)(term, {
              maxResults: 5,
              diversity: this.emojiStore.diversity,
              exclude: emojiDenied
            });
            return resolve(options);
          }).then(list => {
            if (list === _autocomplete.SKIP) {
              return [];
            }
            return list.map(code => {
              return {
                code,
                src: (0, _text.emojiUrlFor)(code)
              };
            });
          }).then(list => {
            if (list.length) {
              list.push({
                label: _I18n.default.t("composer.more_emoji"),
                term
              });
            }
            return list;
          });
        },
        triggerRule: textarea => !(0, _utilities.inCodeBlock)(textarea.value, (0, _utilities.caretPosition)(textarea))
      });
    },
    _applyList(sel, head, exampleKey, opts) {
      if (sel.value.includes("\n")) {
        this.applySurround(sel, head, "", exampleKey, opts);
      } else {
        const [hval, hlen] = (0, _textareaTextManipulation.getHead)(head);
        if (sel.start === sel.end) {
          sel.value = _I18n.default.t(`composer.${exampleKey}`);
        }
        const trimmedPre = sel.pre.trim();
        const number = sel.value.startsWith(hval) ? sel.value.slice(hlen) : `${hval}${sel.value}`;
        const preLines = trimmedPre.length ? `${trimmedPre}\n\n` : "";
        const trimmedPost = sel.post.trim();
        const post = trimmedPost.length ? `\n\n${trimmedPost}` : trimmedPost;
        this.set("value", `${preLines}${number}${post}`);
        this.selectText(preLines.length, number.length);
      }
    },
    _toggleDirection() {
      let currentDir = this._$textarea.attr("dir") ? this._$textarea.attr("dir") : (0, _textDirection.siteDir)(),
        newDir = currentDir === "ltr" ? "rtl" : "ltr";
      this._$textarea.attr("dir", newDir).focus();
    },
    rovingButtonBar(event) {
      let target = event.target;
      let siblingFinder;
      if (event.code === "ArrowRight") {
        siblingFinder = "nextElementSibling";
      } else if (event.code === "ArrowLeft") {
        siblingFinder = "previousElementSibling";
      } else {
        return true;
      }
      while (target.parentNode && !target.parentNode.classList.contains("d-editor-button-bar")) {
        target = target.parentNode;
      }
      let focusable = target[siblingFinder];
      if (focusable) {
        while (focusable.tagName !== "BUTTON" && !focusable.classList.contains("select-kit") || focusable.classList.contains("hidden")) {
          focusable = focusable[siblingFinder];
        }
        if (focusable?.tagName === "DETAILS") {
          focusable = focusable.querySelector("summary");
        }
        focusable?.focus();
      }
      return true;
    },
    onEmojiPickerClose() {
      if (!(this.isDestroyed || this.isDestroying)) {
        this.set("emojiPickerIsActive", false);
      }
    },
    actions: {
      emoji() {
        if (this.disabled) {
          return;
        }
        this.set("emojiPickerIsActive", !this.emojiPickerIsActive);
      },
      toolbarButton(button) {
        var _this2 = this;
        if (this.disabled) {
          return;
        }
        const selected = this.getSelected(button.trimLeading);
        const toolbarEvent = {
          selected,
          selectText: (from, length) => this.selectText(from, length, {
            scroll: false
          }),
          applySurround: (head, tail, exampleKey, opts) => this.applySurround(selected, head, tail, exampleKey, opts),
          applyList: (head, exampleKey, opts) => this._applyList(selected, head, exampleKey, opts),
          formatCode: function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            return _this2.send("formatCode", args);
          },
          addText: text => this.addText(selected, text),
          getText: () => this.value,
          toggleDirection: () => this._toggleDirection()
        };
        if (button.sendAction) {
          return button.sendAction(toolbarEvent);
        } else {
          button.perform(toolbarEvent);
        }
      },
      showLinkModal(toolbarEvent) {
        if (this.disabled) {
          return;
        }
        let linkText = "";
        this._lastSel = toolbarEvent.selected;
        if (this._lastSel) {
          linkText = this._lastSel.value;
        }
        (0, _showModal.default)("insert-hyperlink").setProperties({
          linkText,
          toolbarEvent
        });
      },
      formatCode() {
        if (this.disabled) {
          return;
        }
        const sel = this.getSelected("", {
          lineVal: true
        });
        const selValue = sel.value;
        const hasNewLine = selValue.includes("\n");
        const isBlankLine = sel.lineVal.trim().length === 0;
        const isFourSpacesIndent = this.siteSettings.code_formatting_style === FOUR_SPACES_INDENT;
        if (!hasNewLine) {
          if (selValue.length === 0 && isBlankLine) {
            if (isFourSpacesIndent) {
              const example = _I18n.default.t(`composer.code_text`);
              this.set("value", `${sel.pre}    ${example}${sel.post}`);
              return this.selectText(sel.pre.length + 4, example.length);
            } else {
              return this.applySurround(sel, "```\n", "\n```", "paste_code_text");
            }
          } else {
            return this.applySurround(sel, "`", "`", "code_title");
          }
        } else {
          if (isFourSpacesIndent) {
            return this.applySurround(sel, "    ", "", "code_text");
          } else {
            const preNewline = sel.pre[-1] !== "\n" && sel.pre !== "" ? "\n" : "";
            const postNewline = sel.post[0] !== "\n" ? "\n" : "";
            return this.addText(sel, `${preNewline}\`\`\`\n${sel.value}\n\`\`\`${postNewline}`);
          }
        }
      },
      insertCurrentTime() {
        const sel = this.getSelected("", {
          lineVal: true
        });
        const timezone = this.currentUser.user_option.timezone;
        const time = moment().format("HH:mm:ss");
        const date = moment().format("YYYY-MM-DD");
        this.addText(sel, `[date=${date} time=${time} timezone="${timezone}"]`);
      },
      focusIn() {
        this.set("isEditorFocused", true);
      },
      focusOut() {
        this.set("isEditorFocused", false);
      }
    },
    _disablePreviewTabIndex() {
      const observer = new MutationObserver(function () {
        document.querySelectorAll(".d-editor-preview a").forEach(anchor => {
          anchor.setAttribute("tabindex", "-1");
        });
      });
      observer.observe(document.querySelector(".d-editor-preview"), {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: true
      });
      return observer;
    }
  }, (_applyDecoratedDescriptor(_obj, "placeholderTranslated", [_dec], Object.getOwnPropertyDescriptor(_obj, "placeholderTranslated"), _obj), _applyDecoratedDescriptor(_obj, "_handlePreviewLinkClick", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_handlePreviewLinkClick"), _obj), _applyDecoratedDescriptor(_obj, "_shutDown", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_shutDown"), _obj), _applyDecoratedDescriptor(_obj, "toolbar", [_dec3], Object.getOwnPropertyDescriptor(_obj, "toolbar"), _obj), _applyDecoratedDescriptor(_obj, "_watchForChanges", [_dec4], Object.getOwnPropertyDescriptor(_obj, "_watchForChanges"), _obj), _applyDecoratedDescriptor(_obj, "rovingButtonBar", [_object.action], Object.getOwnPropertyDescriptor(_obj, "rovingButtonBar"), _obj), _applyDecoratedDescriptor(_obj, "onEmojiPickerClose", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onEmojiPickerClose"), _obj)), _obj))));
  _exports.default = _default;
});