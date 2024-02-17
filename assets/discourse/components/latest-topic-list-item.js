define("discourse/components/latest-topic-list-item", ["exports", "@ember/component", "@ember/template-factory", "discourse/components/topic-list-item", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _topicListItem, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/components/topic-list-item",0,"@ember/component",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <PluginOutlet @name="above-latest-topic-list-item" @connectorTagName="div" />
  <div class="topic-poster">
    <UserLink @user={{this.topic.lastPosterUser}}>
      {{avatar this.topic.lastPosterUser imageSize="large"}}
    </UserLink>
    <UserAvatarFlair @user={{this.topic.lastPosterUser}} />
  </div>
  <div class="main-link">
    <div class="top-row">
      {{raw "topic-status" topic=this.topic}}
      {{topic-link this.topic}}
      {{~#if this.topic.featured_link}}
        {{topic-featured-link this.topic}}
      {{/if}}
      <TopicPostBadges
        @unreadPosts={{this.topic.unread_posts}}
        @unseen={{this.topic.unseen}}
        @url={{this.topic.lastUnreadUrl}}
      />
    </div>
    <div class="bottom-row">
      {{category-link this.topic.category}}{{discourse-tags
        this.topic
        mode="list"
      }}{{! intentionally inline to avoid whitespace}}
    </div>
  </div>
  <div class="topic-stats">
    {{raw "list/posts-count-column" topic=this.topic tagName="div"}}
    <div class="topic-last-activity">
      <a
        href={{this.topic.lastPostUrl}}
        title={{this.topic.bumpedAtTitle}}
      >{{format-date this.topic.bumpedAt format="tiny" noTitle="true"}}</a>
    </div>
  </div>
  */
  {
    "id": "VdCtuFHD",
    "block": "[[[8,[39,0],null,[[\"@name\",\"@connectorTagName\"],[\"above-latest-topic-list-item\",\"div\"]],null],[1,\"\\n\"],[10,0],[14,0,\"topic-poster\"],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@user\"],[[30,0,[\"topic\",\"lastPosterUser\"]]]],[[\"default\"],[[[[1,\"\\n    \"],[1,[28,[35,2],[[30,0,[\"topic\",\"lastPosterUser\"]]],[[\"imageSize\"],[\"large\"]]]],[1,\"\\n  \"]],[]]]]],[1,\"\\n  \"],[8,[39,3],null,[[\"@user\"],[[30,0,[\"topic\",\"lastPosterUser\"]]]],null],[1,\"\\n\"],[13],[1,\"\\n\"],[10,0],[14,0,\"main-link\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"top-row\"],[12],[1,\"\\n    \"],[1,[28,[35,4],[\"topic-status\"],[[\"topic\"],[[30,0,[\"topic\"]]]]]],[1,\"\\n    \"],[1,[28,[35,5],[[30,0,[\"topic\"]]],null]],[41,[30,0,[\"topic\",\"featured_link\"]],[[[1,\"      \"],[1,[28,[35,7],[[30,0,[\"topic\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"    \"],[8,[39,8],null,[[\"@unreadPosts\",\"@unseen\",\"@url\"],[[30,0,[\"topic\",\"unread_posts\"]],[30,0,[\"topic\",\"unseen\"]],[30,0,[\"topic\",\"lastUnreadUrl\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"bottom-row\"],[12],[1,\"\\n    \"],[1,[28,[35,9],[[30,0,[\"topic\",\"category\"]]],null]],[1,[28,[35,10],[[30,0,[\"topic\"]]],[[\"mode\"],[\"list\"]]]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[10,0],[14,0,\"topic-stats\"],[12],[1,\"\\n  \"],[1,[28,[35,4],[\"list/posts-count-column\"],[[\"topic\",\"tagName\"],[[30,0,[\"topic\"]],\"div\"]]]],[1,\"\\n  \"],[10,0],[14,0,\"topic-last-activity\"],[12],[1,\"\\n    \"],[10,3],[15,6,[30,0,[\"topic\",\"lastPostUrl\"]]],[15,\"title\",[30,0,[\"topic\",\"bumpedAtTitle\"]]],[12],[1,[28,[35,11],[[30,0,[\"topic\",\"bumpedAt\"]]],[[\"format\",\"noTitle\"],[\"tiny\",\"true\"]]]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"plugin-outlet\",\"user-link\",\"avatar\",\"user-avatar-flair\",\"raw\",\"topic-link\",\"if\",\"topic-featured-link\",\"topic-post-badges\",\"category-link\",\"discourse-tags\",\"format-date\"]]",
    "moduleName": "discourse/components/latest-topic-list-item.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("topic"), (_obj = {
    attributeBindings: ["topic.id:data-topic-id"],
    classNameBindings: [":latest-topic-list-item", "unboundClassNames"],
    showEntrance: _topicListItem.showEntrance,
    navigateToTopic: _topicListItem.navigateToTopic,
    click(e) {
      // for events undefined has a different meaning than false
      if (this.showEntrance(e) === false) {
        return false;
      }
      return this.unhandledRowClick(e, this.topic);
    },
    // Can be overwritten by plugins to handle clicks on other parts of the row
    unhandledRowClick() {},
    unboundClassNames(topic) {
      let classes = [];
      if (topic.get("category")) {
        classes.push("category-" + topic.get("category.fullSlug"));
      }
      if (topic.get("tags")) {
        topic.get("tags").forEach(tagName => classes.push("tag-" + tagName));
      }
      ["liked", "archived", "bookmarked", "pinned", "closed", "visited"].forEach(name => {
        if (topic.get(name)) {
          classes.push(name);
        }
      });
      return classes.join(" ");
    }
  }, (_applyDecoratedDescriptor(_obj, "unboundClassNames", [_dec], Object.getOwnPropertyDescriptor(_obj, "unboundClassNames"), _obj)), _obj))));
  _exports.default = _default;
});