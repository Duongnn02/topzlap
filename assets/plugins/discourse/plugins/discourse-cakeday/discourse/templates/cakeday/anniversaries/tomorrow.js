define("discourse/plugins/discourse-cakeday/discourse/templates/cakeday/anniversaries/tomorrow", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <h2 class="cakeday-header">{{title}}</h2>
  
  {{#load-more selector=".user-info" action=(action "loadMore")}}
    {{#conditional-loading-spinner condition=model.loading}}
      {{#user-info-list users=model}}
        {{i18n "anniversaries.tomorrow.empty"}}
      {{/user-info-list}}
    {{/conditional-loading-spinner}}
  
    {{conditional-loading-spinner condition=model.loadingMore}}
  {{/load-more}}
  */
  {
    "id": "gTdlclYq",
    "block": "[[[10,\"h2\"],[14,0,\"cakeday-header\"],[12],[1,[34,0]],[13],[1,\"\\n\\n\"],[6,[39,1],null,[[\"selector\",\"action\"],[\".user-info\",[28,[37,2],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[6,[39,3],null,[[\"condition\"],[[33,4,[\"loading\"]]]],[[\"default\"],[[[[6,[39,5],null,[[\"users\"],[[33,4]]],[[\"default\"],[[[[1,\"      \"],[1,[28,[35,6],[\"anniversaries.tomorrow.empty\"],null]],[1,\"\\n\"]],[]]]]]],[]]]]],[1,\"\\n  \"],[1,[28,[35,3],null,[[\"condition\"],[[33,4,[\"loadingMore\"]]]]]],[1,\"\\n\"]],[]]]]]],[],false,[\"title\",\"load-more\",\"action\",\"conditional-loading-spinner\",\"model\",\"user-info-list\",\"i18n\"]]",
    "moduleName": "discourse/plugins/discourse-cakeday/discourse/templates/cakeday/anniversaries/tomorrow.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});