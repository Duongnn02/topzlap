define("discourse/components/topic-category", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.topic.isPrivateMessage}}
    {{bound-category-link this.topic.category recursive=true hideParent=true}}
  {{/unless}}
  <div class="topic-header-extra">
    {{#if this.siteSettings.tagging_enabled}}
      <div class="list-tags">
        {{discourse-tags this.topic mode="list" tags=this.topic.tags}}
      </div>
    {{/if}}
    {{#if this.siteSettings.topic_featured_link_enabled}}
      {{topic-featured-link this.topic}}
    {{/if}}
  </div>
  
  <span>
    <PluginOutlet
      @name="topic-category"
      @connectorTagName="div"
      @outletArgs={{hash topic=this.topic category=this.topic.category}}
    />
  </span>
  */
  {
    "id": "fznjOsUh",
    "block": "[[[41,[51,[30,0,[\"topic\",\"isPrivateMessage\"]]],[[[1,\"  \"],[1,[28,[35,1],[[30,0,[\"topic\",\"category\"]]],[[\"recursive\",\"hideParent\"],[true,true]]]],[1,\"\\n\"]],[]],null],[10,0],[14,0,\"topic-header-extra\"],[12],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"tagging_enabled\"]],[[[1,\"    \"],[10,0],[14,0,\"list-tags\"],[12],[1,\"\\n      \"],[1,[28,[35,3],[[30,0,[\"topic\"]]],[[\"mode\",\"tags\"],[\"list\",[30,0,[\"topic\",\"tags\"]]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"siteSettings\",\"topic_featured_link_enabled\"]],[[[1,\"    \"],[1,[28,[35,4],[[30,0,[\"topic\"]]],null]],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,5],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"topic-category\",\"div\",[28,[37,6],null,[[\"topic\",\"category\"],[[30,0,[\"topic\"]],[30,0,[\"topic\",\"category\"]]]]]]],null],[1,\"\\n\"],[13]],[],false,[\"unless\",\"bound-category-link\",\"if\",\"discourse-tags\",\"topic-featured-link\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/components/topic-category.hbs",
    "isStrictMode": false
  });
  // Injections don't occur without a class
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend());
  _exports.default = _default;
});