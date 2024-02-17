define("discourse/components/topic-footer-buttons", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "@ember/object", "discourse-common/utils/decorators", "discourse/lib/notification-levels", "discourse/lib/register-topic-footer-button", "discourse/lib/register-topic-footer-dropdown"], function (_exports, _component, _templateFactory, _computed, _object, _decorators, _notificationLevels, _registerTopicFooterButton, _registerTopicFooterDropdown) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _obj, _init, _init2, _init3;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object/computed",0,"@ember/object",0,"@ember/component",0,"discourse-common/utils/decorators",0,"discourse/lib/notification-levels",0,"discourse/lib/register-topic-footer-button",0,"discourse/lib/register-topic-footer-dropdown"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="topic-footer-main-buttons">
    <TopicAdminMenuButton
      @topic={{this.topic}}
      @openUpwards="true"
      @toggleMultiSelect={{this.toggleMultiSelect}}
      @showTopicSlowModeUpdate={{this.showTopicSlowModeUpdate}}
      @deleteTopic={{this.deleteTopic}}
      @recoverTopic={{this.recoverTopic}}
      @toggleFeaturedOnProfile={{this.toggleFeaturedOnProfile}}
      @toggleClosed={{this.toggleClosed}}
      @toggleArchived={{this.toggleArchived}}
      @toggleVisibility={{this.toggleVisibility}}
      @showTopicTimerModal={{this.showTopicTimerModal}}
      @showFeatureTopic={{this.showFeatureTopic}}
      @showChangeTimestamp={{this.showChangeTimestamp}}
      @resetBumpDate={{this.resetBumpDate}}
      @convertToPublicTopic={{this.convertToPublicTopic}}
      @convertToPrivateMessage={{this.convertToPrivateMessage}}
    />
  
    {{#if this.site.mobileView}}
      <TopicFooterMobileDropdown
        @topic={{this.topic}}
        @content={{this.dropdownButtons}}
      />
    {{/if}}
  
    {{#each this.inlineActionables as |actionable|}}
      {{#if (eq actionable.type "inline-button")}}
        <DButton
          @id={{concat "topic-footer-button-" actionable.id}}
          @class={{concat
            "btn-default topic-footer-button "
            actionable.classNames
          }}
          @action={{actionable.action}}
          @icon={{actionable.icon}}
          @translatedLabel={{actionable.label}}
          @translatedTitle={{actionable.title}}
          @translatedAriaLabel={{actionable.ariaLabel}}
          @disabled={{actionable.disabled}}
        />
      {{else}}
        <DropdownSelectBox
          @id={{concat "topic-footer-dropdown-" actionable.id}}
          @value={{actionable.value}}
          @class={{concat "topic-footer-dropdown " actionable.classNames}}
          @content={{actionable.content}}
          @onChange={{action actionable.action}}
          @options={{hash
            icon=actionable.icon
            none=actionable.noneItem
            disabled=actionable.disabled
          }}
        />
      {{/if}}
    {{/each}}
  
    <PluginOutlet
      @name="topic-footer-main-buttons-before-create"
      @outletArgs={{hash topic=this.topic}}
      @connectorTagName="span"
    />
  
    {{#if this.topic.details.can_create_post}}
      <DButton
        @class="btn-primary create"
        @icon="reply"
        @action={{this.replyToPost}}
        @label="topic.reply.title"
        @title="topic.reply.help"
      />
    {{/if}}
  
    <PluginOutlet
      @name="after-topic-footer-main-buttons"
      @outletArgs={{hash topic=this.topic}}
      @connectorTagName="span"
    />
  </div>
  
  <PinnedButton @pinned={{this.topic.pinned}} @topic={{this.topic}} />
  
  {{#if this.showNotificationsButton}}
    {{#if this.showNotificationUserTip}}
      <UserTip
        @id="topic_notification_levels"
        @selector=".notifications-button"
      />
    {{/if}}
  
    <TopicNotificationsButton
      @notificationLevel={{this.topic.details.notification_level}}
      @topic={{this.topic}}
    />
  {{/if}}
  
  <PluginOutlet
    @name="after-topic-footer-buttons"
    @outletArgs={{hash topic=this.topic}}
    @connectorTagName="span"
  />
  */
  {
    "id": "tQRaswVl",
    "block": "[[[10,0],[14,0,\"topic-footer-main-buttons\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@topic\",\"@openUpwards\",\"@toggleMultiSelect\",\"@showTopicSlowModeUpdate\",\"@deleteTopic\",\"@recoverTopic\",\"@toggleFeaturedOnProfile\",\"@toggleClosed\",\"@toggleArchived\",\"@toggleVisibility\",\"@showTopicTimerModal\",\"@showFeatureTopic\",\"@showChangeTimestamp\",\"@resetBumpDate\",\"@convertToPublicTopic\",\"@convertToPrivateMessage\"],[[30,0,[\"topic\"]],\"true\",[30,0,[\"toggleMultiSelect\"]],[30,0,[\"showTopicSlowModeUpdate\"]],[30,0,[\"deleteTopic\"]],[30,0,[\"recoverTopic\"]],[30,0,[\"toggleFeaturedOnProfile\"]],[30,0,[\"toggleClosed\"]],[30,0,[\"toggleArchived\"]],[30,0,[\"toggleVisibility\"]],[30,0,[\"showTopicTimerModal\"]],[30,0,[\"showFeatureTopic\"]],[30,0,[\"showChangeTimestamp\"]],[30,0,[\"resetBumpDate\"]],[30,0,[\"convertToPublicTopic\"]],[30,0,[\"convertToPrivateMessage\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"site\",\"mobileView\"]],[[[1,\"    \"],[8,[39,2],null,[[\"@topic\",\"@content\"],[[30,0,[\"topic\"]],[30,0,[\"dropdownButtons\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"inlineActionables\"]]],null]],null],null,[[[41,[28,[37,5],[[30,1,[\"type\"]],\"inline-button\"],null],[[[1,\"      \"],[8,[39,6],null,[[\"@id\",\"@class\",\"@action\",\"@icon\",\"@translatedLabel\",\"@translatedTitle\",\"@translatedAriaLabel\",\"@disabled\"],[[28,[37,7],[\"topic-footer-button-\",[30,1,[\"id\"]]],null],[28,[37,7],[\"btn-default topic-footer-button \",[30,1,[\"classNames\"]]],null],[30,1,[\"action\"]],[30,1,[\"icon\"]],[30,1,[\"label\"]],[30,1,[\"title\"]],[30,1,[\"ariaLabel\"]],[30,1,[\"disabled\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"      \"],[8,[39,8],null,[[\"@id\",\"@value\",\"@class\",\"@content\",\"@onChange\",\"@options\"],[[28,[37,7],[\"topic-footer-dropdown-\",[30,1,[\"id\"]]],null],[30,1,[\"value\"]],[28,[37,7],[\"topic-footer-dropdown \",[30,1,[\"classNames\"]]],null],[30,1,[\"content\"]],[28,[37,9],[[30,0],[30,1,[\"action\"]]],null],[28,[37,10],null,[[\"icon\",\"none\",\"disabled\"],[[30,1,[\"icon\"]],[30,1,[\"noneItem\"]],[30,1,[\"disabled\"]]]]]]],null],[1,\"\\n\"]],[]]]],[1]],null],[1,\"\\n  \"],[8,[39,11],null,[[\"@name\",\"@outletArgs\",\"@connectorTagName\"],[\"topic-footer-main-buttons-before-create\",[28,[37,10],null,[[\"topic\"],[[30,0,[\"topic\"]]]]],\"span\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"topic\",\"details\",\"can_create_post\"]],[[[1,\"    \"],[8,[39,6],null,[[\"@class\",\"@icon\",\"@action\",\"@label\",\"@title\"],[\"btn-primary create\",\"reply\",[30,0,[\"replyToPost\"]],\"topic.reply.title\",\"topic.reply.help\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[8,[39,11],null,[[\"@name\",\"@outletArgs\",\"@connectorTagName\"],[\"after-topic-footer-main-buttons\",[28,[37,10],null,[[\"topic\"],[[30,0,[\"topic\"]]]]],\"span\"]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,12],null,[[\"@pinned\",\"@topic\"],[[30,0,[\"topic\",\"pinned\"]],[30,0,[\"topic\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"showNotificationsButton\"]],[[[41,[30,0,[\"showNotificationUserTip\"]],[[[1,\"    \"],[8,[39,13],null,[[\"@id\",\"@selector\"],[\"topic_notification_levels\",\".notifications-button\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[8,[39,14],null,[[\"@notificationLevel\",\"@topic\"],[[30,0,[\"topic\",\"details\",\"notification_level\"]],[30,0,[\"topic\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[8,[39,11],null,[[\"@name\",\"@outletArgs\",\"@connectorTagName\"],[\"after-topic-footer-buttons\",[28,[37,10],null,[[\"topic\"],[[30,0,[\"topic\"]]]]],\"span\"]],null]],[\"actionable\"],false,[\"topic-admin-menu-button\",\"if\",\"topic-footer-mobile-dropdown\",\"each\",\"-track-array\",\"eq\",\"d-button\",\"concat\",\"dropdown-select-box\",\"action\",\"hash\",\"plugin-outlet\",\"pinned-button\",\"user-tip\",\"topic-notifications-button\"]]",
    "moduleName": "discourse/components/topic-footer-buttons.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("canSendPms", "topic.isPrivateMessage"), _dec2 = (0, _decorators.default)("inlineButtons.[]", "topic.assigned_to_user"), _dec3 = (0, _decorators.default)("topic.isPrivateMessage"), _dec4 = (0, _decorators.default)("topic.details.notification_level"), _dec5 = (0, _decorators.default)("topic.message_archived"), _dec6 = (0, _decorators.default)("topic.message_archived"), _dec7 = (0, _decorators.default)("topic.message_archived"), (_obj = {
    elementId: "topic-footer-buttons",
    attributeBindings: ["role"],
    role: "region",
    canArchive(canSendPms, isPM) {
      return canSendPms && isPM;
    },
    inlineButtons: (0, _registerTopicFooterButton.getTopicFooterButtons)(),
    inlineDropdowns: (0, _registerTopicFooterDropdown.getTopicFooterDropdowns)(),
    inlineActionables: (0, _object.computed)("inlineButtons.[]", "inlineDropdowns.[]", function () {
      return this.inlineButtons.filterBy("dropdown", false).concat(this.inlineDropdowns).sortBy("priority").reverse();
    }),
    dropdownButtons(inlineButtons) {
      return inlineButtons.filter(button => button.dropdown);
    },
    showNotificationsButton(isPM) {
      return !isPM || this.canSendPms;
    },
    showNotificationUserTip(notificationLevel) {
      return notificationLevel >= _notificationLevels.NotificationLevels.TRACKING;
    },
    canSendPms: (0, _computed.alias)("currentUser.can_send_private_messages"),
    canInviteTo: (0, _computed.alias)("topic.details.can_invite_to"),
    canDefer: (0, _computed.alias)("currentUser.user_option.enable_defer"),
    inviteDisabled: (0, _computed.or)("topic.archived", "topic.closed", "topic.deleted"),
    archiveIcon: archived => archived ? "envelope" : "folder",
    archiveTitle: archived => archived ? "topic.move_to_inbox.help" : "topic.archive_message.help",
    archiveLabel: archived => archived ? "topic.move_to_inbox.title" : "topic.archive_message.title"
  }, (_applyDecoratedDescriptor(_obj, "canArchive", [_dec], Object.getOwnPropertyDescriptor(_obj, "canArchive"), _obj), _applyDecoratedDescriptor(_obj, "dropdownButtons", [_dec2], Object.getOwnPropertyDescriptor(_obj, "dropdownButtons"), _obj), _applyDecoratedDescriptor(_obj, "showNotificationsButton", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showNotificationsButton"), _obj), _applyDecoratedDescriptor(_obj, "showNotificationUserTip", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showNotificationUserTip"), _obj), _applyDecoratedDescriptor(_obj, "archiveIcon", [_dec5], (_init = Object.getOwnPropertyDescriptor(_obj, "archiveIcon"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "archiveTitle", [_dec6], (_init2 = Object.getOwnPropertyDescriptor(_obj, "archiveTitle"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "archiveLabel", [_dec7], (_init3 = Object.getOwnPropertyDescriptor(_obj, "archiveLabel"), _init3 = _init3 ? _init3.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init3;
    }
  }), _obj)), _obj))));
  _exports.default = _default;
});