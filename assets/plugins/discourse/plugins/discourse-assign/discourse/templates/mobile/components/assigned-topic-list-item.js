define("discourse/plugins/discourse-assign/discourse/templates/mobile/components/assigned-topic-list-item", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <td class="topic-list-data">
    <div class="main-link">
      <TopicStatus @topic={{topic}} />
      {{~#if isPrivateMessage}}
        {{~d-icon "envelope" class="private-message-icon"}}
      {{~/if}}
      {{~topic-link topic}}
      {{#if topic.unseen}}
        <span class="badge-notification new-topic"></span>
      {{/if}}
      {{#if topic.hasExcerpt}}
        <div class="topic-excerpt">
          {{html-safe topic.excerpt}}
          {{#if topic.excerptTruncated}}
            {{#unless topic.canClearPin}}<a href={{topic.url}}>{{i18n
                  "read_more"
                }}</a>{{/unless}}
          {{/if}}
          {{#if topic.canClearPin}}
            <a
              href
              {{action "clearPin" topic}}
              title={{i18n "topic.clear_pin.help"}}
            >{{i18n "topic.clear_pin.title"}}</a>
          {{/if}}
        </div>
      {{/if}}
    </div>
    <div class="pull-right topic-list-num">
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
    </div>
    <div class="clearfix"></div>
    <div class="topic-item-stats clearfix">
      {{discourse-tags topic mode="list" tagsForUser=tagsForUser}}
      <div class="pull-right topic-list-num">
        {{raw
          "list/activity-column"
          topic=topic
          tagName="div"
          class="num activity last"
        }}
        <a
          href={{topic.lastPostUrl}}
          title="{{i18n 'last_post'}}: {{html-safe raw-date topic.bumped_at}}"
        >{{topic.last_poster_username}}</a>
      </div>
      {{#unless hideCategory}}
        <div class="category">
          {{category-link topic.category}}
        </div>
      {{/unless}}
      <div class="clearfix"></div>
    </div>
  </td>
  */
  {
    "id": "ZUmTj8Pp",
    "block": "[[[10,\"td\"],[14,0,\"topic-list-data\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"main-link\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@topic\"],[[99,1,[\"@topic\"]]]],null],[41,[33,3],[[[1,[28,[35,4],[\"envelope\"],[[\"class\"],[\"private-message-icon\"]]]]],[]],null],[1,[28,[35,5],[[33,1]],null]],[1,\"\\n\"],[41,[33,1,[\"unseen\"]],[[[1,\"      \"],[10,1],[14,0,\"badge-notification new-topic\"],[12],[13],[1,\"\\n\"]],[]],null],[41,[33,1,[\"hasExcerpt\"]],[[[1,\"      \"],[10,0],[14,0,\"topic-excerpt\"],[12],[1,\"\\n        \"],[1,[28,[35,6],[[33,1,[\"excerpt\"]]],null]],[1,\"\\n\"],[41,[33,1,[\"excerptTruncated\"]],[[[1,\"          \"],[41,[51,[33,1,[\"canClearPin\"]]],[[[10,3],[15,6,[33,1,[\"url\"]]],[12],[1,[28,[35,8],[\"read_more\"],null]],[13]],[]],null],[1,\"\\n\"]],[]],null],[41,[33,1,[\"canClearPin\"]],[[[1,\"          \"],[11,3],[24,6,\"\"],[16,\"title\",[28,[37,8],[\"topic.clear_pin.help\"],null]],[4,[38,9],[[30,0],\"clearPin\",[33,1]],null],[12],[1,[28,[35,8],[\"topic.clear_pin.title\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"pull-right topic-list-num\"],[12],[1,\"\\n\"],[41,[33,1,[\"assigned_to_user\"]],[[[1,\"      \"],[1,[28,[35,10],null,[[\"topic\",\"assignee\",\"unassign\",\"reassign\"],[[33,1],[33,1,[\"assigned_to_user\",\"username\"]],[33,11],[33,12]]]]],[1,\"\\n\"]],[]],[[[41,[33,1,[\"assigned_to_group\"]],[[[1,\"      \"],[1,[28,[35,10],null,[[\"topic\",\"assignee\",\"group\",\"unassign\",\"reassign\"],[[33,1],[33,1,[\"assigned_to_group\",\"name\"]],true,[33,11],[33,12]]]]],[1,\"\\n\"]],[]],[[[1,\"      \"],[1,[28,[35,10],null,[[\"topic\",\"unassign\"],[[33,1],[33,11]]]]],[1,\"\\n    \"]],[]]]],[]]],[1,\"  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"clearfix\"],[12],[13],[1,\"\\n  \"],[10,0],[14,0,\"topic-item-stats clearfix\"],[12],[1,\"\\n    \"],[1,[28,[35,13],[[33,1]],[[\"mode\",\"tagsForUser\"],[\"list\",[33,14]]]]],[1,\"\\n    \"],[10,0],[14,0,\"pull-right topic-list-num\"],[12],[1,\"\\n      \"],[1,[28,[35,15],[\"list/activity-column\"],[[\"topic\",\"tagName\",\"class\"],[[33,1],\"div\",\"num activity last\"]]]],[1,\"\\n      \"],[10,3],[15,6,[33,1,[\"lastPostUrl\"]]],[15,\"title\",[29,[[28,[37,8],[\"last_post\"],null],\": \",[28,[37,6],[[33,16],[33,1,[\"bumped_at\"]]],null]]]],[12],[1,[33,1,[\"last_poster_username\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[41,[51,[33,17]],[[[1,\"      \"],[10,0],[14,0,\"category\"],[12],[1,\"\\n        \"],[1,[28,[35,18],[[33,1,[\"category\"]]],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[10,0],[14,0,\"clearfix\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"topic-status\",\"topic\",\"if\",\"isPrivateMessage\",\"d-icon\",\"topic-link\",\"html-safe\",\"unless\",\"i18n\",\"action\",\"assign-actions-dropdown\",\"unassign\",\"reassign\",\"discourse-tags\",\"tagsForUser\",\"raw\",\"raw-date\",\"hideCategory\",\"category-link\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse/templates/mobile/components/assigned-topic-list-item.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});