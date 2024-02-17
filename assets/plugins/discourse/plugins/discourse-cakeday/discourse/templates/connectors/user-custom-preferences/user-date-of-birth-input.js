define("discourse/plugins/discourse-cakeday/discourse/templates/connectors/user-custom-preferences/user-date-of-birth-input", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if siteSettings.cakeday_birthday_enabled}}
    <div class="control-group">
      <label class="control-label">{{i18n "user.date_of_birth.label"}}</label>
      <div class="controls">
        {{combo-box
          content=months
          value=month
          valueAttribute="value"
          valueProperty="value"
          none="cakeday.none"
          options=(hash clearable=true autoInsertNoneItem=false)
          onChange=(action (mut month))
        }}
  
        {{combo-box
          content=days
          value=day
          valueProperty=null
          nameProperty=null
          none="cakeday.none"
          options=(hash clearable=true autoInsertNoneItem=false)
          onChange=(action (mut day))
        }}
      </div>
    </div>
  {{/if}}
  */
  {
    "id": "TZcekP8i",
    "block": "[[[41,[33,1,[\"cakeday_birthday_enabled\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,2],[\"user.date_of_birth.label\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[1,[28,[35,3],null,[[\"content\",\"value\",\"valueAttribute\",\"valueProperty\",\"none\",\"options\",\"onChange\"],[[33,4],[33,5],\"value\",\"value\",\"cakeday.none\",[28,[37,6],null,[[\"clearable\",\"autoInsertNoneItem\"],[true,false]]],[28,[37,7],[[30,0],[28,[37,8],[[33,5]],null]],null]]]]],[1,\"\\n\\n      \"],[1,[28,[35,3],null,[[\"content\",\"value\",\"valueProperty\",\"nameProperty\",\"none\",\"options\",\"onChange\"],[[33,9],[33,10],null,null,\"cakeday.none\",[28,[37,6],null,[[\"clearable\",\"autoInsertNoneItem\"],[true,false]]],[28,[37,7],[[30,0],[28,[37,8],[[33,10]],null]],null]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"siteSettings\",\"i18n\",\"combo-box\",\"months\",\"month\",\"hash\",\"action\",\"mut\",\"days\",\"day\"]]",
    "moduleName": "discourse/plugins/discourse-cakeday/discourse/templates/connectors/user-custom-preferences/user-date-of-birth-input.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});