define("discourse/templates/modal/group-add-members", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @rawTitle={{this.rawTitle}}>
    <form class="form-vertical group-add-members">
      <p>{{i18n "groups.add_members.description"}}</p>
  
      <div class="input-group">
        <EmailGroupUserChooser
          @value={{this.usernamesAndEmails}}
          @onChange={{action "setUsernamesAndEmails"}}
          @options={{hash
            allowEmails=this.currentUser.can_invite_to_forum
            filterPlaceholder=(if
              this.currentUser.can_invite_to_forum
              "groups.add_members.usernames_or_emails_placeholder"
              "groups.add_members.usernames_placeholder"
            )
          }}
        />
      </div>
  
      {{#if this.model.can_admin_group}}
        <div class="input-group">
          <label>
            <Input
              id="set-owner"
              @type="checkbox"
              @checked={{this.setOwner}}
              disabled={{this.emails}}
            />
            {{i18n "groups.add_members.set_owner"}}
          </label>
        </div>
      {{/if}}
  
      <div class="input-group">
        <label>
          <Input
            @type="checkbox"
            @checked={{this.notifyUsers}}
            disabled={{and (not this.usernames) this.emails}}
          />
          {{i18n "groups.add_members.notify_users"}}
        </label>
      </div>
    </form>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @action={{action "addMembers"}}
      @class="add btn-primary"
      @icon="plus"
      @disabled={{or this.loading (not this.usernamesAndEmails)}}
      @label="groups.add"
    />
  </div>
  */
  {
    "id": "kAQH9EwL",
    "block": "[[[8,[39,0],null,[[\"@rawTitle\"],[[30,0,[\"rawTitle\"]]]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"form\"],[14,0,\"form-vertical group-add-members\"],[12],[1,\"\\n    \"],[10,2],[12],[1,[28,[35,1],[\"groups.add_members.description\"],null]],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n      \"],[8,[39,2],null,[[\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"usernamesAndEmails\"]],[28,[37,3],[[30,0],\"setUsernamesAndEmails\"],null],[28,[37,4],null,[[\"allowEmails\",\"filterPlaceholder\"],[[30,0,[\"currentUser\",\"can_invite_to_forum\"]],[52,[30,0,[\"currentUser\",\"can_invite_to_forum\"]],\"groups.add_members.usernames_or_emails_placeholder\",\"groups.add_members.usernames_placeholder\"]]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"can_admin_group\"]],[[[1,\"      \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n        \"],[10,\"label\"],[12],[1,\"\\n          \"],[8,[39,6],[[24,1,\"set-owner\"],[16,\"disabled\",[30,0,[\"emails\"]]]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"setOwner\"]]]],null],[1,\"\\n          \"],[1,[28,[35,1],[\"groups.add_members.set_owner\"],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,\"\\n        \"],[8,[39,6],[[16,\"disabled\",[28,[37,7],[[28,[37,8],[[30,0,[\"usernames\"]]],null],[30,0,[\"emails\"]]],null]]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"notifyUsers\"]]]],null],[1,\"\\n        \"],[1,[28,[35,1],[\"groups.add_members.notify_users\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,9],null,[[\"@action\",\"@class\",\"@icon\",\"@disabled\",\"@label\"],[[28,[37,3],[[30,0],\"addMembers\"],null],\"add btn-primary\",\"plus\",[28,[37,10],[[30,0,[\"loading\"]],[28,[37,8],[[30,0,[\"usernamesAndEmails\"]]],null]],null],\"groups.add\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"i18n\",\"email-group-user-chooser\",\"action\",\"hash\",\"if\",\"input\",\"and\",\"not\",\"d-button\",\"or\"]]",
    "moduleName": "discourse/templates/modal/group-add-members.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});