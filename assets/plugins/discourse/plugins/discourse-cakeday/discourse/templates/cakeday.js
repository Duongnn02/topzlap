define("discourse/plugins/discourse-cakeday/discourse/templates/cakeday", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container cakeday">
    <ul class="nav-pills">
      {{#if cakedayEnabled}}
        <li class="nav-item-anniversaries">
          {{#link-to "cakeday.anniversaries"}}
            {{i18n "anniversaries.title"}}
          {{/link-to}}
        </li>
      {{/if}}
  
      {{#if birthdayEnabled}}
        <li class="nav-item-birthdays">
          {{#link-to "cakeday.birthdays"}}
            {{i18n "birthdays.title"}}
          {{/link-to}}
        </li>
      {{/if}}
    </ul>
  
    {{outlet}}
  </div>
  */
  {
    "id": "I02aTyox",
    "block": "[[[10,0],[14,0,\"container cakeday\"],[12],[1,\"\\n  \"],[10,\"ul\"],[14,0,\"nav-pills\"],[12],[1,\"\\n\"],[41,[33,1],[[[1,\"      \"],[10,\"li\"],[14,0,\"nav-item-anniversaries\"],[12],[1,\"\\n\"],[6,[39,2],null,[[\"route\"],[\"cakeday.anniversaries\"]],[[\"default\"],[[[[1,\"          \"],[1,[28,[35,3],[\"anniversaries.title\"],null]],[1,\"\\n\"]],[]]]]],[1,\"      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[33,4],[[[1,\"      \"],[10,\"li\"],[14,0,\"nav-item-birthdays\"],[12],[1,\"\\n\"],[6,[39,2],null,[[\"route\"],[\"cakeday.birthdays\"]],[[\"default\"],[[[[1,\"          \"],[1,[28,[35,3],[\"birthdays.title\"],null]],[1,\"\\n\"]],[]]]]],[1,\"      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[46,[28,[37,6],null,null],null,null,null],[1,\"\\n\"],[13]],[],false,[\"if\",\"cakedayEnabled\",\"link-to\",\"i18n\",\"birthdayEnabled\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/plugins/discourse-cakeday/discourse/templates/cakeday.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});