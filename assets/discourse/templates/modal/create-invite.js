define("discourse/templates/modal/create-invite", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.flashText}}
    <div id="modal-alert" role="alert" class="alert alert-{{this.flashClass}}">
      {{#if this.flashLink}}
        <div class="input-group invite-link">
          <label for="invite-link">{{html-safe this.flashText}}
            {{i18n "user.invited.invite.instructions"}}</label>
          <div class="link-share-container">
            <Input
              name="invite-link"
              class="invite-link"
              @value={{this.invite.link}}
              readonly={{true}}
            />
            <CopyButton
              @selector="input.invite-link"
              @copied={{action "copied"}}
            />
          </div>
        </div>
      {{else}}
        {{html-safe this.flashText}}
      {{/if}}
    </div>
  {{/if}}
  
  <DModalBody
    @title={{if
      this.editing
      "user.invited.invite.edit_title"
      "user.invited.invite.new_title"
    }}
  >
    <form>
      {{#if this.editing}}
        <div class="input-group invite-link">
          <label for="invite-link">{{i18n
              "user.invited.invite.instructions"
            }}</label>
          <div class="link-share-container">
            <Input
              name="invite-link"
              class="invite-link"
              @value={{this.invite.link}}
              readonly={{true}}
            />
            <CopyButton
              @selector="input.invite-link"
              @copied={{action "copied"}}
            />
          </div>
        </div>
      {{/if}}
  
      <div class="input-group input-email">
        <label for="invite-email">
          {{d-icon "envelope"}}
          {{#if this.isEmail}}
            {{i18n "user.invited.invite.restrict_email"}}
          {{else if this.isDomain}}
            {{i18n "user.invited.invite.restrict_domain"}}
          {{else}}
            {{i18n "user.invited.invite.restrict"}}
          {{/if}}
        </label>
        <div class="invite-email-container">
          <Input
            id="invite-email"
            @value={{this.buffered.emailOrDomain}}
            placeholder={{i18n "user.invited.invite.email_or_domain_placeholder"}}
          />
          {{#if this.capabilities.hasContactPicker}}
            <DButton
              @icon="address-book"
              @action={{action "searchContact"}}
              @class="btn-primary open-contact-picker"
            />
          {{/if}}
        </div>
      </div>
  
      {{#if this.isLink}}
        <div class="input-group invite-max-redemptions">
          <label for="invite-max-redemptions">{{d-icon "users"}}{{i18n
              "user.invited.invite.max_redemptions_allowed"
            }}</label>
          <Input
            id="invite-max-redemptions"
            @type="number"
            @value={{this.buffered.max_redemptions_allowed}}
            min="1"
            max={{this.maxRedemptionsAllowedLimit}}
          />
        </div>
      {{/if}}
  
      {{#if this.isEmail}}
        <div class="input-group invite-custom-message">
          <label for="invite-message">{{i18n
              "user.invited.invite.custom_message"
            }}</label>
          <Textarea id="invite-message" @value={{this.buffered.custom_message}} />
        </div>
      {{/if}}
  
      {{#if this.canArriveAtTopic}}
        <div class="input-group invite-to-topic">
          <label for="invite-topic">{{d-icon "hand-point-right"}}{{i18n
              "user.invited.invite.invite_to_topic"
            }}</label>
          <TopicChooser
            @value={{this.buffered.topicId}}
            @content={{this.topics}}
            @onChange={{action "onChangeTopic"}}
            @options={{hash additionalFilters="status:public"}}
          />
        </div>
      {{else if this.buffered.topicTitle}}
        <div class="input-group invite-to-topic">
          <label for="invite-topic">{{d-icon "hand-point-right"}}{{i18n
              "user.invited.invite.invite_to_topic"
            }}</label>
          <Input
            name="invite-topic"
            class="invite-topic"
            @value={{this.buffered.topicTitle}}
            readonly={{true}}
          />
        </div>
      {{/if}}
  
      {{#if this.canInviteToGroup}}
        <div class="input-group invite-to-groups">
          <label>{{d-icon "users"}}{{i18n
              "user.invited.invite.add_to_groups"
            }}</label>
          <GroupChooser
            @content={{this.allGroups}}
            @value={{this.buffered.groupIds}}
            @labelProperty="name"
            @onChange={{action (mut this.buffered.groupIds)}}
          />
        </div>
      {{/if}}
  
      {{#if this.currentUser.staff}}
        <div class="input-group invite-expires-at">
          <FutureDateInput
            @displayLabelIcon="far-clock"
            @displayLabel={{i18n "user.invited.invite.expires_at"}}
            @customShortcuts={{this.timeShortcuts}}
            @clearable={{true}}
            @input={{this.buffered.expires_at}}
            @onChangeInput={{action (mut this.buffered.expires_at)}}
          />
        </div>
      {{else}}
        <div class="input-group input-expires-at">
          <label>{{d-icon "far-clock"}}{{this.expiresAtLabel}}</label>
        </div>
      {{/if}}
    </form>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @icon="link"
      @label="user.invited.invite.save_invite"
      @class="btn-primary save-invite"
      @action={{action "saveInvite"}}
    />
  
    <DButton
      @icon="envelope"
      @label={{if
        this.invite.emailed
        "user.invited.reinvite"
        "user.invited.invite.send_invite_email"
      }}
      @class="btn-primary send-invite"
      @action={{action "saveInvite" true}}
      @title={{unless
        this.isEmail
        "user.invited.invite.send_invite_email_instructions"
      }}
      @disabled={{not this.isEmail}}
    />
  </div>
  */
  {
    "id": "GPt2EOgf",
    "block": "[[[41,[30,0,[\"flashText\"]],[[[1,\"  \"],[10,0],[14,1,\"modal-alert\"],[14,\"role\",\"alert\"],[15,0,[29,[\"alert alert-\",[30,0,[\"flashClass\"]]]]],[12],[1,\"\\n\"],[41,[30,0,[\"flashLink\"]],[[[1,\"      \"],[10,0],[14,0,\"input-group invite-link\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"invite-link\"],[12],[1,[28,[35,1],[[30,0,[\"flashText\"]]],null]],[1,\"\\n          \"],[1,[28,[35,2],[\"user.invited.invite.instructions\"],null]],[13],[1,\"\\n        \"],[10,0],[14,0,\"link-share-container\"],[12],[1,\"\\n          \"],[8,[39,3],[[24,3,\"invite-link\"],[24,0,\"invite-link\"],[16,\"readonly\",true]],[[\"@value\"],[[30,0,[\"invite\",\"link\"]]]],null],[1,\"\\n          \"],[8,[39,4],null,[[\"@selector\",\"@copied\"],[\"input.invite-link\",[28,[37,5],[[30,0],\"copied\"],null]]],null],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[1,[28,[35,1],[[30,0,[\"flashText\"]]],null]],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[8,[39,6],null,[[\"@title\"],[[52,[30,0,[\"editing\"]],\"user.invited.invite.edit_title\",\"user.invited.invite.new_title\"]]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"form\"],[12],[1,\"\\n\"],[41,[30,0,[\"editing\"]],[[[1,\"      \"],[10,0],[14,0,\"input-group invite-link\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"invite-link\"],[12],[1,[28,[35,2],[\"user.invited.invite.instructions\"],null]],[13],[1,\"\\n        \"],[10,0],[14,0,\"link-share-container\"],[12],[1,\"\\n          \"],[8,[39,3],[[24,3,\"invite-link\"],[24,0,\"invite-link\"],[16,\"readonly\",true]],[[\"@value\"],[[30,0,[\"invite\",\"link\"]]]],null],[1,\"\\n          \"],[8,[39,4],null,[[\"@selector\",\"@copied\"],[\"input.invite-link\",[28,[37,5],[[30,0],\"copied\"],null]]],null],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,0],[14,0,\"input-group input-email\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,\"for\",\"invite-email\"],[12],[1,\"\\n        \"],[1,[28,[35,7],[\"envelope\"],null]],[1,\"\\n\"],[41,[30,0,[\"isEmail\"]],[[[1,\"          \"],[1,[28,[35,2],[\"user.invited.invite.restrict_email\"],null]],[1,\"\\n\"]],[]],[[[41,[30,0,[\"isDomain\"]],[[[1,\"          \"],[1,[28,[35,2],[\"user.invited.invite.restrict_domain\"],null]],[1,\"\\n\"]],[]],[[[1,\"          \"],[1,[28,[35,2],[\"user.invited.invite.restrict\"],null]],[1,\"\\n        \"]],[]]]],[]]],[1,\"      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"invite-email-container\"],[12],[1,\"\\n        \"],[8,[39,3],[[24,1,\"invite-email\"],[16,\"placeholder\",[28,[37,2],[\"user.invited.invite.email_or_domain_placeholder\"],null]]],[[\"@value\"],[[30,0,[\"buffered\",\"emailOrDomain\"]]]],null],[1,\"\\n\"],[41,[30,0,[\"capabilities\",\"hasContactPicker\"]],[[[1,\"          \"],[8,[39,8],null,[[\"@icon\",\"@action\",\"@class\"],[\"address-book\",[28,[37,5],[[30,0],\"searchContact\"],null],\"btn-primary open-contact-picker\"]],null],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"isLink\"]],[[[1,\"      \"],[10,0],[14,0,\"input-group invite-max-redemptions\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"invite-max-redemptions\"],[12],[1,[28,[35,7],[\"users\"],null]],[1,[28,[35,2],[\"user.invited.invite.max_redemptions_allowed\"],null]],[13],[1,\"\\n        \"],[8,[39,3],[[24,1,\"invite-max-redemptions\"],[24,\"min\",\"1\"],[16,\"max\",[30,0,[\"maxRedemptionsAllowedLimit\"]]]],[[\"@type\",\"@value\"],[\"number\",[30,0,[\"buffered\",\"max_redemptions_allowed\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"isEmail\"]],[[[1,\"      \"],[10,0],[14,0,\"input-group invite-custom-message\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"invite-message\"],[12],[1,[28,[35,2],[\"user.invited.invite.custom_message\"],null]],[13],[1,\"\\n        \"],[8,[39,9],[[24,1,\"invite-message\"]],[[\"@value\"],[[30,0,[\"buffered\",\"custom_message\"]]]],null],[1,\"      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canArriveAtTopic\"]],[[[1,\"      \"],[10,0],[14,0,\"input-group invite-to-topic\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"invite-topic\"],[12],[1,[28,[35,7],[\"hand-point-right\"],null]],[1,[28,[35,2],[\"user.invited.invite.invite_to_topic\"],null]],[13],[1,\"\\n        \"],[8,[39,10],null,[[\"@value\",\"@content\",\"@onChange\",\"@options\"],[[30,0,[\"buffered\",\"topicId\"]],[30,0,[\"topics\"]],[28,[37,5],[[30,0],\"onChangeTopic\"],null],[28,[37,11],null,[[\"additionalFilters\"],[\"status:public\"]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"buffered\",\"topicTitle\"]],[[[1,\"      \"],[10,0],[14,0,\"input-group invite-to-topic\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"invite-topic\"],[12],[1,[28,[35,7],[\"hand-point-right\"],null]],[1,[28,[35,2],[\"user.invited.invite.invite_to_topic\"],null]],[13],[1,\"\\n        \"],[8,[39,3],[[24,3,\"invite-topic\"],[24,0,\"invite-topic\"],[16,\"readonly\",true]],[[\"@value\"],[[30,0,[\"buffered\",\"topicTitle\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]],null]],[]]],[1,\"\\n\"],[41,[30,0,[\"canInviteToGroup\"]],[[[1,\"      \"],[10,0],[14,0,\"input-group invite-to-groups\"],[12],[1,\"\\n        \"],[10,\"label\"],[12],[1,[28,[35,7],[\"users\"],null]],[1,[28,[35,2],[\"user.invited.invite.add_to_groups\"],null]],[13],[1,\"\\n        \"],[8,[39,12],null,[[\"@content\",\"@value\",\"@labelProperty\",\"@onChange\"],[[30,0,[\"allGroups\"]],[30,0,[\"buffered\",\"groupIds\"]],\"name\",[28,[37,5],[[30,0],[28,[37,13],[[30,0,[\"buffered\",\"groupIds\"]]],null]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"currentUser\",\"staff\"]],[[[1,\"      \"],[10,0],[14,0,\"input-group invite-expires-at\"],[12],[1,\"\\n        \"],[8,[39,14],null,[[\"@displayLabelIcon\",\"@displayLabel\",\"@customShortcuts\",\"@clearable\",\"@input\",\"@onChangeInput\"],[\"far-clock\",[28,[37,2],[\"user.invited.invite.expires_at\"],null],[30,0,[\"timeShortcuts\"]],true,[30,0,[\"buffered\",\"expires_at\"]],[28,[37,5],[[30,0],[28,[37,13],[[30,0,[\"buffered\",\"expires_at\"]]],null]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,0],[14,0,\"input-group input-expires-at\"],[12],[1,\"\\n        \"],[10,\"label\"],[12],[1,[28,[35,7],[\"far-clock\"],null]],[1,[30,0,[\"expiresAtLabel\"]]],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,8],null,[[\"@icon\",\"@label\",\"@class\",\"@action\"],[\"link\",\"user.invited.invite.save_invite\",\"btn-primary save-invite\",[28,[37,5],[[30,0],\"saveInvite\"],null]]],null],[1,\"\\n\\n  \"],[8,[39,8],null,[[\"@icon\",\"@label\",\"@class\",\"@action\",\"@title\",\"@disabled\"],[\"envelope\",[52,[30,0,[\"invite\",\"emailed\"]],\"user.invited.reinvite\",\"user.invited.invite.send_invite_email\"],\"btn-primary send-invite\",[28,[37,5],[[30,0],\"saveInvite\",true],null],[52,[51,[30,0,[\"isEmail\"]]],\"user.invited.invite.send_invite_email_instructions\"],[28,[37,16],[[30,0,[\"isEmail\"]]],null]]],null],[1,\"\\n\"],[13]],[],false,[\"if\",\"html-safe\",\"i18n\",\"input\",\"copy-button\",\"action\",\"d-modal-body\",\"d-icon\",\"d-button\",\"textarea\",\"topic-chooser\",\"hash\",\"group-chooser\",\"mut\",\"future-date-input\",\"unless\",\"not\"]]",
    "moduleName": "discourse/templates/modal/create-invite.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});