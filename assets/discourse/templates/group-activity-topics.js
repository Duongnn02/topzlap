define("discourse/templates/group-activity-topics", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <LoadMore
    @class="paginated-topics-list"
    @selector=".paginated-topics-list .topic-list tr"
    @action={{action "loadMore"}}
  >
    <BasicTopicList @topicList={{this.model}} @showPosters={{true}} />
    <ConditionalLoadingSpinner @condition={{this.model.loadingMore}} />
  </LoadMore>
  */
  {
    "id": "ae4k79EQ",
    "block": "[[[8,[39,0],null,[[\"@class\",\"@selector\",\"@action\"],[\"paginated-topics-list\",\".paginated-topics-list .topic-list tr\",[28,[37,1],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,2],null,[[\"@topicList\",\"@showPosters\"],[[30,0,[\"model\"]],true]],null],[1,\"\\n  \"],[8,[39,3],null,[[\"@condition\"],[[30,0,[\"model\",\"loadingMore\"]]]],null],[1,\"\\n\"]],[]]]]]],[],false,[\"load-more\",\"action\",\"basic-topic-list\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/group-activity-topics.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});