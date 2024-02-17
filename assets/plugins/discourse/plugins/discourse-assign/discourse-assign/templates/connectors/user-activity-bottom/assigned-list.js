define("discourse/plugins/discourse-assign/discourse-assign/templates/connectors/user-activity-bottom/assigned-list", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if currentUser.can_assign}}
    <LinkTo @route="userActivity.assigned">
      {{d-icon "user-plus"}}
      {{i18n "discourse_assign.assigned"}}
    </LinkTo>
  {{/if}}
  */
  {
    "id": "/pojGrW4",
    "block": "[[[41,[33,1,[\"can_assign\"]],[[[1,\"  \"],[8,[39,2],null,[[\"@route\"],[\"userActivity.assigned\"]],[[\"default\"],[[[[1,\"\\n    \"],[1,[28,[35,3],[\"user-plus\"],null]],[1,\"\\n    \"],[1,[28,[35,4],[\"discourse_assign.assigned\"],null]],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"currentUser\",\"link-to\",\"d-icon\",\"i18n\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse-assign/templates/connectors/user-activity-bottom/assigned-list.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});