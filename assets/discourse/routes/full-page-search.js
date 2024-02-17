define("discourse/routes/full-page-search", ["exports", "discourse/lib/search", "discourse/lib/page-tracker", "discourse/routes/discourse", "I18n", "discourse/lib/preload-store", "discourse/lib/ajax", "discourse/lib/utilities", "@ember/object"], function (_exports, _search, _pageTracker, _discourse, _I18n, _preloadStore, _ajax, _utilities, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/search",0,"discourse/lib/page-tracker",0,"discourse/routes/discourse",0,"I18n",0,"discourse/lib/preload-store",0,"discourse/lib/ajax",0,"discourse/lib/utilities",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    queryParams: {
      q: {},
      expanded: false,
      context_id: {},
      context: {},
      skip_context: {}
    },
    category: null,
    titleToken() {
      return _I18n.default.t("search.results_page", {
        term: (0, _utilities.escapeExpression)(this.controllerFor("full-page-search").get("searchTerm"))
      });
    },
    model(params) {
      const cached = (0, _pageTracker.getTransient)("lastSearch");
      let args = {
        q: params.q
      };
      if (params.context_id && !args.skip_context) {
        args.search_context = {
          type: params.context,
          id: params.context_id
        };
      }
      const searchKey = (0, _search.getSearchKey)(args);
      if (cached && cached.data.searchKey === searchKey) {
        // extend expiry
        (0, _pageTracker.setTransient)("lastSearch", {
          searchKey,
          model: cached.data.model
        }, 5);
        return cached.data.model;
      }
      return _preloadStore.default.getAndRemove("search", () => {
        if ((0, _search.isValidSearchTerm)(params.q, this.siteSettings)) {
          return (0, _ajax.ajax)("/search", {
            data: args
          });
        } else {
          return null;
        }
      }).then(async results => {
        const model = results && (await (0, _search.translateResults)(results)) || {};
        (0, _pageTracker.setTransient)("lastSearch", {
          searchKey,
          model
        }, 5);
        return model;
      });
    },
    didTransition() {
      this.controllerFor("full-page-search")._afterTransition();
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  _exports.default = _default;
});