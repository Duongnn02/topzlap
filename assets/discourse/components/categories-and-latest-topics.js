define("discourse/components/categories-and-latest-topics", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="column categories">
    <CategoriesOnly @categories={{this.categories}} />
  </div>
  
  <div class="column">
    <CategoriesTopicList
      @topics={{this.topics}}
      @filter="latest"
      @class="latest-topic-list"
    />
  </div>
  
  <PluginOutlet @name="extra-categories-column" @connectorTagName="div" />
  */
  {
    "id": "Wxq2LyoD",
    "block": "[[[10,0],[14,0,\"column categories\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@categories\"],[[30,0,[\"categories\"]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"column\"],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@topics\",\"@filter\",\"@class\"],[[30,0,[\"topics\"]],\"latest\",\"latest-topic-list\"]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,2],null,[[\"@name\",\"@connectorTagName\"],[\"extra-categories-column\",\"div\"]],null]],[],false,[\"categories-only\",\"categories-topic-list\",\"plugin-outlet\"]]",
    "moduleName": "discourse/components/categories-and-latest-topics.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    classNames: ["categories-and-latest"]
  }));
  _exports.default = _default;
});