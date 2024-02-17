define("discourse/plugins/discourse-solved/discourse/templates/connectors/category-custom-settings/solved-settings", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <h3>{{i18n "solved.title"}}</h3>
  
  {{#unless siteSettings.allow_solved_on_all_topics}}
    <section class="field">
      <div class="enable-accepted-answer">
        <label class="checkbox-label">
          <Input
            @type="checkbox"
            @checked={{readonly category.enable_accepted_answers}}
            {{on "change" (action "onChangeSetting" value="target.checked")}}
          />
          {{i18n "solved.allow_accepted_answers"}}
        </label>
      </div>
    </section>
  {{/unless}}
  
  <section class="field auto-close-solved-topics">
    <label for="auto-close-solved-topics">
      {{i18n "solved.solved_topics_auto_close_hours"}}
    </label>
    <NumberField
      @number={{this.category.custom_fields.solved_topics_auto_close_hours}}
      @id="auto-close-solved-topics"
      @type="number"
      @min="0"
    />
  </section>
  */
  {
    "id": "RnJzYh03",
    "block": "[[[10,\"h3\"],[12],[1,[28,[35,0],[\"solved.title\"],null]],[13],[1,\"\\n\\n\"],[41,[51,[33,2,[\"allow_solved_on_all_topics\"]]],[[[1,\"  \"],[10,\"section\"],[14,0,\"field\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"enable-accepted-answer\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"checkbox-label\"],[12],[1,\"\\n        \"],[8,[39,3],[[4,[38,6],[\"change\",[28,[37,7],[[30,0],\"onChangeSetting\"],[[\"value\"],[\"target.checked\"]]]],null]],[[\"@type\",\"@checked\"],[\"checkbox\",[28,[37,4],[[33,5,[\"enable_accepted_answers\"]]],null]]],null],[1,\"\\n        \"],[1,[28,[35,0],[\"solved.allow_accepted_answers\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,\"section\"],[14,0,\"field auto-close-solved-topics\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,\"for\",\"auto-close-solved-topics\"],[12],[1,\"\\n    \"],[1,[28,[35,0],[\"solved.solved_topics_auto_close_hours\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[8,[39,8],null,[[\"@number\",\"@id\",\"@type\",\"@min\"],[[30,0,[\"category\",\"custom_fields\",\"solved_topics_auto_close_hours\"]],\"auto-close-solved-topics\",\"number\",\"0\"]],null],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"unless\",\"siteSettings\",\"input\",\"readonly\",\"category\",\"on\",\"action\",\"number-field\"]]",
    "moduleName": "discourse/plugins/discourse-solved/discourse/templates/connectors/category-custom-settings/solved-settings.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});