define("discourse/components/mobile-category-topic", ["exports", "@ember/component", "@ember/template-factory", "discourse/components/topic-list-item"], function (_exports, _component, _templateFactory, _topicListItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/components/topic-list-item"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <td class="main-link">
    <div class="topic-inset">
      {{raw "topic-status" topic=this.topic}}
      {{topic-link this.topic}}
      {{#if this.topic.unseen}}
        <span class="badge-notification new-topic"></span>
      {{/if}}
      <span
        class={{cold-age-class this.topic.last_posted_at}}
        title={{raw-date this.topic.last_posted_at}}
      >{{format-age this.topic.last_posted_at}}</span>
    </div>
  </td>
  <td class="num posts">{{raw
      "list/post-count-or-badges"
      topic=this.topic
      postBadgesEnabled="true"
    }}</td>
  */
  {
    "id": "vbE3wQWQ",
    "block": "[[[10,\"td\"],[14,0,\"main-link\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"topic-inset\"],[12],[1,\"\\n    \"],[1,[28,[35,0],[\"topic-status\"],[[\"topic\"],[[30,0,[\"topic\"]]]]]],[1,\"\\n    \"],[1,[28,[35,1],[[30,0,[\"topic\"]]],null]],[1,\"\\n\"],[41,[30,0,[\"topic\",\"unseen\"]],[[[1,\"      \"],[10,1],[14,0,\"badge-notification new-topic\"],[12],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[10,1],[15,0,[28,[37,3],[[30,0,[\"topic\",\"last_posted_at\"]]],null]],[15,\"title\",[28,[37,4],[[30,0,[\"topic\",\"last_posted_at\"]]],null]],[12],[1,[28,[35,5],[[30,0,[\"topic\",\"last_posted_at\"]]],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[10,\"td\"],[14,0,\"num posts\"],[12],[1,[28,[35,0],[\"list/post-count-or-badges\"],[[\"topic\",\"postBadgesEnabled\"],[[30,0,[\"topic\"]],\"true\"]]]],[13]],[],false,[\"raw\",\"topic-link\",\"if\",\"cold-age-class\",\"raw-date\",\"format-age\"]]",
    "moduleName": "discourse/components/mobile-category-topic.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "tr",
    classNameBindings: [":category-topic-link", "topic.archived", "topic.visited"],
    click: _topicListItem.showEntrance
  }));
  _exports.default = _default;
});