define("discourse/plugins/discourse-cakeday/discourse/templates/cakeday/anniversaries/all", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#load-more selector=".user-info" action=(action "loadMore")}}
    <div class="cakeday-months">
      <h2 class="cakeday-header">{{i18n "anniversaries.month.title"}}</h2>
      {{combo-box
        content=months
        value=month
        valueAttribute="value"
        none="cakeday.none"
      }}
    </div>
  
    {{#conditional-loading-spinner condition=model.loading}}
      {{#user-info-list users=model}}
        {{i18n "anniversaries.month.empty"}}
      {{/user-info-list}}
    {{/conditional-loading-spinner}}
  
    {{conditional-loading-spinner condition=model.loadingMore}}
  {{/load-more}}
  */
  {
    "id": "qLc1bHpK",
    "block": "[[[6,[39,0],null,[[\"selector\",\"action\"],[\".user-info\",[28,[37,1],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"  \"],[10,0],[14,0,\"cakeday-months\"],[12],[1,\"\\n    \"],[10,\"h2\"],[14,0,\"cakeday-header\"],[12],[1,[28,[35,2],[\"anniversaries.month.title\"],null]],[13],[1,\"\\n    \"],[1,[28,[35,3],null,[[\"content\",\"value\",\"valueAttribute\",\"none\"],[[33,4],[33,5],\"value\",\"cakeday.none\"]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[6,[39,6],null,[[\"condition\"],[[33,7,[\"loading\"]]]],[[\"default\"],[[[[6,[39,8],null,[[\"users\"],[[33,7]]],[[\"default\"],[[[[1,\"      \"],[1,[28,[35,2],[\"anniversaries.month.empty\"],null]],[1,\"\\n\"]],[]]]]]],[]]]]],[1,\"\\n  \"],[1,[28,[35,6],null,[[\"condition\"],[[33,7,[\"loadingMore\"]]]]]],[1,\"\\n\"]],[]]]]]],[],false,[\"load-more\",\"action\",\"i18n\",\"combo-box\",\"months\",\"month\",\"conditional-loading-spinner\",\"model\",\"user-info-list\"]]",
    "moduleName": "discourse/plugins/discourse-cakeday/discourse/templates/cakeday/anniversaries/all.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});