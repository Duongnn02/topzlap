define("discourse/models/category-list", ["exports", "@ember/array/proxy", "discourse/models/category", "I18n", "discourse/lib/preload-store", "discourse/models/site", "discourse/models/topic", "discourse/lib/ajax", "discourse/lib/formatter"], function (_exports, _proxy, _category, _I18n, _preloadStore, _site, _topic, _ajax, _formatter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/array/proxy",0,"discourse/models/category",0,"I18n",0,"discourse/lib/preload-store",0,"discourse/models/site",0,"discourse/models/topic",0,"discourse/lib/ajax",0,"discourse/lib/formatter"eaimeta@70e063a35619d71f
  const CategoryList = _proxy.default.extend({
    init() {
      this.set("content", []);
      this._super(...arguments);
    }
  });
  CategoryList.reopenClass({
    categoriesFrom(store, result) {
      const categories = CategoryList.create();
      const list = _category.default.list();
      let statPeriod = "all";
      const minCategories = result.category_list.categories.length * 0.66;
      ["week", "month"].some(period => {
        const filteredCategories = result.category_list.categories.filter(c => c[`topics_${period}`] > 0);
        if (filteredCategories.length >= minCategories) {
          statPeriod = period;
          return true;
        }
      });
      result.category_list.categories.forEach(c => categories.pushObject(this._buildCategoryResult(c, list, statPeriod)));
      return categories;
    },
    _buildCategoryResult(c, list, statPeriod) {
      if (c.parent_category_id) {
        c.parentCategory = list.findBy("id", c.parent_category_id);
      }
      if (c.subcategory_list) {
        c.subcategories = c.subcategory_list.map(subCategory => this._buildCategoryResult(subCategory, list, statPeriod));
      } else if (c.subcategory_ids) {
        c.subcategories = c.subcategory_ids.map(scid => list.findBy("id", parseInt(scid, 10)));
      }
      if (c.topics) {
        c.topics = c.topics.map(t => _topic.default.create(t));
      }
      switch (statPeriod) {
        case "week":
        case "month":
          const stat = c[`topics_${statPeriod}`];
          if (stat > 0) {
            const unit = _I18n.default.t(`categories.topic_stat_unit.${statPeriod}`);
            c.stat = _I18n.default.t("categories.topic_stat", {
              count: stat,
              // only used to correctly pluralize the string
              number: `<span class="value">${(0, _formatter.number)(stat)}</span>`,
              unit: `<span class="unit">${unit}</span>`
            });
            c.statTitle = _I18n.default.t(`categories.topic_stat_sentence_${statPeriod}`, {
              count: stat
            });
            c.pickAll = false;
            break;
          }
        default:
          c.stat = `<span class="value">${(0, _formatter.number)(c.topics_all_time)}</span>`;
          c.statTitle = _I18n.default.t("categories.topic_sentence", {
            count: c.topics_all_time
          });
          c.pickAll = true;
          break;
      }
      if (_site.default.currentProp("mobileView")) {
        c.statTotal = _I18n.default.t("categories.topic_stat_all_time", {
          count: c.topics_all_time,
          number: `<span class="value">${(0, _formatter.number)(c.topics_all_time)}</span>`
        });
      }
      const record = _site.default.current().updateCategory(c);
      record.setupGroupsAndPermissions();
      return record;
    },
    listForParent(store, category) {
      return (0, _ajax.ajax)(`/categories.json?parent_category_id=${category.get("id")}`).then(result => {
        return CategoryList.create({
          categories: this.categoriesFrom(store, result),
          parentCategory: category
        });
      });
    },
    list(store) {
      const getCategories = () => (0, _ajax.ajax)("/categories.json");
      return _preloadStore.default.getAndRemove("categories_list", getCategories).then(result => {
        return CategoryList.create({
          categories: this.categoriesFrom(store, result),
          can_create_category: result.category_list.can_create_category,
          can_create_topic: result.category_list.can_create_topic
        });
      });
    }
  });
  var _default = CategoryList;
  _exports.default = _default;
});