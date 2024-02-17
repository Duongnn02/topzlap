define("discourse/components/category-unread", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.category.unreadTopics}}
    <a
      href={{this.category.unreadUrl}}
      title={{i18n "topic.unread_topics" count=this.category.unreadTopics}}
      class="badge new-posts badge-notification"
    >{{i18n
        "filters.unread.lower_title_with_count"
        count=this.category.unreadTopics
      }}</a>
  {{/if}}
  {{#if this.category.newTopics}}
    <a
      href={{this.category.newUrl}}
      title={{i18n "topic.new_topics" count=this.category.newTopics}}
      class="badge new-posts badge-notification"
    >{{i18n
        "filters.new.lower_title_with_count"
        count=this.category.newTopics
      }}</a>
  {{/if}}
  */
  {
    "id": "Ht0eL+RD",
    "block": "[[[41,[30,0,[\"category\",\"unreadTopics\"]],[[[1,\"  \"],[10,3],[15,6,[30,0,[\"category\",\"unreadUrl\"]]],[15,\"title\",[28,[37,1],[\"topic.unread_topics\"],[[\"count\"],[[30,0,[\"category\",\"unreadTopics\"]]]]]],[14,0,\"badge new-posts badge-notification\"],[12],[1,[28,[35,1],[\"filters.unread.lower_title_with_count\"],[[\"count\"],[[30,0,[\"category\",\"unreadTopics\"]]]]]],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"category\",\"newTopics\"]],[[[1,\"  \"],[10,3],[15,6,[30,0,[\"category\",\"newUrl\"]]],[15,\"title\",[28,[37,1],[\"topic.new_topics\"],[[\"count\"],[[30,0,[\"category\",\"newTopics\"]]]]]],[14,0,\"badge new-posts badge-notification\"],[12],[1,[28,[35,1],[\"filters.new.lower_title_with_count\"],[[\"count\"],[[30,0,[\"category\",\"newTopics\"]]]]]],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"i18n\"]]",
    "moduleName": "discourse/components/category-unread.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "span"
  }));
  _exports.default = _default;
});