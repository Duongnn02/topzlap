define("discourse/components/subcategories-with-featured-topics", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each this.categories as |category|}}
    <table class="category-list subcategory-list with-topics">
      <thead>
        <tr>
          <th class="parent-category">
            <CategoryTitleLink @category={{category}} />
            <span class="stat" title={{category.statTitle}}>{{html-safe
                category.stat
              }}</span>
          </th>
          <th class="topics">{{i18n "categories.topics"}}</th>
          <th class="latest">{{i18n "categories.latest"}}</th>
        </tr>
      </thead>
      <tbody aria-labelledby="categories-only-category">
        {{#each category.subcategories as |subCategory|}}
          <ParentCategoryRow @category={{subCategory}} @showTopics={{true}} />
        {{else}}
          {{! No subcategories... so just show the parent to avoid confusion }}
          <ParentCategoryRow @category={{category}} @showTopics={{true}} />
        {{/each}}
      </tbody>
    </table>
  {{/each}}
  */
  {
    "id": "MHVOjDO9",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,0,[\"categories\"]]],null]],null],null,[[[1,\"  \"],[10,\"table\"],[14,0,\"category-list subcategory-list with-topics\"],[12],[1,\"\\n    \"],[10,\"thead\"],[12],[1,\"\\n      \"],[10,\"tr\"],[12],[1,\"\\n        \"],[10,\"th\"],[14,0,\"parent-category\"],[12],[1,\"\\n          \"],[8,[39,2],null,[[\"@category\"],[[30,1]]],null],[1,\"\\n          \"],[10,1],[14,0,\"stat\"],[15,\"title\",[30,1,[\"statTitle\"]]],[12],[1,[28,[35,3],[[30,1,[\"stat\"]]],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"th\"],[14,0,\"topics\"],[12],[1,[28,[35,4],[\"categories.topics\"],null]],[13],[1,\"\\n        \"],[10,\"th\"],[14,0,\"latest\"],[12],[1,[28,[35,4],[\"categories.latest\"],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"tbody\"],[14,\"aria-labelledby\",\"categories-only-category\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,1,[\"subcategories\"]]],null]],null],null,[[[1,\"        \"],[8,[39,5],null,[[\"@category\",\"@showTopics\"],[[30,2],true]],null],[1,\"\\n\"]],[2]],[[[1,\"        \"],[8,[39,5],null,[[\"@category\",\"@showTopics\"],[[30,1],true]],null],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[1]],null]],[\"category\",\"subCategory\"],false,[\"each\",\"-track-array\",\"category-title-link\",\"html-safe\",\"i18n\",\"parent-category-row\"]]",
    "moduleName": "discourse/components/subcategories-with-featured-topics.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});