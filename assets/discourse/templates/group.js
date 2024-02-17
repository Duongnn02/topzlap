define("discourse/templates/group", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <span>
    <PluginOutlet
      @name="before-group-container"
      @connectorTagName="div"
      @outletArgs={{hash group=this.model}}
    />
  </span>
  
  <div class="container group group-{{this.model.name}}">
    {{#if this.showTooltip}}
      <div class="group-delete-tooltip">
        <p>{{i18n "admin.groups.delete_automatic_group"}}</p>
      </div>
    {{/if}}
  
    <div class="group-details-container">
      <div class="group-info">
        {{#if
          (or
            this.model.flair_icon this.model.flair_url this.model.flair_bg_color
          )
        }}
          <div class="group-avatar-flair">
            <AvatarFlair
              @flairName={{this.model.name}}
              @flairUrl={{or this.model.flair_icon this.model.flair_url}}
              @flairBgColor={{this.model.flair_bg_color}}
              @flairColor={{this.model.flair_color}}
            />
          </div>
        {{/if}}
  
        <div class="group-info-names">
          <span class="group-info-name">{{this.groupName}}</span>
  
          {{#if this.model.full_name}}<div
              class="group-info-full-name"
            >{{this.model.name}}</div>{{/if}}
        </div>
  
        <div class="group-details-button">
          <GroupMembershipButton
            @tagName=""
            @model={{this.model}}
            @showLogin={{route-action "showLogin"}}
          />
  
          {{#if this.currentUser.admin}}
            {{#if this.model.automatic}}
              <DButton
                @action={{action "toggleDeleteTooltip"}}
                @class="btn-default"
                @icon="question-circle"
                @label="admin.groups.delete"
              />
            {{else}}
              <DButton
                @action={{action "destroyGroup"}}
                @disabled={{this.destroying}}
                @icon="trash-alt"
                @class="btn-danger"
                @label="admin.groups.delete"
              />
            {{/if}}
          {{/if}}
  
          {{#if this.displayGroupMessageButton}}
            <DButton
              @action={{action "messageGroup"}}
              @class="btn-primary group-message-button"
              @icon="envelope"
              @label="groups.message"
            />
          {{/if}}
        </div>
  
        <span>
          <PluginOutlet
            @name="group-details-after"
            @connectorTagName="div"
            @outletArgs={{hash model=this.model}}
          />
        </span>
      </div>
  
      {{#if this.model.bio_cooked}}
        <hr />
  
        <div class="group-bio">
          <p>{{html-safe this.model.bio_cooked}}</p>
        </div>
      {{/if}}
    </div>
  
    <div class="user-content-wrapper">
      <section class="user-primary-navigation">
        <div class="container">
          <GroupNavigation
            @group={{this.model}}
            @currentPath={{this.currentPath}}
            @tabs={{this.tabs}}
          />
        </div>
      </section>
  
      {{outlet}}
    </div>
  </div>
  */
  {
    "id": "W5/t21Vi",
    "block": "[[[10,1],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"before-group-container\",\"div\",[28,[37,1],null,[[\"group\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[15,0,[29,[\"container group group-\",[30,0,[\"model\",\"name\"]]]]],[12],[1,\"\\n\"],[41,[30,0,[\"showTooltip\"]],[[[1,\"    \"],[10,0],[14,0,\"group-delete-tooltip\"],[12],[1,\"\\n      \"],[10,2],[12],[1,[28,[35,3],[\"admin.groups.delete_automatic_group\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,0],[14,0,\"group-details-container\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"group-info\"],[12],[1,\"\\n\"],[41,[28,[37,4],[[30,0,[\"model\",\"flair_icon\"]],[30,0,[\"model\",\"flair_url\"]],[30,0,[\"model\",\"flair_bg_color\"]]],null],[[[1,\"        \"],[10,0],[14,0,\"group-avatar-flair\"],[12],[1,\"\\n          \"],[8,[39,5],null,[[\"@flairName\",\"@flairUrl\",\"@flairBgColor\",\"@flairColor\"],[[30,0,[\"model\",\"name\"]],[28,[37,4],[[30,0,[\"model\",\"flair_icon\"]],[30,0,[\"model\",\"flair_url\"]]],null],[30,0,[\"model\",\"flair_bg_color\"]],[30,0,[\"model\",\"flair_color\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[10,0],[14,0,\"group-info-names\"],[12],[1,\"\\n        \"],[10,1],[14,0,\"group-info-name\"],[12],[1,[30,0,[\"groupName\"]]],[13],[1,\"\\n\\n        \"],[41,[30,0,[\"model\",\"full_name\"]],[[[10,0],[14,0,\"group-info-full-name\"],[12],[1,[30,0,[\"model\",\"name\"]]],[13]],[]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"group-details-button\"],[12],[1,\"\\n        \"],[8,[39,6],null,[[\"@tagName\",\"@model\",\"@showLogin\"],[\"\",[30,0,[\"model\"]],[28,[37,7],[\"showLogin\"],null]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"currentUser\",\"admin\"]],[[[41,[30,0,[\"model\",\"automatic\"]],[[[1,\"            \"],[8,[39,8],null,[[\"@action\",\"@class\",\"@icon\",\"@label\"],[[28,[37,9],[[30,0],\"toggleDeleteTooltip\"],null],\"btn-default\",\"question-circle\",\"admin.groups.delete\"]],null],[1,\"\\n\"]],[]],[[[1,\"            \"],[8,[39,8],null,[[\"@action\",\"@disabled\",\"@icon\",\"@class\",\"@label\"],[[28,[37,9],[[30,0],\"destroyGroup\"],null],[30,0,[\"destroying\"]],\"trash-alt\",\"btn-danger\",\"admin.groups.delete\"]],null],[1,\"\\n\"]],[]]]],[]],null],[1,\"\\n\"],[41,[30,0,[\"displayGroupMessageButton\"]],[[[1,\"          \"],[8,[39,8],null,[[\"@action\",\"@class\",\"@icon\",\"@label\"],[[28,[37,9],[[30,0],\"messageGroup\"],null],\"btn-primary group-message-button\",\"envelope\",\"groups.message\"]],null],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\\n      \"],[10,1],[12],[1,\"\\n        \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"group-details-after\",\"div\",[28,[37,1],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"bio_cooked\"]],[[[1,\"      \"],[10,\"hr\"],[12],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"group-bio\"],[12],[1,\"\\n        \"],[10,2],[12],[1,[28,[35,10],[[30,0,[\"model\",\"bio_cooked\"]]],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"user-content-wrapper\"],[12],[1,\"\\n    \"],[10,\"section\"],[14,0,\"user-primary-navigation\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n        \"],[8,[39,11],null,[[\"@group\",\"@currentPath\",\"@tabs\"],[[30,0,[\"model\"]],[30,0,[\"currentPath\"]],[30,0,[\"tabs\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[46,[28,[37,13],null,null],null,null,null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"plugin-outlet\",\"hash\",\"if\",\"i18n\",\"or\",\"avatar-flair\",\"group-membership-button\",\"route-action\",\"d-button\",\"action\",\"html-safe\",\"group-navigation\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/group.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});