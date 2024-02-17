define("discourse/templates/group-activity-posts", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <LoadMore @selector=".user-stream-item" @action={{action "loadMore"}}>
    <div class="user-stream">
      {{#each this.model as |post|}}
        <GroupPost @post={{post}} />
      {{else}}
        <div>{{i18n this.emptyText}}</div>
      {{/each}}
    </div>
    <ConditionalLoadingSpinner @condition={{this.loading}} />
  </LoadMore>
  */
  {
    "id": "vkUQoyil",
    "block": "[[[8,[39,0],null,[[\"@selector\",\"@action\"],[\".user-stream-item\",[28,[37,1],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"user-stream\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"model\"]]],null]],null],null,[[[1,\"      \"],[8,[39,4],null,[[\"@post\"],[[30,1]]],null],[1,\"\\n\"]],[1]],[[[1,\"      \"],[10,0],[12],[1,[28,[35,5],[[30,0,[\"emptyText\"]]],null]],[13],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n  \"],[8,[39,6],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],null],[1,\"\\n\"]],[]]]]]],[\"post\"],false,[\"load-more\",\"action\",\"each\",\"-track-array\",\"group-post\",\"i18n\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/group-activity-posts.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});