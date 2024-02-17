define("discourse/components/featured-topic", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{raw "topic-status" topic=this.topic}}
  <a href={{this.topic.lastUnreadUrl}} class="title">{{html-safe
      this.topic.fancyTitle
    }}</a>
  <TopicPostBadges
    @unreadPosts={{this.topic.unread_posts}}
    @unseen={{this.topic.unseen}}
    @url={{this.topic.lastUnreadUrl}}
  />
  
  <a href={{this.topic.lastPostUrl}} class="last-posted-at">{{format-age
      this.topic.last_posted_at
    }}</a>
  */
  {
    "id": "3LpWP1hz",
    "block": "[[[1,[28,[35,0],[\"topic-status\"],[[\"topic\"],[[30,0,[\"topic\"]]]]]],[1,\"\\n\"],[10,3],[15,6,[30,0,[\"topic\",\"lastUnreadUrl\"]]],[14,0,\"title\"],[12],[1,[28,[35,1],[[30,0,[\"topic\",\"fancyTitle\"]]],null]],[13],[1,\"\\n\"],[8,[39,2],null,[[\"@unreadPosts\",\"@unseen\",\"@url\"],[[30,0,[\"topic\",\"unread_posts\"]],[30,0,[\"topic\",\"unseen\"]],[30,0,[\"topic\",\"lastUnreadUrl\"]]]],null],[1,\"\\n\\n\"],[10,3],[15,6,[30,0,[\"topic\",\"lastPostUrl\"]]],[14,0,\"last-posted-at\"],[12],[1,[28,[35,3],[[30,0,[\"topic\",\"last_posted_at\"]]],null]],[13]],[],false,[\"raw\",\"html-safe\",\"topic-post-badges\",\"format-age\"]]",
    "moduleName": "discourse/components/featured-topic.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    classNameBindings: [":featured-topic"],
    attributeBindings: ["topic.id:data-topic-id"],
    click(e) {
      if (e.target.closest(".last-posted-at")) {
        this.appEvents.trigger("topic-entrance:show", {
          topic: this.topic,
          position: $(e.target).offset()
        });
        return false;
      }
    }
  }));
  _exports.default = _default;
});