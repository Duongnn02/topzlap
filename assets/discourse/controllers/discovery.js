define("discourse/controllers/discovery", ["exports", "@ember/controller", "@ember/object/computed", "@ember/object", "discourse/models/category", "discourse-common/utils/decorators", "discourse/lib/url", "@ember/service"], function (_exports, _controller, _computed, _object, _category, _decorators, _url, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object/computed",0,"@ember/object",0,"discourse/models/category",0,"discourse-common/utils/decorators",0,"discourse/lib/url",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("router.currentRouteName", "router.currentRoute.queryParams.f", "site.show_welcome_topic_banner"), (_obj = {
    discoveryTopics: (0, _controller.inject)("discovery/topics"),
    navigationCategory: (0, _controller.inject)("navigation/category"),
    application: (0, _controller.inject)(),
    router: (0, _service.inject)(),
    viewingCategoriesList: (0, _computed.equal)("router.currentRouteName", "discovery.categories"),
    loading: false,
    category: (0, _computed.alias)("navigationCategory.category"),
    noSubcategories: (0, _computed.alias)("navigationCategory.noSubcategories"),
    loadedAllItems: (0, _computed.not)("discoveryTopics.model.canLoadMore"),
    showEditWelcomeTopicBanner(currentRouteName, hasParams, showWelcomeTopicBanner) {
      return this.currentUser?.staff && currentRouteName === "discovery.latest" && showWelcomeTopicBanner && !hasParams;
    },
    loadingBegan() {
      this.set("loading", true);
      this.set("application.showFooter", false);
    },
    loadingComplete() {
      this.set("loading", false);
      this.set("application.showFooter", this.loadedAllItems);
    },
    showMoreUrl(period) {
      let url = "",
        category = this.category;
      if (category) {
        url = `/c/${_category.default.slugFor(category)}/${category.id}${this.noSubcategories ? "/none" : ""}/l`;
      }
      url += "/top";
      const urlSearchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(this.router.currentRoute.queryParams)) {
        if (typeof value !== "undefined") {
          urlSearchParams.set(key, value);
        }
      }
      urlSearchParams.set("period", period);
      return `${url}?${urlSearchParams.toString()}`;
    },
    actions: {
      changePeriod(p) {
        _url.default.routeTo(this.showMoreUrl(p));
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "showEditWelcomeTopicBanner", [_dec], Object.getOwnPropertyDescriptor(_obj, "showEditWelcomeTopicBanner"), _obj), _applyDecoratedDescriptor(_obj, "loadingBegan", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadingBegan"), _obj), _applyDecoratedDescriptor(_obj, "loadingComplete", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadingComplete"), _obj)), _obj)));
  _exports.default = _default;
});