define("select-kit/templates/components/user-chooser/user-row", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{avatar this.item imageSize="tiny"}}
  
  <span class="username">{{format-username this.item.username}}</span>
  
  {{#if this.item.name}}
    <span class="name">{{this.item.name}}</span>
  {{/if}}
  */
  {
    "id": "vFpF4zYJ",
    "block": "[[[1,[28,[35,0],[[30,0,[\"item\"]]],[[\"imageSize\"],[\"tiny\"]]]],[1,\"\\n\\n\"],[10,1],[14,0,\"username\"],[12],[1,[28,[35,1],[[30,0,[\"item\",\"username\"]]],null]],[13],[1,\"\\n\\n\"],[41,[30,0,[\"item\",\"name\"]],[[[1,\"  \"],[10,1],[14,0,\"name\"],[12],[1,[30,0,[\"item\",\"name\"]]],[13],[1,\"\\n\"]],[]],null]],[],false,[\"avatar\",\"format-username\",\"if\"]]",
    "moduleName": "select-kit/templates/components/user-chooser/user-row.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});