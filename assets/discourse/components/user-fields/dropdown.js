define("discourse/components/user-fields/dropdown", ["exports", "@ember/component", "@ember/template-factory", "discourse/components/user-fields/base"], function (_exports, _component, _templateFactory, _base) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/components/user-fields/base"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <label class="control-label" for={{concat "user-" this.elementId}}>
    {{this.field.name}}
    {{#if this.field.required}}
      <span class="required">*</span>
    {{/if}}
  </label>
  
  <div class="controls">
    <ComboBox
      @id={{concat "user-" this.elementId}}
      @content={{this.field.options}}
      @valueProperty={{null}}
      @nameProperty={{null}}
      @value={{this.value}}
      @onChange={{action (mut this.value)}}
      @options={{hash none=this.noneLabel}}
    />
    <div class="instructions">{{html-safe this.field.description}}</div>
  </div>
  */
  {
    "id": "OfYosTsW",
    "block": "[[[10,\"label\"],[14,0,\"control-label\"],[15,\"for\",[28,[37,0],[\"user-\",[30,0,[\"elementId\"]]],null]],[12],[1,\"\\n  \"],[1,[30,0,[\"field\",\"name\"]]],[1,\"\\n\"],[41,[30,0,[\"field\",\"required\"]],[[[1,\"    \"],[10,1],[14,0,\"required\"],[12],[1,\"*\"],[13],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n  \"],[8,[39,2],null,[[\"@id\",\"@content\",\"@valueProperty\",\"@nameProperty\",\"@value\",\"@onChange\",\"@options\"],[[28,[37,0],[\"user-\",[30,0,[\"elementId\"]]],null],[30,0,[\"field\",\"options\"]],null,null,[30,0,[\"value\"]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"value\"]]],null]],null],[28,[37,5],null,[[\"none\"],[[30,0,[\"noneLabel\"]]]]]]],null],[1,\"\\n  \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,6],[[30,0,[\"field\",\"description\"]]],null]],[13],[1,\"\\n\"],[13]],[],false,[\"concat\",\"if\",\"combo-box\",\"action\",\"mut\",\"hash\",\"html-safe\"]]",
    "moduleName": "discourse/components/user-fields/dropdown.hbs",
    "isStrictMode": false
  });
  class UserFieldDropdown extends _base.default {}
  _exports.default = UserFieldDropdown;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserFieldDropdown);
});