define("discourse/components/user-summary-topic", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <span class="topic-info">
    {{format-date @createdAt format="tiny" noTitle="true"}}
    {{#if @likes}}
      &middot;
      {{d-icon "heart"}}&nbsp;<span class="like-count">{{number @likes}}</span>
    {{/if}}
  </span>
  <br />
  <a href={{@url}}>{{html-safe @topic.fancyTitle}}</a>
  */
  {
    "id": "Wog9xaP7",
    "block": "[[[10,1],[14,0,\"topic-info\"],[12],[1,\"\\n  \"],[1,[28,[35,0],[[30,1]],[[\"format\",\"noTitle\"],[\"tiny\",\"true\"]]]],[1,\"\\n\"],[41,[30,2],[[[1,\"    ·\\n    \"],[1,[28,[35,2],[\"heart\"],null]],[1,\" \"],[10,1],[14,0,\"like-count\"],[12],[1,[28,[35,3],[[30,2]],null]],[13],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\"],[10,\"br\"],[12],[13],[1,\"\\n\"],[10,3],[15,6,[30,3]],[12],[1,[28,[35,4],[[30,4,[\"fancyTitle\"]]],null]],[13]],[\"@createdAt\",\"@likes\",\"@url\",\"@topic\"],false,[\"format-date\",\"if\",\"d-icon\",\"number\",\"html-safe\"]]",
    "moduleName": "discourse/components/user-summary-topic.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "li"
  }));
  _exports.default = _default;
});