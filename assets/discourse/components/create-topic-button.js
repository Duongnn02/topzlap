define("discourse/components/create-topic-button", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.canCreateTopic}}
    <DButton
      @class={{this.btnClass}}
      @id="create-topic"
      @action={{this.action}}
      @icon="plus"
      @disabled={{this.disabled}}
      @label={{this.label}}
    />
    {{yield}}
  {{/if}}
  */
  {
    "id": "nNWdBeR7",
    "block": "[[[41,[30,0,[\"canCreateTopic\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@class\",\"@id\",\"@action\",\"@icon\",\"@disabled\",\"@label\"],[[30,0,[\"btnClass\"]],\"create-topic\",[30,0,[\"action\"]],\"plus\",[30,0,[\"disabled\"]],[30,0,[\"label\"]]]],null],[1,\"\\n  \"],[18,1,null],[1,\"\\n\"]],[]],null]],[\"&default\"],false,[\"if\",\"d-button\",\"yield\"]]",
    "moduleName": "discourse/components/create-topic-button.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "",
    label: "topic.create",
    btnClass: "btn-default"
  }));
  _exports.default = _default;
});