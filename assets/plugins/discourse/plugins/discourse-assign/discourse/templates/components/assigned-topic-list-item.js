define("discourse/plugins/discourse-assign/discourse/templates/components/assigned-topic-list-item", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{!
    The `~` syntax strip spaces between the elements, making it produce
    `<a class=topic-post-badges>Some text</a><span class=topic-post-badges>`,
    with no space between them.
    This causes the topic-post-badge to be considered the same word as "text"
    at the end of the link, preventing it from line wrapping onto its own line.
  }}
  {{#if bulkSelectEnabled}}
    <td class="bulk-select topic-list-data">
      <input type="checkbox" class="bulk-select" />
    </td>
  {{/if}}
  <td class="main-link clearfix topic-list-data" colspan="1">
    <span class="link-top-line">
      {{~raw "topic-status" topic=topic}}
      {{~#if isPrivateMessage}}
        {{~d-icon "envelope" class="private-message-icon"}}
      {{~/if}}
      {{~topic-link topic class="raw-link raw-topic-link"}}
      {{~#if topic.featured_link}}
        {{~topic-featured-link topic}}
      {{~/if}}
      {{~#if showTopicPostBadges}}
        {{~raw
          "topic-post-badges"
          unread=topic.unread
          unseen=topic.unseen
          url=topic.lastUnreadUrl
          newDotText=newDotText
        }}
      {{~/if}}
    </span>
    <div class="link-bottom-line">
      {{#unless hideCategory}}
        {{#unless topic.isPinnedUncategorized}}
          {{category-link topic.category}}
        {{/unless}}
      {{/unless}}
      {{discourse-tags topic mode="list" tagsForUser=tagsForUser}}
      {{raw
        "list/action-list"
        topic=topic
        postNumbers=topic.liked_post_numbers
        className="likes"
        icon="heart"
      }}
    </div>
    {{#if expandPinned}}
      {{raw "list/topic-excerpt" topic=topic}}
    {{/if}}
  </td>
  
  {{#if showPosters}}
    {{raw "list/posters-column" posters=topic.featuredUsers}}
  {{/if}}
  
  {{raw "list/posts-count-column" topic=topic}}
  
  <td class="num views {{topic.viewsHeat}} topic-list-data">{{number
      topic.views
      numberKey="views_long"
    }}</td>
  {{raw
    "list/activity-column"
    topic=topic
    class="num topic-list-data"
    tagName="td"
  }}
  <td class="topic-list-data">
    {{#if topic.assigned_to_user}}
      {{assign-actions-dropdown
        topic=topic
        assignee=topic.assigned_to_user.username
        unassign=unassign
        reassign=reassign
      }}
    {{else if topic.assigned_to_group}}
      {{assign-actions-dropdown
        topic=topic
        assignee=topic.assigned_to_group.name
        group=true
        unassign=unassign
        reassign=reassign
      }}
    {{else}}
      {{assign-actions-dropdown topic=topic unassign=unassign}}
    {{/if}}
  </td>
  */
  {
    "id": "7qC53uC+",
    "block": "[[[41,[33,1],[[[1,\"  \"],[10,\"td\"],[14,0,\"bulk-select topic-list-data\"],[12],[1,\"\\n    \"],[10,\"input\"],[14,0,\"bulk-select\"],[14,4,\"checkbox\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[10,\"td\"],[14,0,\"main-link clearfix topic-list-data\"],[14,\"colspan\",\"1\"],[12],[1,\"\\n  \"],[10,1],[14,0,\"link-top-line\"],[12],[1,[28,[35,2],[\"topic-status\"],[[\"topic\"],[[33,3]]]]],[41,[33,4],[[[1,[28,[35,5],[\"envelope\"],[[\"class\"],[\"private-message-icon\"]]]]],[]],null],[1,[28,[35,6],[[33,3]],[[\"class\"],[\"raw-link raw-topic-link\"]]]],[41,[33,3,[\"featured_link\"]],[[[1,[28,[35,7],[[33,3]],null]]],[]],null],[41,[33,8],[[[1,[28,[35,2],[\"topic-post-badges\"],[[\"unread\",\"unseen\",\"url\",\"newDotText\"],[[33,3,[\"unread\"]],[33,3,[\"unseen\"]],[33,3,[\"lastUnreadUrl\"]],[33,9]]]]]],[]],null],[1,\"  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"link-bottom-line\"],[12],[1,\"\\n\"],[41,[51,[33,11]],[[[41,[51,[33,3,[\"isPinnedUncategorized\"]]],[[[1,\"        \"],[1,[28,[35,12],[[33,3,[\"category\"]]],null]],[1,\"\\n\"]],[]],null]],[]],null],[1,\"    \"],[1,[28,[35,13],[[33,3]],[[\"mode\",\"tagsForUser\"],[\"list\",[33,14]]]]],[1,\"\\n    \"],[1,[28,[35,2],[\"list/action-list\"],[[\"topic\",\"postNumbers\",\"className\",\"icon\"],[[33,3],[33,3,[\"liked_post_numbers\"]],\"likes\",\"heart\"]]]],[1,\"\\n  \"],[13],[1,\"\\n\"],[41,[33,15],[[[1,\"    \"],[1,[28,[35,2],[\"list/topic-excerpt\"],[[\"topic\"],[[33,3]]]]],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[41,[33,16],[[[1,\"  \"],[1,[28,[35,2],[\"list/posters-column\"],[[\"posters\"],[[33,3,[\"featuredUsers\"]]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[1,[28,[35,2],[\"list/posts-count-column\"],[[\"topic\"],[[33,3]]]]],[1,\"\\n\\n\"],[10,\"td\"],[15,0,[29,[\"num views \",[33,3,[\"viewsHeat\"]],\" topic-list-data\"]]],[12],[1,[28,[35,17],[[33,3,[\"views\"]]],[[\"numberKey\"],[\"views_long\"]]]],[13],[1,\"\\n\"],[1,[28,[35,2],[\"list/activity-column\"],[[\"topic\",\"class\",\"tagName\"],[[33,3],\"num topic-list-data\",\"td\"]]]],[1,\"\\n\"],[10,\"td\"],[14,0,\"topic-list-data\"],[12],[1,\"\\n\"],[41,[33,3,[\"assigned_to_user\"]],[[[1,\"    \"],[1,[28,[35,18],null,[[\"topic\",\"assignee\",\"unassign\",\"reassign\"],[[33,3],[33,3,[\"assigned_to_user\",\"username\"]],[33,19],[33,20]]]]],[1,\"\\n\"]],[]],[[[41,[33,3,[\"assigned_to_group\"]],[[[1,\"    \"],[1,[28,[35,18],null,[[\"topic\",\"assignee\",\"group\",\"unassign\",\"reassign\"],[[33,3],[33,3,[\"assigned_to_group\",\"name\"]],true,[33,19],[33,20]]]]],[1,\"\\n\"]],[]],[[[1,\"    \"],[1,[28,[35,18],null,[[\"topic\",\"unassign\"],[[33,3],[33,19]]]]],[1,\"\\n  \"]],[]]]],[]]],[13]],[],false,[\"if\",\"bulkSelectEnabled\",\"raw\",\"topic\",\"isPrivateMessage\",\"d-icon\",\"topic-link\",\"topic-featured-link\",\"showTopicPostBadges\",\"newDotText\",\"unless\",\"hideCategory\",\"category-link\",\"discourse-tags\",\"tagsForUser\",\"expandPinned\",\"showPosters\",\"number\",\"assign-actions-dropdown\",\"unassign\",\"reassign\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse/templates/components/assigned-topic-list-item.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});