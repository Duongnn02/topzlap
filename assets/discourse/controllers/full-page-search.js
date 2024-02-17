define("discourse/controllers/full-page-search", ["exports", "@ember/controller", "discourse-common/utils/decorators", "discourse/lib/search", "discourse/models/category", "discourse/models/composer", "I18n", "discourse/lib/ajax", "discourse/lib/utilities", "@ember/utils", "@ember/object", "@ember/object/computed", "discourse/mixins/scroll-top", "discourse/lib/page-tracker", "rsvp", "discourse/lib/category-tag-search", "discourse/lib/show-modal", "discourse/lib/user-search", "@ember/service"], function (_exports, _controller, _decorators, _search, _category, _composer, _I18n, _ajax, _utilities, _utils, _object, _computed, _scrollTop, _pageTracker, _rsvp, _categoryTagSearch, _showModal, _userSearch, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.SEARCH_TYPE_USERS = _exports.SEARCH_TYPE_DEFAULT = _exports.SEARCH_TYPE_CATS_TAGS = void 0;
  _exports.registerFullPageSearchType = registerFullPageSearchType;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse-common/utils/decorators",0,"discourse/lib/search",0,"discourse/models/category",0,"discourse/models/composer",0,"I18n",0,"discourse/lib/ajax",0,"discourse/lib/utilities",0,"@ember/utils",0,"@ember/object",0,"@ember/object/computed",0,"discourse/mixins/scroll-top",0,"discourse/lib/page-tracker",0,"rsvp",0,"discourse/lib/category-tag-search",0,"discourse/lib/show-modal",0,"discourse/lib/user-search",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const SortOrders = [{
    name: _I18n.default.t("search.relevance"),
    id: 0
  }, {
    name: _I18n.default.t("search.latest_post"),
    id: 1,
    term: "order:latest"
  }, {
    name: _I18n.default.t("search.most_liked"),
    id: 2,
    term: "order:likes"
  }, {
    name: _I18n.default.t("search.most_viewed"),
    id: 3,
    term: "order:views"
  }, {
    name: _I18n.default.t("search.latest_topic"),
    id: 4,
    term: "order:latest_topic"
  }];
  const SEARCH_TYPE_DEFAULT = "topics_posts";
  _exports.SEARCH_TYPE_DEFAULT = SEARCH_TYPE_DEFAULT;
  const SEARCH_TYPE_CATS_TAGS = "categories_tags";
  _exports.SEARCH_TYPE_CATS_TAGS = SEARCH_TYPE_CATS_TAGS;
  const SEARCH_TYPE_USERS = "users";
  _exports.SEARCH_TYPE_USERS = SEARCH_TYPE_USERS;
  const PAGE_LIMIT = 10;
  const customSearchTypes = [];
  function registerFullPageSearchType(translationKey, searchTypeId, searchFunc) {
    customSearchTypes.push({
      translationKey,
      searchTypeId,
      searchFunc
    });
  }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("resultCount"), _dec2 = (0, _decorators.default)("expanded"), _dec3 = (0, _decorators.default)("q"), _dec4 = (0, _decorators.default)("q"), _dec5 = (0, _decorators.default)("skip_context", "context"), _dec6 = (0, _decorators.default)("context", "context_id"), _dec7 = (0, _decorators.default)("q"), _dec8 = (0, _decorators.default)("q"), _dec9 = (0, _decorators.default)("canCreateTopic", "siteSettings.login_required"), _dec10 = (0, _decorators.observes)("sortOrder"), _dec11 = (0, _decorators.observes)("search_type"), _dec12 = (0, _decorators.observes)("model"), _dec13 = (0, _decorators.default)("q"), _dec14 = (0, _decorators.observes)("q"), _dec15 = (0, _decorators.default)("q"), _dec16 = (0, _decorators.observes)("loading"), _dec17 = (0, _decorators.default)("resultCount", "noSortQ"), _dec18 = (0, _decorators.observes)("model.[posts,categories,tags,users].length"), _dec19 = (0, _decorators.default)("hasResults"), _dec20 = (0, _decorators.default)("selected.length", "model.posts.length"), _dec21 = (0, _decorators.default)("model.grouped_search_result.can_create_topic"), _dec22 = (0, _decorators.default)("page"), _dec23 = (0, _decorators.default)("search_type"), _dec24 = (0, _decorators.default)("search_type"), _dec25 = (0, _decorators.default)("bulkSelectEnabled"), (_obj = {
    application: (0, _controller.inject)(),
    composer: (0, _service.inject)(),
    bulkSelectEnabled: null,
    loading: false,
    queryParams: ["q", "expanded", "context_id", "context", "skip_context", "search_type"],
    q: undefined,
    context_id: null,
    search_type: SEARCH_TYPE_DEFAULT,
    context: null,
    searching: false,
    sortOrder: 0,
    sortOrders: SortOrders,
    invalidSearch: false,
    page: 1,
    resultCount: null,
    searchTypes: null,
    selected: [],
    error: null,
    init() {
      this._super(...arguments);
      const searchTypes = [{
        name: _I18n.default.t("search.type.default"),
        id: SEARCH_TYPE_DEFAULT
      }, {
        name: this.siteSettings.tagging_enabled ? _I18n.default.t("search.type.categories_and_tags") : _I18n.default.t("search.type.categories"),
        id: SEARCH_TYPE_CATS_TAGS
      }, {
        name: _I18n.default.t("search.type.users"),
        id: SEARCH_TYPE_USERS
      }];
      customSearchTypes.forEach(type => {
        searchTypes.push({
          name: _I18n.default.t(type.translationKey),
          id: type.searchTypeId
        });
      });
      this.set("searchTypes", searchTypes);
    },
    hasResults(resultCount) {
      return (resultCount || 0) > 0;
    },
    expandFilters(expanded) {
      return expanded === "true";
    },
    hasAutofocus(q) {
      return (0, _utils.isEmpty)(q);
    },
    highlightQuery(q) {
      if (!q) {
        return;
      }
      return q.split(/\s+/).filter(t => t !== "l").join(" ");
    },
    searchContextEnabled: {
      get(skip, context) {
        return !skip && context || skip === "false";
      },
      set(val) {
        this.set("skip_context", val ? "false" : "true");
      }
    },
    searchContextDescription(context, id) {
      let name = id;
      if (context === "category") {
        let category = _category.default.findById(id);
        if (!category) {
          return;
        }
        name = category.get("name");
      }
      return (0, _search.searchContextDescription)(context, name);
    },
    searchActive(q) {
      return (0, _search.isValidSearchTerm)(q, this.siteSettings);
    },
    noSortQ(q) {
      q = this.cleanTerm(q);
      return (0, _utilities.escapeExpression)(q);
    },
    showSuggestion(canCreateTopic, loginRequired) {
      return canCreateTopic || !loginRequired;
    },
    _searchOnSortChange: true,
    setSearchTerm(term) {
      this._searchOnSortChange = false;
      term = this.cleanTerm(term);
      this._searchOnSortChange = true;
      this.set("searchTerm", term);
    },
    cleanTerm(term) {
      if (term) {
        SortOrders.forEach(order => {
          if (order.term) {
            let matches = term.match(new RegExp(`${order.term}\\b`));
            if (matches) {
              this.set("sortOrder", order.id);
              term = term.replace(new RegExp(`${order.term}\\b`, "g"), "");
              term = term.trim();
            }
          }
        });
      }
      return term;
    },
    triggerSearch() {
      if (this._searchOnSortChange) {
        this.set("page", 1);
        this._search();
      }
    },
    triggerSearchOnTypeChange() {
      if (this.searchActive) {
        this.set("page", 1);
        this._search();
      }
    },
    modelChanged() {
      if (this.searchTerm !== this.q) {
        this.setSearchTerm(this.q);
      }
    },
    showLikeCount(q) {
      return q?.includes("order:likes");
    },
    qChanged() {
      const model = this.model;
      if (model && this.get("model.q") !== this.q) {
        this.setSearchTerm(this.q);
        this.send("search");
      }
    },
    isPrivateMessage(q) {
      return q && this.currentUser && (q.includes("in:messages") || q.includes("in:personal") || q.includes(`personal_messages:${this.currentUser.get("username_lower")}`));
    },
    _showFooter() {
      this.set("application.showFooter", !this.loading);
    },
    resultCountLabel(count, term) {
      const plus = count % 50 === 0 ? "+" : "";
      return _I18n.default.t("search.result_count", {
        count,
        plus,
        term
      });
    },
    resultCountChanged() {
      if (!this.model.posts) {
        return 0;
      }
      this.set("resultCount", this.model.posts.length + this.model.categories.length + this.model.tags.length + this.model.users.length);
    },
    canBulkSelect(hasResults) {
      return this.currentUser && this.currentUser.staff && hasResults;
    },
    hasSelection: (0, _computed.gt)("selected.length", 0),
    hasUnselectedResults(selectionCount, postsCount) {
      return selectionCount < postsCount;
    },
    canCreateTopic(userCanCreateTopic) {
      return this.currentUser && userCanCreateTopic;
    },
    isLastPage(page) {
      return page === PAGE_LIMIT;
    },
    usingDefaultSearchType(searchType) {
      return searchType === SEARCH_TYPE_DEFAULT;
    },
    customSearchType(searchType) {
      return customSearchTypes.find(type => searchType === type["searchTypeId"]);
    },
    searchInfoClassNames(bulkSelectEnabled) {
      return bulkSelectEnabled ? "search-info bulk-select-visible" : "search-info";
    },
    searchButtonDisabled: (0, _computed.or)("searching", "loading"),
    _search() {
      if (this.searching) {
        return;
      }
      this.set("invalidSearch", false);
      const searchTerm = this.searchTerm;
      if (!(0, _search.isValidSearchTerm)(searchTerm, this.siteSettings)) {
        this.set("invalidSearch", true);
        return;
      }
      let args = {
        q: searchTerm,
        page: this.page
      };
      if (args.page === 1) {
        this.set("bulkSelectEnabled", false);
        this.selected.clear();
        this.set("searching", true);
        (0, _scrollTop.scrollTop)();
      } else {
        this.set("loading", true);
      }
      const sortOrder = this.sortOrder;
      if (sortOrder && SortOrders[sortOrder].term) {
        args.q += " " + SortOrders[sortOrder].term;
      }
      this.set("q", args.q);
      const skip = this.skip_context;
      if (!skip && this.context || skip === "false") {
        args.search_context = {
          type: this.context,
          id: this.context_id
        };
      }
      const searchKey = (0, _search.getSearchKey)(args);
      if (this.customSearchType) {
        const customSearch = this.customSearchType["searchFunc"];
        customSearch(this, args, searchKey);
        return;
      }
      switch (this.search_type) {
        case SEARCH_TYPE_CATS_TAGS:
          const categoryTagSearch = (0, _categoryTagSearch.search)(searchTerm, this.siteSettings);
          _rsvp.Promise.resolve(categoryTagSearch).then(async results => {
            const categories = results.filter(c => Boolean(c.model));
            const tags = results.filter(c => !Boolean(c.model));
            const model = (await (0, _search.translateResults)({
              categories,
              tags
            })) || {};
            this.set("model", model);
          }).finally(() => {
            this.setProperties({
              searching: false,
              loading: false
            });
          });
          break;
        case SEARCH_TYPE_USERS:
          (0, _userSearch.default)({
            term: searchTerm,
            limit: 20
          }).then(async results => {
            const model = (await (0, _search.translateResults)({
              users: results
            })) || {};
            this.set("model", model);
          }).finally(() => {
            this.setProperties({
              searching: false,
              loading: false
            });
          });
          break;
        default:
          if (this.currentUser) {
            (0, _search.updateRecentSearches)(this.currentUser, searchTerm);
          }
          (0, _ajax.ajax)("/search", {
            data: args
          }).then(async results => {
            const model = (await (0, _search.translateResults)(results)) || {};
            if (results.grouped_search_result) {
              this.set("q", results.grouped_search_result.term);
            }
            if (args.page > 1) {
              if (model) {
                this.model.posts.pushObjects(model.posts);
                this.model.topics.pushObjects(model.topics);
                this.model.set("grouped_search_result", results.grouped_search_result);
              }
            } else {
              (0, _pageTracker.setTransient)("lastSearch", {
                searchKey,
                model
              }, 5);
              model.grouped_search_result = results.grouped_search_result;
              this.set("model", model);
            }
            this.set("error", null);
          }).catch(e => {
            this.set("error", e.jqXHR.responseJSON?.message);
          }).finally(() => {
            this.setProperties({
              searching: false,
              loading: false
            });
          });
          break;
      }
    },
    _afterTransition() {
      this._showFooter();
      if (Object.keys(this.model).length === 0) {
        this.reset();
      }
    },
    reset() {
      this.setProperties({
        searching: false,
        page: 1,
        resultCount: null,
        selected: []
      });
    },
    createTopic(searchTerm, event) {
      event?.preventDefault();
      let topicCategory;
      if (searchTerm.includes("category:")) {
        const match = searchTerm.match(/category:(\S*)/);
        if (match && match[1]) {
          topicCategory = match[1];
        }
      }
      this.composer.open({
        action: _composer.default.CREATE_TOPIC,
        draftKey: _composer.default.NEW_TOPIC_KEY,
        topicCategory
      });
    },
    actions: {
      selectAll() {
        this.selected.addObjects(this.get("model.posts").mapBy("topic"));

        // Doing this the proper way is a HUGE pain,
        // we can hack this to work by observing each on the array
        // in the component, however, when we select ANYTHING, we would force
        // 50 traversals of the list
        // This hack is cheap and easy
        document.querySelectorAll(".fps-result input[type=checkbox]").forEach(checkbox => {
          checkbox.checked = true;
        });
      },
      clearAll() {
        this.selected.clear();
        document.querySelectorAll(".fps-result input[type=checkbox]").forEach(checkbox => {
          checkbox.checked = false;
        });
      },
      toggleBulkSelect() {
        this.toggleProperty("bulkSelectEnabled");
        this.selected.clear();
      },
      showBulkActions() {
        const modalController = (0, _showModal.default)("topic-bulk-actions", {
          model: {
            topics: this.selected
          },
          title: "topics.bulk.actions"
        });
        modalController.set("refreshClosure", () => this._search());
      },
      search() {
        let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (options.collapseFilters) {
          document.querySelector("details.advanced-filters")?.removeAttribute("open");
        }
        this.set("page", 1);
        this._search();
      },
      loadMore() {
        let page = this.page;
        if (this.get("model.grouped_search_result.more_full_page_results") && !this.loading && page < PAGE_LIMIT) {
          this.incrementProperty("page");
          this._search();
        }
      },
      logClick(topicId) {
        if (this.get("model.grouped_search_result.search_log_id") && topicId) {
          (0, _search.logSearchLinkClick)({
            searchLogId: this.get("model.grouped_search_result.search_log_id"),
            searchResultId: topicId,
            searchResultType: "topic"
          });
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "hasResults", [_dec], Object.getOwnPropertyDescriptor(_obj, "hasResults"), _obj), _applyDecoratedDescriptor(_obj, "expandFilters", [_dec2], Object.getOwnPropertyDescriptor(_obj, "expandFilters"), _obj), _applyDecoratedDescriptor(_obj, "hasAutofocus", [_dec3], Object.getOwnPropertyDescriptor(_obj, "hasAutofocus"), _obj), _applyDecoratedDescriptor(_obj, "highlightQuery", [_dec4], Object.getOwnPropertyDescriptor(_obj, "highlightQuery"), _obj), _applyDecoratedDescriptor(_obj, "searchContextEnabled", [_dec5], (_init = Object.getOwnPropertyDescriptor(_obj, "searchContextEnabled"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "searchContextDescription", [_dec6], Object.getOwnPropertyDescriptor(_obj, "searchContextDescription"), _obj), _applyDecoratedDescriptor(_obj, "searchActive", [_dec7], Object.getOwnPropertyDescriptor(_obj, "searchActive"), _obj), _applyDecoratedDescriptor(_obj, "noSortQ", [_dec8], Object.getOwnPropertyDescriptor(_obj, "noSortQ"), _obj), _applyDecoratedDescriptor(_obj, "showSuggestion", [_dec9], Object.getOwnPropertyDescriptor(_obj, "showSuggestion"), _obj), _applyDecoratedDescriptor(_obj, "triggerSearch", [_dec10], Object.getOwnPropertyDescriptor(_obj, "triggerSearch"), _obj), _applyDecoratedDescriptor(_obj, "triggerSearchOnTypeChange", [_dec11], Object.getOwnPropertyDescriptor(_obj, "triggerSearchOnTypeChange"), _obj), _applyDecoratedDescriptor(_obj, "modelChanged", [_dec12], Object.getOwnPropertyDescriptor(_obj, "modelChanged"), _obj), _applyDecoratedDescriptor(_obj, "showLikeCount", [_dec13], Object.getOwnPropertyDescriptor(_obj, "showLikeCount"), _obj), _applyDecoratedDescriptor(_obj, "qChanged", [_dec14], Object.getOwnPropertyDescriptor(_obj, "qChanged"), _obj), _applyDecoratedDescriptor(_obj, "isPrivateMessage", [_dec15], Object.getOwnPropertyDescriptor(_obj, "isPrivateMessage"), _obj), _applyDecoratedDescriptor(_obj, "_showFooter", [_dec16], Object.getOwnPropertyDescriptor(_obj, "_showFooter"), _obj), _applyDecoratedDescriptor(_obj, "resultCountLabel", [_dec17], Object.getOwnPropertyDescriptor(_obj, "resultCountLabel"), _obj), _applyDecoratedDescriptor(_obj, "resultCountChanged", [_dec18], Object.getOwnPropertyDescriptor(_obj, "resultCountChanged"), _obj), _applyDecoratedDescriptor(_obj, "canBulkSelect", [_dec19], Object.getOwnPropertyDescriptor(_obj, "canBulkSelect"), _obj), _applyDecoratedDescriptor(_obj, "hasUnselectedResults", [_dec20], Object.getOwnPropertyDescriptor(_obj, "hasUnselectedResults"), _obj), _applyDecoratedDescriptor(_obj, "canCreateTopic", [_dec21], Object.getOwnPropertyDescriptor(_obj, "canCreateTopic"), _obj), _applyDecoratedDescriptor(_obj, "isLastPage", [_dec22], Object.getOwnPropertyDescriptor(_obj, "isLastPage"), _obj), _applyDecoratedDescriptor(_obj, "usingDefaultSearchType", [_dec23], Object.getOwnPropertyDescriptor(_obj, "usingDefaultSearchType"), _obj), _applyDecoratedDescriptor(_obj, "customSearchType", [_dec24], Object.getOwnPropertyDescriptor(_obj, "customSearchType"), _obj), _applyDecoratedDescriptor(_obj, "searchInfoClassNames", [_dec25], Object.getOwnPropertyDescriptor(_obj, "searchInfoClassNames"), _obj), _applyDecoratedDescriptor(_obj, "createTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "createTopic"), _obj)), _obj)));
  _exports.default = _default;
});