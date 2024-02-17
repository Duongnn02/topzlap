define("discourse/models/site", ["exports", "@ember/object", "@ember/object/computed", "discourse/models/archetype", "discourse/models/category", "discourse/models/post-action-type", "discourse/lib/preload-store", "discourse/models/rest", "discourse/mixins/singleton", "discourse/models/trust-level", "discourse-common/lib/deprecated", "discourse-common/utils/decorators", "discourse-common/lib/get-owner", "@ember/utils", "@ember/template"], function (_exports, _object, _computed, _archetype, _category, _postActionType, _preloadStore, _rest, _singleton, _trustLevel, _deprecated, _decorators, _getOwner, _utils, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/object/computed",0,"discourse/models/archetype",0,"discourse/models/category",0,"discourse/models/post-action-type",0,"discourse/lib/preload-store",0,"discourse/models/rest",0,"discourse/mixins/singleton",0,"discourse/models/trust-level",0,"discourse-common/lib/deprecated",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-owner",0,"@ember/utils",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const Site = _rest.default.extend((_dec = (0, _decorators.default)("notification_types"), _dec2 = (0, _decorators.default)("post_action_types.[]"), _dec3 = (0, _decorators.default)("categoriesByCount", "categories.[]"), _dec4 = (0, _decorators.default)("categories.[]"), _dec5 = (0, _decorators.default)("categories.[]", "categories.@each.notification_level"), (_obj = {
    isReadOnly: (0, _computed.alias)("is_readonly"),
    init() {
      this._super(...arguments);
      this.topicCountDesc = ["topic_count:desc"];
    },
    notificationLookup(notificationTypes) {
      const result = [];
      Object.keys(notificationTypes).forEach(k => result[notificationTypes[k]] = k);
      return result;
    },
    flagTypes() {
      const postActionTypes = this.post_action_types;
      if (!postActionTypes) {
        return [];
      }
      return postActionTypes.filterBy("is_flag", true);
    },
    categoriesByCount: (0, _computed.sort)("categories", "topicCountDesc"),
    collectUserFields(fields) {
      fields = fields || {};
      let siteFields = this.user_fields;
      if (!(0, _utils.isEmpty)(siteFields)) {
        return siteFields.map(f => {
          let value = fields ? fields[f.id.toString()] : null;
          value = value || (0, _template.htmlSafe)("&mdash;");
          return {
            name: f.name,
            value
          };
        });
      }
      return [];
    },
    sortedCategories(categories) {
      return _category.default.sortCategories(categories);
    },
    categoriesList(categories) {
      return this.siteSettings.fixed_category_positions ? categories : this.sortedCategories;
    },
    trackedCategoriesList(categories) {
      const trackedCategories = [];
      for (const category of categories) {
        if (category.isTracked) {
          if (this.siteSettings.allow_uncategorized_topics || !category.isUncategorizedCategory) {
            trackedCategories.push(category);
          }
        }
      }
      return trackedCategories;
    },
    postActionTypeById(id) {
      return this.get("postActionByIdLookup.action" + id);
    },
    topicFlagTypeById(id) {
      return this.get("topicFlagByIdLookup.action" + id);
    },
    removeCategory(id) {
      const categories = this.categories;
      const existingCategory = categories.findBy("id", id);
      if (existingCategory) {
        categories.removeObject(existingCategory);
        delete this.categoriesById.categoryId;
      }
    },
    updateCategory(newCategory) {
      const categories = this.categories;
      const categoryId = (0, _object.get)(newCategory, "id");
      const existingCategory = categories.findBy("id", categoryId);

      // Don't update null permissions
      if (newCategory.permission === null) {
        delete newCategory.permission;
      }
      if (existingCategory) {
        existingCategory.setProperties(newCategory);
        return existingCategory;
      } else {
        // TODO insert in right order?
        newCategory = this.store.createRecord("category", newCategory);
        categories.pushObject(newCategory);
        this.categoriesById[categoryId] = newCategory;
        return newCategory;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "notificationLookup", [_dec], Object.getOwnPropertyDescriptor(_obj, "notificationLookup"), _obj), _applyDecoratedDescriptor(_obj, "flagTypes", [_dec2], Object.getOwnPropertyDescriptor(_obj, "flagTypes"), _obj), _applyDecoratedDescriptor(_obj, "sortedCategories", [_dec3], Object.getOwnPropertyDescriptor(_obj, "sortedCategories"), _obj), _applyDecoratedDescriptor(_obj, "categoriesList", [_dec4], Object.getOwnPropertyDescriptor(_obj, "categoriesList"), _obj), _applyDecoratedDescriptor(_obj, "trackedCategoriesList", [_dec5], Object.getOwnPropertyDescriptor(_obj, "trackedCategoriesList"), _obj)), _obj)));
  Site.reopenClass(_singleton.default, {
    // The current singleton will retrieve its attributes from the `PreloadStore`.
    createCurrent() {
      const store = (0, _getOwner.getOwner)(this).lookup("service:store");
      const siteAttributes = _preloadStore.default.get("site");
      siteAttributes["isReadOnly"] = _preloadStore.default.get("isReadOnly");
      siteAttributes["isStaffWritesOnly"] = _preloadStore.default.get("isStaffWritesOnly");
      return store.createRecord("site", siteAttributes);
    },
    create() {
      const result = this._super.apply(this, arguments);
      const store = result.store;
      if (result.categories) {
        let subcatMap = {};
        result.categoriesById = new Map();
        result.categories = result.categories.map(c => {
          if (c.parent_category_id) {
            subcatMap[c.parent_category_id] = subcatMap[c.parent_category_id] || [];
            subcatMap[c.parent_category_id].push(c.id);
          }
          return result.categoriesById[c.id] = store.createRecord("category", c);
        });

        // Associate the categories with their parents
        result.categories.forEach(c => {
          let subcategoryIds = subcatMap[c.get("id")];
          if (subcategoryIds) {
            c.set("subcategories", subcategoryIds.map(id => result.categoriesById[id]));
          }
          if (c.get("parent_category_id")) {
            c.set("parentCategory", result.categoriesById[c.get("parent_category_id")]);
          }
        });
      }
      if (result.trust_levels) {
        result.trustLevels = Object.entries(result.trust_levels).map(_ref => {
          let [key, id] = _ref;
          return new _trustLevel.default(id, key);
        });
        delete result.trust_levels;
      }
      if (result.post_action_types) {
        result.postActionByIdLookup = _object.default.create();
        result.post_action_types = result.post_action_types.map(p => {
          const actionType = _postActionType.default.create(p);
          result.postActionByIdLookup.set("action" + p.id, actionType);
          return actionType;
        });
      }
      if (result.topic_flag_types) {
        result.topicFlagByIdLookup = _object.default.create();
        result.topic_flag_types = result.topic_flag_types.map(p => {
          const actionType = _postActionType.default.create(p);
          result.topicFlagByIdLookup.set("action" + p.id, actionType);
          return actionType;
        });
      }
      if (result.archetypes) {
        result.archetypes = result.archetypes.map(a => {
          a.site = result;
          return _archetype.default.create(a);
        });
      }
      if (result.user_fields) {
        result.user_fields = result.user_fields.map(uf => _object.default.create(uf));
      }
      return result;
    }
  });
  if (typeof Discourse !== "undefined") {
    let warned = false;
    // eslint-disable-next-line no-undef
    Object.defineProperty(Discourse, "Site", {
      get() {
        if (!warned) {
          (0, _deprecated.default)("Import the Site class instead of using Discourse.Site", {
            since: "2.4.0",
            id: "discourse.globals.site"
          });
          warned = true;
        }
        return Site;
      }
    });
  }
  var _default = Site;
  _exports.default = _default;
});