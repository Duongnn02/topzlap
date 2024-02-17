define("discourse/templates/groups/new", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="groups-new">
    <h1>{{i18n "admin.groups.new.title"}}</h1>
  
    <hr />
  
    <form class="groups-form form-vertical">
      <GroupsFormProfileFields @model={{this.model}} @disableSave={{this.saving}}>
        <div class="control-group">
          <label class="control-label" for="owner-selector">{{i18n
              "admin.groups.add_owners"
            }}</label>
  
          <EmailGroupUserChooser
            @class="input-xxlarge"
            @id="owner-selector"
            @value={{this.splitOwnerUsernames}}
            @onChange={{action "updateOwnerUsernames"}}
            @options={{hash filterPlaceholder="groups.selector_placeholder"}}
          />
        </div>
  
        <div class="control-group">
          <label class="control-label" for="member-selector">{{i18n
              "groups.members.title"
            }}</label>
  
          <EmailGroupUserChooser
            @class="input-xxlarge"
            @id="member-selector"
            @value={{this.splitUsernames}}
            @onChange={{action "updateUsernames"}}
            @options={{hash filterPlaceholder="groups.selector_placeholder"}}
          />
        </div>
      </GroupsFormProfileFields>
  
      <GroupsFormMembershipFields @model={{this.model}} />
      <GroupsFormInteractionFields @model={{this.model}} />
  
      <div class="control-group buttons">
        <DButton
          @action={{action "save"}}
          @type="submit"
          @disabled={{this.saving}}
          @class="btn btn-primary group-form-save"
          @label="admin.groups.new.create"
        />
  
        <LinkTo @route="groups">
          {{i18n "cancel"}}
        </LinkTo>
      </div>
    </form>
  </DSection>
  */
  {
    "id": "bAPu0z3q",
    "block": "[[[8,[39,0],null,[[\"@pageClass\"],[\"groups-new\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[12],[1,[28,[35,1],[\"admin.groups.new.title\"],null]],[13],[1,\"\\n\\n  \"],[10,\"hr\"],[12],[13],[1,\"\\n\\n  \"],[10,\"form\"],[14,0,\"groups-form form-vertical\"],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@model\",\"@disableSave\"],[[30,0,[\"model\"]],[30,0,[\"saving\"]]]],[[\"default\"],[[[[1,\"\\n      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"owner-selector\"],[12],[1,[28,[35,1],[\"admin.groups.add_owners\"],null]],[13],[1,\"\\n\\n        \"],[8,[39,3],null,[[\"@class\",\"@id\",\"@value\",\"@onChange\",\"@options\"],[\"input-xxlarge\",\"owner-selector\",[30,0,[\"splitOwnerUsernames\"]],[28,[37,4],[[30,0],\"updateOwnerUsernames\"],null],[28,[37,5],null,[[\"filterPlaceholder\"],[\"groups.selector_placeholder\"]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"member-selector\"],[12],[1,[28,[35,1],[\"groups.members.title\"],null]],[13],[1,\"\\n\\n        \"],[8,[39,3],null,[[\"@class\",\"@id\",\"@value\",\"@onChange\",\"@options\"],[\"input-xxlarge\",\"member-selector\",[30,0,[\"splitUsernames\"]],[28,[37,4],[[30,0],\"updateUsernames\"],null],[28,[37,5],null,[[\"filterPlaceholder\"],[\"groups.selector_placeholder\"]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,6],null,[[\"@model\"],[[30,0,[\"model\"]]]],null],[1,\"\\n    \"],[8,[39,7],null,[[\"@model\"],[[30,0,[\"model\"]]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-group buttons\"],[12],[1,\"\\n      \"],[8,[39,8],null,[[\"@action\",\"@type\",\"@disabled\",\"@class\",\"@label\"],[[28,[37,4],[[30,0],\"save\"],null],\"submit\",[30,0,[\"saving\"]],\"btn btn-primary group-form-save\",\"admin.groups.new.create\"]],null],[1,\"\\n\\n      \"],[8,[39,9],null,[[\"@route\"],[\"groups\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,1],[\"cancel\"],null]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]]],[],false,[\"d-section\",\"i18n\",\"groups-form-profile-fields\",\"email-group-user-chooser\",\"action\",\"hash\",\"groups-form-membership-fields\",\"groups-form-interaction-fields\",\"d-button\",\"link-to\"]]",
    "moduleName": "discourse/templates/groups/new.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});