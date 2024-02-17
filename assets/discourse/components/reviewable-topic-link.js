define("discourse/components/reviewable-topic-link", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="post-topic">
    {{#if this.reviewable.topic}}
      <TopicStatus
        @topic={{this.reviewable.topic}}
        @showPrivateMessageIcon={{true}}
      />
      <a href={{this.reviewable.target_url}} class="title-text">{{html-safe
          this.reviewable.topic.fancyTitle
        }}</a>
      {{category-badge this.reviewable.category}}
      <ReviewableTags @tags={{this.reviewable.topic_tags}} @tagName="" />
    {{else if (has-block)}}
      {{yield}}
    {{else}}
      <span class="title-text">
        {{i18n "review.topics.deleted"}}
        <LinkTo
          @route="topic"
          @models={{array "-" this.reviewable.removed_topic_id}}
        >{{i18n "review.topics.original"}}</LinkTo>
      </span>
    {{/if}}
  </div>
  */
  {
    "id": "ugzZqGzh",
    "block": "[[[10,0],[14,0,\"post-topic\"],[12],[1,\"\\n\"],[41,[30,0,[\"reviewable\",\"topic\"]],[[[1,\"    \"],[8,[39,1],null,[[\"@topic\",\"@showPrivateMessageIcon\"],[[30,0,[\"reviewable\",\"topic\"]],true]],null],[1,\"\\n    \"],[10,3],[15,6,[30,0,[\"reviewable\",\"target_url\"]]],[14,0,\"title-text\"],[12],[1,[28,[35,2],[[30,0,[\"reviewable\",\"topic\",\"fancyTitle\"]]],null]],[13],[1,\"\\n    \"],[1,[28,[35,3],[[30,0,[\"reviewable\",\"category\"]]],null]],[1,\"\\n    \"],[8,[39,4],null,[[\"@tags\",\"@tagName\"],[[30,0,[\"reviewable\",\"topic_tags\"]],\"\"]],null],[1,\"\\n\"]],[]],[[[41,[48,[30,1]],[[[1,\"    \"],[18,1,null],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,1],[14,0,\"title-text\"],[12],[1,\"\\n      \"],[1,[28,[35,7],[\"review.topics.deleted\"],null]],[1,\"\\n      \"],[8,[39,8],null,[[\"@route\",\"@models\"],[\"topic\",[28,[37,9],[\"-\",[30,0,[\"reviewable\",\"removed_topic_id\"]]],null]]],[[\"default\"],[[[[1,[28,[35,7],[\"review.topics.original\"],null]]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]],[]]],[13]],[\"&default\"],false,[\"if\",\"topic-status\",\"html-safe\",\"category-badge\",\"reviewable-tags\",\"has-block\",\"yield\",\"i18n\",\"link-to\",\"array\"]]",
    "moduleName": "discourse/components/reviewable-topic-link.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});