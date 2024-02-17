define("discourse/models/user", ["exports", "@ember/object", "@ember/string", "discourse/lib/cookie", "discourse/lib/utilities", "@ember/object/computed", "discourse-common/lib/get-url", "@ember/array", "discourse/models/badge", "discourse/models/bookmark", "discourse/models/category", "discourse/models/group", "I18n", "discourse/lib/notification-levels", "discourse/lib/preload-store", "rsvp", "discourse/models/rest", "discourse/mixins/singleton", "discourse/models/site", "discourse/models/user-action", "discourse/models/user-action-stat", "discourse/models/user-badge", "discourse/models/user-drafts-stream", "discourse/models/user-posts-stream", "discourse/models/user-stream", "discourse/lib/ajax", "discourse-common/lib/deprecated", "discourse-common/utils/decorators", "discourse/lib/text", "discourse-common/lib/get-owner", "@ember/utils", "discourse/lib/formatter", "discourse/lib/computed", "discourse/lib/url", "@ember/template", "@ember/object/evented", "@ember/runloop", "discourse-common/lib/later", "discourse-common/config/environment", "discourse/lib/user-tips", "@ember/object/compat"], function (_exports, _object, _string, _cookie, _utilities, _computed, _getUrl, _array, _badge, _bookmark, _category, _group, _I18n, _notificationLevels, _preloadStore, _rsvp, _rest, _singleton, _site, _userAction, _userActionStat, _userBadge, _userDraftsStream, _userPostsStream, _userStream, _ajax, _deprecated, _decorators, _text, _getOwner, _utils, _formatter, _computed2, _url, _template, _evented, _runloop, _later, _environment, _userTips, _compat) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.SECOND_FACTOR_METHODS = void 0;
  _exports.addSaveableUserField = addSaveableUserField;
  _exports.addSaveableUserOptionField = addSaveableUserOptionField;
  _exports.default = void 0;
  _exports.extendTextSizeCookie = extendTextSizeCookie;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _obj, _init, _init2, _init3, _init4;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/string",0,"discourse/lib/cookie",0,"discourse/lib/utilities",0,"@ember/object/computed",0,"discourse-common/lib/get-url",0,"@ember/array",0,"discourse/models/badge",0,"discourse/models/bookmark",0,"discourse/models/category",0,"discourse/models/group",0,"I18n",0,"discourse/lib/notification-levels",0,"discourse/lib/preload-store",0,"rsvp",0,"discourse/models/rest",0,"discourse/mixins/singleton",0,"discourse/models/site",0,"discourse/models/user-action",0,"discourse/models/user-action-stat",0,"discourse/models/user-badge",0,"discourse/models/user-drafts-stream",0,"discourse/models/user-posts-stream",0,"discourse/models/user-stream",0,"discourse/lib/ajax",0,"discourse-common/lib/deprecated",0,"discourse-common/utils/decorators",0,"discourse/lib/text",0,"discourse-common/lib/get-owner",0,"@ember/utils",0,"discourse/lib/formatter",0,"discourse/lib/computed",0,"discourse/lib/url",0,"@ember/template",0,"@ember/object/evented",0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse-common/config/environment",0,"discourse/lib/user-tips",0,"@ember/object/compat"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const SECOND_FACTOR_METHODS = {
    TOTP: 1,
    BACKUP_CODE: 2,
    SECURITY_KEY: 3
  };
  _exports.SECOND_FACTOR_METHODS = SECOND_FACTOR_METHODS;
  const TEXT_SIZE_COOKIE_NAME = "text_size";
  const COOKIE_EXPIRY_DAYS = 365;
  function extendTextSizeCookie() {
    const currentValue = (0, _cookie.default)(TEXT_SIZE_COOKIE_NAME);
    if (currentValue) {
      (0, _cookie.default)(TEXT_SIZE_COOKIE_NAME, currentValue, {
        path: "/",
        expires: COOKIE_EXPIRY_DAYS
      });
    }
  }
  const isForever = dt => moment().diff(dt, "years") < -100;
  let userFields = ["bio_raw", "website", "location", "name", "title", "locale", "custom_fields", "user_fields", "muted_usernames", "ignored_usernames", "allowed_pm_usernames", "profile_background_upload_url", "card_background_upload_url", "muted_tags", "tracked_tags", "watched_tags", "watching_first_post_tags", "date_of_birth", "primary_group_id", "flair_group_id", "user_notification_schedule", "sidebar_category_ids", "sidebar_tag_names", "status"];
  function addSaveableUserField(fieldName) {
    userFields.push(fieldName);
  }
  let userOptionFields = ["mailing_list_mode", "mailing_list_mode_frequency", "external_links_in_new_tab", "email_digests", "email_in_reply_to", "email_messages_level", "email_level", "email_previous_replies", "color_scheme_id", "dark_scheme_id", "dynamic_favicon", "enable_quoting", "enable_defer", "automatically_unpin_topics", "digest_after_minutes", "new_topic_duration_minutes", "auto_track_topics_after_msecs", "notification_level_when_replying", "like_notification_frequency", "include_tl0_in_digests", "theme_ids", "allow_private_messages", "enable_allowed_pm_users", "homepage_id", "hide_profile_and_presence", "text_size", "title_count_mode", "timezone", "skip_new_user_tips", "seen_popups", "default_calendar", "bookmark_auto_delete_preference", "sidebar_list_destination"];
  function addSaveableUserOptionField(fieldName) {
    userOptionFields.push(fieldName);
  }
  function userOption(userOptionKey) {
    return (0, _object.computed)(`user_option.${userOptionKey}`, {
      get(key) {
        (0, _deprecated.default)(`Getting ${key} property of user object is deprecated. Use user_option object instead`, {
          id: "discourse.user.userOptions",
          since: "2.9.0.beta12",
          dropFrom: "3.0.0.beta1"
        });
        return this.get(`user_option.${key}`);
      },
      set(key, value) {
        (0, _deprecated.default)(`Setting ${key} property of user object is deprecated. Use user_option object instead`, {
          id: "discourse.user.userOptions",
          since: "2.9.0.beta12",
          dropFrom: "3.0.0.beta1"
        });
        if (!this.user_option) {
          this.set("user_option", {});
        }
        return this.set(`user_option.${key}`, value);
      }
    });
  }
  const User = _rest.default.extend((_dec = (0, _decorators.default)("can_be_deleted", "post_count"), _dec2 = (0, _decorators.default)(), _dec3 = (0, _decorators.default)(), _dec4 = (0, _decorators.default)(), _dec5 = (0, _decorators.default)(), _dec6 = (0, _decorators.default)("username_lower"), _dec7 = (0, _decorators.default)("username", "name"), _dec8 = (0, _decorators.default)("profile_background_upload_url"), _dec9 = (0, _decorators.default)(), _dec10 = (0, _decorators.default)(), _dec11 = (0, _decorators.default)(), _dec12 = (0, _decorators.default)(), _dec13 = (0, _decorators.default)(), _dec14 = (0, _decorators.default)("username"), _dec15 = (0, _decorators.default)("trust_level"), _dec16 = (0, _decorators.default)("previous_visit_at"), _dec17 = (0, _decorators.default)("suspended_till"), _dec18 = (0, _decorators.default)("suspended_till"), _dec19 = (0, _decorators.default)("silenced_till"), _dec20 = (0, _decorators.default)("suspended_till"), _dec21 = (0, _decorators.default)("silenced_till"), _dec22 = (0, _decorators.default)("sidebar_tags.[]"), _dec23 = (0, _decorators.default)("groups.[]"), _dec24 = (0, _decorators.default)("filteredGroups", "numGroupsToDisplay"), _dec25 = (0, _decorators.default)("filteredGroups", "numGroupsToDisplay"), _dec26 = (0, _decorators.default)("statsExcludingPms.@each.count"), _dec27 = (0, _decorators.default)("stats.@each.isPM"), _dec28 = (0, _decorators.default)("can_delete_account"), _dec29 = (0, _decorators.default)("groups.@each.title", "badges.[]"), _dec30 = (0, _decorators.default)("groups.[]"), _dec31 = (0, _decorators.default)("user_option.text_size_seq", "user_option.text_size"), _dec32 = (0, _decorators.default)("second_factor_enabled", "staff"), _dec33 = (0, _decorators.default)("tracked_tags.[]", "watched_tags.[]", "watching_first_post_tags.[]"), (_obj = {
    mailing_list_mode: userOption("mailing_list_mode"),
    external_links_in_new_tab: userOption("external_links_in_new_tab"),
    enable_quoting: userOption("enable_quoting"),
    dynamic_favicon: userOption("dynamic_favicon"),
    automatically_unpin_topics: userOption("automatically_unpin_topics"),
    likes_notifications_disabled: userOption("likes_notifications_disabled"),
    hide_profile_and_presence: userOption("hide_profile_and_presence"),
    title_count_mode: userOption("title_count_mode"),
    enable_defer: userOption("enable_defer"),
    timezone: userOption("timezone"),
    skip_new_user_tips: userOption("skip_new_user_tips"),
    default_calendar: userOption("default_calendar"),
    bookmark_auto_delete_preference: userOption("bookmark_auto_delete_preference"),
    seen_popups: userOption("seen_popups"),
    should_be_redirected_to_top: userOption("should_be_redirected_to_top"),
    redirected_to_top: userOption("redirected_to_top"),
    treat_as_new_topic_start_date: userOption("treat_as_new_topic_start_date"),
    hasPMs: (0, _computed.gt)("private_messages_stats.all", 0),
    hasStartedPMs: (0, _computed.gt)("private_messages_stats.mine", 0),
    hasUnreadPMs: (0, _computed.gt)("private_messages_stats.unread", 0),
    canBeDeleted(canBeDeleted, postCount) {
      const maxPostCount = this.siteSettings.delete_all_posts_max;
      return canBeDeleted && postCount <= maxPostCount;
    },
    stream() {
      return _userStream.default.create({
        user: this
      });
    },
    bookmarks() {
      return _bookmark.default.create({
        user: this
      });
    },
    postsStream() {
      return _userPostsStream.default.create({
        user: this
      });
    },
    userDraftsStream() {
      return _userDraftsStream.default.create({
        user: this
      });
    },
    staff: (0, _object.computed)("admin", "moderator", {
      get() {
        return this.admin || this.moderator;
      },
      // prevents staff property to be overridden
      set() {
        return this.admin || this.moderator;
      }
    }),
    destroySession() {
      return (0, _ajax.ajax)(`/session/${this.username}`, {
        type: "DELETE"
      });
    },
    searchContext(username) {
      return {
        type: "user",
        id: username,
        user: this
      };
    },
    displayName(username, name) {
      if (this.siteSettings.enable_names && !(0, _utils.isEmpty)(name)) {
        return name;
      }
      return username;
    },
    profileBackgroundUrl(bgUrl) {
      if ((0, _utils.isEmpty)(bgUrl) || !this.siteSettings.allow_profile_backgrounds) {
        return (0, _template.htmlSafe)("");
      }
      return (0, _template.htmlSafe)("background-image: url(" + (0, _getUrl.getURLWithCDN)(bgUrl) + ")");
    },
    path() {
      // no need to observe, requires a hard refresh to update
      return (0, _url.userPath)(this.username_lower);
    },
    userApiKeys() {
      const keys = this.user_api_keys;
      if (keys) {
        return keys.map(raw => {
          let obj = _object.default.create(raw);
          obj.revoke = () => {
            this.revokeApiKey(obj);
          };
          obj.undoRevoke = () => {
            this.undoRevokeApiKey(obj);
          };
          return obj;
        });
      }
    },
    revokeApiKey(key) {
      return (0, _ajax.ajax)("/user-api-key/revoke", {
        type: "POST",
        data: {
          id: key.get("id")
        }
      }).then(() => {
        key.set("revoked", true);
      });
    },
    undoRevokeApiKey(key) {
      return (0, _ajax.ajax)("/user-api-key/undo-revoke", {
        type: "POST",
        data: {
          id: key.get("id")
        }
      }).then(() => {
        key.set("revoked", false);
      });
    },
    pmPath(topic) {
      const userId = this.id;
      const username = this.username_lower;
      const details = topic && topic.get("details");
      const allowedUsers = details && details.get("allowed_users");
      const groups = details && details.get("allowed_groups");

      // directly targeted so go to inbox
      if (!groups || allowedUsers && allowedUsers.findBy("id", userId)) {
        return (0, _url.userPath)(`${username}/messages`);
      } else {
        if (groups && groups[0]) {
          return (0, _url.userPath)(`${username}/messages/group/${groups[0].name}`);
        }
      }
    },
    adminPath: (0, _computed2.url)("id", "username_lower", "/admin/users/%@1/%@2"),
    mutedTopicsPath() {
      return (0, _utilities.defaultHomepage)() === "latest" ? (0, _getUrl.default)("/?state=muted") : (0, _getUrl.default)("/latest?state=muted");
    },
    watchingTopicsPath() {
      return (0, _utilities.defaultHomepage)() === "latest" ? (0, _getUrl.default)("/?state=watching") : (0, _getUrl.default)("/latest?state=watching");
    },
    trackingTopicsPath() {
      return (0, _utilities.defaultHomepage)() === "latest" ? (0, _getUrl.default)("/?state=tracking") : (0, _getUrl.default)("/latest?state=tracking");
    },
    username_lower(username) {
      return username.toLowerCase();
    },
    trustLevel(trustLevel) {
      return _site.default.currentProp("trustLevels").findBy("id", parseInt(trustLevel, 10));
    },
    isBasic: (0, _computed.equal)("trust_level", 0),
    isRegular: (0, _computed.equal)("trust_level", 3),
    isLeader: (0, _computed.equal)("trust_level", 4),
    canManageTopic: (0, _computed.or)("staff", "isLeader"),
    previousVisitAt(previous_visit_at) {
      return new Date(previous_visit_at);
    },
    suspended(suspendedTill) {
      return suspendedTill && moment(suspendedTill).isAfter();
    },
    suspendedForever: isForever,
    silencedForever: isForever,
    suspendedTillDate: _formatter.longDate,
    silencedTillDate: _formatter.longDate,
    sidebarCategoryIds: (0, _computed.alias)("sidebar_category_ids"),
    sidebarTags(sidebarTags) {
      if (!sidebarTags || sidebarTags.length === 0) {
        return [];
      }
      return sidebarTags.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    },
    sidebarSections: (0, _computed.alias)("sidebar_sections"),
    sidebarTagNames: (0, _computed.mapBy)("sidebarTags", "name"),
    sidebarListDestination: (0, _computed.readOnly)("sidebar_list_destination"),
    changeUsername(new_username) {
      return (0, _ajax.ajax)((0, _url.userPath)(`${this.username_lower}/preferences/username`), {
        type: "PUT",
        data: {
          new_username
        }
      });
    },
    addEmail(email) {
      return (0, _ajax.ajax)((0, _url.userPath)(`${this.username_lower}/preferences/email`), {
        type: "POST",
        data: {
          email
        }
      });
    },
    changeEmail(email) {
      return (0, _ajax.ajax)((0, _url.userPath)(`${this.username_lower}/preferences/email`), {
        type: "PUT",
        data: {
          email
        }
      });
    },
    copy() {
      return User.create(this.getProperties(Object.keys(this)));
    },
    save(fields) {
      const data = this.getProperties(userFields.filter(uf => !fields || fields.includes(uf)));
      const filteredUserOptionFields = fields ? userOptionFields.filter(uo => fields.includes(uo)) : userOptionFields;
      filteredUserOptionFields.forEach(s => {
        data[s] = this.get(`user_option.${s}`);
      });
      const updatedState = {};
      ["muted", "regular", "watched", "tracked", "watched_first_post"].forEach(categoryNotificationLevel => {
        if (fields === undefined || fields.includes(`${categoryNotificationLevel}_category_ids`)) {
          const categories = this.get(`${(0, _string.camelize)(categoryNotificationLevel)}Categories`);
          if (categories) {
            const ids = categories.map(c => c.get("id"));
            updatedState[`${categoryNotificationLevel}_category_ids`] = ids;
            // HACK: Empty arrays are not sent in the request, we use [-1],
            // an invalid category ID, that will be ignored by the server.
            data[`${categoryNotificationLevel}_category_ids`] = ids.length === 0 ? [-1] : ids;
          }
        }
      });
      ["muted_tags", "tracked_tags", "watched_tags", "watching_first_post_tags"].forEach(prop => {
        if (fields === undefined || fields.includes(prop)) {
          data[prop] = this.get(prop) ? this.get(prop).join(",") : "";
        }
      });
      ["sidebar_category_ids", "sidebar_tag_names"].forEach(prop => {
        if (data[prop]?.length === 0) {
          data[prop] = null;
        }
      });

      // TODO: We can remove this when migrated fully to rest model.
      this.set("isSaving", true);
      return (0, _ajax.ajax)((0, _url.userPath)(`${this.username_lower}.json`), {
        data,
        type: "PUT"
      }).then(result => {
        this.setProperties(updatedState);
        this.setProperties((0, _object.getProperties)(result.user, "bio_excerpt"));
        return result;
      }).finally(() => {
        this.set("isSaving", false);
      });
    },
    setPrimaryEmail(email) {
      return (0, _ajax.ajax)((0, _url.userPath)(`${this.username}/preferences/primary-email.json`), {
        type: "PUT",
        data: {
          email
        }
      }).then(() => {
        this.secondary_emails.removeObject(email);
        this.secondary_emails.pushObject(this.email);
        this.set("email", email);
      });
    },
    destroyEmail(email) {
      return (0, _ajax.ajax)((0, _url.userPath)(`${this.username}/preferences/email.json`), {
        type: "DELETE",
        data: {
          email
        }
      }).then(() => {
        if (this.unconfirmed_emails.includes(email)) {
          this.unconfirmed_emails.removeObject(email);
        } else {
          this.secondary_emails.removeObject(email);
        }
      });
    },
    changePassword() {
      return (0, _ajax.ajax)("/session/forgot_password", {
        dataType: "json",
        data: {
          login: this.email || this.username
        },
        type: "POST"
      });
    },
    loadSecondFactorCodes(password) {
      return (0, _ajax.ajax)("/u/second_factors.json", {
        data: {
          password
        },
        type: "POST"
      });
    },
    requestSecurityKeyChallenge() {
      return (0, _ajax.ajax)("/u/create_second_factor_security_key.json", {
        type: "POST"
      });
    },
    registerSecurityKey(credential) {
      return (0, _ajax.ajax)("/u/register_second_factor_security_key.json", {
        data: credential,
        type: "POST"
      });
    },
    createSecondFactorTotp() {
      return (0, _ajax.ajax)("/u/create_second_factor_totp.json", {
        type: "POST"
      });
    },
    enableSecondFactorTotp(authToken, name) {
      return (0, _ajax.ajax)("/u/enable_second_factor_totp.json", {
        data: {
          second_factor_token: authToken,
          name
        },
        type: "POST"
      });
    },
    disableAllSecondFactors() {
      return (0, _ajax.ajax)("/u/disable_second_factor.json", {
        type: "PUT"
      });
    },
    updateSecondFactor(id, name, disable, targetMethod) {
      return (0, _ajax.ajax)("/u/second_factor.json", {
        data: {
          second_factor_target: targetMethod,
          name,
          disable,
          id
        },
        type: "PUT"
      });
    },
    updateSecurityKey(id, name, disable) {
      return (0, _ajax.ajax)("/u/security_key.json", {
        data: {
          name,
          disable,
          id
        },
        type: "PUT"
      });
    },
    toggleSecondFactor(authToken, authMethod, targetMethod, enable) {
      return (0, _ajax.ajax)("/u/second_factor.json", {
        data: {
          second_factor_token: authToken,
          second_factor_method: authMethod,
          second_factor_target: targetMethod,
          enable
        },
        type: "PUT"
      });
    },
    generateSecondFactorCodes() {
      return (0, _ajax.ajax)("/u/second_factors_backup.json", {
        type: "PUT"
      });
    },
    revokeAssociatedAccount(providerName) {
      return (0, _ajax.ajax)((0, _url.userPath)(`${this.username}/preferences/revoke-account`), {
        data: {
          provider_name: providerName
        },
        type: "POST"
      });
    },
    async loadUserAction(id) {
      const result = await (0, _ajax.ajax)(`/user_actions/${id}.json`);
      if (!result?.user_action) {
        return;
      }
      const ua = result.user_action;
      if ((this.get("stream.filter") || ua.action_type) !== ua.action_type) {
        return;
      }
      if (!this.get("stream.filter") && !this.inAllStream(ua)) {
        return;
      }
      ua.title = (0, _text.emojiUnescape)((0, _utilities.escapeExpression)(ua.title));
      const action = _userAction.default.collapseStream([_userAction.default.create(ua)]);
      this.stream.set("itemsLoaded", this.stream.get("itemsLoaded") + 1);
      this.stream.get("content").insertAt(0, action[0]);
    },
    inAllStream(ua) {
      return ua.action_type === _userAction.default.TYPES.posts || ua.action_type === _userAction.default.TYPES.topics;
    },
    numGroupsToDisplay: 2,
    filteredGroups() {
      const groups = this.groups || [];
      return groups.filter(group => {
        return !group.automatic || group.name === "moderators";
      });
    },
    groupsWithMessages: (0, _computed.filterBy)("groups", "has_messages", true),
    displayGroups(filteredGroups, numGroupsToDisplay) {
      const groups = filteredGroups.slice(0, numGroupsToDisplay);
      return groups.length === 0 ? null : groups;
    },
    showMoreGroupsLink(filteredGroups, numGroupsToDisplay) {
      return filteredGroups.length > numGroupsToDisplay;
    },
    // NOTE: This only includes groups *visible* to the user via the serializer,
    // so be wary when using this.
    isInAnyGroups(groupIds) {
      if (!this.groups) {
        return;
      }

      // auto group ID 0 is "everyone"
      return groupIds.includes(0) || this.groups.mapBy("id").some(groupId => groupIds.includes(groupId));
    },
    statsCountNonPM() {
      if ((0, _utils.isEmpty)(this.statsExcludingPms)) {
        return 0;
      }
      let count = 0;
      this.statsExcludingPms.forEach(val => {
        if (this.inAllStream(val)) {
          count += val.count;
        }
      });
      return count;
    },
    statsExcludingPms() {
      if ((0, _utils.isEmpty)(this.stats)) {
        return [];
      }
      return this.stats.rejectBy("isPM");
    },
    findDetails(options) {
      const user = this;
      return _preloadStore.default.getAndRemove(`user_${user.get("username")}`, () => {
        if (options && options.existingRequest) {
          // Existing ajax request has been passed, use it
          return options.existingRequest;
        }
        const useCardRoute = options && options.forCard;
        if (options) {
          delete options.forCard;
        }
        const path = useCardRoute ? `${user.get("username")}/card.json` : `${user.get("username")}.json`;
        return (0, _ajax.ajax)((0, _url.userPath)(path), {
          data: options
        });
      }).then(json => {
        if (!(0, _utils.isEmpty)(json.user.stats)) {
          json.user.stats = User.groupStats(json.user.stats.map(s => {
            if (s.count) {
              s.count = parseInt(s.count, 10);
            }
            return _userActionStat.default.create(s);
          }));
        }
        if (!(0, _utils.isEmpty)(json.user.groups) && !(0, _utils.isEmpty)(json.user.group_users)) {
          const groups = [];
          for (let i = 0; i < json.user.groups.length; i++) {
            const group = _group.default.create(json.user.groups[i]);
            group.group_user = json.user.group_users[i];
            groups.push(group);
          }
          json.user.groups = groups;
        }
        if (json.user.invited_by) {
          json.user.invited_by = User.create(json.user.invited_by);
        }
        if (!(0, _utils.isEmpty)(json.user.featured_user_badge_ids)) {
          const userBadgesMap = {};
          _userBadge.default.createFromJson(json).forEach(userBadge => {
            userBadgesMap[userBadge.get("id")] = userBadge;
          });
          json.user.featured_user_badges = json.user.featured_user_badge_ids.map(id => userBadgesMap[id]);
        }
        if (json.user.card_badge) {
          json.user.card_badge = _badge.default.create(json.user.card_badge);
        }
        user.setProperties(json.user);
        return user;
      });
    },
    findStaffInfo() {
      if (!User.currentProp("staff")) {
        return _rsvp.Promise.resolve(null);
      }
      return (0, _ajax.ajax)((0, _url.userPath)(`${this.username_lower}/staff-info.json`)).then(info => {
        this.setProperties(info);
      });
    },
    pickAvatar(upload_id, type) {
      return (0, _ajax.ajax)((0, _url.userPath)(`${this.username_lower}/preferences/avatar/pick`), {
        type: "PUT",
        data: {
          upload_id,
          type
        }
      });
    },
    selectAvatar(avatarUrl) {
      return (0, _ajax.ajax)((0, _url.userPath)(`${this.username_lower}/preferences/avatar/select`), {
        type: "PUT",
        data: {
          url: avatarUrl
        }
      });
    },
    isAllowedToUploadAFile(type) {
      const settingName = type === "image" ? "embedded_media" : "attachments";
      return this.staff || this.trust_level > 0 || this.siteSettings[`newuser_max_${settingName}`] > 0;
    },
    createInvite(email, group_ids, custom_message) {
      return (0, _ajax.ajax)("/invites", {
        type: "POST",
        data: {
          email,
          group_ids,
          custom_message
        }
      });
    },
    generateInviteLink(email, group_ids, topic_id) {
      return (0, _ajax.ajax)("/invites", {
        type: "POST",
        data: {
          email,
          skip_email: true,
          group_ids,
          topic_id
        }
      });
    },
    generateMultipleUseInviteLink(group_ids, max_redemptions_allowed, expires_at) {
      return (0, _ajax.ajax)("/invites", {
        type: "POST",
        data: {
          group_ids,
          max_redemptions_allowed,
          expires_at
        }
      });
    },
    get mutedCategories() {
      return _category.default.findByIds(this.get("muted_category_ids"));
    },
    set mutedCategories(categories) {
      this.set("muted_category_ids", categories.map(c => c.id));
    },
    get regularCategories() {
      return _category.default.findByIds(this.get("regular_category_ids"));
    },
    set regularCategories(categories) {
      this.set("regular_category_ids", categories.map(c => c.id));
    },
    get trackedCategories() {
      return _category.default.findByIds(this.get("tracked_category_ids"));
    },
    set trackedCategories(categories) {
      this.set("tracked_category_ids", categories.map(c => c.id));
    },
    get watchedCategories() {
      return _category.default.findByIds(this.get("watched_category_ids"));
    },
    set watchedCategories(categories) {
      this.set("watched_category_ids", categories.map(c => c.id));
    },
    get watchedFirstPostCategories() {
      return _category.default.findByIds(this.get("watched_first_post_category_ids"));
    },
    set watchedFirstPostCategories(categories) {
      this.set("watched_first_post_category_ids", categories.map(c => c.id));
    },
    canDeleteAccount(canDeleteAccount) {
      return !this.siteSettings.enable_discourse_connect && canDeleteAccount;
    },
    delete() {
      if (this.can_delete_account) {
        return (0, _ajax.ajax)((0, _url.userPath)(this.username + ".json"), {
          type: "DELETE",
          data: {
            context: window.location.pathname
          }
        });
      } else {
        return _rsvp.Promise.reject(_I18n.default.t("user.delete_yourself_not_allowed"));
      }
    },
    updateNotificationLevel(_ref) {
      let {
        level,
        expiringAt = null,
        actingUser = null
      } = _ref;
      if (!actingUser) {
        actingUser = User.current();
      }
      return (0, _ajax.ajax)(`${(0, _url.userPath)(this.username)}/notification_level.json`, {
        type: "PUT",
        data: {
          notification_level: level,
          expiring_at: expiringAt,
          acting_user_id: actingUser.id
        }
      }).then(() => {
        if (!actingUser.ignored_users) {
          actingUser.ignored_users = [];
        }
        if (level === "normal" || level === "mute") {
          actingUser.ignored_users.removeObject(this.username);
        } else if (level === "ignore") {
          actingUser.ignored_users.addObject(this.username);
        }
      });
    },
    dismissBanner(bannerKey) {
      this.set("dismissed_banner_key", bannerKey);
      (0, _ajax.ajax)((0, _url.userPath)(this.username + ".json"), {
        type: "PUT",
        data: {
          dismissed_banner_key: bannerKey
        }
      });
    },
    checkEmail() {
      return (0, _ajax.ajax)((0, _url.userPath)(`${this.username_lower}/emails.json`), {
        data: {
          context: window.location.pathname
        }
      }).then(result => {
        if (result) {
          this.setProperties({
            email: result.email,
            secondary_emails: result.secondary_emails,
            unconfirmed_emails: result.unconfirmed_emails,
            associated_accounts: result.associated_accounts
          });
        }
      });
    },
    summary() {
      const store = (0, _getOwner.getOwner)(this).lookup("service:store");
      return (0, _ajax.ajax)((0, _url.userPath)(`${this.username_lower}/summary.json`)).then(json => {
        const summary = json.user_summary;
        const topicMap = {};
        const badgeMap = {};
        json.topics.forEach(t => topicMap[t.id] = store.createRecord("topic", t));
        _badge.default.createFromJson(json).forEach(b => badgeMap[b.id] = b);
        summary.topics = summary.topic_ids.map(id => topicMap[id]);
        summary.replies.forEach(r => {
          r.topic = topicMap[r.topic_id];
          r.url = r.topic.urlForPostNumber(r.post_number);
          r.createdAt = new Date(r.created_at);
        });
        summary.links.forEach(l => {
          l.topic = topicMap[l.topic_id];
          l.post_url = l.topic.urlForPostNumber(l.post_number);
        });
        if (summary.badges) {
          summary.badges = summary.badges.map(ub => {
            const badge = badgeMap[ub.badge_id];
            badge.count = ub.count;
            return badge;
          });
        }
        if (summary.top_categories) {
          summary.top_categories.forEach(c => {
            if (c.parent_category_id) {
              c.parentCategory = _category.default.findById(c.parent_category_id);
            }
          });
        }
        return summary;
      });
    },
    canManageGroup(group) {
      return group.get("automatic") ? false : group.get("can_admin_group") || group.get("is_group_owner");
    },
    availableTitles() {
      const titles = [];
      (this.groups || []).forEach(group => {
        if ((0, _object.get)(group, "title")) {
          titles.push((0, _object.get)(group, "title"));
        }
      });
      (this.badges || []).forEach(badge => {
        if ((0, _object.get)(badge, "allow_title")) {
          titles.push((0, _object.get)(badge, "name"));
        }
      });
      return titles.uniq().sort().map(title => {
        return {
          name: (0, _utilities.escapeExpression)(title),
          id: title
        };
      });
    },
    availableFlairs() {
      const flairs = [];
      if (this.groups) {
        this.groups.forEach(group => {
          if (group.flair_url) {
            flairs.push({
              id: group.id,
              name: group.name,
              url: group.flair_url,
              bgColor: group.flair_bg_color,
              color: group.flair_color
            });
          }
        });
      }
      return flairs;
    },
    currentTextSize(serverSeq, serverSize) {
      if ((0, _cookie.default)(TEXT_SIZE_COOKIE_NAME)) {
        const [cookieSize, cookieSeq] = (0, _cookie.default)(TEXT_SIZE_COOKIE_NAME).split("|");
        if (cookieSeq >= serverSeq) {
          return cookieSize;
        }
      }
      return serverSize;
    },
    updateTextSizeCookie(newSize) {
      if (newSize) {
        const seq = this.get("user_option.text_size_seq");
        (0, _cookie.default)(TEXT_SIZE_COOKIE_NAME, `${newSize}|${seq}`, {
          path: "/",
          expires: COOKIE_EXPIRY_DAYS
        });
      } else {
        (0, _cookie.removeCookie)(TEXT_SIZE_COOKIE_NAME, {
          path: "/"
        });
      }
    },
    enforcedSecondFactor(secondFactorEnabled, staff) {
      const enforce = this.siteSettings.enforce_second_factor;
      return !secondFactorEnabled && (enforce === "all" || enforce === "staff" && staff);
    },
    resolvedTimezone() {
      (0, _deprecated.default)("user.resolvedTimezone() has been deprecated. Use user.user_option.timezone instead", {
        id: "discourse.user.resolved-timezone",
        since: "2.9.0.beta12",
        dropFrom: "3.0.0.beta1"
      });
      return this.user_option.timezone;
    },
    calculateMutedIds(notificationLevel, id, type) {
      const muted_ids = this.get(type);
      if (notificationLevel === _notificationLevels.NotificationLevels.MUTED) {
        return muted_ids.concat(id).uniq();
      } else {
        return muted_ids.filter(existing_id => existing_id !== id);
      }
    },
    setPrimaryGroup(primaryGroupId) {
      return (0, _ajax.ajax)(`/admin/users/${this.id}/primary_group`, {
        type: "PUT",
        data: {
          primary_group_id: primaryGroupId
        }
      });
    },
    enterDoNotDisturbFor(duration) {
      return (0, _ajax.ajax)({
        url: "/do-not-disturb.json",
        type: "POST",
        data: {
          duration
        }
      }).then(response => {
        return this.updateDoNotDisturbStatus(response.ends_at);
      });
    },
    leaveDoNotDisturb() {
      return (0, _ajax.ajax)({
        url: "/do-not-disturb.json",
        type: "DELETE"
      }).then(() => {
        this.updateDoNotDisturbStatus(null);
      });
    },
    updateDoNotDisturbStatus(ends_at) {
      this.set("do_not_disturb_until", ends_at);
      this.appEvents.trigger("do-not-disturb:changed", this.do_not_disturb_until);
    },
    updateDraftProperties(properties) {
      this.setProperties(properties);
      this.appEvents.trigger("user-drafts:changed");
    },
    updateReviewableCount(count) {
      this.set("reviewable_count", count);
      this.appEvents.trigger("user-reviewable-count:changed", count);
    },
    isInDoNotDisturb() {
      return this.do_not_disturb_until && new Date(this.do_not_disturb_until) >= new Date();
    },
    trackedTags(trackedTags, watchedTags, watchingFirstPostTags) {
      return [...trackedTags, ...watchedTags, ...watchingFirstPostTags];
    },
    showUserTip(options) {
      const userTips = _site.default.currentProp("user_tips");
      if (!userTips || this.user_option?.skip_new_user_tips) {
        return;
      }
      if (!userTips[options.id]) {
        if (!(0, _environment.isTesting)()) {
          // eslint-disable-next-line no-console
          console.warn("Cannot show user tip with type =", options.id);
        }
        return;
      }
      const seenUserTips = this.user_option?.seen_popups || [];
      if (seenUserTips.includes(-1) || seenUserTips.includes(userTips[options.id])) {
        return;
      }
      (0, _userTips.showUserTip)({
        ...options,
        onDismiss: () => this.hideUserTipForever(options.id),
        onDismissAll: () => this.hideUserTipForever()
      });
    },
    hideUserTipForever(userTipId) {
      const userTips = _site.default.currentProp("user_tips");
      if (!userTips || this.user_option?.skip_new_user_tips) {
        return;
      }

      // Empty userTipId means all user tips.
      if (userTipId && !userTips[userTipId]) {
        // eslint-disable-next-line no-console
        console.warn("Cannot hide user tip with type =", userTipId);
        return;
      }

      // Hide user tips and maybe show the next one.
      if (userTipId) {
        (0, _userTips.hideUserTip)(userTipId);
        (0, _userTips.showNextUserTip)();
      } else {
        (0, _userTips.hideAllUserTips)();
      }

      // Update list of seen user tips.
      let seenUserTips = this.user_option?.seen_popups || [];
      if (userTipId) {
        if (seenUserTips.includes(userTips[userTipId])) {
          return;
        }
        seenUserTips.push(userTips[userTipId]);
      } else {
        if (seenUserTips.includes(-1)) {
          return;
        }
        seenUserTips = [-1];
      }

      // Save seen user tips on the server.
      if (!this.user_option) {
        this.set("user_option", {});
      }
      this.set("user_option.seen_popups", seenUserTips);
      if (userTipId) {
        return this.save(["seen_popups"]);
      } else {
        this.set("user_option.skip_new_user_tips", true);
        return this.save(["seen_popups", "skip_new_user_tips"]);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "canBeDeleted", [_dec], Object.getOwnPropertyDescriptor(_obj, "canBeDeleted"), _obj), _applyDecoratedDescriptor(_obj, "stream", [_dec2], Object.getOwnPropertyDescriptor(_obj, "stream"), _obj), _applyDecoratedDescriptor(_obj, "bookmarks", [_dec3], Object.getOwnPropertyDescriptor(_obj, "bookmarks"), _obj), _applyDecoratedDescriptor(_obj, "postsStream", [_dec4], Object.getOwnPropertyDescriptor(_obj, "postsStream"), _obj), _applyDecoratedDescriptor(_obj, "userDraftsStream", [_dec5], Object.getOwnPropertyDescriptor(_obj, "userDraftsStream"), _obj), _applyDecoratedDescriptor(_obj, "searchContext", [_dec6], Object.getOwnPropertyDescriptor(_obj, "searchContext"), _obj), _applyDecoratedDescriptor(_obj, "displayName", [_dec7], Object.getOwnPropertyDescriptor(_obj, "displayName"), _obj), _applyDecoratedDescriptor(_obj, "profileBackgroundUrl", [_dec8], Object.getOwnPropertyDescriptor(_obj, "profileBackgroundUrl"), _obj), _applyDecoratedDescriptor(_obj, "path", [_dec9], Object.getOwnPropertyDescriptor(_obj, "path"), _obj), _applyDecoratedDescriptor(_obj, "userApiKeys", [_dec10], Object.getOwnPropertyDescriptor(_obj, "userApiKeys"), _obj), _applyDecoratedDescriptor(_obj, "mutedTopicsPath", [_dec11], Object.getOwnPropertyDescriptor(_obj, "mutedTopicsPath"), _obj), _applyDecoratedDescriptor(_obj, "watchingTopicsPath", [_dec12], Object.getOwnPropertyDescriptor(_obj, "watchingTopicsPath"), _obj), _applyDecoratedDescriptor(_obj, "trackingTopicsPath", [_dec13], Object.getOwnPropertyDescriptor(_obj, "trackingTopicsPath"), _obj), _applyDecoratedDescriptor(_obj, "username_lower", [_dec14], Object.getOwnPropertyDescriptor(_obj, "username_lower"), _obj), _applyDecoratedDescriptor(_obj, "trustLevel", [_dec15], Object.getOwnPropertyDescriptor(_obj, "trustLevel"), _obj), _applyDecoratedDescriptor(_obj, "previousVisitAt", [_dec16], Object.getOwnPropertyDescriptor(_obj, "previousVisitAt"), _obj), _applyDecoratedDescriptor(_obj, "suspended", [_dec17], Object.getOwnPropertyDescriptor(_obj, "suspended"), _obj), _applyDecoratedDescriptor(_obj, "suspendedForever", [_dec18], (_init = Object.getOwnPropertyDescriptor(_obj, "suspendedForever"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "silencedForever", [_dec19], (_init2 = Object.getOwnPropertyDescriptor(_obj, "silencedForever"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "suspendedTillDate", [_dec20], (_init3 = Object.getOwnPropertyDescriptor(_obj, "suspendedTillDate"), _init3 = _init3 ? _init3.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init3;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "silencedTillDate", [_dec21], (_init4 = Object.getOwnPropertyDescriptor(_obj, "silencedTillDate"), _init4 = _init4 ? _init4.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init4;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "sidebarTags", [_dec22], Object.getOwnPropertyDescriptor(_obj, "sidebarTags"), _obj), _applyDecoratedDescriptor(_obj, "filteredGroups", [_dec23], Object.getOwnPropertyDescriptor(_obj, "filteredGroups"), _obj), _applyDecoratedDescriptor(_obj, "displayGroups", [_dec24], Object.getOwnPropertyDescriptor(_obj, "displayGroups"), _obj), _applyDecoratedDescriptor(_obj, "showMoreGroupsLink", [_dec25], Object.getOwnPropertyDescriptor(_obj, "showMoreGroupsLink"), _obj), _applyDecoratedDescriptor(_obj, "statsCountNonPM", [_dec26], Object.getOwnPropertyDescriptor(_obj, "statsCountNonPM"), _obj), _applyDecoratedDescriptor(_obj, "statsExcludingPms", [_dec27], Object.getOwnPropertyDescriptor(_obj, "statsExcludingPms"), _obj), _applyDecoratedDescriptor(_obj, "mutedCategories", [_compat.dependentKeyCompat], Object.getOwnPropertyDescriptor(_obj, "mutedCategories"), _obj), _applyDecoratedDescriptor(_obj, "regularCategories", [_compat.dependentKeyCompat], Object.getOwnPropertyDescriptor(_obj, "regularCategories"), _obj), _applyDecoratedDescriptor(_obj, "trackedCategories", [_compat.dependentKeyCompat], Object.getOwnPropertyDescriptor(_obj, "trackedCategories"), _obj), _applyDecoratedDescriptor(_obj, "watchedCategories", [_compat.dependentKeyCompat], Object.getOwnPropertyDescriptor(_obj, "watchedCategories"), _obj), _applyDecoratedDescriptor(_obj, "watchedFirstPostCategories", [_compat.dependentKeyCompat], Object.getOwnPropertyDescriptor(_obj, "watchedFirstPostCategories"), _obj), _applyDecoratedDescriptor(_obj, "canDeleteAccount", [_dec28], Object.getOwnPropertyDescriptor(_obj, "canDeleteAccount"), _obj), _applyDecoratedDescriptor(_obj, "availableTitles", [_dec29], Object.getOwnPropertyDescriptor(_obj, "availableTitles"), _obj), _applyDecoratedDescriptor(_obj, "availableFlairs", [_dec30], Object.getOwnPropertyDescriptor(_obj, "availableFlairs"), _obj), _applyDecoratedDescriptor(_obj, "currentTextSize", [_dec31], Object.getOwnPropertyDescriptor(_obj, "currentTextSize"), _obj), _applyDecoratedDescriptor(_obj, "enforcedSecondFactor", [_dec32], Object.getOwnPropertyDescriptor(_obj, "enforcedSecondFactor"), _obj), _applyDecoratedDescriptor(_obj, "trackedTags", [_dec33], Object.getOwnPropertyDescriptor(_obj, "trackedTags"), _obj)), _obj)));
  User.reopenClass(_singleton.default, {
    // Find a `User` for a given username.
    findByUsername(username, options) {
      const user = User.create({
        username
      });
      return user.findDetails(options);
    },
    // TODO: Use app.register and junk Singleton
    createCurrent() {
      const userJson = _preloadStore.default.get("currentUser");
      if (userJson) {
        userJson.isCurrent = true;
        if (userJson.primary_group_id) {
          const primaryGroup = userJson.groups.find(group => group.id === userJson.primary_group_id);
          if (primaryGroup) {
            userJson.primary_group_name = primaryGroup.name;
          }
        }
        if (!userJson.user_option.timezone) {
          userJson.user_option.timezone = moment.tz.guess();
          this._saveTimezone(userJson);
        }
        const store = (0, _getOwner.getOwner)(this).lookup("service:store");
        const currentUser = store.createRecord("user", userJson);
        currentUser.trackStatus();
        return currentUser;
      }
      return null;
    },
    checkUsername(username, email, for_user_id) {
      return (0, _ajax.ajax)((0, _url.userPath)("check_username"), {
        data: {
          username,
          email,
          for_user_id
        }
      });
    },
    checkEmail(email) {
      return (0, _ajax.ajax)((0, _url.userPath)("check_email"), {
        data: {
          email
        }
      });
    },
    loadRecentSearches() {
      return (0, _ajax.ajax)(`/u/recent-searches`);
    },
    resetRecentSearches() {
      return (0, _ajax.ajax)(`/u/recent-searches`, {
        type: "DELETE"
      });
    },
    groupStats(stats) {
      const responses = _userActionStat.default.create({
        count: 0,
        action_type: _userAction.default.TYPES.replies
      });
      stats.filterBy("isResponse").forEach(stat => {
        responses.set("count", responses.get("count") + stat.get("count"));
      });
      const result = (0, _array.A)();
      result.pushObjects(stats.rejectBy("isResponse"));
      let insertAt = 0;
      result.forEach((item, index) => {
        if (item.action_type === _userAction.default.TYPES.topics || item.action_type === _userAction.default.TYPES.posts) {
          insertAt = index + 1;
        }
      });
      if (responses.count > 0) {
        result.insertAt(insertAt, responses);
      }
      return result;
    },
    createAccount(attrs) {
      let data = {
        name: attrs.accountName,
        email: attrs.accountEmail,
        password: attrs.accountPassword,
        username: attrs.accountUsername,
        password_confirmation: attrs.accountPasswordConfirm,
        challenge: attrs.accountChallenge,
        user_fields: attrs.userFields,
        timezone: moment.tz.guess()
      };
      if (attrs.inviteCode) {
        data.invite_code = attrs.inviteCode;
      }
      return (0, _ajax.ajax)((0, _url.userPath)(), {
        data,
        type: "POST"
      });
    },
    _saveTimezone(user) {
      (0, _ajax.ajax)((0, _url.userPath)(user.username + ".json"), {
        type: "PUT",
        dataType: "json",
        data: {
          timezone: user.user_option.timezone
        }
      });
    }
  });
  User.reopenClass({
    create(args) {
      args = args || {};
      this.deleteStatusTrackingFields(args);
      return this._super(args);
    },
    deleteStatusTrackingFields(args) {
      // every user instance has to have it's own tracking fields
      // when creating a new user model
      // its _subscribersCount and _clearStatusTimerId fields
      // should be equal to 0 and null
      // here we makes sure that even if these fields
      // will be passed in args they won't be set anyway
      //
      // this is something that could be implemented by making these fields private,
      // but EmberObject doesn't support private fields
      if (args.hasOwnProperty("_subscribersCount")) {
        delete args._subscribersCount;
      }
      if (args.hasOwnProperty("_clearStatusTimerId")) {
        delete args._clearStatusTimerId;
      }
    }
  });

  // user status tracking
  User.reopen(_evented.default, {
    _subscribersCount: 0,
    _clearStatusTimerId: null,
    // always call stopTrackingStatus() when done with a user
    trackStatus() {
      if (!this.id) {
        // eslint-disable-next-line no-console
        console.warn("It's impossible to track user status on a user model that doesn't have id. This user model won't be receiving live user status updates.");
      }
      if (this._subscribersCount === 0) {
        this.addObserver("status", this, "_statusChanged");
        this.appEvents.on("user-status:changed", this, this._updateStatus);
        if (this.status && this.status.ends_at) {
          this._scheduleStatusClearing(this.status.ends_at);
        }
      }
      this._subscribersCount++;
    },
    stopTrackingStatus() {
      if (this._subscribersCount === 0) {
        return;
      }
      if (this._subscribersCount === 1) {
        // the last subscriber is unsubscribing
        this.removeObserver("status", this, "_statusChanged");
        this.appEvents.off("user-status:changed", this, this._updateStatus);
        this._unscheduleStatusClearing();
      }
      this._subscribersCount--;
    },
    _statusChanged(sender, key) {
      this.trigger("status-changed");
      const status = this.get(key);
      if (status && status.ends_at) {
        this._scheduleStatusClearing(status.ends_at);
      } else {
        this._unscheduleStatusClearing();
      }
    },
    _scheduleStatusClearing(endsAt) {
      if ((0, _environment.isTesting)()) {
        return;
      }
      if (this._clearStatusTimerId) {
        this._unscheduleStatusClearing();
      }
      const utcNow = moment.utc();
      const remaining = moment.utc(endsAt).diff(utcNow, "milliseconds");
      this._clearStatusTimerId = (0, _later.default)(this, "_autoClearStatus", remaining);
    },
    _unscheduleStatusClearing() {
      (0, _runloop.cancel)(this._clearStatusTimerId);
      this._clearStatusTimerId = null;
    },
    _autoClearStatus() {
      this.set("status", null);
    },
    _updateStatus(statuses) {
      if (statuses.hasOwnProperty(this.id)) {
        this.set("status", statuses[this.id]);
      }
    }
  });
  if (typeof Discourse !== "undefined") {
    let warned = false;
    // eslint-disable-next-line no-undef
    Object.defineProperty(Discourse, "User", {
      get() {
        if (!warned) {
          (0, _deprecated.default)("Import the User class instead of using Discourse.User", {
            since: "2.4.0",
            id: "discourse.globals.user"
          });
          warned = true;
        }
        return User;
      }
    });
  }
  var _default = User;
  _exports.default = _default;
});