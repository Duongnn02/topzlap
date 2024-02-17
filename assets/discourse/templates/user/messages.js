define("discourse/templates/user/messages", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="user-messages" />
  
  <div class="user-navigation user-navigation-secondary">
    <ol class="category-breadcrumb">
      <li>
        <UserNav::MessagesDropdown
          @content={{this.messagesDropdownContent}}
          @value={{this.messagesDropdownValue}}
          @onChange={{this.onMessagesDropdownChange}}
        />
      </li>
    </ol>
  
    <HorizontalOverflowNav
      @className="messages-nav"
      @ariaLabel="User secondary - messages"
      id="user-navigation-secondary__horizontal-nav"
    />
  
    <div class="navigation-controls">
      {{#if this.site.mobileView}}
        {{#if this.currentUser.admin}}
          <BulkSelectToggle
            @parentController={{"user-topics-list"}}
            @tagName=""
          />
        {{/if}}
      {{/if}}
  
      {{#if this.isGroup}}
        <GroupNotificationsButton
          @value={{this.group.group_user.notification_level}}
          @onChange={{this.changeGroupNotificationLevel}}
        />
      {{/if}}
  
      {{#if this.showNewPM}}
        <DButton
          @class="btn-primary new-private-message"
          @action={{route-action "composePrivateMessage"}}
          @icon="envelope"
          @label="user.new_private_message"
        />
      {{/if}}
    </div>
  </div>
  
  <section class="user-content" id="user-content">
    {{outlet}}
  </section>
  */
  {
    "id": "gyILkntz",
    "block": "[[[8,[39,0],null,[[\"@pageClass\"],[\"user-messages\"]],null],[1,\"\\n\\n\"],[10,0],[14,0,\"user-navigation user-navigation-secondary\"],[12],[1,\"\\n  \"],[10,\"ol\"],[14,0,\"category-breadcrumb\"],[12],[1,\"\\n    \"],[10,\"li\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@content\",\"@value\",\"@onChange\"],[[30,0,[\"messagesDropdownContent\"]],[30,0,[\"messagesDropdownValue\"]],[30,0,[\"onMessagesDropdownChange\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[8,[39,2],[[24,1,\"user-navigation-secondary__horizontal-nav\"]],[[\"@className\",\"@ariaLabel\"],[\"messages-nav\",\"User secondary - messages\"]],null],[1,\"\\n\\n  \"],[10,0],[14,0,\"navigation-controls\"],[12],[1,\"\\n\"],[41,[30,0,[\"site\",\"mobileView\"]],[[[41,[30,0,[\"currentUser\",\"admin\"]],[[[1,\"        \"],[8,[39,4],null,[[\"@parentController\",\"@tagName\"],[\"user-topics-list\",\"\"]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n\"],[41,[30,0,[\"isGroup\"]],[[[1,\"      \"],[8,[39,5],null,[[\"@value\",\"@onChange\"],[[30,0,[\"group\",\"group_user\",\"notification_level\"]],[30,0,[\"changeGroupNotificationLevel\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showNewPM\"]],[[[1,\"      \"],[8,[39,6],null,[[\"@class\",\"@action\",\"@icon\",\"@label\"],[\"btn-primary new-private-message\",[28,[37,7],[\"composePrivateMessage\"],null],\"envelope\",\"user.new_private_message\"]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"user-content\"],[14,1,\"user-content\"],[12],[1,\"\\n  \"],[46,[28,[37,9],null,null],null,null,null],[1,\"\\n\"],[13]],[],false,[\"d-section\",\"user-nav/messages-dropdown\",\"horizontal-overflow-nav\",\"if\",\"bulk-select-toggle\",\"group-notifications-button\",\"d-button\",\"route-action\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/user/messages.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});