define("discourse/templates/user-activity-pending", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <ul class="user-stream">
    {{#each this.model as |pending_post|}}
      <PendingPost @post={{pending_post}} />
    {{/each}}
  </ul>
  */
  {
    "id": "J0zkRWfr",
    "block": "[[[10,\"ul\"],[14,0,\"user-stream\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,0,[\"model\"]]],null]],null],null,[[[1,\"    \"],[8,[39,2],null,[[\"@post\"],[[30,1]]],null],[1,\"\\n\"]],[1]],null],[13]],[\"pending_post\"],false,[\"each\",\"-track-array\",\"pending-post\"]]",
    "moduleName": "discourse/templates/user-activity-pending.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});