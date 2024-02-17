define("discourse/components/sidebar/sections", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if @currentUser}}
    <Sidebar::User::Sections @collapsableSections={{@collapsableSections}} />
  {{else}}
    <Sidebar::Anonymous::Sections @collapsableSections={{@collapsableSections}} />
  {{/if}}
  */
  {
    "id": "hosUbHhe",
    "block": "[[[41,[30,1],[[[1,\"  \"],[8,[39,1],null,[[\"@collapsableSections\"],[[30,2]]],null],[1,\"\\n\"]],[]],[[[1,\"  \"],[8,[39,2],null,[[\"@collapsableSections\"],[[30,2]]],null],[1,\"\\n\"]],[]]]],[\"@currentUser\",\"@collapsableSections\"],false,[\"if\",\"sidebar/user/sections\",\"sidebar/anonymous/sections\"]]",
    "moduleName": "discourse/components/sidebar/sections.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});