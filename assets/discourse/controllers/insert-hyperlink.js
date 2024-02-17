define("discourse/controllers/insert-hyperlink", ["exports", "@ember/runloop", "@ember/controller", "discourse/mixins/modal-functionality", "discourse-common/utils/decorators", "discourse-common/lib/debounce", "@ember/utils", "discourse/lib/url", "discourse/lib/search"], function (_exports, _runloop, _controller, _modalFunctionality, _decorators, _debounce, _utils, _url, _search) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"discourse-common/utils/decorators",0,"discourse-common/lib/debounce",0,"@ember/utils",0,"discourse/lib/url",0,"discourse/lib/search"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_obj = {
    _debounced: null,
    _activeSearch: null,
    onShow() {
      this.setProperties({
        linkUrl: "",
        linkText: "",
        searchResults: [],
        searchLoading: false,
        selectedRow: -1
      });
      (0, _runloop.schedule)("afterRender", () => {
        const element = document.querySelector(".insert-link");
        element.addEventListener("keydown", this.keyDown);
        element.closest(".modal-inner-container").addEventListener("mousedown", this.mouseDown);
      });
    },
    keyDown(event) {
      switch (event.which) {
        case 40:
          this.highlightRow(event, "down");
          break;
        case 38:
          this.highlightRow(event, "up");
          break;
        case 13:
          // override Enter behaviour when a row is selected
          if (this.selectedRow > -1) {
            const selected = document.querySelectorAll(".internal-link-results .search-link")[this.selectedRow];
            this.selectLink(selected);
            event.preventDefault();
            event.stopPropagation();
          }
          break;
        case 27:
          // Esc should cancel dropdown first
          if (this.searchResults.length) {
            this.set("searchResults", []);
            event.preventDefault();
            event.stopPropagation();
          } else {
            this.send("closeModal");
            document.querySelector(".d-editor-input")?.focus();
          }
          break;
      }
    },
    mouseDown(event) {
      if (!event.target.closest(".inputs")) {
        this.set("searchResults", []);
      }
    },
    highlightRow(e, direction) {
      const index = direction === "down" ? this.selectedRow + 1 : this.selectedRow - 1;
      if (index > -1 && index < this.searchResults.length) {
        document.querySelectorAll(".internal-link-results .search-link")[index].focus();
        this.set("selectedRow", index);
      } else {
        this.set("selectedRow", -1);
        document.querySelector("input.link-url").focus();
      }
      e.preventDefault();
    },
    selectLink(el) {
      this.setProperties({
        linkUrl: el.href,
        searchResults: [],
        selectedRow: -1
      });
      if (!this.linkText && el.dataset.title) {
        this.set("linkText", el.dataset.title);
      }
      document.querySelector("input.link-text").focus();
    },
    triggerSearch() {
      if (this.linkUrl.length > 3 && !this.linkUrl.startsWith("http")) {
        this.set("searchLoading", true);
        this._activeSearch = (0, _search.searchForTerm)(this.linkUrl, {
          typeFilter: "topic"
        });
        this._activeSearch.then(results => {
          if (results && results.topics && results.topics.length > 0) {
            this.set("searchResults", results.topics);
          } else {
            this.set("searchResults", []);
          }
        }).finally(() => {
          this.set("searchLoading", false);
          this._activeSearch = null;
        });
      } else {
        this.abortSearch();
      }
    },
    abortSearch() {
      if (this._activeSearch) {
        this._activeSearch.abort();
      }
      this.setProperties({
        searchResults: [],
        searchLoading: false
      });
    },
    onClose() {
      const element = document.querySelector(".insert-link");
      element.removeEventListener("keydown", this.keyDown);
      element.closest(".modal-inner-container").removeEventListener("mousedown", this.mouseDown);
      (0, _runloop.cancel)(this._debounced);
    },
    actions: {
      ok() {
        const origLink = this.linkUrl;
        const linkUrl = (0, _url.prefixProtocol)(origLink);
        const sel = this.toolbarEvent.selected;
        if ((0, _utils.isEmpty)(linkUrl)) {
          return;
        }
        const linkText = this.linkText || "";
        if (linkText.length) {
          this.toolbarEvent.addText(`[${linkText}](${linkUrl})`);
        } else {
          if (sel.value) {
            this.toolbarEvent.addText(`[${sel.value}](${linkUrl})`);
          } else {
            this.toolbarEvent.addText(`[${origLink}](${linkUrl})`);
            this.toolbarEvent.selectText(sel.start + 1, origLink.length);
          }
        }
        this.send("closeModal");
      },
      cancel() {
        this.send("closeModal");
      },
      linkClick(e) {
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          e.stopPropagation();
          this.selectLink(e.target.closest(".search-link"));
        }
      },
      search() {
        this._debounced = (0, _debounce.default)(this, this.triggerSearch, 400);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "keyDown", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "keyDown"), _obj), _applyDecoratedDescriptor(_obj, "mouseDown", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "mouseDown"), _obj)), _obj));
  _exports.default = _default;
});