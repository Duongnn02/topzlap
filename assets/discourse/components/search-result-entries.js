define("discourse/components/search-result-entries", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="fps-result-entries" role="list">
    {{#each this.posts as |post|}}
      <SearchResultEntry
        @post={{post}}
        @bulkSelectEnabled={{this.bulkSelectEnabled}}
        @selected={{this.selected}}
        @highlightQuery={{this.highlightQuery}}
        @searchLogId={{this.searchLogId}}
      />
    {{/each}}
  </div>
  */
  {
    "id": "Q31gFmjo",
    "block": "[[[10,0],[14,0,\"fps-result-entries\"],[14,\"role\",\"list\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,0,[\"posts\"]]],null]],null],null,[[[1,\"    \"],[8,[39,2],null,[[\"@post\",\"@bulkSelectEnabled\",\"@selected\",\"@highlightQuery\",\"@searchLogId\"],[[30,1],[30,0,[\"bulkSelectEnabled\"]],[30,0,[\"selected\"]],[30,0,[\"highlightQuery\"]],[30,0,[\"searchLogId\"]]]],null],[1,\"\\n\"]],[1]],null],[13]],[\"post\"],false,[\"each\",\"-track-array\",\"search-result-entry\"]]",
    "moduleName": "discourse/components/search-result-entries.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: ""
  }));
  _exports.default = _default;
});