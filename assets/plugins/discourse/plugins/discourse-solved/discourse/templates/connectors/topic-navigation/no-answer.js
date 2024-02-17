define("discourse/plugins/discourse-solved/discourse/templates/connectors/topic-navigation/no-answer", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if show}}
    <TopicNavigationPopup @popupId="solved-notice" @dismissDuration={{oneWeek}}>
      <h3>{{i18n "solved.no_answer.title"}}</h3>
      <p>{{i18n "solved.no_answer.description"}}</p>
    </TopicNavigationPopup>
  {{/if}}
  */
  {
    "id": "5sdkXi7K",
    "block": "[[[41,[33,1],[[[1,\"  \"],[8,[39,2],null,[[\"@popupId\",\"@dismissDuration\"],[\"solved-notice\",[99,3,[\"@dismissDuration\"]]]],[[\"default\"],[[[[1,\"\\n    \"],[10,\"h3\"],[12],[1,[28,[35,4],[\"solved.no_answer.title\"],null]],[13],[1,\"\\n    \"],[10,2],[12],[1,[28,[35,4],[\"solved.no_answer.description\"],null]],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"show\",\"topic-navigation-popup\",\"oneWeek\",\"i18n\"]]",
    "moduleName": "discourse/plugins/discourse-solved/discourse/templates/connectors/topic-navigation/no-answer.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});