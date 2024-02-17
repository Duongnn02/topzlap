define("discourse/components/user-stream-item", ["exports", "@ember/component", "@ember/template-factory", "discourse/widgets/post-small-action", "@ember/object", "discourse/lib/computed", "discourse/lib/url", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _postSmallAction, _object, _computed, _url, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/widgets/post-small-action",0,"@ember/object",0,"discourse/lib/computed",0,"discourse/lib/url",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="user-stream-item__header info">
    <a
      href={{this.userUrl}}
      data-user-card={{(or @item.draft_username @item.username)}}
      class="avatar-link"
    >
      <div class="avatar-wrapper">
        {{avatar @item imageSize="large" extraClasses="actor" ignoreTitle="true"}}
      </div>
    </a>
  
    <div class="user-stream-item__details">
      <div class="stream-topic-title">
        <TopicStatus @topic={{@item}} @disableActions={{true}} />
        <span class="title">
          {{#if @item.postUrl}}
            <a href={{@item.postUrl}}>{{html-safe @item.title}}</a>
          {{else}}
            {{html-safe @item.title}}
          {{/if}}
        </span>
      </div>
      <div class="category">{{category-link @item.category}}</div>
    </div>
  
    {{#if @item.draftType}}
      <span class="draft-type">{{html-safe @item.draftType}}</span>
    {{else}}
      <ExpandPost @item={{@item}} />
    {{/if}}
    <span class="time">{{format-date @item.created_at}}</span>
  
    {{#if @item.deleted_by}}
      <span class="delete-info">
        {{d-icon "far-trash-alt"}}
        {{avatar
          @item.deleted_by
          imageSize="tiny"
          extraClasses="actor"
          ignoreTitle="true"
        }}
        {{format-date @item.deleted_at leaveAgo="true"}}
      </span>
    {{/if}}
  
    <span>
      <PluginOutlet
        @name="user-stream-item-header"
        @connectorTagName="div"
        @outletArgs={{hash item=@item}}
      />
    </span>
  </div>
  
  {{#if this.actionDescription}}
    <p class="excerpt">{{this.actionDescription}}</p>
  {{/if}}
  
  <p
    data-topic-id={{@item.topic_id}}
    data-post-id={{@item.post_id}}
    data-user-id={{@item.user_id}}
    class="excerpt"
  >
    {{~#if @item.expandedExcerpt}}
      {{~html-safe @item.expandedExcerpt~}}
    {{else}}
      {{~html-safe @item.excerpt~}}
    {{/if~}}
  </p>
  
  {{#each @item.children as |child|}}
    {{! DEPRECATED: 'child-actions' class }}
    <div class="user-stream-item-actions child-actions">
      {{d-icon child.icon class="icon"}}
      {{#each child.items as |grandChild|}}
        <a
          href={{grandChild.userUrl}}
          data-user-card={{grandChild.username}}
          class="avatar-link"
        >
          <div class="avatar-wrapper">
            {{avatar
              grandChild
              imageSize="tiny"
              extraClasses="actor"
              ignoreTitle="true"
              avatarTemplatePath="acting_avatar_template"
            }}
          </div>
        </a>
        {{#if grandChild.edit_reason}}
          &mdash;
          <span class="edit-reason">{{grandChild.edit_reason}}</span>{{/if}}
      {{/each}}
    </div>
  {{/each}}
  
  {{#if @item.editableDraft}}
    <div class="user-stream-item-draft-actions">
      <DButton
        @action={{@resumeDraft}}
        @actionParam={{@item}}
        @icon="pencil-alt"
        @label="drafts.resume"
        @class="btn-default resume-draft"
      />
      <DButton
        @action={{@removeDraft}}
        @actionParam={{@item}}
        @icon="far-trash-alt"
        @class="btn-danger remove-draft"
        @title="drafts.remove"
      />
    </div>
  {{/if}}
  
  {{yield to="bottom"}}
  */
  {
    "id": "j4rfZ63I",
    "block": "[[[10,0],[14,0,\"user-stream-item__header info\"],[12],[1,\"\\n  \"],[10,3],[15,6,[30,0,[\"userUrl\"]]],[15,\"data-user-card\",[28,[37,0],[[30,1,[\"draft_username\"]],[30,1,[\"username\"]]],null]],[14,0,\"avatar-link\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"avatar-wrapper\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[[30,1]],[[\"imageSize\",\"extraClasses\",\"ignoreTitle\"],[\"large\",\"actor\",\"true\"]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"user-stream-item__details\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"stream-topic-title\"],[12],[1,\"\\n      \"],[8,[39,2],null,[[\"@topic\",\"@disableActions\"],[[30,1],true]],null],[1,\"\\n      \"],[10,1],[14,0,\"title\"],[12],[1,\"\\n\"],[41,[30,1,[\"postUrl\"]],[[[1,\"          \"],[10,3],[15,6,[30,1,[\"postUrl\"]]],[12],[1,[28,[35,4],[[30,1,[\"title\"]]],null]],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[1,[28,[35,4],[[30,1,[\"title\"]]],null]],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"category\"],[12],[1,[28,[35,5],[[30,1,[\"category\"]]],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,1,[\"draftType\"]],[[[1,\"    \"],[10,1],[14,0,\"draft-type\"],[12],[1,[28,[35,4],[[30,1,[\"draftType\"]]],null]],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[8,[39,6],null,[[\"@item\"],[[30,1]]],null],[1,\"\\n\"]],[]]],[1,\"  \"],[10,1],[14,0,\"time\"],[12],[1,[28,[35,7],[[30,1,[\"created_at\"]]],null]],[13],[1,\"\\n\\n\"],[41,[30,1,[\"deleted_by\"]],[[[1,\"    \"],[10,1],[14,0,\"delete-info\"],[12],[1,\"\\n      \"],[1,[28,[35,8],[\"far-trash-alt\"],null]],[1,\"\\n      \"],[1,[28,[35,1],[[30,1,[\"deleted_by\"]]],[[\"imageSize\",\"extraClasses\",\"ignoreTitle\"],[\"tiny\",\"actor\",\"true\"]]]],[1,\"\\n      \"],[1,[28,[35,7],[[30,1,[\"deleted_at\"]]],[[\"leaveAgo\"],[\"true\"]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,9],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-stream-item-header\",\"div\",[28,[37,10],null,[[\"item\"],[[30,1]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"actionDescription\"]],[[[1,\"  \"],[10,2],[14,0,\"excerpt\"],[12],[1,[30,0,[\"actionDescription\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,2],[15,\"data-topic-id\",[30,1,[\"topic_id\"]]],[15,\"data-post-id\",[30,1,[\"post_id\"]]],[15,\"data-user-id\",[30,1,[\"user_id\"]]],[14,0,\"excerpt\"],[12],[41,[30,1,[\"expandedExcerpt\"]],[[[1,[28,[35,4],[[30,1,[\"expandedExcerpt\"]]],null]]],[]],[[[1,[28,[35,4],[[30,1,[\"excerpt\"]]],null]]],[]]],[13],[1,\"\\n\\n\"],[42,[28,[37,12],[[28,[37,12],[[30,1,[\"children\"]]],null]],null],null,[[[1,\"  \"],[10,0],[14,0,\"user-stream-item-actions child-actions\"],[12],[1,\"\\n    \"],[1,[28,[35,8],[[30,2,[\"icon\"]]],[[\"class\"],[\"icon\"]]]],[1,\"\\n\"],[42,[28,[37,12],[[28,[37,12],[[30,2,[\"items\"]]],null]],null],null,[[[1,\"      \"],[10,3],[15,6,[30,3,[\"userUrl\"]]],[15,\"data-user-card\",[30,3,[\"username\"]]],[14,0,\"avatar-link\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"avatar-wrapper\"],[12],[1,\"\\n          \"],[1,[28,[35,1],[[30,3]],[[\"imageSize\",\"extraClasses\",\"ignoreTitle\",\"avatarTemplatePath\"],[\"tiny\",\"actor\",\"true\",\"acting_avatar_template\"]]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"],[41,[30,3,[\"edit_reason\"]],[[[1,\"        —\\n        \"],[10,1],[14,0,\"edit-reason\"],[12],[1,[30,3,[\"edit_reason\"]]],[13]],[]],null],[1,\"\\n\"]],[3]],null],[1,\"  \"],[13],[1,\"\\n\"]],[2]],null],[1,\"\\n\"],[41,[30,1,[\"editableDraft\"]],[[[1,\"  \"],[10,0],[14,0,\"user-stream-item-draft-actions\"],[12],[1,\"\\n    \"],[8,[39,13],null,[[\"@action\",\"@actionParam\",\"@icon\",\"@label\",\"@class\"],[[30,4],[30,1],\"pencil-alt\",\"drafts.resume\",\"btn-default resume-draft\"]],null],[1,\"\\n    \"],[8,[39,13],null,[[\"@action\",\"@actionParam\",\"@icon\",\"@class\",\"@title\"],[[30,5],[30,1],\"far-trash-alt\",\"btn-danger remove-draft\",\"drafts.remove\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[18,6,null]],[\"@item\",\"child\",\"grandChild\",\"@resumeDraft\",\"@removeDraft\",\"&bottom\"],false,[\"or\",\"avatar\",\"topic-status\",\"if\",\"html-safe\",\"category-link\",\"expand-post\",\"format-date\",\"d-icon\",\"plugin-outlet\",\"hash\",\"each\",\"-track-array\",\"d-button\",\"yield\"]]",
    "moduleName": "discourse/components/user-stream-item.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("item.draft_username", "item.username"), (_obj = {
    tagName: "li",
    classNameBindings: [":user-stream-item", ":item",
    // DEPRECATED: 'item' class
    "hidden", "item.deleted:deleted", "moderatorAction"],
    hidden: (0, _object.computed)("item.hidden", function () {
      return this.get("item.hidden") && !(this.currentUser && this.currentUser.staff);
    }),
    moderatorAction: (0, _computed.propertyEqual)("item.post_type", "site.post_types.moderator_action"),
    actionDescription: (0, _postSmallAction.actionDescription)("item.action_code", "item.created_at", "item.action_code_who", "item.action_code_path"),
    userUrl(draftUsername, username) {
      return (0, _url.userPath)((draftUsername || username).toLowerCase());
    }
  }, (_applyDecoratedDescriptor(_obj, "userUrl", [_dec], Object.getOwnPropertyDescriptor(_obj, "userUrl"), _obj)), _obj))));
  _exports.default = _default;
});