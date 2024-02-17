define("discourse/controllers/flag", ["exports", "@ember/runloop", "@ember/controller", "I18n", "discourse/models/post-action-type", "discourse/mixins/modal-functionality", "rsvp", "discourse/models/user", "discourse-common/utils/decorators", "@ember/object/computed", "discourse/lib/optional-service", "@ember/string"], function (_exports, _runloop, _controller, _I18n, _postActionType, _modalFunctionality, _rsvp, _user, _decorators, _computed, _optionalService, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"@ember/controller",0,"I18n",0,"discourse/models/post-action-type",0,"discourse/mixins/modal-functionality",0,"rsvp",0,"discourse/models/user",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"discourse/lib/optional-service",0,"@ember/string"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("spammerDetails.canDelete", "selected.name_key"), _dec2 = (0, _decorators.default)("flagTarget"), _dec3 = (0, _decorators.default)("post", "flagTarget", "model.actions_summary.@each.can_act"), _dec4 = (0, _decorators.default)("post", "flagTarget", "model.actions_summary.@each.can_act"), _dec5 = (0, _decorators.default)("selected.is_custom_flag", "message.length"), _dec6 = (0, _decorators.default)("flagsAvailable"), _dec7 = (0, _decorators.default)("flagTarget", "selected.is_custom_flag"), _dec8 = (0, _decorators.default)("selected.is_custom_flag"), _dec9 = (0, _decorators.default)("selected.is_custom_flag", "flagTarget"), _dec10 = (0, _decorators.default)("flagTarget", "selected.name_key"), (_obj = {
    adminTools: (0, _optionalService.default)(),
    userDetails: null,
    selected: null,
    message: null,
    isWarning: false,
    topicActionByName: null,
    spammerDetails: null,
    flagActions: null,
    flagTarget: null,
    init() {
      this._super(...arguments);
      this.flagActions = {
        icon: "gavel",
        label: _I18n.default.t("flagging.take_action"),
        actions: [{
          id: "agree_and_keep",
          icon: "thumbs-up",
          label: _I18n.default.t("flagging.take_action_options.default.title"),
          description: _I18n.default.t("flagging.take_action_options.default.details")
        }, {
          id: "agree_and_suspend",
          icon: "ban",
          label: _I18n.default.t("flagging.take_action_options.suspend.title"),
          description: _I18n.default.t("flagging.take_action_options.suspend.details"),
          client_action: "suspend"
        }, {
          id: "agree_and_silence",
          icon: "microphone-slash",
          label: _I18n.default.t("flagging.take_action_options.silence.title"),
          description: _I18n.default.t("flagging.take_action_options.silence.details"),
          client_action: "silence"
        }]
      };
    },
    keyDown(event) {
      // CTRL+ENTER or CMD+ENTER
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        if (this.submitEnabled) {
          this.send("createFlag");
          return false;
        }
      }
    },
    clientSuspend(performAction) {
      this._penalize("showSuspendModal", performAction);
    },
    clientSilence(performAction) {
      this._penalize("showSilenceModal", performAction);
    },
    _penalize(adminToolMethod, performAction) {
      if (this.adminTools) {
        return _user.default.findByUsername(this.model.username).then(createdBy => {
          const opts = {
            before: performAction
          };
          if (this.flagTarget.editable()) {
            opts.postId = this.model.id;
            opts.postEdit = this.model.cooked;
          }
          return this.adminTools[adminToolMethod](createdBy, opts);
        });
      }
    },
    onShow() {
      this.setProperties({
        selected: null,
        spammerDetails: null
      });
      if (this.adminTools) {
        this.adminTools.checkSpammer(this.get("model.user_id")).then(result => {
          this.set("spammerDetails", result);
        });
      }
      (0, _runloop.schedule)("afterRender", () => {
        const element = document.querySelector(".flag-modal");
        element.addEventListener("keydown", this.keyDown);
      });
    },
    onClose() {
      const element = document.querySelector(".flag-modal");
      element.removeEventListener("keydown", this.keyDown);
    },
    showDeleteSpammer(canDeleteSpammer, nameKey) {
      return canDeleteSpammer && nameKey === "spam";
    },
    title(flagTarget) {
      return flagTarget.title();
    },
    flagsAvailable() {
      return this.flagTarget.flagsAvailable(this, this.site, this.model);
    },
    staffFlagsAvailable() {
      return this.get("model.flagsAvailable") && this.get("model.flagsAvailable").length > 1;
    },
    submitEnabled() {
      const selected = this.selected;
      if (!selected) {
        return false;
      }
      if (selected.get("is_custom_flag")) {
        const len = this.get("message.length") || 0;
        return len >= this.siteSettings.min_personal_message_post_length && len <= _postActionType.MAX_MESSAGE_LENGTH;
      }
      return true;
    },
    submitDisabled: (0, _computed.not)("submitEnabled"),
    cantFlagForReview: (0, _computed.not)("notifyModeratorsFlag"),
    notifyModeratorsFlag(flagsAvailable) {
      const notifyModeratorsID = 7;
      return flagsAvailable.find(f => f.id === notifyModeratorsID);
    },
    canTakeAction(flagTarget, isCustomFlag) {
      return !flagTarget.targetsTopic() && !isCustomFlag && this.currentUser.get("staff");
    },
    submitIcon(isCustomFlag) {
      return isCustomFlag ? "envelope" : "flag";
    },
    submitLabel(isCustomFlag, flagTarget) {
      if (isCustomFlag) {
        return flagTarget.customSubmitLabel();
      }
      return flagTarget.submitLabel();
    },
    actions: {
      deleteSpammer() {
        let details = this.spammerDetails;
        if (details) {
          details.deleteUser().then(() => window.location.reload());
        }
      },
      takeAction(action) {
        var _this = this;
        let performAction = function () {
          let o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          o.takeAction = true;
          _this.send("createFlag", o);
          return _rsvp.Promise.resolve();
        };
        if (action.client_action) {
          let actionMethod = this[`client${(0, _string.classify)(action.client_action)}`];
          if (actionMethod) {
            return actionMethod.call(this, () => performAction({
              skipClose: true
            }));
          } else {
            // eslint-disable-next-line no-console
            console.error(`No handler for ${action.client_action} found`);
            return;
          }
        } else {
          this.set("model.hidden", true);
          return performAction();
        }
      },
      createFlag(opts) {
        const params = opts || {};
        if (this.get("selected.is_custom_flag")) {
          params.message = this.message;
        }
        this.flagTarget.create(this, params);
      },
      createFlagAsWarning() {
        this.send("createFlag", {
          isWarning: true
        });
        this.set("model.hidden", true);
      },
      flagForReview() {
        if (!this.selected) {
          this.set("selected", this.get("notifyModeratorsFlag"));
        }
        this.send("createFlag", {
          queue_for_review: true
        });
        this.set("model.hidden", true);
      },
      changePostActionType(action) {
        this.set("selected", action);
      }
    },
    canSendWarning(flagTarget, nameKey) {
      return !flagTarget.targetsTopic() && this.currentUser.get("staff") && nameKey === "notify_user";
    }
  }, (_applyDecoratedDescriptor(_obj, "keyDown", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "keyDown"), _obj), _applyDecoratedDescriptor(_obj, "showDeleteSpammer", [_dec], Object.getOwnPropertyDescriptor(_obj, "showDeleteSpammer"), _obj), _applyDecoratedDescriptor(_obj, "title", [_dec2], Object.getOwnPropertyDescriptor(_obj, "title"), _obj), _applyDecoratedDescriptor(_obj, "flagsAvailable", [_dec3], Object.getOwnPropertyDescriptor(_obj, "flagsAvailable"), _obj), _applyDecoratedDescriptor(_obj, "staffFlagsAvailable", [_dec4], Object.getOwnPropertyDescriptor(_obj, "staffFlagsAvailable"), _obj), _applyDecoratedDescriptor(_obj, "submitEnabled", [_dec5], Object.getOwnPropertyDescriptor(_obj, "submitEnabled"), _obj), _applyDecoratedDescriptor(_obj, "notifyModeratorsFlag", [_dec6], Object.getOwnPropertyDescriptor(_obj, "notifyModeratorsFlag"), _obj), _applyDecoratedDescriptor(_obj, "canTakeAction", [_dec7], Object.getOwnPropertyDescriptor(_obj, "canTakeAction"), _obj), _applyDecoratedDescriptor(_obj, "submitIcon", [_dec8], Object.getOwnPropertyDescriptor(_obj, "submitIcon"), _obj), _applyDecoratedDescriptor(_obj, "submitLabel", [_dec9], Object.getOwnPropertyDescriptor(_obj, "submitLabel"), _obj), _applyDecoratedDescriptor(_obj, "canSendWarning", [_dec10], Object.getOwnPropertyDescriptor(_obj, "canSendWarning"), _obj)), _obj)));
  _exports.default = _default;
});