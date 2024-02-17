define("discourse/plugins/discourse-assign/discourse-assign/templates/connectors/category-custom-settings/assign-settings", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <h3>{{i18n "discourse_assign.assign.title"}}</h3>
  <section class="field">
    <div class="enable-accepted-answer">
      <label class="checkbox-label">
        <Input
          @type="checkbox"
          @checked={{readonly category.enable_unassigned_filter}}
          {{on "change" (action "onChangeSetting" value="target.checked")}}
        />
        {{i18n "discourse_assign.add_unassigned_filter"}}
      </label>
    </div>
  </section>
  */
  {
    "id": "wI1b51+H",
    "block": "[[[10,\"h3\"],[12],[1,[28,[35,0],[\"discourse_assign.assign.title\"],null]],[13],[1,\"\\n\"],[10,\"section\"],[14,0,\"field\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"enable-accepted-answer\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"checkbox-label\"],[12],[1,\"\\n      \"],[8,[39,1],[[4,[38,4],[\"change\",[28,[37,5],[[30,0],\"onChangeSetting\"],[[\"value\"],[\"target.checked\"]]]],null]],[[\"@type\",\"@checked\"],[\"checkbox\",[28,[37,2],[[33,3,[\"enable_unassigned_filter\"]]],null]]],null],[1,\"\\n      \"],[1,[28,[35,0],[\"discourse_assign.add_unassigned_filter\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"input\",\"readonly\",\"category\",\"on\",\"action\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse-assign/templates/connectors/category-custom-settings/assign-settings.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});