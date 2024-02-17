define("discourse/components/user-fields/confirm", ["exports", "@ember/component", "@ember/template-factory", "discourse/components/user-fields/base"], function (_exports, _component, _templateFactory, _base) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/components/user-fields/base"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.field.name}}
    <label class="control-label">
      {{this.field.name}}
      {{#if this.field.required}}<span class="required">*</span>{{/if}}
    </label>
  {{/if}}
  
  <div class="controls">
    <label class="control-label checkbox-label">
      <Input
        id={{concat "user-" this.elementId}}
        @checked={{this.value}}
        @type="checkbox"
      />
      <span>
        {{html-safe this.field.description}}
        {{#unless this.field.name}}{{#if this.field.required}}<span
              class="required"
            >*</span>{{/if}}{{/unless}}
      </span>
    </label>
  </div>
  */
  {
    "id": "4KJxS+za",
    "block": "[[[41,[30,0,[\"field\",\"name\"]],[[[1,\"  \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,\"\\n    \"],[1,[30,0,[\"field\",\"name\"]]],[1,\"\\n    \"],[41,[30,0,[\"field\",\"required\"]],[[[10,1],[14,0,\"required\"],[12],[1,\"*\"],[13]],[]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label checkbox-label\"],[12],[1,\"\\n    \"],[8,[39,1],[[16,1,[28,[37,2],[\"user-\",[30,0,[\"elementId\"]]],null]]],[[\"@checked\",\"@type\"],[[30,0,[\"value\"]],\"checkbox\"]],null],[1,\"\\n    \"],[10,1],[12],[1,\"\\n      \"],[1,[28,[35,3],[[30,0,[\"field\",\"description\"]]],null]],[1,\"\\n      \"],[41,[51,[30,0,[\"field\",\"name\"]]],[[[41,[30,0,[\"field\",\"required\"]],[[[10,1],[14,0,\"required\"],[12],[1,\"*\"],[13]],[]],null]],[]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"if\",\"input\",\"concat\",\"html-safe\",\"unless\"]]",
    "moduleName": "discourse/components/user-fields/confirm.hbs",
    "isStrictMode": false
  });
  class UserFieldConfirm extends _base.default {}
  _exports.default = UserFieldConfirm;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserFieldConfirm);
});