define("select-kit/components/category-row", ["exports", "@ember/object/computed", "@ember/utils", "discourse/models/category", "select-kit/components/select-kit/select-kit-row", "discourse/helpers/category-link", "@ember/object", "select-kit/templates/components/category-row", "discourse/lib/computed", "@ember/template"], function (_exports, _computed, _utils, _category, _selectKitRow, _categoryLink, _object, _categoryRow, _computed2, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"@ember/utils",0,"discourse/models/category",0,"select-kit/components/select-kit/select-kit-row",0,"discourse/helpers/category-link",0,"@ember/object",0,"select-kit/templates/components/category-row",0,"discourse/lib/computed",0,"@ember/template"eaimeta@70e063a35619d71f
  var _default = _selectKitRow.default.extend({
    layout: _categoryRow.default,
    classNames: ["category-row"],
    hideParentCategory: (0, _computed.bool)("selectKit.options.hideParentCategory"),
    allowUncategorized: (0, _computed.bool)("selectKit.options.allowUncategorized"),
    categoryLink: (0, _computed.bool)("selectKit.options.categoryLink"),
    countSubcategories: (0, _computed.bool)("selectKit.options.countSubcategories"),
    allowUncategorizedTopics: (0, _computed2.setting)("allow_uncategorized_topics"),
    displayCategoryDescription: (0, _object.computed)("selectKit.options.displayCategoryDescription", function () {
      const option = this.selectKit.options.displayCategoryDescription;
      if ((0, _utils.isNone)(option)) {
        return true;
      }
      return option;
    }),
    title: (0, _object.computed)("categoryName", function () {
      if (this.category) {
        return this.categoryName;
      }
    }),
    categoryName: (0, _computed.reads)("category.name"),
    categoryDescriptionText: (0, _computed.reads)("category.description_text"),
    category: (0, _object.computed)("rowValue", "rowName", function () {
      if ((0, _utils.isEmpty)(this.rowValue)) {
        const uncategorized = _category.default.findUncategorized();
        if (uncategorized && uncategorized.name === this.rowName) {
          return uncategorized;
        }
      } else {
        return _category.default.findById(parseInt(this.rowValue, 10));
      }
    }),
    badgeForCategory: (0, _object.computed)("category", "parentCategory", function () {
      return (0, _template.htmlSafe)((0, _categoryLink.categoryBadgeHTML)(this.category, {
        link: this.categoryLink,
        allowUncategorized: this.allowUncategorizedTopics || this.allowUncategorized,
        hideParent: !!this.parentCategory,
        topicCount: this.topicCount
      }));
    }),
    badgeForParentCategory: (0, _object.computed)("parentCategory", function () {
      return (0, _template.htmlSafe)((0, _categoryLink.categoryBadgeHTML)(this.parentCategory, {
        link: this.categoryLink,
        allowUncategorized: this.allowUncategorizedTopics || this.allowUncategorized,
        recursive: true
      }));
    }),
    parentCategory: (0, _object.computed)("parentCategoryId", function () {
      return _category.default.findById(this.parentCategoryId);
    }),
    hasParentCategory: (0, _computed.bool)("parentCategoryId"),
    parentCategoryId: (0, _computed.reads)("category.parent_category_id"),
    categoryTotalTopicCount: (0, _computed.reads)("category.totalTopicCount"),
    categoryTopicCount: (0, _computed.reads)("category.topic_count"),
    topicCount: (0, _object.computed)("categoryTotalTopicCount", "categoryTopicCount", "countSubcategories", function () {
      return this.countSubcategories ? this.categoryTotalTopicCount : this.categoryTopicCount;
    }),
    shouldDisplayDescription: (0, _object.computed)("displayCategoryDescription", "categoryDescriptionText", function () {
      return this.displayCategoryDescription && this.categoryDescriptionText && this.categoryDescriptionText !== "null";
    }),
    descriptionText: (0, _object.computed)("categoryDescriptionText", function () {
      if (this.categoryDescriptionText) {
        return this._formatDescription(this.categoryDescriptionText);
      }
    }),
    _formatDescription(description) {
      const limit = 200;
      return `${description.slice(0, limit)}${description.length > limit ? "&hellip;" : ""}`;
    }
  });
  _exports.default = _default;
});