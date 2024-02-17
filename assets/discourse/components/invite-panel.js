define("discourse/components/invite-panel", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "@ember/object/computed", "discourse/models/group", "I18n", "discourse/models/invite", "discourse-common/utils/decorators", "discourse/lib/utilities", "discourse/lib/pwa-utils", "discourse/lib/computed", "@ember/utils"], function (_exports, _component, _templateFactory, _object, _computed, _group, _I18n, _invite, _decorators, _utilities, _pwaUtils, _computed2, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"@ember/object/computed",0,"@ember/component",0,"discourse/models/group",0,"I18n",0,"discourse/models/invite",0,"discourse-common/utils/decorators",0,"discourse/lib/utilities",0,"discourse/lib/pwa-utils",0,"discourse/lib/computed",0,"@ember/utils"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.inviteModel.error}}
    <div class="alert alert-error">
      {{html-safe this.errorMessage}}
    </div>
  {{/if}}
  
  <div class="body">
    {{#if this.inviteModel.finished}}
      {{#if this.inviteModel.inviteLink}}
        <GeneratedInviteLink
          @link={{this.inviteModel.inviteLink}}
          @email={{this.invitee}}
        />
      {{else}}
        <div class="success-message">
          {{html-safe this.successMessage}}
        </div>
      {{/if}}
    {{else}}
      <div class="invite-user-control">
        <label class="instructions">{{this.inviteInstructions}}</label>
        <div class="invite-user-input-wrapper">
          {{#if this.allowExistingMembers}}
            <EmailGroupUserChooser
              @class="invite-user-input"
              @value={{this.invitee}}
              @onChange={{action "updateInvitee"}}
              @options={{hash
                maximum=1
                allowEmails=this.canInviteViaEmail
                excludeCurrentUser=true
                includeMessageableGroups=this.isPM
                filterPlaceholder=this.placeholderKey
                fullWidthWrap=true
              }}
            />
          {{else}}
            <TextField
              @class="email-or-username-input"
              @value={{this.invitee}}
              @placeholderKey="topic.invite_reply.email_placeholder"
            />
          {{/if}}
          {{#if this.capabilities.hasContactPicker}}
            <DButton
              @icon="address-book"
              @action={{action "searchContact"}}
              @class="btn-primary open-contact-picker"
            />
          {{/if}}
        </div>
      </div>
  
      {{#if this.showGroups}}
        <div class="group-access-control">
          <label class="instructions {{this.showGroupsClass}}">
            {{i18n "topic.automatically_add_to_groups"}}
          </label>
          <GroupChooser
            @content={{this.allGroups}}
            @value={{this.groupIds}}
            @labelProperty="name"
            @onChange={{action (mut this.groupIds)}}
          />
        </div>
      {{/if}}
  
      {{#if this.showCustomMessage}}
        <div class="show-custom-message-control">
          <label class="instructions">
            <DiscourseLinkedText
              @class="optional"
              @action={{action "showCustomMessageBox"}}
              @text="invite.custom_message"
            />
          </label>
          {{#if this.hasCustomMessage}}
            <Textarea
              @value={{this.customMessage}}
              placeholder={{this.customMessagePlaceholder}}
            />
          {{/if}}
        </div>
      {{/if}}
    {{/if}}
  
    {{#if this.showApprovalMessage}}
      <label class="instructions approval-notice">
        {{i18n "invite.approval_not_required"}}
      </label>
    {{/if}}
  </div>
  
  <div class="footer">
    {{#if this.inviteModel.finished}}
      <DButton
        @class="btn-primary"
        @action={{action "sendCloseModal"}}
        @label="close"
      />
    {{else}}
      <DButton
        @icon={{this.inviteIcon}}
        @action={{action "createInvite"}}
        @class="btn-primary send-invite"
        @disabled={{this.disabled}}
        @label={{this.buttonTitle}}
      />
      {{#if this.showCopyInviteButton}}
        <DButton
          @icon="link"
          @action={{action "generateInviteLink"}}
          @class="btn-primary generate-invite-link"
          @disabled={{this.disabledCopyLink}}
          @label="user.invited.generate_link"
        />
      {{/if}}
    {{/if}}
  </div>
  */
  {
    "id": "+j/RCZwF",
    "block": "[[[41,[30,0,[\"inviteModel\",\"error\"]],[[[1,\"  \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,\"\\n    \"],[1,[28,[35,1],[[30,0,[\"errorMessage\"]]],null]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"body\"],[12],[1,\"\\n\"],[41,[30,0,[\"inviteModel\",\"finished\"]],[[[41,[30,0,[\"inviteModel\",\"inviteLink\"]],[[[1,\"      \"],[8,[39,2],null,[[\"@link\",\"@email\"],[[30,0,[\"inviteModel\",\"inviteLink\"]],[30,0,[\"invitee\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,0],[14,0,\"success-message\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[[30,0,[\"successMessage\"]]],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]]]],[]],[[[1,\"    \"],[10,0],[14,0,\"invite-user-control\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"instructions\"],[12],[1,[30,0,[\"inviteInstructions\"]]],[13],[1,\"\\n      \"],[10,0],[14,0,\"invite-user-input-wrapper\"],[12],[1,\"\\n\"],[41,[30,0,[\"allowExistingMembers\"]],[[[1,\"          \"],[8,[39,3],null,[[\"@class\",\"@value\",\"@onChange\",\"@options\"],[\"invite-user-input\",[30,0,[\"invitee\"]],[28,[37,4],[[30,0],\"updateInvitee\"],null],[28,[37,5],null,[[\"maximum\",\"allowEmails\",\"excludeCurrentUser\",\"includeMessageableGroups\",\"filterPlaceholder\",\"fullWidthWrap\"],[1,[30,0,[\"canInviteViaEmail\"]],true,[30,0,[\"isPM\"]],[30,0,[\"placeholderKey\"]],true]]]]],null],[1,\"\\n\"]],[]],[[[1,\"          \"],[8,[39,6],null,[[\"@class\",\"@value\",\"@placeholderKey\"],[\"email-or-username-input\",[30,0,[\"invitee\"]],\"topic.invite_reply.email_placeholder\"]],null],[1,\"\\n\"]],[]]],[41,[30,0,[\"capabilities\",\"hasContactPicker\"]],[[[1,\"          \"],[8,[39,7],null,[[\"@icon\",\"@action\",\"@class\"],[\"address-book\",[28,[37,4],[[30,0],\"searchContact\"],null],\"btn-primary open-contact-picker\"]],null],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showGroups\"]],[[[1,\"      \"],[10,0],[14,0,\"group-access-control\"],[12],[1,\"\\n        \"],[10,\"label\"],[15,0,[29,[\"instructions \",[30,0,[\"showGroupsClass\"]]]]],[12],[1,\"\\n          \"],[1,[28,[35,8],[\"topic.automatically_add_to_groups\"],null]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[8,[39,9],null,[[\"@content\",\"@value\",\"@labelProperty\",\"@onChange\"],[[30,0,[\"allGroups\"]],[30,0,[\"groupIds\"]],\"name\",[28,[37,4],[[30,0],[28,[37,10],[[30,0,[\"groupIds\"]]],null]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showCustomMessage\"]],[[[1,\"      \"],[10,0],[14,0,\"show-custom-message-control\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"instructions\"],[12],[1,\"\\n          \"],[8,[39,11],null,[[\"@class\",\"@action\",\"@text\"],[\"optional\",[28,[37,4],[[30,0],\"showCustomMessageBox\"],null],\"invite.custom_message\"]],null],[1,\"\\n        \"],[13],[1,\"\\n\"],[41,[30,0,[\"hasCustomMessage\"]],[[[1,\"          \"],[8,[39,12],[[16,\"placeholder\",[30,0,[\"customMessagePlaceholder\"]]]],[[\"@value\"],[[30,0,[\"customMessage\"]]]],null],[1,\"\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\"]],[]],null]],[]]],[1,\"\\n\"],[41,[30,0,[\"showApprovalMessage\"]],[[[1,\"    \"],[10,\"label\"],[14,0,\"instructions approval-notice\"],[12],[1,\"\\n      \"],[1,[28,[35,8],[\"invite.approval_not_required\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"footer\"],[12],[1,\"\\n\"],[41,[30,0,[\"inviteModel\",\"finished\"]],[[[1,\"    \"],[8,[39,7],null,[[\"@class\",\"@action\",\"@label\"],[\"btn-primary\",[28,[37,4],[[30,0],\"sendCloseModal\"],null],\"close\"]],null],[1,\"\\n\"]],[]],[[[1,\"    \"],[8,[39,7],null,[[\"@icon\",\"@action\",\"@class\",\"@disabled\",\"@label\"],[[30,0,[\"inviteIcon\"]],[28,[37,4],[[30,0],\"createInvite\"],null],\"btn-primary send-invite\",[30,0,[\"disabled\"]],[30,0,[\"buttonTitle\"]]]],null],[1,\"\\n\"],[41,[30,0,[\"showCopyInviteButton\"]],[[[1,\"      \"],[8,[39,7],null,[[\"@icon\",\"@action\",\"@class\",\"@disabled\",\"@label\"],[\"link\",[28,[37,4],[[30,0],\"generateInviteLink\"],null],\"btn-primary generate-invite-link\",[30,0,[\"disabledCopyLink\"]],\"user.invited.generate_link\"]],null],[1,\"\\n\"]],[]],null]],[]]],[13]],[],false,[\"if\",\"html-safe\",\"generated-invite-link\",\"email-group-user-chooser\",\"action\",\"hash\",\"text-field\",\"d-button\",\"i18n\",\"group-chooser\",\"mut\",\"discourse-linked-text\",\"textarea\"]]",
    "moduleName": "discourse/components/invite-panel.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("isAdmin", "invitee", "invitingToTopic", "isPrivateTopic", "groupIds", "inviteModel.saving", "inviteModel.details.can_invite_to"), _dec2 = (0, _decorators.default)("isAdmin", "invitee", "inviteModel.saving", "isPrivateTopic", "groupIds", "hasCustomMessage"), _dec3 = (0, _decorators.default)("inviteModel.saving"), _dec4 = (0, _decorators.default)("inviteModel"), _dec5 = (0, _decorators.default)("inviteModel", "inviteModel.details.can_invite_via_email"), _dec6 = (0, _decorators.default)("isPM", "canInviteViaEmail"), _dec7 = (0, _decorators.default)("isAdmin", "inviteModel.group_users"), _dec8 = (0, _decorators.default)("isGroupOwnerOrAdmin", "invitee", "isPrivateTopic", "isPM", "invitingToTopic", "canInviteViaEmail"), _dec9 = (0, _decorators.default)("invitee"), _dec10 = (0, _decorators.default)("isPM", "invitingToTopic", "invitee", "isPrivateTopic", "isAdmin", "canInviteViaEmail"), _dec11 = (0, _decorators.default)("isPrivateTopic"), _dec12 = (0, _decorators.default)("isPM", "invitee", "invitingExistingUserToTopic"), _dec13 = (0, _decorators.default)("isPM"), _dec14 = (0, _decorators.default)("canInviteViaEmail"), (_obj = {
    tagName: null,
    groupIds: null,
    allGroups: null,
    inviteModel: (0, _computed.alias)("panel.model.inviteModel"),
    userInvitedShow: (0, _computed.alias)("panel.model.userInvitedShow"),
    isStaff: (0, _computed.readOnly)("currentUser.staff"),
    isAdmin: (0, _computed.readOnly)("currentUser.admin"),
    // invitee is either a user, group or email
    invitee: null,
    isInviteeGroup: false,
    hasCustomMessage: false,
    customMessage: null,
    inviteIcon: "envelope",
    invitingExistingUserToTopic: false,
    init() {
      this._super(...arguments);
      this.setDefaultSelectedGroups();
      this.setGroupOptions();
    },
    willDestroyElement() {
      this._super(...arguments);
      this.reset();
    },
    disabled(isAdmin, invitee, invitingToTopic, isPrivateTopic, groupIds, saving, can_invite_to) {
      if (saving) {
        return true;
      }
      if ((0, _utils.isEmpty)(invitee)) {
        return true;
      }

      // when inviting to forum, email must be valid
      if (!invitingToTopic && !(0, _utilities.emailValid)(invitee)) {
        return true;
      }

      // normal users (not admin) can't invite users to private topic via email
      if (!isAdmin && isPrivateTopic && (0, _utilities.emailValid)(invitee)) {
        return true;
      }

      // when inviting to private topic via email, group name must be specified
      if (isPrivateTopic && (0, _utils.isEmpty)(groupIds) && (0, _utilities.emailValid)(invitee)) {
        return true;
      }
      if (can_invite_to) {
        return false;
      }
      return false;
    },
    disabledCopyLink(isAdmin, invitee, saving, isPrivateTopic, groupIds, hasCustomMessage) {
      if (hasCustomMessage) {
        return true;
      }
      if (saving) {
        return true;
      }
      if ((0, _utils.isEmpty)(invitee)) {
        return true;
      }

      // email must be valid
      if (!(0, _utilities.emailValid)(invitee)) {
        return true;
      }

      // normal users (not admin) can't invite users to private topic via email
      if (!isAdmin && isPrivateTopic && (0, _utilities.emailValid)(invitee)) {
        return true;
      }

      // when inviting to private topic via email, group name must be specified
      if (isPrivateTopic && (0, _utils.isEmpty)(groupIds) && (0, _utilities.emailValid)(invitee)) {
        return true;
      }
      return false;
    },
    buttonTitle(saving) {
      return saving ? "topic.inviting" : "topic.invite_reply.action";
    },
    invitingToTopic(inviteModel) {
      return inviteModel !== this.currentUser;
    },
    canInviteViaEmail(inviteModel, canInviteViaEmail) {
      return inviteModel === this.currentUser ? true : canInviteViaEmail;
    },
    showCopyInviteButton(isPM, canInviteViaEmail) {
      return canInviteViaEmail && !isPM;
    },
    topicId: (0, _computed.alias)("inviteModel.id"),
    // eg: visible only to specific group members
    isPrivateTopic: (0, _computed.and)("invitingToTopic", "inviteModel.category.read_restricted"),
    isPM: (0, _computed.equal)("inviteModel.archetype", "private_message"),
    // scope to allowed usernames
    allowExistingMembers: (0, _computed.alias)("invitingToTopic"),
    isGroupOwnerOrAdmin(isAdmin, groupUsers) {
      return isAdmin || groupUsers && groupUsers.some(groupUser => groupUser.owner);
    },
    showGroups(isGroupOwnerOrAdmin, invitee, isPrivateTopic, isPM, invitingToTopic, canInviteViaEmail) {
      return isGroupOwnerOrAdmin && canInviteViaEmail && !isPM && ((0, _utilities.emailValid)(invitee) || isPrivateTopic || !invitingToTopic);
    },
    showCustomMessage(invitee) {
      return this.inviteModel === this.currentUser || (0, _utilities.emailValid)(invitee);
    },
    inviteInstructions(isPM, invitingToTopic, invitee, isPrivateTopic, isAdmin, canInviteViaEmail) {
      if (!canInviteViaEmail) {
        // can't invite via email, only existing users
        return _I18n.default.t("topic.invite_reply.discourse_connect_enabled");
      } else if (isPM) {
        // inviting to a message
        return _I18n.default.t("topic.invite_private.email_or_username");
      } else if (invitingToTopic) {
        // inviting to a private/public topic
        if (isPrivateTopic && !isAdmin) {
          // inviting to a private topic and is not admin
          return _I18n.default.t("topic.invite_reply.to_username");
        } else {
          // when inviting to a topic, display instructions based on provided entity
          if ((0, _utils.isEmpty)(invitee)) {
            return _I18n.default.t("topic.invite_reply.to_topic_blank");
          } else if ((0, _utilities.emailValid)(invitee)) {
            this.set("inviteIcon", "envelope");
            return _I18n.default.t("topic.invite_reply.to_topic_email");
          } else {
            this.set("inviteIcon", "hand-point-right");
            return _I18n.default.t("topic.invite_reply.to_topic_username");
          }
        }
      } else {
        // inviting to forum
        return _I18n.default.t("topic.invite_reply.to_forum");
      }
    },
    showGroupsClass(isPrivateTopic) {
      return isPrivateTopic ? "required" : "optional";
    },
    successMessage(isPM, invitee, invitingExistingUserToTopic) {
      if (this.isInviteeGroup) {
        return _I18n.default.t("topic.invite_private.success_group");
      } else if (isPM) {
        return _I18n.default.t("topic.invite_private.success");
      } else if (invitingExistingUserToTopic) {
        return _I18n.default.t("topic.invite_reply.success_existing_email", {
          invitee
        });
      } else if ((0, _utilities.emailValid)(invitee)) {
        return _I18n.default.t("topic.invite_reply.success_email", {
          invitee
        });
      } else {
        return _I18n.default.t("topic.invite_reply.success_username");
      }
    },
    errorMessage(isPM) {
      return isPM ? _I18n.default.t("topic.invite_private.error") : _I18n.default.t("topic.invite_reply.error");
    },
    placeholderKey(canInviteViaEmail) {
      return canInviteViaEmail ? "topic.invite_private.email_or_username_placeholder" : "topic.invite_reply.username_placeholder";
    },
    showApprovalMessage: (0, _computed.and)("isStaff", "siteSettings.must_approve_users"),
    customMessagePlaceholder: (0, _computed2.i18n)("invite.custom_message_placeholder"),
    // Reset the modal to allow a new user to be invited.
    reset() {
      this.setProperties({
        invitee: null,
        isInviteeGroup: false,
        hasCustomMessage: false,
        customMessage: null,
        invitingExistingUserToTopic: false,
        groupIds: []
      });
      this.inviteModel.setProperties({
        error: false,
        saving: false,
        finished: false,
        inviteLink: null
      });
    },
    setDefaultSelectedGroups() {
      this.set("groupIds", []);
    },
    setGroupOptions() {
      _group.default.findAll().then(groups => {
        this.set("allGroups", groups.filterBy("automatic", false));
      });
    },
    sendCloseModal() {
      this.attrs.close();
    },
    createInvite() {
      if (this.disabled) {
        return;
      }
      const groupIds = this.groupIds;
      const userInvitedController = this.userInvitedShow;
      const model = this.inviteModel;
      model.setProperties({
        saving: true,
        error: false
      });
      const onerror = e => {
        if (e.jqXHR.responseJSON && e.jqXHR.responseJSON.errors) {
          this.set("errorMessage", e.jqXHR.responseJSON.errors[0]);
        } else {
          this.set("errorMessage", this.isPM ? _I18n.default.t("topic.invite_private.error") : _I18n.default.t("topic.invite_reply.error"));
        }
        model.setProperties({
          saving: false,
          error: true
        });
      };
      if (this.isInviteeGroup) {
        return this.inviteModel.createGroupInvite(this.invitee.trim()).then(() => {
          model.setProperties({
            saving: false,
            finished: true
          });
          this.inviteModel.reload().then(() => {
            this.appEvents.trigger("post-stream:refresh");
          });
        }).catch(onerror);
      } else {
        return this.inviteModel.createInvite(this.invitee.trim(), groupIds, this.customMessage).then(result => {
          model.setProperties({
            saving: false,
            finished: true
          });
          if (!this.invitingToTopic && userInvitedController) {
            _invite.default.findInvitedBy(this.currentUser, userInvitedController.get("filter")).then(inviteModel => {
              userInvitedController.setProperties({
                model: inviteModel,
                totalInvites: inviteModel.invites.length
              });
            });
          } else if (this.isPM && result && result.user) {
            this.get("inviteModel.details.allowed_users").pushObject(_object.default.create(result.user));
            this.appEvents.trigger("post-stream:refresh", {
              force: true
            });
          } else if (this.invitingToTopic && (0, _utilities.emailValid)(this.invitee.trim()) && result && result.user) {
            this.set("invitingExistingUserToTopic", true);
          }
        }).catch(onerror);
      }
    },
    generateInviteLink() {
      if (this.disabled) {
        return;
      }
      const groupIds = this.groupIds;
      const userInvitedController = this.userInvitedShow;
      const model = this.inviteModel;
      model.setProperties({
        saving: true,
        error: false
      });
      let topicId;
      if (this.invitingToTopic) {
        topicId = this.get("inviteModel.id");
      }
      return model.generateInviteLink(this.invitee.trim(), groupIds, topicId).then(result => {
        model.setProperties({
          saving: false,
          finished: true,
          inviteLink: result.link
        });
        if (userInvitedController) {
          _invite.default.findInvitedBy(this.currentUser, userInvitedController.get("filter")).then(inviteModel => {
            userInvitedController.setProperties({
              model: inviteModel,
              totalInvites: inviteModel.invites.length
            });
          });
        }
      }).catch(e => {
        if (e.jqXHR.responseJSON && e.jqXHR.responseJSON.errors) {
          this.set("errorMessage", e.jqXHR.responseJSON.errors[0]);
        } else {
          this.set("errorMessage", this.isPM ? _I18n.default.t("topic.invite_private.error") : _I18n.default.t("topic.invite_reply.error"));
        }
        model.setProperties({
          saving: false,
          error: true
        });
      });
    },
    showCustomMessageBox() {
      this.toggleProperty("hasCustomMessage");
      if (this.hasCustomMessage) {
        if (this.inviteModel === this.currentUser) {
          this.set("customMessage", _I18n.default.t("invite.custom_message_template_forum"));
        } else {
          this.set("customMessage", _I18n.default.t("invite.custom_message_template_topic"));
        }
      } else {
        this.set("customMessage", null);
      }
    },
    searchContact() {
      (0, _pwaUtils.getNativeContact)(this.capabilities, ["email"], false).then(result => {
        this.set("invitee", result[0].email[0]);
      });
    },
    updateInvitee(selected, content) {
      let invitee = content.findBy("id", selected[0]);
      if (!invitee && content.length) {
        invitee = typeof content[0] === "string" ? {
          id: content[0]
        } : content[0];
      }
      if (invitee) {
        this.setProperties({
          invitee: invitee.id.trim(),
          isInviteeGroup: invitee.isGroup || false
        });
      } else {
        this.setProperties({
          invitee: null,
          isInviteeGroup: false
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "disabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "disabled"), _obj), _applyDecoratedDescriptor(_obj, "disabledCopyLink", [_dec2], Object.getOwnPropertyDescriptor(_obj, "disabledCopyLink"), _obj), _applyDecoratedDescriptor(_obj, "buttonTitle", [_dec3], Object.getOwnPropertyDescriptor(_obj, "buttonTitle"), _obj), _applyDecoratedDescriptor(_obj, "invitingToTopic", [_dec4], Object.getOwnPropertyDescriptor(_obj, "invitingToTopic"), _obj), _applyDecoratedDescriptor(_obj, "canInviteViaEmail", [_dec5], Object.getOwnPropertyDescriptor(_obj, "canInviteViaEmail"), _obj), _applyDecoratedDescriptor(_obj, "showCopyInviteButton", [_dec6], Object.getOwnPropertyDescriptor(_obj, "showCopyInviteButton"), _obj), _applyDecoratedDescriptor(_obj, "isGroupOwnerOrAdmin", [_dec7], Object.getOwnPropertyDescriptor(_obj, "isGroupOwnerOrAdmin"), _obj), _applyDecoratedDescriptor(_obj, "showGroups", [_dec8], Object.getOwnPropertyDescriptor(_obj, "showGroups"), _obj), _applyDecoratedDescriptor(_obj, "showCustomMessage", [_dec9], Object.getOwnPropertyDescriptor(_obj, "showCustomMessage"), _obj), _applyDecoratedDescriptor(_obj, "inviteInstructions", [_dec10], Object.getOwnPropertyDescriptor(_obj, "inviteInstructions"), _obj), _applyDecoratedDescriptor(_obj, "showGroupsClass", [_dec11], Object.getOwnPropertyDescriptor(_obj, "showGroupsClass"), _obj), _applyDecoratedDescriptor(_obj, "successMessage", [_dec12], Object.getOwnPropertyDescriptor(_obj, "successMessage"), _obj), _applyDecoratedDescriptor(_obj, "errorMessage", [_dec13], Object.getOwnPropertyDescriptor(_obj, "errorMessage"), _obj), _applyDecoratedDescriptor(_obj, "placeholderKey", [_dec14], Object.getOwnPropertyDescriptor(_obj, "placeholderKey"), _obj), _applyDecoratedDescriptor(_obj, "sendCloseModal", [_object.action], Object.getOwnPropertyDescriptor(_obj, "sendCloseModal"), _obj), _applyDecoratedDescriptor(_obj, "createInvite", [_object.action], Object.getOwnPropertyDescriptor(_obj, "createInvite"), _obj), _applyDecoratedDescriptor(_obj, "generateInviteLink", [_object.action], Object.getOwnPropertyDescriptor(_obj, "generateInviteLink"), _obj), _applyDecoratedDescriptor(_obj, "showCustomMessageBox", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showCustomMessageBox"), _obj), _applyDecoratedDescriptor(_obj, "searchContact", [_object.action], Object.getOwnPropertyDescriptor(_obj, "searchContact"), _obj), _applyDecoratedDescriptor(_obj, "updateInvitee", [_object.action], Object.getOwnPropertyDescriptor(_obj, "updateInvitee"), _obj)), _obj))));
  _exports.default = _default;
});