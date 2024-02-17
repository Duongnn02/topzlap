define("select-kit/templates/components/topic-row", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <TopicStatus @topic={{this.item}} @disableActions={{true}} />
  <div class="topic-title">{{replace-emoji this.item.title}}</div>
  <div class="topic-categories">
    {{bound-category-link
      this.item.category
      recursive=true
      hideParent=true
      link=false
    }}
  </div>
  */
  {
    "id": "7SUsdgo2",
    "block": "[[[8,[39,0],null,[[\"@topic\",\"@disableActions\"],[[30,0,[\"item\"]],true]],null],[1,\"\\n\"],[10,0],[14,0,\"topic-title\"],[12],[1,[28,[35,1],[[30,0,[\"item\",\"title\"]]],null]],[13],[1,\"\\n\"],[10,0],[14,0,\"topic-categories\"],[12],[1,\"\\n  \"],[1,[28,[35,2],[[30,0,[\"item\",\"category\"]]],[[\"recursive\",\"hideParent\",\"link\"],[true,true,false]]]],[1,\"\\n\"],[13]],[],false,[\"topic-status\",\"replace-emoji\",\"bound-category-link\"]]",
    "moduleName": "select-kit/templates/components/topic-row.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});