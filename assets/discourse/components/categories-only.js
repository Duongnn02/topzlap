define("discourse/components/categories-only", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _component, _templateFactory, _object, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.categories}}
    {{#if this.filteredCategories}}
      <table class="category-list {{if this.showTopics 'with-topics'}}">
        <thead>
          <tr>
            <th class="category"><span
                role="heading"
                aria-level="2"
                id="categories-only-category"
              >{{i18n "categories.category"}}</span></th>
            <th class="topics">{{i18n "categories.topics"}}</th>
            {{#if this.showTopics}}
              <th class="latest">{{i18n "categories.latest"}}</th>
            {{/if}}
          </tr>
        </thead>
        <tbody aria-labelledby="categories-only-category">
          {{#each this.categories as |category|}}
            <ParentCategoryRow
              @category={{category}}
              @showTopics={{this.showTopics}}
            />
          {{/each}}
        </tbody>
      </table>
    {{/if}}
  
    {{#if this.mutedCategories}}
      <div class="muted-categories">
        <a href class="muted-categories-link" {{on "click" this.toggleShowMuted}}>
          <h3 class="muted-categories-heading">{{i18n "categories.muted"}}</h3>
          {{#if this.mutedToggleIcon}}
            {{d-icon this.mutedToggleIcon}}
          {{/if}}
        </a>
        <table
          class="category-list
            {{if this.showTopics 'with-topics'}}
            {{unless this.showMutedCategories 'hidden'}}"
        >
          <thead>
            <tr>
              <th class="category"><span
                  role="heading"
                  aria-level="2"
                  id="categories-only-category-muted"
                >{{i18n "categories.category"}}</span></th>
              <th class="topics">{{i18n "categories.topics"}}</th>
              {{#if this.showTopics}}
                <th class="latest">{{i18n "categories.latest"}}</th>
              {{/if}}
            </tr>
          </thead>
          <tbody aria-labelledby="categories-only-category-muted">
            {{#each this.categories as |category|}}
              <ParentCategoryRow
                @category={{category}}
                @showTopics={{this.showTopics}}
                @listType="muted"
              />
            {{/each}}
          </tbody>
        </table>
      </div>
    {{/if}}
  {{/if}}
  
  <PluginOutlet
    @name="below-categories-only"
    @connectorTagName="div"
    @outletArgs={{hash categories=this.categories showTopics=this.showTopics}}
  />
  */
  {
    "id": "VErhlOHv",
    "block": "[[[41,[30,0,[\"categories\"]],[[[41,[30,0,[\"filteredCategories\"]],[[[1,\"    \"],[10,\"table\"],[15,0,[29,[\"category-list \",[52,[30,0,[\"showTopics\"]],\"with-topics\"]]]],[12],[1,\"\\n      \"],[10,\"thead\"],[12],[1,\"\\n        \"],[10,\"tr\"],[12],[1,\"\\n          \"],[10,\"th\"],[14,0,\"category\"],[12],[10,1],[14,\"role\",\"heading\"],[14,\"aria-level\",\"2\"],[14,1,\"categories-only-category\"],[12],[1,[28,[35,1],[\"categories.category\"],null]],[13],[13],[1,\"\\n          \"],[10,\"th\"],[14,0,\"topics\"],[12],[1,[28,[35,1],[\"categories.topics\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"showTopics\"]],[[[1,\"            \"],[10,\"th\"],[14,0,\"latest\"],[12],[1,[28,[35,1],[\"categories.latest\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"tbody\"],[14,\"aria-labelledby\",\"categories-only-category\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"categories\"]]],null]],null],null,[[[1,\"          \"],[8,[39,4],null,[[\"@category\",\"@showTopics\"],[[30,1],[30,0,[\"showTopics\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"mutedCategories\"]],[[[1,\"    \"],[10,0],[14,0,\"muted-categories\"],[12],[1,\"\\n      \"],[11,3],[24,6,\"\"],[24,0,\"muted-categories-link\"],[4,[38,5],[\"click\",[30,0,[\"toggleShowMuted\"]]],null],[12],[1,\"\\n        \"],[10,\"h3\"],[14,0,\"muted-categories-heading\"],[12],[1,[28,[35,1],[\"categories.muted\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"mutedToggleIcon\"]],[[[1,\"          \"],[1,[28,[35,6],[[30,0,[\"mutedToggleIcon\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n      \"],[10,\"table\"],[15,0,[29,[\"category-list\\n          \",[52,[30,0,[\"showTopics\"]],\"with-topics\"],\"\\n          \",[52,[51,[30,0,[\"showMutedCategories\"]]],\"hidden\"]]]],[12],[1,\"\\n        \"],[10,\"thead\"],[12],[1,\"\\n          \"],[10,\"tr\"],[12],[1,\"\\n            \"],[10,\"th\"],[14,0,\"category\"],[12],[10,1],[14,\"role\",\"heading\"],[14,\"aria-level\",\"2\"],[14,1,\"categories-only-category-muted\"],[12],[1,[28,[35,1],[\"categories.category\"],null]],[13],[13],[1,\"\\n            \"],[10,\"th\"],[14,0,\"topics\"],[12],[1,[28,[35,1],[\"categories.topics\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"showTopics\"]],[[[1,\"              \"],[10,\"th\"],[14,0,\"latest\"],[12],[1,[28,[35,1],[\"categories.latest\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"tbody\"],[14,\"aria-labelledby\",\"categories-only-category-muted\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"categories\"]]],null]],null],null,[[[1,\"            \"],[8,[39,4],null,[[\"@category\",\"@showTopics\",\"@listType\"],[[30,2],[30,0,[\"showTopics\"]],\"muted\"]],null],[1,\"\\n\"]],[2]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n\"],[8,[39,8],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"below-categories-only\",\"div\",[28,[37,9],null,[[\"categories\",\"showTopics\"],[[30,0,[\"categories\"]],[30,0,[\"showTopics\"]]]]]]],null]],[\"category\",\"category\"],false,[\"if\",\"i18n\",\"each\",\"-track-array\",\"parent-category-row\",\"on\",\"d-icon\",\"unless\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/components/categories-only.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("showMutedCategories", "filteredCategories.length"), _dec2 = (0, _decorators.default)("showMuted", "filteredCategories.length"), _dec3 = (0, _decorators.default)("categories", "categories.length"), _dec4 = (0, _decorators.default)("categories", "categories.length"), (_obj = {
    tagName: "",
    showMuted: false,
    noCategoryStyle: (0, _computed.equal)("siteSettings.category_style", "none"),
    mutedToggleIcon(showMutedCategories, filteredCategoriesLength) {
      if (filteredCategoriesLength === 0) {
        return;
      }
      if (showMutedCategories) {
        return "minus";
      }
      return "plus";
    },
    showMutedCategories(showMuted, filteredCategoriesLength) {
      return showMuted || filteredCategoriesLength === 0;
    },
    filteredCategories(categories, categoriesLength) {
      if (!categories || categoriesLength === 0) {
        return [];
      }
      return categories.filter(cat => !cat.isHidden);
    },
    mutedCategories(categories, categoriesLength) {
      if (!categories || categoriesLength === 0) {
        return [];
      }

      // hide in single category pages
      if (categories.firstObject.parent_category_id) {
        return [];
      }
      return categories.filterBy("hasMuted");
    },
    toggleShowMuted(event) {
      event?.preventDefault();
      this.toggleProperty("showMuted");
    }
  }, (_applyDecoratedDescriptor(_obj, "mutedToggleIcon", [_dec], Object.getOwnPropertyDescriptor(_obj, "mutedToggleIcon"), _obj), _applyDecoratedDescriptor(_obj, "showMutedCategories", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showMutedCategories"), _obj), _applyDecoratedDescriptor(_obj, "filteredCategories", [_dec3], Object.getOwnPropertyDescriptor(_obj, "filteredCategories"), _obj), _applyDecoratedDescriptor(_obj, "mutedCategories", [_dec4], Object.getOwnPropertyDescriptor(_obj, "mutedCategories"), _obj), _applyDecoratedDescriptor(_obj, "toggleShowMuted", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleShowMuted"), _obj)), _obj))));
  _exports.default = _default;
});