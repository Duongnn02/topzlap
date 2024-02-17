define("discourse/plugins/docker_manager/discourse/templates/connectors/admin-menu/upgrade-link", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.currentUser.admin}}
    <NavItem @route="upgrade" @label="admin.docker.upgrade_tab" />
  {{/if}}
  
  */
  {
    "id": "DzBhMHtI",
    "block": "[[[41,[30,0,[\"currentUser\",\"admin\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@route\",\"@label\"],[\"upgrade\",\"admin.docker.upgrade_tab\"]],null],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"nav-item\"]]",
    "moduleName": "discourse/plugins/docker_manager/discourse/templates/connectors/admin-menu/upgrade-link.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});