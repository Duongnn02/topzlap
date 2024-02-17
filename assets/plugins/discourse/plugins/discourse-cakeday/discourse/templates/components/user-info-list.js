define("discourse/plugins/discourse-cakeday/discourse/templates/components/user-info-list", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <ul class="user-info-list">
    {{#each users as |user|}}
      <li class="user-info-item">
        {{#user-info user=user}}
          <div>{{cakeday-date user.cakedate isBirthday=isBirthday}}</div>
        {{/user-info}}
      </li>
    {{else}}
      <div class="user-info-empty-message"><h4>{{yield}}</h4></div>
    {{/each}}
  </ul>
  */
  {
    "id": "YC6O7EFi",
    "block": "[[[10,\"ul\"],[14,0,\"user-info-list\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[33,2]],null]],null],null,[[[1,\"    \"],[10,\"li\"],[14,0,\"user-info-item\"],[12],[1,\"\\n\"],[6,[39,3],null,[[\"user\"],[[30,1]]],[[\"default\"],[[[[1,\"        \"],[10,0],[12],[1,[28,[35,4],[[30,1,[\"cakedate\"]]],[[\"isBirthday\"],[[33,5]]]]],[13],[1,\"\\n\"]],[]]]]],[1,\"    \"],[13],[1,\"\\n\"]],[1]],[[[1,\"    \"],[10,0],[14,0,\"user-info-empty-message\"],[12],[10,\"h4\"],[12],[18,2,null],[13],[13],[1,\"\\n\"]],[]]],[13]],[\"user\",\"&default\"],false,[\"each\",\"-track-array\",\"users\",\"user-info\",\"cakeday-date\",\"isBirthday\",\"yield\"]]",
    "moduleName": "discourse/plugins/discourse-cakeday/discourse/templates/components/user-info-list.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});