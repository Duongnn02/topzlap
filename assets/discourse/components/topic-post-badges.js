define("discourse/components/topic-post-badges", ["exports", "@ember/component", "@ember/template-factory", "I18n", "@ember/object/computed"], function (_exports, _component, _templateFactory, _I18n, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.displayUnreadPosts}}
    &nbsp;<a
      href={{this.url}}
      title={{i18n "topic.unread_posts" count=this.displayUnreadPosts}}
      class="badge badge-notification unread-posts"
    >{{this.displayUnreadPosts}}</a>
  {{/if}}
  {{#if this.unseen}}
    &nbsp;<a
      href={{this.url}}
      title={{i18n "topic.new"}}
      class="badge badge-notification new-topic"
    >{{this.newDotText}}</a>
  {{/if}}
  */
  {
    "id": "Hllq1dd0",
    "block": "[[[41,[30,0,[\"displayUnreadPosts\"]],[[[1,\"   \"],[10,3],[15,6,[30,0,[\"url\"]]],[15,\"title\",[28,[37,1],[\"topic.unread_posts\"],[[\"count\"],[[30,0,[\"displayUnreadPosts\"]]]]]],[14,0,\"badge badge-notification unread-posts\"],[12],[1,[30,0,[\"displayUnreadPosts\"]]],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"unseen\"]],[[[1,\"   \"],[10,3],[15,6,[30,0,[\"url\"]]],[15,\"title\",[28,[37,1],[\"topic.new\"],null]],[14,0,\"badge badge-notification new-topic\"],[12],[1,[30,0,[\"newDotText\"]]],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"i18n\"]]",
    "moduleName": "discourse/components/topic-post-badges.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "span",
    classNameBindings: [":topic-post-badges"],
    newDotText: null,
    init() {
      this._super(...arguments);
      this.set("newDotText", this.currentUser && this.currentUser.trust_level > 0 ? " " : _I18n.default.t("filters.new.lower_title"));
    },
    displayUnreadPosts: (0, _computed.or)("newPosts", "unreadPosts")
  }));
  _exports.default = _default;
});