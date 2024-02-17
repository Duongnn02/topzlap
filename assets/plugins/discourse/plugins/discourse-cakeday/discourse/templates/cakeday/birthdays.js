define("discourse/plugins/discourse-cakeday/discourse/templates/cakeday/birthdays", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="birthdays">
    <ul class="nav-pills">
      <li>
        {{#link-to "cakeday.birthdays.today"}}
          {{i18n "cakeday.today"}}
        {{/link-to}}
      </li>
  
      <li>
        {{#link-to "cakeday.birthdays.tomorrow"}}
          {{i18n "cakeday.tomorrow"}}
        {{/link-to}}
      </li>
  
      <li>
        {{#link-to "cakeday.birthdays.upcoming"}}
          {{i18n "cakeday.upcoming"}}
        {{/link-to}}
      </li>
  
      <li>
        {{#link-to "cakeday.birthdays.all"}}
          {{i18n "cakeday.all"}}
        {{/link-to}}
      </li>
    </ul>
  
    {{outlet}}
  </div>
  */
  {
    "id": "Kw84JziU",
    "block": "[[[10,0],[14,0,\"birthdays\"],[12],[1,\"\\n  \"],[10,\"ul\"],[14,0,\"nav-pills\"],[12],[1,\"\\n    \"],[10,\"li\"],[12],[1,\"\\n\"],[6,[39,0],null,[[\"route\"],[\"cakeday.birthdays.today\"]],[[\"default\"],[[[[1,\"        \"],[1,[28,[35,1],[\"cakeday.today\"],null]],[1,\"\\n\"]],[]]]]],[1,\"    \"],[13],[1,\"\\n\\n    \"],[10,\"li\"],[12],[1,\"\\n\"],[6,[39,0],null,[[\"route\"],[\"cakeday.birthdays.tomorrow\"]],[[\"default\"],[[[[1,\"        \"],[1,[28,[35,1],[\"cakeday.tomorrow\"],null]],[1,\"\\n\"]],[]]]]],[1,\"    \"],[13],[1,\"\\n\\n    \"],[10,\"li\"],[12],[1,\"\\n\"],[6,[39,0],null,[[\"route\"],[\"cakeday.birthdays.upcoming\"]],[[\"default\"],[[[[1,\"        \"],[1,[28,[35,1],[\"cakeday.upcoming\"],null]],[1,\"\\n\"]],[]]]]],[1,\"    \"],[13],[1,\"\\n\\n    \"],[10,\"li\"],[12],[1,\"\\n\"],[6,[39,0],null,[[\"route\"],[\"cakeday.birthdays.all\"]],[[\"default\"],[[[[1,\"        \"],[1,[28,[35,1],[\"cakeday.all\"],null]],[1,\"\\n\"]],[]]]]],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[46,[28,[37,3],null,null],null,null,null],[1,\"\\n\"],[13]],[],false,[\"link-to\",\"i18n\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/plugins/discourse-cakeday/discourse/templates/cakeday/birthdays.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});