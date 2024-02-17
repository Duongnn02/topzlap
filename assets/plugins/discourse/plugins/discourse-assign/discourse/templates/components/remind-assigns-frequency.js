define("discourse/plugins/discourse-assign/discourse/templates/components/remind-assigns-frequency", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if siteSettings.assign_enabled}}
    <div class="controls controls-dropdown">
      <label>{{i18n "discourse_assign.reminders_frequency.description"}}</label>
      <ComboBox
        @id="remind-assigns-frequency"
        @valueProperty="value"
        @content={{availableFrequencies}}
        @value={{selectedFrequency}}
        @onChange={{action (mut user.custom_fields.remind_assigns_frequency)}}
      />
    </div>
  {{/if}}
  */
  {
    "id": "0Ta3N4Bb",
    "block": "[[[41,[33,1,[\"assign_enabled\"]],[[[1,\"  \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,2],[\"discourse_assign.reminders_frequency.description\"],null]],[13],[1,\"\\n    \"],[8,[39,3],null,[[\"@id\",\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"remind-assigns-frequency\",\"value\",[99,4,[\"@content\"]],[99,5,[\"@value\"]],[28,[37,6],[[30,0],[28,[37,7],[[33,8,[\"custom_fields\",\"remind_assigns_frequency\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"siteSettings\",\"i18n\",\"combo-box\",\"availableFrequencies\",\"selectedFrequency\",\"action\",\"mut\",\"user\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse/templates/components/remind-assigns-frequency.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});