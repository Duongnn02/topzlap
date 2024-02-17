define("discourse/templates/discovery/categories", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <PluginOutlet
    @name="above-discovery-categories"
    @connectorTagName="div"
    @outletArgs={{hash
      categories=this.model.categories
      categoryPageStyle=this.categoryPageStyle
      topics=this.model.topics
    }}
  />
  
  <DiscoveryCategories @refresh={{action "refresh"}}>
    {{#if (and this.topicTrackingState.hasIncoming this.isCategoriesRoute)}}
      <div class="show-more {{if this.hasTopics 'has-topics'}}">
        <div
          role="button"
          class="alert alert-info clickable"
          {{on "click" this.showInserted}}
        >
          <CountI18n
            @key="topic_count_"
            @suffix={{this.topicTrackingState.filter}}
            @count={{this.topicTrackingState.incomingCount}}
          />
        </div>
      </div>
    {{/if}}
  
    {{#if
      (eq this.categoryPageStyle "categories-and-latest-topics-created-date")
    }}
      <CategoriesAndLatestTopics
        @categories={{this.model.categories}}
        @topics={{this.model.topics}}
      />
    {{else}}
      {{component
        this.categoryPageStyle
        categories=this.model.categories
        topics=this.model.topics
      }}
    {{/if}}
  
  </DiscoveryCategories>
  
  <PluginOutlet
    @name="below-discovery-categories"
    @connectorTagName="div"
    @outletArgs={{hash
      categories=this.model.categories
      categoryPageStyle=this.categoryPageStyle
      topics=this.model.topics
    }}
  />
  */
  {
    "id": "gRb8kYZn",
    "block": "[[[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"above-discovery-categories\",\"div\",[28,[37,1],null,[[\"categories\",\"categoryPageStyle\",\"topics\"],[[30,0,[\"model\",\"categories\"]],[30,0,[\"categoryPageStyle\"]],[30,0,[\"model\",\"topics\"]]]]]]],null],[1,\"\\n\\n\"],[8,[39,2],null,[[\"@refresh\"],[[28,[37,3],[[30,0],\"refresh\"],null]]],[[\"default\"],[[[[1,\"\\n\"],[41,[28,[37,5],[[30,0,[\"topicTrackingState\",\"hasIncoming\"]],[30,0,[\"isCategoriesRoute\"]]],null],[[[1,\"    \"],[10,0],[15,0,[29,[\"show-more \",[52,[30,0,[\"hasTopics\"]],\"has-topics\"]]]],[12],[1,\"\\n      \"],[11,0],[24,\"role\",\"button\"],[24,0,\"alert alert-info clickable\"],[4,[38,6],[\"click\",[30,0,[\"showInserted\"]]],null],[12],[1,\"\\n        \"],[8,[39,7],null,[[\"@key\",\"@suffix\",\"@count\"],[\"topic_count_\",[30,0,[\"topicTrackingState\",\"filter\"]],[30,0,[\"topicTrackingState\",\"incomingCount\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,8],[[30,0,[\"categoryPageStyle\"]],\"categories-and-latest-topics-created-date\"],null],[[[1,\"    \"],[8,[39,9],null,[[\"@categories\",\"@topics\"],[[30,0,[\"model\",\"categories\"]],[30,0,[\"model\",\"topics\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"    \"],[46,[30,0,[\"categoryPageStyle\"]],null,[[\"categories\",\"topics\"],[[30,0,[\"model\",\"categories\"]],[30,0,[\"model\",\"topics\"]]]],null],[1,\"\\n\"]],[]]],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"below-discovery-categories\",\"div\",[28,[37,1],null,[[\"categories\",\"categoryPageStyle\",\"topics\"],[[30,0,[\"model\",\"categories\"]],[30,0,[\"categoryPageStyle\"]],[30,0,[\"model\",\"topics\"]]]]]]],null]],[],false,[\"plugin-outlet\",\"hash\",\"discovery-categories\",\"action\",\"if\",\"and\",\"on\",\"count-i18n\",\"eq\",\"categories-and-latest-topics\",\"component\"]]",
    "moduleName": "discourse/templates/discovery/categories.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});