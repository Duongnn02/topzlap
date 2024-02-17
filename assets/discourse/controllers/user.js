define("discourse/controllers/user", ["exports", "@ember/controller", "@ember/object", "@ember/object/computed", "discourse/mixins/can-check-emails", "discourse/models/user", "I18n", "discourse-common/utils/decorators", "discourse-common/lib/get-url", "@ember/utils", "discourse/lib/optional-service", "discourse/lib/settings", "@ember/service", "@ember/string"], function (_exports, _controller, _object, _computed, _canCheckEmails, _user, _I18n, _decorators, _getUrl, _utils, _optionalService, _settings, _service, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@ember/object/computed",0,"discourse/mixins/can-check-emails",0,"discourse/models/user",0,"I18n",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url",0,"@ember/utils",0,"discourse/lib/optional-service",0,"discourse/lib/settings",0,"@ember/service",0,"@ember/string"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_canCheckEmails.default, (_dec = (0, _decorators.default)("model.username"), _dec2 = (0, _decorators.default)("viewingSelf", "model.profile_hidden"), _dec3 = (0, _decorators.default)("model.profileBackgroundUrl"), _dec4 = (0, _decorators.default)("model.profile_hidden", "isSummaryRoute", "viewingSelf", "forceExpand"), _dec5 = (0, _decorators.default)("model.suspended", "currentUser.staff"), _dec6 = (0, _decorators.default)("model.trust_level"), _dec7 = (0, _decorators.default)("viewingSelf", "currentUser.admin"), _dec8 = (0, _decorators.default)("viewingSelf"), _dec9 = (0, _decorators.default)("viewingSelf"), _dec10 = (0, _decorators.default)("viewingSelf", "currentUser.admin", "currentUser.can_send_private_messages"), _dec11 = (0, _decorators.default)("viewingSelf", "currentUser.admin"), _dec12 = (0, _decorators.default)("model.name"), _dec13 = (0, _decorators.default)("model.badge_count"), _dec14 = (0, _decorators.default)(), _dec15 = (0, _decorators.default)("model.user_fields.@each.value"), _dec16 = (0, _decorators.default)("model.primary_group_name"), (_obj = {
    router: (0, _service.inject)(),
    dialog: (0, _service.inject)(),
    userNotifications: (0, _controller.inject)("user-notifications"),
    adminTools: (0, _optionalService.default)(),
    viewingSelf(username) {
      let currentUser = this.currentUser;
      return currentUser && username === currentUser.get("username");
    },
    canExpandProfile(viewingSelf, profileHidden) {
      return !profileHidden && viewingSelf;
    },
    hasProfileBackgroundUrl(background) {
      return !(0, _utils.isEmpty)(background.toString());
    },
    isSummaryRoute: (0, _computed.equal)("router.currentRouteName", "user.summary"),
    collapsedInfo(profileHidden, isSummaryRoute, viewingSelf, forceExpand) {
      if (profileHidden) {
        return true;
      }
      return (!isSummaryRoute || viewingSelf) && !forceExpand;
    },
    canMuteOrIgnoreUser: (0, _computed.or)("model.can_ignore_user", "model.can_mute_user"),
    hasGivenFlags: (0, _computed.gt)("model.number_of_flags_given", 0),
    hasFlaggedPosts: (0, _computed.gt)("model.number_of_flagged_posts", 0),
    hasDeletedPosts: (0, _computed.gt)("model.number_of_deleted_posts", 0),
    hasBeenSuspended: (0, _computed.gt)("model.number_of_suspensions", 0),
    hasReceivedWarnings: (0, _computed.gt)("model.warnings_received_count", 0),
    hasRejectedPosts: (0, _computed.gt)("model.number_of_rejected_posts", 0),
    collapsedInfoState: (0, _object.computed)("collapsedInfo", function () {
      return {
        isExpanded: !this.collapsedInfo,
        icon: this.collapsedInfo ? "angle-double-down" : "angle-double-up",
        label: this.collapsedInfo ? "expand_profile" : "collapse_profile",
        ariaLabel: this.collapsedInfo ? "user.sr_expand_profile" : "user.sr_collapse_profile",
        action: this.collapsedInfo ? "expandProfile" : "collapseProfile"
      };
    }),
    showStaffCounters: (0, _computed.or)("hasGivenFlags", "hasFlaggedPosts", "hasDeletedPosts", "hasBeenSuspended", "hasReceivedWarnings", "hasRejectedPosts"),
    showFeaturedTopic: (0, _computed.and)("model.featured_topic", "siteSettings.allow_featured_topic_on_user_profiles"),
    isNotSuspendedOrIsStaff(suspended, isStaff) {
      return !suspended || isStaff;
    },
    linkWebsite: (0, _computed.not)("model.isBasic"),
    removeNoFollow(trustLevel) {
      return trustLevel > 2 && !this.siteSettings.tl3_links_no_follow;
    },
    showBookmarks(viewingSelf, isAdmin) {
      return viewingSelf || isAdmin;
    },
    showDrafts(viewingSelf) {
      return viewingSelf;
    },
    showRead(viewingSelf) {
      return viewingSelf;
    },
    showPrivateMessages(viewingSelf, isAdmin) {
      return this.currentUser?.can_send_private_messages && (viewingSelf || isAdmin);
    },
    showNotificationsTab(viewingSelf, isAdmin) {
      return viewingSelf || isAdmin;
    },
    nameFirst(name) {
      return (0, _settings.prioritizeNameInUx)(name);
    },
    showBadges(badgeCount) {
      return this.siteSettings.enable_badges && badgeCount > 0;
    },
    canInviteToForum() {
      return _user.default.currentProp("can_invite_to_forum");
    },
    canDeleteUser: (0, _computed.and)("model.can_be_deleted", "model.can_delete_all_posts"),
    publicUserFields() {
      const siteUserFields = this.site.get("user_fields");
      if (!(0, _utils.isEmpty)(siteUserFields)) {
        const userFields = this.get("model.user_fields");
        return siteUserFields.filterBy("show_on_profile", true).sortBy("position").map(field => {
          (0, _object.set)(field, "dasherized_name", (0, _string.dasherize)(field.get("name")));
          const value = userFields ? userFields[field.get("id").toString()] : null;
          return (0, _utils.isEmpty)(value) ? null : _object.default.create({
            value,
            field
          });
        }).compact();
      }
    },
    primaryGroup(group) {
      if (group) {
        return `group-${group}`;
      }
    },
    currentParentRoute: (0, _computed.readOnly)("router.currentRoute.parent.name"),
    userNotificationLevel: (0, _object.computed)("currentUser.ignored_ids", "model.ignored", "model.muted", {
      get() {
        if (this.get("model.ignored")) {
          return "changeToIgnored";
        } else if (this.get("model.muted")) {
          return "changeToMuted";
        } else {
          return "changeToNormal";
        }
      },
      set(key, value) {
        return value;
      }
    }),
    get displayTopLevelAdminButton() {
      if (!this.currentUser?.staff) {
        return false;
      }
      return this.site.desktopView;
    },
    showSuspensions(event) {
      event?.preventDefault();
      this.adminTools.showActionLogs(this, {
        target_user: this.get("model.username"),
        action_name: "suspend_user"
      });
    },
    actions: {
      collapseProfile() {
        this.set("forceExpand", false);
      },
      expandProfile() {
        this.set("forceExpand", true);
      },
      adminDelete() {
        const userId = this.get("model.id");
        const location = document.location.pathname;
        const performDestroy = block => {
          this.dialog.notice(_I18n.default.t("admin.user.deleting_user"));
          let formData = {
            context: location
          };
          if (block) {
            formData["block_email"] = true;
            formData["block_urls"] = true;
            formData["block_ip"] = true;
          }
          formData["delete_posts"] = true;
          return this.adminTools.deleteUser(userId, formData).then(data => {
            if (data.deleted) {
              document.location = (0, _getUrl.default)("/admin/users/list/active");
            } else {
              this.dialog.alert(_I18n.default.t("admin.user.delete_failed"));
            }
          }).catch(() => this.dialog.alert(_I18n.default.t("admin.user.delete_failed")));
        };
        this.dialog.alert({
          title: _I18n.default.t("admin.user.delete_confirm_title"),
          message: _I18n.default.t("admin.user.delete_confirm"),
          class: "delete-user-modal",
          buttons: [{
            label: _I18n.default.t("admin.user.delete_dont_block"),
            class: "btn-primary",
            action: () => {
              return performDestroy(false);
            }
          }, {
            icon: "exclamation-triangle",
            label: _I18n.default.t("admin.user.delete_and_block"),
            class: "btn-danger",
            action: () => {
              return performDestroy(true);
            }
          }, {
            label: _I18n.default.t("composer.cancel")
          }]
        });
      },
      updateNotificationLevel(params) {
        return this.model.updateNotificationLevel(params);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "viewingSelf", [_dec], Object.getOwnPropertyDescriptor(_obj, "viewingSelf"), _obj), _applyDecoratedDescriptor(_obj, "canExpandProfile", [_dec2], Object.getOwnPropertyDescriptor(_obj, "canExpandProfile"), _obj), _applyDecoratedDescriptor(_obj, "hasProfileBackgroundUrl", [_dec3], Object.getOwnPropertyDescriptor(_obj, "hasProfileBackgroundUrl"), _obj), _applyDecoratedDescriptor(_obj, "collapsedInfo", [_dec4], Object.getOwnPropertyDescriptor(_obj, "collapsedInfo"), _obj), _applyDecoratedDescriptor(_obj, "isNotSuspendedOrIsStaff", [_dec5], Object.getOwnPropertyDescriptor(_obj, "isNotSuspendedOrIsStaff"), _obj), _applyDecoratedDescriptor(_obj, "removeNoFollow", [_dec6], Object.getOwnPropertyDescriptor(_obj, "removeNoFollow"), _obj), _applyDecoratedDescriptor(_obj, "showBookmarks", [_dec7], Object.getOwnPropertyDescriptor(_obj, "showBookmarks"), _obj), _applyDecoratedDescriptor(_obj, "showDrafts", [_dec8], Object.getOwnPropertyDescriptor(_obj, "showDrafts"), _obj), _applyDecoratedDescriptor(_obj, "showRead", [_dec9], Object.getOwnPropertyDescriptor(_obj, "showRead"), _obj), _applyDecoratedDescriptor(_obj, "showPrivateMessages", [_dec10], Object.getOwnPropertyDescriptor(_obj, "showPrivateMessages"), _obj), _applyDecoratedDescriptor(_obj, "showNotificationsTab", [_dec11], Object.getOwnPropertyDescriptor(_obj, "showNotificationsTab"), _obj), _applyDecoratedDescriptor(_obj, "nameFirst", [_dec12], Object.getOwnPropertyDescriptor(_obj, "nameFirst"), _obj), _applyDecoratedDescriptor(_obj, "showBadges", [_dec13], Object.getOwnPropertyDescriptor(_obj, "showBadges"), _obj), _applyDecoratedDescriptor(_obj, "canInviteToForum", [_dec14], Object.getOwnPropertyDescriptor(_obj, "canInviteToForum"), _obj), _applyDecoratedDescriptor(_obj, "publicUserFields", [_dec15], Object.getOwnPropertyDescriptor(_obj, "publicUserFields"), _obj), _applyDecoratedDescriptor(_obj, "primaryGroup", [_dec16], Object.getOwnPropertyDescriptor(_obj, "primaryGroup"), _obj), _applyDecoratedDescriptor(_obj, "showSuspensions", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showSuspensions"), _obj)), _obj)));
  _exports.default = _default;
});