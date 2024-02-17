define("discourse/plugins/discourse-solved/discourse/templates/connectors/topic-after-cooked/solved-panel", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if topic.accepted_answer}}
    <p class="solved">
      {{html-safe topic.acceptedAnswerHtml}}
    </p>
  {{/if}}
  */
  {
    "id": "YzGh5N9g",
    "block": "[[[41,[33,1,[\"accepted_answer\"]],[[[1,\"  \"],[10,2],[14,0,\"solved\"],[12],[1,\"\\n    \"],[1,[28,[35,2],[[33,1,[\"acceptedAnswerHtml\"]]],null]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"topic\",\"html-safe\"]]",
    "moduleName": "discourse/plugins/discourse-solved/discourse/templates/connectors/topic-after-cooked/solved-panel.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});