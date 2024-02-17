define("discourse/controllers/user-activity-bookmarks", ["exports", "@ember/controller", "@ember/object", "@ember/object/computed", "discourse-common/lib/icon-library", "discourse-common/utils/decorators", "discourse/lib/ajax", "discourse/models/bookmark", "I18n", "rsvp", "@ember/template"], function (_exports, _controller, _object, _computed, _iconLibrary, _decorators, _ajax, _bookmark, _I18n, _rsvp, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@ember/object/computed",0,"discourse-common/lib/icon-library",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax",0,"discourse/models/bookmark",0,"I18n",0,"rsvp",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)(), _dec2 = (0, _decorators.default)("inSearchMode", "noContent"), _dec3 = (0, _decorators.default)("inSearchMode", "noContent"), (_obj = {
    queryParams: ["q"],
    q: null,
    application: (0, _controller.inject)(),
    user: (0, _controller.inject)(),
    loading: false,
    loadingMore: false,
    permissionDenied: false,
    inSearchMode: (0, _computed.notEmpty)("q"),
    noContent: (0, _computed.equal)("model.bookmarks.length", 0),
    searchTerm: (0, _object.computed)("q", {
      get() {
        return this.q;
      },
      set(key, value) {
        return value;
      }
    }),
    emptyStateBody() {
      return (0, _template.htmlSafe)(_I18n.default.t("user.no_bookmarks_body", {
        icon: (0, _iconLibrary.iconHTML)("bookmark")
      }));
    },
    userDoesNotHaveBookmarks(inSearchMode, noContent) {
      return !inSearchMode && noContent;
    },
    nothingFound(inSearchMode, noContent) {
      return inSearchMode && noContent;
    },
    search() {
      this.transitionToRoute({
        queryParams: {
          q: this.searchTerm
        }
      });
    },
    reload() {
      this.send("triggerRefresh");
    },
    loadMore() {
      if (this.loadingMore) {
        return _rsvp.Promise.resolve();
      }
      this.set("loadingMore", true);
      return this._loadMoreBookmarks(this.q).then(response => this._processLoadResponse(this.q, response)).catch(() => this._bookmarksListDenied()).finally(() => this.set("loadingMore", false));
    },
    _loadMoreBookmarks(searchQuery) {
      if (!this.model.loadMoreUrl) {
        return _rsvp.Promise.resolve();
      }
      let moreUrl = this.model.loadMoreUrl;
      if (searchQuery) {
        const delimiter = moreUrl.includes("?") ? "&" : "?";
        const q = encodeURIComponent(searchQuery);
        moreUrl += `${delimiter}q=${q}`;
      }
      return (0, _ajax.ajax)({
        url: moreUrl
      });
    },
    _bookmarksListDenied() {
      this.set("permissionDenied", true);
    },
    _processLoadResponse(searchTerm, response) {
      if (!response || !response.user_bookmark_list) {
        this.model.loadMoreUrl = null;
        return;
      }
      response = response.user_bookmark_list;
      this.model.searchTerm = searchTerm;
      this.model.loadMoreUrl = response.more_bookmarks_url;
      if (response.bookmarks) {
        const bookmarkModels = response.bookmarks.map(this.transform);
        this.model.bookmarks.pushObjects(bookmarkModels);
        this.session.set("bookmarksModel", this.model);
      }
    },
    transform(bookmark) {
      const bookmarkModel = _bookmark.default.create(bookmark);
      bookmarkModel.topicStatus = _object.default.create({
        closed: bookmark.closed,
        archived: bookmark.archived,
        is_warning: bookmark.is_warning,
        pinned: false,
        unpinned: false,
        invisible: bookmark.invisible
      });
      return bookmarkModel;
    }
  }, (_applyDecoratedDescriptor(_obj, "emptyStateBody", [_dec], Object.getOwnPropertyDescriptor(_obj, "emptyStateBody"), _obj), _applyDecoratedDescriptor(_obj, "userDoesNotHaveBookmarks", [_dec2], Object.getOwnPropertyDescriptor(_obj, "userDoesNotHaveBookmarks"), _obj), _applyDecoratedDescriptor(_obj, "nothingFound", [_dec3], Object.getOwnPropertyDescriptor(_obj, "nothingFound"), _obj), _applyDecoratedDescriptor(_obj, "search", [_object.action], Object.getOwnPropertyDescriptor(_obj, "search"), _obj), _applyDecoratedDescriptor(_obj, "reload", [_object.action], Object.getOwnPropertyDescriptor(_obj, "reload"), _obj), _applyDecoratedDescriptor(_obj, "loadMore", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadMore"), _obj)), _obj)));
  _exports.default = _default;
});