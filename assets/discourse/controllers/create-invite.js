define("discourse/controllers/create-invite", ["exports", "@ember/controller", "@ember/object", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/lib/ajax-error", "discourse/lib/pwa-utils", "discourse/lib/utilities", "discourse/mixins/buffered-content", "discourse/mixins/modal-functionality", "discourse/models/group", "discourse/models/invite", "I18n", "select-kit/components/future-date-input-selector", "discourse/lib/text", "discourse/lib/time-shortcut"], function (_exports, _controller, _object, _computed, _decorators, _ajaxError, _pwaUtils, _utilities, _bufferedContent, _modalFunctionality, _group, _invite, _I18n, _futureDateInputSelector, _text, _timeShortcut) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error",0,"discourse/lib/pwa-utils",0,"discourse/lib/utilities",0,"discourse/mixins/buffered-content",0,"discourse/mixins/modal-functionality",0,"discourse/models/group",0,"discourse/models/invite",0,"I18n",0,"select-kit/components/future-date-input-selector",0,"discourse/lib/text",0,"discourse/lib/time-shortcut"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (0, _bufferedContent.bufferedProperty)("invite"), (_dec = (0, _decorators.default)("buffered.emailOrDomain"), _dec2 = (0, _decorators.default)("buffered.emailOrDomain"), _dec3 = (0, _decorators.default)("currentUser.staff", "siteSettings.invite_link_max_redemptions_limit", "siteSettings.invite_link_max_redemptions_limit_users"), _dec4 = (0, _decorators.default)("buffered.expires_at"), _dec5 = (0, _decorators.default)("currentUser.staff", "currentUser.groups"), _dec6 = (0, _decorators.default)("currentUser.staff"), (_obj = {
    allGroups: null,
    topics: null,
    flashText: null,
    flashClass: null,
    flashLink: false,
    invite: null,
    invites: null,
    editing: false,
    inviteToTopic: false,
    limitToEmail: false,
    isEmail(emailOrDomain) {
      return (0, _utilities.emailValid)(emailOrDomain?.trim());
    },
    isDomain(emailOrDomain) {
      return (0, _utilities.hostnameValid)(emailOrDomain?.trim());
    },
    isLink: (0, _computed.not)("isEmail"),
    onShow() {
      _group.default.findAll().then(groups => {
        this.set("allGroups", groups.filterBy("automatic", false));
      });
      this.setProperties({
        topics: [],
        flashText: null,
        flashClass: null,
        flashLink: false,
        invite: null,
        invites: null,
        editing: false,
        inviteToTopic: false,
        limitToEmail: false
      });
      this.setInvite(_invite.default.create());
      this.buffered.setProperties({
        max_redemptions_allowed: 1,
        expires_at: moment().add(this.siteSettings.invite_expiry_days, "days").format(_futureDateInputSelector.FORMAT)
      });
    },
    onClose() {
      this.appEvents.trigger("modal-body:clearFlash");
    },
    setInvite(invite) {
      this.setProperties({
        invite,
        topics: invite.topics
      });
    },
    save(opts) {
      const data = {
        ...this.buffered.buffer
      };
      if (data.emailOrDomain) {
        if ((0, _utilities.emailValid)(data.emailOrDomain)) {
          data.email = data.emailOrDomain?.trim();
        } else if ((0, _utilities.hostnameValid)(data.emailOrDomain)) {
          data.domain = data.emailOrDomain?.trim();
        }
        delete data.emailOrDomain;
      }
      if (data.groupIds !== undefined) {
        data.group_ids = data.groupIds.length > 0 ? data.groupIds : "";
        delete data.groupIds;
      }
      if (data.topicId !== undefined) {
        data.topic_id = data.topicId;
        delete data.topicId;
        delete data.topicTitle;
      }
      if (this.isLink) {
        if (this.invite.email) {
          data.email = data.custom_message = "";
        }
      } else if (this.isEmail) {
        if (this.invite.max_redemptions_allowed > 1) {
          data.max_redemptions_allowed = 1;
        }
        if (opts.sendEmail) {
          data.send_email = true;
          if (this.inviteToTopic) {
            data.invite_to_topic = true;
          }
        } else {
          data.skip_email = true;
        }
      }
      return this.invite.save(data).then(() => {
        this.rollbackBuffer();
        if (this.invites && !this.invites.any(i => i.id === this.invite.id)) {
          this.invites.unshiftObject(this.invite);
        }
        if (this.isEmail && opts.sendEmail) {
          this.send("closeModal");
        } else {
          this.setProperties({
            flashText: (0, _text.sanitize)(_I18n.default.t("user.invited.invite.invite_saved")),
            flashClass: "success",
            flashLink: !this.editing
          });
        }
      }).catch(e => this.setProperties({
        flashText: (0, _text.sanitize)((0, _ajaxError.extractError)(e)),
        flashClass: "error",
        flashLink: false
      }));
    },
    maxRedemptionsAllowedLimit(staff, staffLimit, usersLimit) {
      return staff ? staffLimit : usersLimit;
    },
    expiresAtLabel(expires_at) {
      const expiresAt = moment(expires_at);
      return expiresAt.isBefore() ? _I18n.default.t("user.invited.invite.expired_at_time", {
        time: expiresAt.format("LLL")
      }) : _I18n.default.t("user.invited.invite.expires_in_time", {
        time: moment.duration(expiresAt - moment()).humanize()
      });
    },
    canInviteToGroup(staff, groups) {
      return staff || groups.any(g => g.owner);
    },
    canArriveAtTopic(staff) {
      if (staff && !this.siteSettings.must_approve_users) {
        return true;
      }
      return false;
    },
    timeShortcuts() {
      const timezone = this.currentUser.user_option.timezone;
      const shortcuts = (0, _timeShortcut.timeShortcuts)(timezone);
      return [shortcuts.laterToday(), shortcuts.tomorrow(), shortcuts.laterThisWeek(), shortcuts.monday(), shortcuts.twoWeeks(), shortcuts.nextMonth(), shortcuts.twoMonths(), shortcuts.threeMonths(), shortcuts.fourMonths(), shortcuts.sixMonths()];
    },
    copied() {
      this.save({
        sendEmail: false,
        copy: true
      });
    },
    saveInvite(sendEmail) {
      this.appEvents.trigger("modal-body:clearFlash");
      this.save({
        sendEmail
      });
    },
    searchContact() {
      (0, _pwaUtils.getNativeContact)(this.capabilities, ["email"], false).then(result => {
        this.set("buffered.email", result[0].email[0]);
      });
    },
    onChangeTopic(topicId, topic) {
      this.set("topics", [topic]);
      this.set("buffered.topicId", topicId);
    }
  }, (_applyDecoratedDescriptor(_obj, "isEmail", [_dec], Object.getOwnPropertyDescriptor(_obj, "isEmail"), _obj), _applyDecoratedDescriptor(_obj, "isDomain", [_dec2], Object.getOwnPropertyDescriptor(_obj, "isDomain"), _obj), _applyDecoratedDescriptor(_obj, "maxRedemptionsAllowedLimit", [_dec3], Object.getOwnPropertyDescriptor(_obj, "maxRedemptionsAllowedLimit"), _obj), _applyDecoratedDescriptor(_obj, "expiresAtLabel", [_dec4], Object.getOwnPropertyDescriptor(_obj, "expiresAtLabel"), _obj), _applyDecoratedDescriptor(_obj, "canInviteToGroup", [_dec5], Object.getOwnPropertyDescriptor(_obj, "canInviteToGroup"), _obj), _applyDecoratedDescriptor(_obj, "canArriveAtTopic", [_dec6], Object.getOwnPropertyDescriptor(_obj, "canArriveAtTopic"), _obj), _applyDecoratedDescriptor(_obj, "timeShortcuts", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "timeShortcuts"), _obj), _applyDecoratedDescriptor(_obj, "copied", [_object.action], Object.getOwnPropertyDescriptor(_obj, "copied"), _obj), _applyDecoratedDescriptor(_obj, "saveInvite", [_object.action], Object.getOwnPropertyDescriptor(_obj, "saveInvite"), _obj), _applyDecoratedDescriptor(_obj, "searchContact", [_object.action], Object.getOwnPropertyDescriptor(_obj, "searchContact"), _obj), _applyDecoratedDescriptor(_obj, "onChangeTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeTopic"), _obj)), _obj)));
  _exports.default = _default;
});