define("discourse/components/bread-crumbs", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/lib/deprecated", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _component, _templateFactory, _deprecated, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/lib/deprecated",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <PluginOutlet
    @name="bread-crumbs-left"
    @connectorTagName="li"
    @outletArgs={{hash
      tagId=this.tag.id
      additionalTags=this.additionalTags
      noSubcategories=this.noSubcategories
      showTagsSection=this.showTagsSection
      currentCategory=this.category
      categoryBreadcrumbs=this.categoryBreadcrumbs
      editingCategory=this.editingCategory
      editingCategoryTab=this.editingCategoryTab
    }}
  />
  
  {{#each this.categoryBreadcrumbs as |breadcrumb|}}
    {{#if breadcrumb.hasOptions}}
      <li>
        <CategoryDrop
          @category={{breadcrumb.category}}
          @categories={{breadcrumb.options}}
          @tagId={{this.tag.id}}
          @editingCategory={{this.editingCategory}}
          @editingCategoryTab={{this.editingCategoryTab}}
          @options={{hash
            parentCategory=breadcrumb.parentCategory
            subCategory=breadcrumb.isSubcategory
            noSubcategories=breadcrumb.noSubcategories
            autoFilterable=true
          }}
        />
      </li>
    {{/if}}
  {{/each}}
  
  {{#if this.showTagsSection}}
    {{#if this.additionalTags}}
      <li>
        <TagsIntersectionChooser
          @currentCategory={{this.category}}
          @mainTag={{this.tag.id}}
          @additionalTags={{this.additionalTags}}
          @options={{hash categoryId=this.category.id}}
        />
      </li>
    {{else}}
      <li>
        <TagDrop
          @currentCategory={{this.category}}
          @noSubcategories={{this.noSubcategories}}
          @tagId={{this.tag.id}}
        />
      </li>
    {{/if}}
  {{/if}}
  
  <PluginOutlet
    @name="bread-crumbs-right"
    @connectorTagName="li"
    @outletArgs={{hash
      tagId=this.tag.id
      additionalTags=this.additionalTags
      noSubcategories=this.noSubcategories
      showTagsSection=this.showTagsSection
      currentCategory=this.category
      categoryBreadcrumbs=this.categoryBreadcrumbs
      editingCategory=this.editingCategory
      editingCategoryTab=this.editingCategoryTab
    }}
  />
  */
  {
    "id": "ur1UC+sG",
    "block": "[[[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"bread-crumbs-left\",\"li\",[28,[37,1],null,[[\"tagId\",\"additionalTags\",\"noSubcategories\",\"showTagsSection\",\"currentCategory\",\"categoryBreadcrumbs\",\"editingCategory\",\"editingCategoryTab\"],[[30,0,[\"tag\",\"id\"]],[30,0,[\"additionalTags\"]],[30,0,[\"noSubcategories\"]],[30,0,[\"showTagsSection\"]],[30,0,[\"category\"]],[30,0,[\"categoryBreadcrumbs\"]],[30,0,[\"editingCategory\"]],[30,0,[\"editingCategoryTab\"]]]]]]],null],[1,\"\\n\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"categoryBreadcrumbs\"]]],null]],null],null,[[[41,[30,1,[\"hasOptions\"]],[[[1,\"    \"],[10,\"li\"],[12],[1,\"\\n      \"],[8,[39,5],null,[[\"@category\",\"@categories\",\"@tagId\",\"@editingCategory\",\"@editingCategoryTab\",\"@options\"],[[30,1,[\"category\"]],[30,1,[\"options\"]],[30,0,[\"tag\",\"id\"]],[30,0,[\"editingCategory\"]],[30,0,[\"editingCategoryTab\"]],[28,[37,1],null,[[\"parentCategory\",\"subCategory\",\"noSubcategories\",\"autoFilterable\"],[[30,1,[\"parentCategory\"]],[30,1,[\"isSubcategory\"]],[30,1,[\"noSubcategories\"]],true]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[1]],null],[1,\"\\n\"],[41,[30,0,[\"showTagsSection\"]],[[[41,[30,0,[\"additionalTags\"]],[[[1,\"    \"],[10,\"li\"],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@currentCategory\",\"@mainTag\",\"@additionalTags\",\"@options\"],[[30,0,[\"category\"]],[30,0,[\"tag\",\"id\"]],[30,0,[\"additionalTags\"]],[28,[37,1],null,[[\"categoryId\"],[[30,0,[\"category\",\"id\"]]]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,\"li\"],[12],[1,\"\\n      \"],[8,[39,7],null,[[\"@currentCategory\",\"@noSubcategories\",\"@tagId\"],[[30,0,[\"category\"]],[30,0,[\"noSubcategories\"]],[30,0,[\"tag\",\"id\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]]],[]],null],[1,\"\\n\"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"bread-crumbs-right\",\"li\",[28,[37,1],null,[[\"tagId\",\"additionalTags\",\"noSubcategories\",\"showTagsSection\",\"currentCategory\",\"categoryBreadcrumbs\",\"editingCategory\",\"editingCategoryTab\"],[[30,0,[\"tag\",\"id\"]],[30,0,[\"additionalTags\"]],[30,0,[\"noSubcategories\"]],[30,0,[\"showTagsSection\"]],[30,0,[\"category\"]],[30,0,[\"categoryBreadcrumbs\"]],[30,0,[\"editingCategory\"]],[30,0,[\"editingCategoryTab\"]]]]]]],null]],[\"breadcrumb\"],false,[\"plugin-outlet\",\"hash\",\"each\",\"-track-array\",\"if\",\"category-drop\",\"tags-intersection-chooser\",\"tag-drop\"]]",
    "moduleName": "discourse/components/bread-crumbs.hbs",
    "isStrictMode": false
  });
  //  A breadcrumb including category drop downs
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("categories"), _dec2 = (0, _decorators.default)("category.ancestors", "filteredCategories", "noSubcategories"), _dec3 = (0, _decorators.default)("siteSettings.tagging_enabled", "editingCategory"), _dec4 = (0, _decorators.default)("category"), _dec5 = (0, _decorators.default)("parentCategories"), _dec6 = (0, _decorators.default)("category"), _dec7 = (0, _decorators.default)("category", "parentCategory"), _dec8 = (0, _decorators.default)("category", "parentCategory"), _dec9 = (0, _decorators.default)("firstCategory", "hideSubcategories"), (_obj = {
    classNameBindings: ["hidden:hidden", ":category-breadcrumb"],
    tagName: "ol",
    editingCategory: false,
    editingCategoryTab: null,
    filteredCategories(categories) {
      return categories.filter(category => this.siteSettings.allow_uncategorized_topics || category.id !== this.site.uncategorized_category_id);
    },
    categoryBreadcrumbs(categoryAncestors, filteredCategories, noSubcategories) {
      categoryAncestors = categoryAncestors || [];
      const parentCategories = [undefined, ...categoryAncestors];
      const categories = [...categoryAncestors, undefined];
      const zipped = parentCategories.map((x, i) => [x, categories[i]]);
      return zipped.map(record => {
        const [parentCategory, category] = record;
        const options = filteredCategories.filter(c => c.get("parentCategory.id") === (parentCategory && parentCategory.id));
        return {
          category,
          parentCategory,
          options,
          isSubcategory: !!parentCategory,
          noSubcategories: !category && noSubcategories,
          hasOptions: options.length !== 0
        };
      });
    },
    showTagsSection(taggingEnabled, editingCategory) {
      return taggingEnabled && !editingCategory;
    },
    parentCategory(category) {
      (0, _deprecated.default)("The parentCategory property of the bread-crumbs component is deprecated", {
        id: "discourse.breadcrumbs.parentCategory"
      });
      return category && category.parentCategory;
    },
    parentCategories: (0, _computed.filter)("categories", function (c) {
      (0, _deprecated.default)("The parentCategories property of the bread-crumbs component is deprecated", {
        id: "discourse.breadcrumbs.parentCategories"
      });
      if (c.id === this.site.get("uncategorized_category_id") && !this.siteSettings.allow_uncategorized_topics) {
        // Don't show "uncategorized" if allow_uncategorized_topics setting is false.
        return false;
      }
      return !c.get("parentCategory");
    }),
    parentCategoriesSorted(parentCategories) {
      (0, _deprecated.default)("The parentCategoriesSorted property of the bread-crumbs component is deprecated", {
        id: "discourse.breadcrumbs.parentCategoriesSorted"
      });
      if (this.siteSettings.fixed_category_positions) {
        return parentCategories;
      }
      return parentCategories.sortBy("totalTopicCount").reverse();
    },
    hidden(category) {
      return this.site.mobileView && !category;
    },
    firstCategory(category, parentCategory) {
      (0, _deprecated.default)("The firstCategory property of the bread-crumbs component is deprecated", {
        id: "discourse.breadcrumbs.firstCategory"
      });
      return parentCategory || category;
    },
    secondCategory(category, parentCategory) {
      (0, _deprecated.default)("The secondCategory property of the bread-crumbs component is deprecated", {
        id: "discourse.breadcrumbs.secondCategory"
      });
      return parentCategory && category;
    },
    childCategories(firstCategory, hideSubcategories) {
      (0, _deprecated.default)("The childCategories property of the bread-crumbs component is deprecated", {
        id: "discourse.breadcrumbs.childCategories"
      });
      if (hideSubcategories) {
        return [];
      }
      if (!firstCategory) {
        return [];
      }
      return this.categories.filter(c => c.get("parentCategory") === firstCategory);
    }
  }, (_applyDecoratedDescriptor(_obj, "filteredCategories", [_dec], Object.getOwnPropertyDescriptor(_obj, "filteredCategories"), _obj), _applyDecoratedDescriptor(_obj, "categoryBreadcrumbs", [_dec2], Object.getOwnPropertyDescriptor(_obj, "categoryBreadcrumbs"), _obj), _applyDecoratedDescriptor(_obj, "showTagsSection", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showTagsSection"), _obj), _applyDecoratedDescriptor(_obj, "parentCategory", [_dec4], Object.getOwnPropertyDescriptor(_obj, "parentCategory"), _obj), _applyDecoratedDescriptor(_obj, "parentCategoriesSorted", [_dec5], Object.getOwnPropertyDescriptor(_obj, "parentCategoriesSorted"), _obj), _applyDecoratedDescriptor(_obj, "hidden", [_dec6], Object.getOwnPropertyDescriptor(_obj, "hidden"), _obj), _applyDecoratedDescriptor(_obj, "firstCategory", [_dec7], Object.getOwnPropertyDescriptor(_obj, "firstCategory"), _obj), _applyDecoratedDescriptor(_obj, "secondCategory", [_dec8], Object.getOwnPropertyDescriptor(_obj, "secondCategory"), _obj), _applyDecoratedDescriptor(_obj, "childCategories", [_dec9], Object.getOwnPropertyDescriptor(_obj, "childCategories"), _obj)), _obj))));
  _exports.default = _default;
});