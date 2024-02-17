define("discourse/components/categories-topic-list", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div role="heading" aria-level="2" class="table-heading">
    {{i18n (concat "filters." this.filter ".title")}}
    <PluginOutlet
      @name="categories-topics-table-heading"
      @connectorTagName="div"
    />
  </div>
  
  {{#if this.topics}}
    {{#each this.topics as |t|}}
      <LatestTopicListItem @topic={{t}} />
    {{/each}}
    <div class="more-topics">
      {{#if
        (eq
          this.siteSettings.desktop_category_page_style
          "categories_and_latest_topics_created_date"
        )
      }}
        <a
          href={{get-url (concat "/" this.filter "?order=created")}}
          class="btn btn-default pull-right"
        >{{i18n "more"}}</a>
      {{else}}
        <a
          href={{get-url (concat "/" this.filter)}}
          class="btn btn-default pull-right"
        >{{i18n "more"}}</a>
      {{/if}}
    </div>
  {{else}}
    <div class="no-topics">
      <h3>{{i18n (concat "topics.none." this.filter)}}</h3>
    </div>
  {{/if}}
  */
  {
    "id": "ejrbR/Xn",
    "block": "[[[10,0],[14,\"role\",\"heading\"],[14,\"aria-level\",\"2\"],[14,0,\"table-heading\"],[12],[1,\"\\n  \"],[1,[28,[35,0],[[28,[37,1],[\"filters.\",[30,0,[\"filter\"]],\".title\"],null]],null]],[1,\"\\n  \"],[8,[39,2],null,[[\"@name\",\"@connectorTagName\"],[\"categories-topics-table-heading\",\"div\"]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"topics\"]],[[[42,[28,[37,5],[[28,[37,5],[[30,0,[\"topics\"]]],null]],null],null,[[[1,\"    \"],[8,[39,6],null,[[\"@topic\"],[[30,1]]],null],[1,\"\\n\"]],[1]],null],[1,\"  \"],[10,0],[14,0,\"more-topics\"],[12],[1,\"\\n\"],[41,[28,[37,7],[[30,0,[\"siteSettings\",\"desktop_category_page_style\"]],\"categories_and_latest_topics_created_date\"],null],[[[1,\"      \"],[10,3],[15,6,[28,[37,8],[[28,[37,1],[\"/\",[30,0,[\"filter\"]],\"?order=created\"],null]],null]],[14,0,\"btn btn-default pull-right\"],[12],[1,[28,[35,0],[\"more\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,3],[15,6,[28,[37,8],[[28,[37,1],[\"/\",[30,0,[\"filter\"]]],null]],null]],[14,0,\"btn btn-default pull-right\"],[12],[1,[28,[35,0],[\"more\"],null]],[13],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"no-topics\"],[12],[1,\"\\n    \"],[10,\"h3\"],[12],[1,[28,[35,0],[[28,[37,1],[\"topics.none.\",[30,0,[\"filter\"]]],null]],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[\"t\"],false,[\"i18n\",\"concat\",\"plugin-outlet\",\"if\",\"each\",\"-track-array\",\"latest-topic-list-item\",\"eq\",\"get-url\"]]",
    "moduleName": "discourse/components/categories-topic-list.hbs",
    "isStrictMode": false
  });
  // Exists so plugins can use it
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend());
  _exports.default = _default;
});