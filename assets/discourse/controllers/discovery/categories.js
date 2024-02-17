define("discourse/controllers/discovery/categories", ["exports", "discourse/controllers/discovery", "@ember/controller", "@ember/object", "@ember/string", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _discovery, _controller, _object, _string, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/controllers/discovery",0,"@ember/controller",0,"@ember/object",0,"@ember/string",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const subcategoryStyleComponentNames = {
    rows: "categories_only",
    rows_with_featured_topics: "categories_with_featured_topics",
    boxes: "categories_boxes",
    boxes_with_featured_topics: "categories_boxes_with_topics"
  };
  const mobileCompatibleViews = ["categories_with_featured_topics", "subcategories_with_featured_topics"];
  var _default = _discovery.default.extend((_dec = (0, _decorators.default)("model.parentCategory"), (_obj = {
    discovery: (0, _controller.inject)(),
    // this makes sure the composer isn't scoping to a specific category
    category: null,
    canEdit: (0, _computed.reads)("currentUser.staff"),
    isCategoriesRoute() {
      return this.router.currentRouteName === "discovery.categories";
    },
    categoryPageStyle(parentCategory) {
      let style = this.siteSettings.desktop_category_page_style;
      if (this.site.mobileView && !mobileCompatibleViews.includes(style)) {
        style = mobileCompatibleViews[0];
      }
      if (parentCategory) {
        style = subcategoryStyleComponentNames[parentCategory.get("subcategory_list_style")] || style;
      }
      const componentName = parentCategory && (style === "categories_and_latest_topics" || style === "categories_and_latest_topics_created_date") ? "categories_only" : style;
      return (0, _string.dasherize)(componentName);
    },
    showInserted(event) {
      event?.preventDefault();
      const tracker = this.topicTrackingState;
      // Move inserted into topics
      this.model.loadBefore(tracker.get("newIncoming"), true);
      tracker.resetTracking();
    },
    actions: {
      refresh() {
        this.send("triggerRefresh");
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "isCategoriesRoute", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "isCategoriesRoute"), _obj), _applyDecoratedDescriptor(_obj, "categoryPageStyle", [_dec], Object.getOwnPropertyDescriptor(_obj, "categoryPageStyle"), _obj), _applyDecoratedDescriptor(_obj, "showInserted", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showInserted"), _obj)), _obj)));
  _exports.default = _default;
});