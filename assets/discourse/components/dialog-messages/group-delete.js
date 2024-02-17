define("discourse/components/dialog-messages/group-delete", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if @model.members.length}}
    <p>
      {{d-icon "users"}}
      {{i18n "admin.groups.delete_details" count=@model.members.length}}
    </p>
  {{/if}}
  {{#if @model.message_count}}
    <p>
      {{d-icon "envelope"}}
      {{i18n
        "admin.groups.delete_with_messages_confirm"
        count=@model.message_count
      }}
    </p>
  {{/if}}
  
  <p>
    {{d-icon "exclamation-triangle"}}
    {{i18n "admin.groups.delete_warning"}}
  </p>
  */
  {
    "id": "dD9SF6Sc",
    "block": "[[[41,[30,1,[\"members\",\"length\"]],[[[1,\"  \"],[10,2],[12],[1,\"\\n    \"],[1,[28,[35,1],[\"users\"],null]],[1,\"\\n    \"],[1,[28,[35,2],[\"admin.groups.delete_details\"],[[\"count\"],[[30,1,[\"members\",\"length\"]]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[41,[30,1,[\"message_count\"]],[[[1,\"  \"],[10,2],[12],[1,\"\\n    \"],[1,[28,[35,1],[\"envelope\"],null]],[1,\"\\n    \"],[1,[28,[35,2],[\"admin.groups.delete_with_messages_confirm\"],[[\"count\"],[[30,1,[\"message_count\"]]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,2],[12],[1,\"\\n  \"],[1,[28,[35,1],[\"exclamation-triangle\"],null]],[1,\"\\n  \"],[1,[28,[35,2],[\"admin.groups.delete_warning\"],null]],[1,\"\\n\"],[13]],[\"@model\"],false,[\"if\",\"d-icon\",\"i18n\"]]",
    "moduleName": "discourse/components/dialog-messages/group-delete.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});