define("select-kit/templates/components/email-group-user-chooser-row", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.item.isUser}}
    {{avatar this.item imageSize="tiny"}}
    <div>
      <span class="identifier">{{format-username this.item.id}}</span>
      <span class="name">{{this.item.name}}</span>
    </div>
    {{#if (and this.item.showUserStatus this.item.status)}}
      <UserStatusMessage @status={{this.item.status}} @showDescription={{true}} />
    {{/if}}
    {{decorate-username-selector this.item.id}}
  {{else if this.item.isGroup}}
    {{d-icon "users"}}
    <div>
      <span class="identifier">{{this.item.id}}</span>
      <span class="name">{{this.item.full_name}}</span>
    </div>
  {{else}}
    {{d-icon "envelope"}}
    <span class="identifier">{{this.item.id}}</span>
  {{/if}}
  */
  {
    "id": "Ii/4JS5l",
    "block": "[[[41,[30,0,[\"item\",\"isUser\"]],[[[1,\"  \"],[1,[28,[35,1],[[30,0,[\"item\"]]],[[\"imageSize\"],[\"tiny\"]]]],[1,\"\\n  \"],[10,0],[12],[1,\"\\n    \"],[10,1],[14,0,\"identifier\"],[12],[1,[28,[35,2],[[30,0,[\"item\",\"id\"]]],null]],[13],[1,\"\\n    \"],[10,1],[14,0,\"name\"],[12],[1,[30,0,[\"item\",\"name\"]]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[41,[28,[37,3],[[30,0,[\"item\",\"showUserStatus\"]],[30,0,[\"item\",\"status\"]]],null],[[[1,\"    \"],[8,[39,4],null,[[\"@status\",\"@showDescription\"],[[30,0,[\"item\",\"status\"]],true]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[1,[28,[35,5],[[30,0,[\"item\",\"id\"]]],null]],[1,\"\\n\"]],[]],[[[41,[30,0,[\"item\",\"isGroup\"]],[[[1,\"  \"],[1,[28,[35,6],[\"users\"],null]],[1,\"\\n  \"],[10,0],[12],[1,\"\\n    \"],[10,1],[14,0,\"identifier\"],[12],[1,[30,0,[\"item\",\"id\"]]],[13],[1,\"\\n    \"],[10,1],[14,0,\"name\"],[12],[1,[30,0,[\"item\",\"full_name\"]]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[1,[28,[35,6],[\"envelope\"],null]],[1,\"\\n  \"],[10,1],[14,0,\"identifier\"],[12],[1,[30,0,[\"item\",\"id\"]]],[13],[1,\"\\n\"]],[]]]],[]]]],[],false,[\"if\",\"avatar\",\"format-username\",\"and\",\"user-status-message\",\"decorate-username-selector\",\"d-icon\"]]",
    "moduleName": "select-kit/templates/components/email-group-user-chooser-row.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});