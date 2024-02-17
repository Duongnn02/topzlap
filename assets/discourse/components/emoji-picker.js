define("discourse/components/emoji-picker", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse-common/utils/decorators", "pretty-text/emoji", "discourse/lib/text", "discourse/lib/utilities", "@ember/runloop", "discourse-common/lib/later", "@popperjs/core", "@ember/template", "@ember/service", "@ember/string"], function (_exports, _component, _templateFactory, _object, _decorators, _emoji, _text, _utilities, _runloop, _later, _core, _template, _service, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"discourse-common/utils/decorators",0,"pretty-text/emoji",0,"discourse/lib/text",0,"discourse/lib/utilities",0,"@ember/runloop",0,"discourse-common/lib/later",0,"@ember/component",0,"@popperjs/core",0,"@ember/template",0,"@ember/service",0,"@ember/string"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.isActive}}
    {{! template-lint-disable no-invalid-interactive no-down-event-binding }}
    <div
      {{on "keydown" (action "keydown")}}
      class="emoji-picker {{if this.isActive 'opened'}}"
    >
      {{! template-lint-enable no-invalid-interactive no-down-event-binding }}
      <div class="emoji-picker-category-buttons">
        {{#if this.recentEmojis.length}}
          <button
            type="button"
            data-section="recent"
            {{on "click" (fn this.onCategorySelection "recent")}}
            class="btn btn-default category-button emoji"
          >
            {{replace-emoji ":star:"}}
          </button>
        {{/if}}
  
        <EmojiGroupButtons
          @onCategorySelection={{this.onCategorySelection}}
          @tagName=""
        />
  
        {{#each-in this.customEmojis as |group emojis|}}
          <button
            type="button"
            data-section={{concat "custom-" group}}
            {{on "click" (fn this.onCategorySelection (concat "custom-" group))}}
            class="btn btn-default category-button emoji"
          >
            {{replace-emoji (concat ":" emojis.firstObject.code ":")}}
          </button>
        {{/each-in}}
      </div>
  
      <div class="emoji-picker-content">
        <div class="emoji-picker-search-container">
          <Input
            class="filter"
            name="filter"
            @value={{@initialFilter}}
            placeholder={{i18n "emoji_picker.filter_placeholder"}}
            autocomplete="off"
            @type="search"
            autocorrect="off"
            autocapitalize="off"
            {{on "input" (action "onFilterChange")}}
          />
  
          {{d-icon "search"}}
        </div>
  
        <div
          class="emoji-picker-emoji-area"
          role="button"
          {{on "click" this.onEmojiSelection}}
          {{on "mouseover" this.onEmojiHover}}
        >
          <div class="results"></div>
  
          <div class="emojis-container">
            {{#if this.recentEmojis.length}}
              <div class="section recent" data-section="recent">
                <div class="section-header">
                  <span class="title">{{i18n "emoji_picker.recent"}}</span>
                  <DButton
                    @icon="trash-alt"
                    @action={{action "onClearRecent"}}
                    @class="trash-recent"
                  />
                </div>
                <div class="section-group">
                  {{#each this.recentEmojis as |emoji|}}
                    {{replace-emoji
                      (concat ":" emoji ":")
                      (hash lazy=true tabIndex="0" class="recent-emoji")
                    }}
                  {{/each}}
                </div>
              </div>
            {{/if}}
  
            <EmojiGroupSections />
  
            {{#each-in this.customEmojis as |group emojis|}}
              <div class="section" data-section="custom-{{group}}">
                <div class="section-header">
                  <span class="title">
                    {{i18n
                      (concat "emoji_picker." group)
                      translatedFallback=group
                    }}
                  </span>
                </div>
                {{#if emojis.length}}
                  <div class="section-group">
                    {{#each emojis as |emoji|}}
                      <span>
                        <img
                          title={{emoji.code}}
                          width="20"
                          height="20"
                          loading="lazy"
                          class="emoji"
                          src={{emoji.src}}
                        />
                      </span>
                    {{/each}}
                  </div>
                {{/if}}
              </div>
            {{/each-in}}
          </div>
        </div>
  
        <div class="emoji-picker-footer">
          <div class="emoji-picker-emoji-info">
            {{#if this.hoveredEmoji}}
              {{replace-emoji (concat ":" this.hoveredEmoji ":")}}
            {{/if}}
          </div>
  
          <div class="emoji-picker-diversity-picker">
            {{#each this.diversityScales as |diversityScale index|}}
              <DButton
                @icon={{diversityScale.icon}}
                @class={{concat "diversity-scale " diversityScale.name}}
                @title={{diversityScale.title}}
                @action={{action "onDiversitySelection" index}}
              />
            {{/each}}
          </div>
        </div>
      </div>
    </div>
  
    {{#if this.site.mobileView}}
      <div
        role="button"
        class="emoji-picker-modal-overlay"
        {{on "click" this.onClose}}
      ></div>
    {{/if}}
  {{/if}}
  */
  {
    "id": "t5GJPzcc",
    "block": "[[[41,[30,0,[\"isActive\"]],[[[1,\"  \"],[11,0],[16,0,[29,[\"emoji-picker \",[52,[30,0,[\"isActive\"]],\"opened\"]]]],[4,[38,1],[\"keydown\",[28,[37,2],[[30,0],\"keydown\"],null]],null],[12],[1,\"\\n\"],[1,\"    \"],[10,0],[14,0,\"emoji-picker-category-buttons\"],[12],[1,\"\\n\"],[41,[30,0,[\"recentEmojis\",\"length\"]],[[[1,\"        \"],[11,\"button\"],[24,\"data-section\",\"recent\"],[24,0,\"btn btn-default category-button emoji\"],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,3],[[30,0,[\"onCategorySelection\"]],\"recent\"],null]],null],[12],[1,\"\\n          \"],[1,[28,[35,4],[\":star:\"],null]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[8,[39,5],null,[[\"@onCategorySelection\",\"@tagName\"],[[30,0,[\"onCategorySelection\"]],\"\"]],null],[1,\"\\n\\n\"],[42,[28,[37,7],[[30,0,[\"customEmojis\"]]],null],null,[[[1,\"        \"],[11,\"button\"],[16,\"data-section\",[28,[37,8],[\"custom-\",[30,2]],null]],[24,0,\"btn btn-default category-button emoji\"],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,3],[[30,0,[\"onCategorySelection\"]],[28,[37,8],[\"custom-\",[30,2]],null]],null]],null],[12],[1,\"\\n          \"],[1,[28,[35,4],[[28,[37,8],[\":\",[30,1,[\"firstObject\",\"code\"]],\":\"],null]],null]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[1,2]],null],[1,\"    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"emoji-picker-content\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"emoji-picker-search-container\"],[12],[1,\"\\n        \"],[8,[39,9],[[24,0,\"filter\"],[24,3,\"filter\"],[16,\"placeholder\",[28,[37,10],[\"emoji_picker.filter_placeholder\"],null]],[24,\"autocomplete\",\"off\"],[24,\"autocorrect\",\"off\"],[24,\"autocapitalize\",\"off\"],[4,[38,1],[\"input\",[28,[37,2],[[30,0],\"onFilterChange\"],null]],null]],[[\"@value\",\"@type\"],[[30,3],\"search\"]],null],[1,\"\\n\\n        \"],[1,[28,[35,11],[\"search\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[11,0],[24,0,\"emoji-picker-emoji-area\"],[24,\"role\",\"button\"],[4,[38,1],[\"click\",[30,0,[\"onEmojiSelection\"]]],null],[4,[38,1],[\"mouseover\",[30,0,[\"onEmojiHover\"]]],null],[12],[1,\"\\n        \"],[10,0],[14,0,\"results\"],[12],[13],[1,\"\\n\\n        \"],[10,0],[14,0,\"emojis-container\"],[12],[1,\"\\n\"],[41,[30,0,[\"recentEmojis\",\"length\"]],[[[1,\"            \"],[10,0],[14,0,\"section recent\"],[14,\"data-section\",\"recent\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n                \"],[10,1],[14,0,\"title\"],[12],[1,[28,[35,10],[\"emoji_picker.recent\"],null]],[13],[1,\"\\n                \"],[8,[39,12],null,[[\"@icon\",\"@action\",\"@class\"],[\"trash-alt\",[28,[37,2],[[30,0],\"onClearRecent\"],null],\"trash-recent\"]],null],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"section-group\"],[12],[1,\"\\n\"],[42,[28,[37,13],[[28,[37,13],[[30,0,[\"recentEmojis\"]]],null]],null],null,[[[1,\"                  \"],[1,[28,[35,4],[[28,[37,8],[\":\",[30,4],\":\"],null],[28,[37,14],null,[[\"lazy\",\"tabIndex\",\"class\"],[true,\"0\",\"recent-emoji\"]]]],null]],[1,\"\\n\"]],[4]],null],[1,\"              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n          \"],[8,[39,15],null,null,null],[1,\"\\n\\n\"],[42,[28,[37,7],[[30,0,[\"customEmojis\"]]],null],null,[[[1,\"            \"],[10,0],[14,0,\"section\"],[15,\"data-section\",[29,[\"custom-\",[30,6]]]],[12],[1,\"\\n              \"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n                \"],[10,1],[14,0,\"title\"],[12],[1,\"\\n                  \"],[1,[28,[35,10],[[28,[37,8],[\"emoji_picker.\",[30,6]],null]],[[\"translatedFallback\"],[[30,6]]]]],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"],[41,[30,5,[\"length\"]],[[[1,\"                \"],[10,0],[14,0,\"section-group\"],[12],[1,\"\\n\"],[42,[28,[37,13],[[28,[37,13],[[30,5]],null]],null],null,[[[1,\"                    \"],[10,1],[12],[1,\"\\n                      \"],[10,\"img\"],[15,\"title\",[30,7,[\"code\"]]],[14,\"width\",\"20\"],[14,\"height\",\"20\"],[14,\"loading\",\"lazy\"],[14,0,\"emoji\"],[15,\"src\",[30,7,[\"src\"]]],[12],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[7]],null],[1,\"                \"],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n\"]],[5,6]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"emoji-picker-footer\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"emoji-picker-emoji-info\"],[12],[1,\"\\n\"],[41,[30,0,[\"hoveredEmoji\"]],[[[1,\"            \"],[1,[28,[35,4],[[28,[37,8],[\":\",[30,0,[\"hoveredEmoji\"]],\":\"],null]],null]],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,0,\"emoji-picker-diversity-picker\"],[12],[1,\"\\n\"],[42,[28,[37,13],[[28,[37,13],[[30,0,[\"diversityScales\"]]],null]],null],null,[[[1,\"            \"],[8,[39,12],null,[[\"@icon\",\"@class\",\"@title\",\"@action\"],[[30,8,[\"icon\"]],[28,[37,8],[\"diversity-scale \",[30,8,[\"name\"]]],null],[30,8,[\"title\"]],[28,[37,2],[[30,0],\"onDiversitySelection\",[30,9]],null]]],null],[1,\"\\n\"]],[8,9]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"site\",\"mobileView\"]],[[[1,\"    \"],[11,0],[24,\"role\",\"button\"],[24,0,\"emoji-picker-modal-overlay\"],[4,[38,1],[\"click\",[30,0,[\"onClose\"]]],null],[12],[13],[1,\"\\n\"]],[]],null]],[]],null]],[\"emojis\",\"group\",\"@initialFilter\",\"emoji\",\"emojis\",\"group\",\"emoji\",\"diversityScale\",\"index\"],false,[\"if\",\"on\",\"action\",\"fn\",\"replace-emoji\",\"emoji-group-buttons\",\"each\",\"-each-in\",\"concat\",\"input\",\"i18n\",\"d-icon\",\"d-button\",\"-track-array\",\"hash\",\"emoji-group-sections\"]]",
    "moduleName": "discourse/components/emoji-picker.hbs",
    "isStrictMode": false
  });
  function customEmojis() {
    const list = (0, _emoji.extendedEmojiList)();
    const groups = [];
    for (const [code, emoji] of list.entries()) {
      groups[emoji.group] = groups[emoji.group] || [];
      groups[emoji.group].push({
        code,
        src: (0, _text.emojiUrlFor)(code)
      });
    }
    return groups;
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("emojiStore.diversity"), _dec2 = (0, _decorators.observes)("isActive"), (_obj = {
    emojiStore: (0, _service.inject)("emoji-store"),
    tagName: "",
    customEmojis: null,
    recentEmojis: null,
    hoveredEmoji: null,
    isActive: false,
    usePopper: true,
    placement: "auto",
    // one of popper.js' placements, see https://popper.js.org/docs/v2/constructors/#options
    initialFilter: "",
    elements: {
      searchInput: ".emoji-picker-search-container input",
      picker: ".emoji-picker-emoji-area"
    },
    init() {
      this._super(...arguments);
      this.set("customEmojis", customEmojis());
      if ("IntersectionObserver" in window) {
        this._sectionObserver = this._setupSectionObserver();
      }
    },
    didInsertElement() {
      this._super(...arguments);
      this.appEvents.on("emoji-picker:close", this, "onClose");
    },
    selectedDiversity(diversity) {
      return diversity;
    },
    _setup() {
      if (this.isActive) {
        this.onShow();
      } else {
        this.onClose();
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      this._sectionObserver && this._sectionObserver.disconnect();
      this.appEvents.off("emoji-picker:close", this, "onClose");
    },
    onShow() {
      this.set("recentEmojis", this.emojiStore.favorites);
      (0, _runloop.schedule)("afterRender", () => {
        this._applyFilter(this.initialFilter);
        document.addEventListener("click", this.handleOutsideClick);
        const emojiPicker = document.querySelector(".emoji-picker");
        if (!emojiPicker) {
          return;
        }
        const popperAnchor = this._getPopperAnchor();
        if (!this.site.isMobileDevice && this.usePopper && popperAnchor) {
          const modifiers = [{
            name: "preventOverflow"
          }, {
            name: "offset",
            options: {
              offset: [5, 5]
            }
          }];
          if (this.placement === "auto" && window.innerWidth < popperAnchor.clientWidth * 2) {
            modifiers.push({
              name: "computeStyles",
              enabled: true,
              fn(_ref) {
                let {
                  state
                } = _ref;
                state.styles.popper = {
                  ...state.styles.popper,
                  position: "fixed",
                  left: `${(window.innerWidth - state.rects.popper.width) / 2}px`,
                  top: "50%",
                  transform: "translateY(-50%)"
                };
                return state;
              }
            });
          }
          this._popper = (0, _core.createPopper)(popperAnchor, emojiPicker, {
            placement: this.placement
          });
        }

        // this is a low-tech trick to prevent appending hundreds of emojis
        // of blocking the rendering of the picker
        (0, _later.default)(() => {
          (0, _runloop.schedule)("afterRender", () => {
            if (!this.site.isMobileDevice || this.isEditorFocused) {
              const filter = emojiPicker.querySelector("input.filter");
              filter && filter.focus();
              if (this._sectionObserver) {
                emojiPicker.querySelectorAll(".emojis-container .section .section-header").forEach(p => this._sectionObserver.observe(p));
              }
            }
            if (this.selectedDiversity !== 0) {
              this._applyDiversity(this.selectedDiversity);
            }
          });
        }, 50);
      });
    },
    onClose(event) {
      event?.stopPropagation();
      document.removeEventListener("click", this.handleOutsideClick);
      this.onEmojiPickerClose && this.onEmojiPickerClose(event);
    },
    diversityScales: (0, _object.computed)("selectedDiversity", function () {
      return ["default", "light", "medium-light", "medium", "medium-dark", "dark"].map((name, index) => {
        return {
          name,
          title: `emoji_picker.${(0, _string.underscore)(name)}_tone`,
          icon: index + 1 === this.selectedDiversity ? "check" : ""
        };
      });
    }),
    onClearRecent() {
      this.emojiStore.favorites = [];
      this.set("recentEmojis", []);
    },
    onDiversitySelection(index) {
      const scale = index + 1;
      this.emojiStore.diversity = scale;
      this._applyDiversity(scale);
    },
    onEmojiHover(event) {
      const img = event.target;
      if (!img.classList.contains("emoji") || img.tagName !== "IMG") {
        return false;
      }
      this._updateEmojiPreview(event.target.title);
    },
    onEmojiSelection(event) {
      const img = event.target;
      if (!img.classList.contains("emoji") || img.tagName !== "IMG") {
        return false;
      }
      let code = event.target.title;
      code = this._codeWithDiversity(code, this.selectedDiversity);
      this.emojiSelected(code);
      this._trackEmojiUsage(code, {
        refresh: !img.parentNode.parentNode.classList.contains("recent")
      });
      if (this.site.isMobileDevice) {
        this.onClose(event);
      }
    },
    onCategorySelection(sectionName, event) {
      event?.preventDefault();
      const section = document.querySelector(`.emoji-picker-emoji-area .section[data-section="${sectionName}"]`);
      section && section.scrollIntoView();
    },
    keydown(event) {
      const arrowKeys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
      const emojis = document.querySelectorAll(".emoji-picker-emoji-area .emoji");
      let currentEmoji;
      if (event.key === "ArrowDown" && this._focusedOn(this.elements.searchInput)) {
        this._updateEmojiPreview(emojis[0].title);
        emojis[0].focus();
        event.preventDefault();
        return false;
      }
      if (event.key === "Escape") {
        this.onClose(event);
        const path = event.path || event.composedPath && event.composedPath();
        const fromChatComposer = path.find(e => e?.classList?.contains("chat-composer-container"));
        const fromTopicComposer = path.find(e => e?.classList?.contains("d-editor"));
        if (fromTopicComposer) {
          document.querySelector(".d-editor-input")?.focus();
        } else if (fromChatComposer) {
          document.querySelector(".chat-composer__input")?.focus();
        } else {
          document.querySelector("textarea")?.focus();
        }
        return false;
      }
      if (arrowKeys.includes(event.key)) {
        if (!this._focusedOn(this.elements.picker)) {
          return;
        }
        Array.from(emojis).find((e, index) => {
          currentEmoji = index;
          return e.isEqualNode(event.target);
        });
        if (event.key === "ArrowRight") {
          let nextEmoji = currentEmoji + 1;
          if (nextEmoji < emojis.length) {
            this._updateEmojiPreview(emojis[nextEmoji].title);
            emojis[nextEmoji].focus();
          } else if (nextEmoji >= emojis.length) {
            this._updateEmojiPreview(emojis[0].title);
            emojis[0].focus();
          }
        }
        if (event.key === "ArrowLeft") {
          const previousEmoji = currentEmoji - 1;
          if (currentEmoji > 0) {
            this._updateEmojiPreview(emojis[previousEmoji].title);
            emojis[previousEmoji].focus();
          }
        }
        const active = emojis[currentEmoji];
        if (event.key === "ArrowDown") {
          // source: https://stackoverflow.com/a/49090383/349424
          // look for same element type with
          // - higher offsetTop
          // - same offsetLeft
          const emojiBelow = [...emojis].filter(c => c.offsetTop > active.offsetTop).find(c => c.offsetLeft === active.offsetLeft);
          this._updateEmojiPreview(emojiBelow.title);
          emojiBelow?.focus();
        }
        if (event.key === "ArrowUp") {
          // look for same element type with
          // - lower offsetTop
          // - same offsetLeft
          const emojiAbove = [...emojis].reverse().filter(c => c.offsetTop < active.offsetTop).find(c => c.offsetLeft === active.offsetLeft);
          if (emojiAbove) {
            this._updateEmojiPreview(emojiAbove.title);
            emojiAbove.focus();
          } else {
            this.set("hoveredEmoji", null);
            document.querySelector(this.elements.searchInput).focus();
          }
        }
        event.preventDefault();
        return false;
      }
      if (event.key === "Enter") {
        if (!this._focusedOn(".emoji")) {
          return;
        }
        this.onEmojiSelection(event);
        this.onClose(event);
        event.preventDefault();
        return false;
      }
    },
    onFilterChange(event) {
      this._applyFilter(event.target.value);
    },
    _focusedOn(item) {
      // returns the item currently being focused on
      return document.activeElement.closest(item) ? document.activeElement : null;
    },
    _applyFilter(filter) {
      const emojiPicker = document.querySelector(".emoji-picker");
      const results = document.querySelector(".emoji-picker-emoji-area .results");
      results.innerHTML = "";
      if (filter) {
        results.innerHTML = (0, _emoji.emojiSearch)(filter.toLowerCase(), {
          diversity: this.emojiStore.diversity,
          exclude: this.site.denied_emojis
        }).map(this._replaceEmoji).join("");
        emojiPicker.classList.add("has-filter");
        results.scrollIntoView();
      } else {
        emojiPicker.classList.remove("has-filter");
      }
    },
    _trackEmojiUsage(code) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.emojiStore.track(code);
      if (options.refresh) {
        this.set("recentEmojis", [...this.emojiStore.favorites]);
      }
    },
    _replaceEmoji(code) {
      const escaped = (0, _text.emojiUnescape)(`:${(0, _utilities.escapeExpression)(code)}:`, {
        lazy: true,
        tabIndex: "0"
      });
      return (0, _template.htmlSafe)(escaped);
    },
    _codeWithDiversity(code, selectedDiversity) {
      if (/:t\d/.test(code)) {
        return code;
      } else if (selectedDiversity > 1 && (0, _emoji.isSkinTonableEmoji)(code)) {
        return `${code}:t${selectedDiversity}`;
      } else {
        return code;
      }
    },
    _applyDiversity(diversity) {
      const emojiPickerArea = document.querySelector(".emoji-picker-emoji-area");
      emojiPickerArea && emojiPickerArea.querySelectorAll(".emoji.diversity").forEach(img => {
        const code = this._codeWithDiversity(img.title, diversity);
        img.src = (0, _text.emojiUrlFor)(code);
      });
    },
    _setupSectionObserver() {
      return new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.parentNode.dataset.section;
            const categoryButtons = document.querySelector(".emoji-picker .emoji-picker-category-buttons");
            if (!categoryButtons) {
              return;
            }
            const button = categoryButtons.querySelector(`.category-button[data-section="${sectionName}"]`);
            categoryButtons.querySelectorAll(".category-button").forEach(b => b.classList.remove("current"));
            button && button.classList.add("current");
          }
        });
      }, {
        threshold: 1
      });
    },
    _getPopperAnchor() {
      // .d-editor-textarea-wrapper is only for backward compatibility here
      // in new code use .emoji-picker-anchor
      return document.querySelector(".emoji-picker-anchor") ?? document.querySelector(".d-editor-textarea-wrapper");
    },
    _updateEmojiPreview(title) {
      return this.set("hoveredEmoji", this._codeWithDiversity(title, this.selectedDiversity));
    },
    handleOutsideClick(event) {
      const emojiPicker = document.querySelector(".emoji-picker");
      if (emojiPicker && !emojiPicker.contains(event.target)) {
        this.onClose(event);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "selectedDiversity", [_dec], Object.getOwnPropertyDescriptor(_obj, "selectedDiversity"), _obj), _applyDecoratedDescriptor(_obj, "_setup", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_setup"), _obj), _applyDecoratedDescriptor(_obj, "onShow", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onShow"), _obj), _applyDecoratedDescriptor(_obj, "onClose", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onClose"), _obj), _applyDecoratedDescriptor(_obj, "onClearRecent", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onClearRecent"), _obj), _applyDecoratedDescriptor(_obj, "onDiversitySelection", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onDiversitySelection"), _obj), _applyDecoratedDescriptor(_obj, "onEmojiHover", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onEmojiHover"), _obj), _applyDecoratedDescriptor(_obj, "onEmojiSelection", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onEmojiSelection"), _obj), _applyDecoratedDescriptor(_obj, "onCategorySelection", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onCategorySelection"), _obj), _applyDecoratedDescriptor(_obj, "keydown", [_object.action], Object.getOwnPropertyDescriptor(_obj, "keydown"), _obj), _applyDecoratedDescriptor(_obj, "onFilterChange", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onFilterChange"), _obj), _applyDecoratedDescriptor(_obj, "handleOutsideClick", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "handleOutsideClick"), _obj)), _obj))));
  _exports.default = _default;
});