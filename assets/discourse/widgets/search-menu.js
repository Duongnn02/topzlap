define("discourse/widgets/search-menu", ["exports", "discourse/lib/search", "discourse/lib/url", "discourse/widgets/widget", "discourse-common/lib/debounce", "discourse-common/lib/get-url", "virtual-dom", "discourse-common/lib/icon-library", "discourse/lib/utilities", "discourse/lib/ajax-error", "rsvp", "discourse/lib/category-tag-search", "discourse/lib/user-search", "discourse/lib/autocomplete", "@ember/runloop", "I18n"], function (_exports, _search, _url, _widget, _debounce, _getUrl, _virtualDom, _iconLibrary, _utilities, _ajaxError, _rsvp, _categoryTagSearch, _userSearch, _autocomplete, _runloop, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.MODIFIER_REGEXP = _exports.DEFAULT_TYPE_FILTER = void 0;
  _exports.initSearchData = initSearchData;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/search",0,"discourse/lib/url",0,"discourse/widgets/widget",0,"discourse-common/lib/debounce",0,"discourse-common/lib/get-url",0,"virtual-dom",0,"discourse-common/lib/icon-library",0,"discourse/lib/utilities",0,"discourse/lib/ajax-error",0,"rsvp",0,"discourse/lib/category-tag-search",0,"discourse/lib/user-search",0,"discourse/lib/autocomplete",0,"@ember/runloop",0,"I18n"eaimeta@70e063a35619d71f
  const CATEGORY_SLUG_REGEXP = /(\#[a-zA-Z0-9\-:]*)$/gi;
  const USERNAME_REGEXP = /(\@[a-zA-Z0-9\-\_]*)$/gi;
  const SUGGESTIONS_REGEXP = /(in:|status:|order:|:)([a-zA-Z]*)$/gi;
  const SECOND_ENTER_MAX_DELAY = 15000;
  const MODIFIER_REGEXP = /.*(\#|\@|:).*$/gi;
  _exports.MODIFIER_REGEXP = MODIFIER_REGEXP;
  const DEFAULT_TYPE_FILTER = "exclude_topics";
  _exports.DEFAULT_TYPE_FILTER = DEFAULT_TYPE_FILTER;
  const searchData = {};
  function initSearchData() {
    searchData.loading = false;
    searchData.results = {};
    searchData.noResults = false;
    searchData.term = undefined;
    searchData.typeFilter = DEFAULT_TYPE_FILTER;
    searchData.invalidTerm = false;
    searchData.suggestionResults = [];
    searchData.suggestionKeyword = false;
  }
  initSearchData();

  // Helps with debouncing and cancelling promises
  const SearchHelper = {
    _activeSearch: null,
    // for cancelling debounced search
    cancel() {
      if (this._activeSearch) {
        this._activeSearch.abort();
        this._activeSearch = null;
      }
    },
    perform(widget) {
      this.cancel();
      const {
        term,
        typeFilter
      } = searchData;
      const searchContext = widget.searchContext();
      const fullSearchUrl = widget.fullSearchUrl();
      const matchSuggestions = this.matchesSuggestions();
      if (matchSuggestions) {
        searchData.noResults = true;
        searchData.results = {};
        searchData.loading = false;
        searchData.suggestionResults = [];
        if (matchSuggestions.type === "category") {
          const categorySearchTerm = matchSuggestions.categoriesMatch[0].replace("#", "");
          const categoryTagSearch = (0, _categoryTagSearch.search)(categorySearchTerm, widget.siteSettings);
          _rsvp.Promise.resolve(categoryTagSearch).then(results => {
            if (results !== _autocomplete.CANCELLED_STATUS) {
              searchData.suggestionResults = results;
              searchData.suggestionKeyword = "#";
            }
            widget.scheduleRerender();
          });
        } else if (matchSuggestions.type === "username") {
          const userSearchTerm = matchSuggestions.usernamesMatch[0].replace("@", "");
          const opts = {
            includeGroups: true,
            limit: 6
          };
          if (userSearchTerm.length > 0) {
            opts.term = userSearchTerm;
          } else {
            opts.lastSeenUsers = true;
          }
          (0, _userSearch.default)(opts).then(result => {
            if (result?.users?.length > 0) {
              searchData.suggestionResults = result.users;
              searchData.suggestionKeyword = "@";
            } else {
              searchData.noResults = true;
              searchData.suggestionKeyword = false;
            }
            widget.scheduleRerender();
          });
        } else {
          searchData.suggestionKeyword = matchSuggestions[0];
          widget.scheduleRerender();
        }
        return;
      }
      searchData.suggestionKeyword = false;
      if (!term) {
        searchData.noResults = false;
        searchData.results = {};
        searchData.loading = false;
        searchData.invalidTerm = false;
        widget.scheduleRerender();
      } else if (!(0, _search.isValidSearchTerm)(term, widget.siteSettings)) {
        searchData.noResults = true;
        searchData.results = {};
        searchData.loading = false;
        searchData.invalidTerm = true;
        widget.scheduleRerender();
      } else {
        searchData.invalidTerm = false;
        this._activeSearch = (0, _search.searchForTerm)(term, {
          typeFilter,
          fullSearchUrl,
          searchContext
        });
        this._activeSearch.then(results => {
          // we ensure the current search term is the one used
          // when starting the query
          if (results && term === searchData.term) {
            if (searchContext) {
              widget.appEvents.trigger("post-stream:refresh", {
                force: true
              });
            }
            searchData.noResults = results.resultTypes.length === 0;
            searchData.results = results;
          }
        }).catch(_ajaxError.popupAjaxError).finally(() => {
          searchData.loading = false;
          widget.scheduleRerender();
        });
      }
    },
    matchesSuggestions() {
      if (searchData.term === undefined || this.includesTopics()) {
        return false;
      }
      const term = searchData.term.trim();
      const categoriesMatch = term.match(CATEGORY_SLUG_REGEXP);
      if (categoriesMatch) {
        return {
          type: "category",
          categoriesMatch
        };
      }
      const usernamesMatch = term.match(USERNAME_REGEXP);
      if (usernamesMatch) {
        return {
          type: "username",
          usernamesMatch
        };
      }
      const suggestionsMatch = term.match(SUGGESTIONS_REGEXP);
      if (suggestionsMatch) {
        return suggestionsMatch;
      }
      return false;
    },
    includesTopics() {
      return searchData.typeFilter !== DEFAULT_TYPE_FILTER;
    }
  };
  var _default = (0, _widget.createWidget)("search-menu", {
    tagName: "div.search-menu",
    services: ["search"],
    searchData,
    buildAttributes() {
      return {
        "aria-live": "polite"
      };
    },
    buildKey: () => "search-menu",
    defaultState(attrs) {
      return {
        inTopicContext: attrs.inTopicContext,
        inPMInboxContext: this.search?.searchContext?.type === "private_messages",
        _lastEnterTimestamp: null,
        _debouncer: null
      };
    },
    fullSearchUrl(opts) {
      let url = "/search";
      const params = [];
      if (searchData.term) {
        let query = "";
        query += `q=${encodeURIComponent(searchData.term)}`;
        const searchContext = this.searchContext();
        if (searchContext?.type === "topic") {
          query += encodeURIComponent(` topic:${searchContext.id}`);
        } else if (searchContext?.type === "private_messages") {
          query += encodeURIComponent(` in:messages`);
        }
        if (query) {
          params.push(query);
        }
      }
      if (opts && opts.expanded) {
        params.push("expanded=true");
      }
      if (params.length > 0) {
        url = `${url}?${params.join("&")}`;
      }
      return (0, _getUrl.default)(url);
    },
    panelContents() {
      let searchInput = [];
      if (this.state.inTopicContext) {
        searchInput.push(this.attach("button", {
          icon: "times",
          label: "search.in_this_topic",
          title: "search.in_this_topic_tooltip",
          className: "btn btn-small search-context",
          action: "clearTopicContext",
          iconRight: true
        }));
      } else if (this.state.inPMInboxContext) {
        searchInput.push(this.attach("button", {
          icon: "times",
          label: "search.in_messages",
          title: "search.in_messages_tooltip",
          className: "btn btn-small search-context",
          action: "clearPMInboxContext",
          iconRight: true
        }));
      }
      searchInput.push(this.attach("search-term", {
        value: searchData.term
      }));
      if (searchData.loading) {
        searchInput.push((0, _virtualDom.h)("div.searching", (0, _virtualDom.h)("div.spinner")));
      } else {
        const clearButton = this.attach("link", {
          title: "search.clear_search",
          action: "clearSearch",
          className: "clear-search",
          contents: () => (0, _iconLibrary.iconNode)("times")
        });
        const advancedSearchButton = this.attach("link", {
          href: this.fullSearchUrl({
            expanded: true
          }),
          contents: () => (0, _iconLibrary.iconNode)("sliders-h"),
          className: "show-advanced-search",
          title: "search.open_advanced"
        });
        if (searchData.term) {
          searchInput.push((0, _virtualDom.h)("div.searching", [clearButton, advancedSearchButton]));
        } else {
          searchInput.push((0, _virtualDom.h)("div.searching", advancedSearchButton));
        }
      }
      const results = [(0, _virtualDom.h)("div.search-input", searchInput)];
      if (this.state.inTopicContext && (!SearchHelper.includesTopics() || !searchData.term)) {
        const isMobileDevice = this.site.isMobileDevice;
        if (!isMobileDevice) {
          results.push(this.attach("browser-search-tip"));
        }
        return results;
      }
      if (!searchData.loading) {
        results.push(this.attach("search-menu-results", {
          term: searchData.term,
          noResults: searchData.noResults,
          results: searchData.results,
          invalidTerm: searchData.invalidTerm,
          suggestionKeyword: searchData.suggestionKeyword,
          suggestionResults: searchData.suggestionResults,
          searchTopics: SearchHelper.includesTopics(),
          inPMInboxContext: this.state.inPMInboxContext
        }));
      }
      return results;
    },
    clearSearch() {
      searchData.term = "";
      const searchInput = document.getElementById("search-term");
      searchInput.value = "";
      searchInput.focus();
      this.triggerSearch();
    },
    html(attrs, state) {
      if (attrs.inTopicContext === false) {
        state.inTopicContext = false;
      }
      return this.attach("menu-panel", {
        maxWidth: 500,
        contents: () => this.panelContents()
      });
    },
    mouseDown(e) {
      if (e.target === document.querySelector("input#search-term")) {
        this.state.inputSelectionEvent = true;
      }
    },
    clickOutside() {
      if (this.key === "search-menu" && !this.state.inputSelectionEvent) {
        this.sendWidgetAction("toggleSearchMenu");
      }
      this.state.inputSelectionEvent = false;
    },
    clearTopicContext() {
      this.sendWidgetAction("clearContext");
    },
    clearPMInboxContext() {
      this.state.inPMInboxContext = false;
      this.sendWidgetAction("focusSearchInput");
    },
    keyDown(e) {
      if (e.key === "Escape") {
        this.sendWidgetAction("toggleSearchMenu");
        document.querySelector("#search-button").focus();
        e.preventDefault();
        return false;
      }
      if (searchData.loading) {
        return;
      }
      if (e.which === 65 /* a */) {
        if (document.activeElement?.classList.contains("search-link")) {
          if (document.querySelector("#reply-control.open")) {
            // add a link and focus composer

            this.appEvents.trigger("composer:insert-text", document.activeElement.href, {
              ensureSpace: true
            });
            this.appEvents.trigger("header:keyboard-trigger", {
              type: "search"
            });
            e.preventDefault();
            document.querySelector("#reply-control.open textarea").focus();
            return false;
          }
        }
      }
      const up = e.key === "ArrowUp";
      const down = e.key === "ArrowDown";
      if (up || down) {
        let focused = document.activeElement.closest(".search-menu") ? document.activeElement : null;
        if (!focused) {
          return;
        }
        let links = document.querySelectorAll(".search-menu .results a");
        let results = document.querySelectorAll(".search-menu .results .search-link");
        if (!results.length) {
          return;
        }
        let prevResult;
        let result;
        links.forEach(item => {
          if (item.classList.contains("search-link")) {
            prevResult = item;
          }
          if (item === focused) {
            result = prevResult;
          }
        });
        let index = -1;
        if (result) {
          index = Array.prototype.indexOf.call(results, result);
        }
        if (index === -1 && down) {
          document.querySelector(".search-menu .results .search-link").focus();
        } else if (index === 0 && up) {
          document.querySelector(".search-menu input#search-term").focus();
        } else if (index > -1) {
          index += down ? 1 : -1;
          if (index >= 0 && index < results.length) {
            results[index].focus();
          }
        }
        e.preventDefault();
        return false;
      }
      const searchInput = document.querySelector("#search-term");
      if (e.key === "Enter" && e.target === searchInput) {
        const recentEnterHit = this.state._lastEnterTimestamp && Date.now() - this.state._lastEnterTimestamp < SECOND_ENTER_MAX_DELAY;

        // same combination as key-enter-escape mixin
        if (e.ctrlKey || e.metaKey || (0, _utilities.isiPad)() && e.altKey || searchData.typeFilter !== DEFAULT_TYPE_FILTER && recentEnterHit) {
          this.fullSearch();
        } else {
          searchData.typeFilter = null;
          this.triggerSearch();
        }
        this.state._lastEnterTimestamp = Date.now();
      }
      if (e.target === searchInput && e.key === "Backspace") {
        if (!searchInput.value) {
          this.clearTopicContext();
          this.clearPMInboxContext();
        }
      }
    },
    triggerSearch() {
      searchData.noResults = false;
      if (SearchHelper.includesTopics()) {
        if (this.state.inTopicContext) {
          this.search.set("highlightTerm", searchData.term);
        }
        searchData.loading = true;
        (0, _runloop.cancel)(this.state._debouncer);
        SearchHelper.perform(this);
        if (this.currentUser) {
          (0, _search.updateRecentSearches)(this.currentUser, searchData.term);
        }
      } else {
        searchData.loading = false;
        if (!this.state.inTopicContext) {
          this.state._debouncer = (0, _debounce.default)(SearchHelper, SearchHelper.perform, this, 400);
        }
      }
    },
    moreOfType(type) {
      searchData.typeFilter = type;
      this.triggerSearch();
    },
    searchTermChanged(term) {
      let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      searchData.typeFilter = opts.searchTopics ? null : DEFAULT_TYPE_FILTER;
      searchData.term = term;
      this.triggerSearch();
    },
    triggerAutocomplete() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (opts.setTopicContext) {
        this.sendWidgetAction("setTopicContext");
        this.state.inTopicContext = true;
      }
      this.searchTermChanged(opts.value, {
        searchTopics: opts.searchTopics
      });
    },
    fullSearch() {
      searchData.loading = false;
      SearchHelper.cancel();
      const url = this.fullSearchUrl();
      if (url) {
        this.sendWidgetEvent("linkClicked");
        _url.default.routeTo(url);
      }
    },
    searchContext() {
      if (this.state.inTopicContext || this.state.inPMInboxContext) {
        return this.search.searchContext;
      }
      return false;
    }
  });
  _exports.default = _default;
  (0, _widget.createWidget)("browser-search-tip", {
    buildKey: () => "browser-search-tip",
    tagName: "div.browser-search-tip",
    html() {
      return [(0, _virtualDom.h)("span.tip-label", _I18n.default.t("search.browser_tip", {
        modifier: (0, _utilities.translateModKey)("Meta")
      })), (0, _virtualDom.h)("span.tip-description", _I18n.default.t("search.browser_tip_description"))];
    }
  });
});