define("discourse/routes/user-activity-bookmarks", ["exports", "@ember/object", "discourse/lib/ajax", "discourse/routes/discourse", "rsvp", "I18n"], function (_exports, _object, _ajax, _discourse, _rsvp, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"discourse/lib/ajax",0,"discourse/routes/discourse",0,"rsvp",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    queryParams: {
      acting_username: {
        refreshModel: true
      },
      q: {
        refreshModel: true
      }
    },
    model(params, transition) {
      const controller = this.controllerFor("user-activity-bookmarks");
      if (this.isPoppedState(transition) && this.session.bookmarksModel && this.session.bookmarksModel.searchTerm === params.q) {
        return _rsvp.Promise.resolve(this.session.bookmarksModel);
      }
      this.session.setProperties({
        bookmarksModel: null,
        bookmarkListScrollPosition: null
      });
      controller.set("loading", true);
      return this._loadBookmarks(params).then(response => {
        if (!response.user_bookmark_list) {
          return {
            bookmarks: []
          };
        }
        const bookmarks = response.user_bookmark_list.bookmarks.map(controller.transform);
        const loadMoreUrl = response.user_bookmark_list.more_bookmarks_url;
        const model = {
          bookmarks,
          loadMoreUrl
        };
        this.session.set("bookmarksModel", model);
        return model;
      }).catch(() => controller.set("permissionDenied", true)).finally(() => controller.set("loading", false));
    },
    renderTemplate() {
      this.render("user_bookmarks");
    },
    titleToken() {
      return _I18n.default.t("user_action_groups.3");
    },
    didTransition() {
      this.controllerFor("user-activity")._showFooter();
      return true;
    },
    triggerRefresh() {
      this.refresh();
    },
    _loadBookmarks(params) {
      let url = `/u/${this.modelFor("user").username}/bookmarks.json`;
      if (params) {
        url += "?" + $.param(params);
      }
      return (0, _ajax.ajax)(url);
    }
  }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj), _applyDecoratedDescriptor(_obj, "triggerRefresh", [_object.action], Object.getOwnPropertyDescriptor(_obj, "triggerRefresh"), _obj)), _obj));
  _exports.default = _default;
});