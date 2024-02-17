define("discourse/components/user-fields/text", ["exports", "@ember/component", "@ember/template-factory", "discourse/components/user-fields/base"], function (_exports, _component, _templateFactory, _base) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/components/user-fields/base"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="controls">
    <label class="control-label" for={{concat "user-" this.elementId}}>
      {{this.field.name}}
      {{#if this.field.required}}<span class="required">*</span>{{/if}}
    </label>
    <Input
      id={{concat "user-" this.elementId}}
      @value={{this.value}}
      maxlength={{this.site.user_field_max_length}}
    />
    <InputTip
      @validation={{this.validation}}
      class={{unless this.validation " hidden"}}
    />
    <div class="instructions">{{html-safe this.field.description}}</div>
  </div>
  */
  {
    "id": "80U0IzWw",
    "block": "[[[10,0],[14,0,\"controls\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[15,\"for\",[28,[37,0],[\"user-\",[30,0,[\"elementId\"]]],null]],[12],[1,\"\\n    \"],[1,[30,0,[\"field\",\"name\"]]],[1,\"\\n    \"],[41,[30,0,[\"field\",\"required\"]],[[[10,1],[14,0,\"required\"],[12],[1,\"*\"],[13]],[]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[8,[39,2],[[16,1,[28,[37,0],[\"user-\",[30,0,[\"elementId\"]]],null]],[16,\"maxlength\",[30,0,[\"site\",\"user_field_max_length\"]]]],[[\"@value\"],[[30,0,[\"value\"]]]],null],[1,\"\\n  \"],[8,[39,3],[[16,0,[52,[51,[30,0,[\"validation\"]]],\" hidden\"]]],[[\"@validation\"],[[30,0,[\"validation\"]]]],null],[1,\"\\n  \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,5],[[30,0,[\"field\",\"description\"]]],null]],[13],[1,\"\\n\"],[13]],[],false,[\"concat\",\"if\",\"input\",\"input-tip\",\"unless\",\"html-safe\"]]",
    "moduleName": "discourse/components/user-fields/text.hbs",
    "isStrictMode": false
  });
  class UserFieldText extends _base.default {}
  _exports.default = UserFieldText;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserFieldText);
});