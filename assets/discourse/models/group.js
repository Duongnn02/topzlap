define("discourse/models/group", ["exports", "discourse-common/utils/decorators", "discourse/models/category", "@ember/object", "discourse/models/group-history", "rsvp", "discourse/models/rest", "discourse/models/topic", "discourse/models/user", "discourse/lib/ajax", "@ember/object/computed", "@ember/utils"], function (_exports, _decorators, _category, _object, _groupHistory, _rsvp, _rest, _topic, _user, _ajax, _computed, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"discourse/models/category",0,"@ember/object",0,"discourse/models/group-history",0,"rsvp",0,"discourse/models/rest",0,"discourse/models/topic",0,"discourse/models/user",0,"discourse/lib/ajax",0,"@ember/object/computed",0,"@ember/utils"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const Group = _rest.default.extend((_dec = (0, _decorators.default)("automatic_membership_email_domains"), _dec2 = (0, _decorators.default)("associated_group_ids"), _dec3 = (0, _decorators.default)("automatic"), _dec4 = (0, _decorators.default)("display_name", "name"), _dec5 = (0, _decorators.default)("flair_bg_color"), _dec6 = (0, _decorators.default)("flair_color"), _dec7 = (0, _decorators.default)("visibility_level"), _dec8 = (0, _decorators.observes)("isPrivate", "canEveryoneMention"), _dec9 = (0, _decorators.default)("watching_category_ids"), _dec10 = (0, _decorators.default)("tracking_category_ids"), _dec11 = (0, _decorators.default)("watching_first_post_category_ids"), _dec12 = (0, _decorators.default)("regular_category_ids"), _dec13 = (0, _decorators.default)("muted_category_ids"), (_obj = {
    user_count: 0,
    limit: null,
    offset: null,
    request_count: 0,
    requestersLimit: null,
    requestersOffset: null,
    init() {
      this._super(...arguments);
      this.setProperties({
        members: [],
        requesters: []
      });
    },
    emailDomains(value) {
      return (0, _utils.isEmpty)(value) ? "" : value;
    },
    associatedGroupIds(value) {
      return (0, _utils.isEmpty)(value) ? [] : value;
    },
    type(automatic) {
      return automatic ? "automatic" : "custom";
    },
    async reloadMembers(params, refresh) {
      if ((0, _utils.isEmpty)(this.name) || !this.can_see_members) {
        return;
      }
      if (refresh) {
        this.setProperties({
          limit: null,
          offset: null
        });
      }
      params = Object.assign({
        offset: (this.offset || 0) + (this.limit || 0)
      }, params);
      const response = await Group.loadMembers(this.name, params);
      const ownerIds = new Set();
      response.owners.forEach(owner => ownerIds.add(owner.id));
      const members = refresh ? [] : this.members;
      members.pushObjects(response.members.map(member => {
        member.owner = ownerIds.has(member.id);
        member.primary = member.primary_group_name === this.name;
        return _user.default.create(member);
      }));
      this.setProperties({
        members,
        user_count: response.meta.total,
        limit: response.meta.limit,
        offset: response.meta.offset
      });
    },
    findRequesters(params, refresh) {
      if ((0, _utils.isEmpty)(this.name) || !this.can_see_members) {
        return _rsvp.Promise.reject();
      }
      if (refresh) {
        this.setProperties({
          requestersOffset: null,
          requestersLimit: null
        });
      }
      params = Object.assign({
        offset: (this.requestersOffset || 0) + (this.requestersLimit || 0),
        requesters: true
      }, params);
      return Group.loadMembers(this.name, params).then(result => {
        const requesters = refresh ? [] : this.requesters;
        requesters.pushObjects(result.members.map(m => _user.default.create(m)));
        this.setProperties({
          requesters,
          request_count: result.meta.total,
          requestersLimit: result.meta.limit,
          requestersOffset: result.meta.offset
        });
      });
    },
    async removeOwner(member) {
      await (0, _ajax.ajax)(`/admin/groups/${this.id}/owners.json`, {
        type: "DELETE",
        data: {
          user_id: member.id
        }
      });
      await this.reloadMembers({}, true);
    },
    async removeMember(member, params) {
      await (0, _ajax.ajax)(`/groups/${this.id}/members.json`, {
        type: "DELETE",
        data: {
          user_id: member.id
        }
      });
      await this.reloadMembers(params, true);
    },
    async leave() {
      await (0, _ajax.ajax)(`/groups/${this.id}/leave.json`, {
        type: "DELETE"
      });
      this.set("can_see_members", this.members_visibility_level < 2);
      await this.reloadMembers({}, true);
    },
    async addMembers(usernames, filter, notifyUsers) {
      let emails = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      const response = await (0, _ajax.ajax)(`/groups/${this.id}/members.json`, {
        type: "PUT",
        data: {
          usernames,
          emails,
          notify_users: notifyUsers
        }
      });
      if (filter) {
        await this._filterMembers(response.usernames);
      } else {
        await this.reloadMembers();
      }
    },
    async join() {
      await (0, _ajax.ajax)(`/groups/${this.id}/join.json`, {
        type: "PUT"
      });
      await this.reloadMembers({}, true);
    },
    async addOwners(usernames, filter, notifyUsers) {
      const response = await (0, _ajax.ajax)(`/groups/${this.id}/owners.json`, {
        type: "PUT",
        data: {
          usernames,
          notify_users: notifyUsers
        }
      });
      if (filter) {
        await this._filterMembers(response.usernames);
      } else {
        await this.reloadMembers({}, true);
      }
    },
    _filterMembers(usernames) {
      return this.reloadMembers({
        filter: usernames.join(",")
      });
    },
    displayName(groupDisplayName, name) {
      return groupDisplayName || name;
    },
    flairBackgroundHexColor(flairBgColor) {
      return flairBgColor ? flairBgColor.replace(new RegExp("[^0-9a-fA-F]", "g"), "") : null;
    },
    flairHexColor(flairColor) {
      return flairColor ? flairColor.replace(new RegExp("[^0-9a-fA-F]", "g"), "") : null;
    },
    canEveryoneMention: (0, _computed.equal)("mentionable_level", 99),
    isPrivate(visibilityLevel) {
      return visibilityLevel > 1;
    },
    _updateAllowMembershipRequests() {
      if (this.isPrivate || !this.canEveryoneMention) {
        this.set("allow_membership_requests", false);
      }
    },
    watchingCategories(categoryIds) {
      return _category.default.findByIds(categoryIds);
    },
    trackingCategories(categoryIds) {
      return _category.default.findByIds(categoryIds);
    },
    watchingFirstPostCategories(categoryIds) {
      return _category.default.findByIds(categoryIds);
    },
    regularCategories(categoryIds) {
      return _category.default.findByIds(categoryIds);
    },
    mutedCategories(categoryIds) {
      return _category.default.findByIds(categoryIds);
    },
    asJSON() {
      const attrs = {
        name: this.name,
        mentionable_level: this.mentionable_level,
        messageable_level: this.messageable_level,
        visibility_level: this.visibility_level,
        members_visibility_level: this.members_visibility_level,
        automatic_membership_email_domains: this.emailDomains,
        title: this.title,
        primary_group: !!this.primary_group,
        grant_trust_level: this.grant_trust_level,
        incoming_email: this.incoming_email,
        smtp_server: this.smtp_server,
        smtp_port: this.smtp_port,
        smtp_ssl: this.smtp_ssl,
        smtp_enabled: this.smtp_enabled,
        imap_server: this.imap_server,
        imap_port: this.imap_port,
        imap_ssl: this.imap_ssl,
        imap_mailbox_name: this.imap_mailbox_name,
        imap_enabled: this.imap_enabled,
        email_username: this.email_username,
        email_from_alias: this.email_from_alias,
        email_password: this.email_password,
        flair_icon: null,
        flair_upload_id: null,
        flair_bg_color: this.flairBackgroundHexColor,
        flair_color: this.flairHexColor,
        bio_raw: this.bio_raw,
        public_admission: this.public_admission,
        public_exit: this.public_exit,
        allow_membership_requests: this.allow_membership_requests,
        full_name: this.full_name,
        default_notification_level: this.default_notification_level,
        membership_request_template: this.membership_request_template,
        publish_read_state: this.publish_read_state,
        allow_unknown_sender_topic_replies: this.allow_unknown_sender_topic_replies
      };
      ["muted", "regular", "watching", "tracking", "watching_first_post"].forEach(s => {
        let prop = s === "watching_first_post" ? "watchingFirstPostCategories" : s + "Categories";
        let categories = this.get(prop);
        if (categories) {
          attrs[s + "_category_ids"] = categories.length > 0 ? categories.map(c => c.get("id")) : [-1];
        }
        let tags = this.get(s + "_tags");
        if (tags) {
          attrs[s + "_tags"] = tags.length > 0 ? tags : [""];
        }
      });
      let agIds = this.associated_group_ids;
      if (agIds) {
        attrs["associated_group_ids"] = agIds.length ? agIds : [null];
      }
      if (this.flair_type === "icon") {
        attrs["flair_icon"] = this.flair_icon;
      } else if (this.flair_type === "image") {
        attrs["flair_upload_id"] = this.flair_upload_id;
      }
      if (!this.id) {
        attrs["usernames"] = this.usernames;
        attrs["owner_usernames"] = this.ownerUsernames;
      }
      return attrs;
    },
    async create() {
      const response = await (0, _ajax.ajax)("/admin/groups", {
        type: "POST",
        data: {
          group: this.asJSON()
        }
      });
      this.setProperties({
        id: response.basic_group.id,
        usernames: null,
        ownerUsernames: null
      });
      await this.reloadMembers();
    },
    save() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _ajax.ajax)(`/groups/${this.id}`, {
        type: "PUT",
        data: Object.assign({
          group: this.asJSON()
        }, opts)
      });
    },
    destroy() {
      if (!this.id) {
        return;
      }
      return (0, _ajax.ajax)(`/admin/groups/${this.id}`, {
        type: "DELETE"
      });
    },
    findLogs(offset, filters) {
      return (0, _ajax.ajax)(`/groups/${this.name}/logs.json`, {
        data: {
          offset,
          filters
        }
      }).then(results => {
        return _object.default.create({
          logs: results["logs"].map(log => _groupHistory.default.create(log)),
          all_loaded: results["all_loaded"]
        });
      });
    },
    findPosts(opts) {
      opts = opts || {};
      const type = opts.type || "posts";
      const data = {};
      if (opts.beforePostId) {
        data.before_post_id = opts.beforePostId;
      }
      if (opts.categoryId) {
        data.category_id = parseInt(opts.categoryId, 10);
      }
      return (0, _ajax.ajax)(`/groups/${this.name}/${type}.json`, {
        data
      }).then(posts => {
        return posts.map(p => {
          p.user = _user.default.create(p.user);
          p.topic = _topic.default.create(p.topic);
          p.category = _category.default.findById(p.category_id);
          return _object.default.create(p);
        });
      });
    },
    setNotification(notification_level, userId) {
      this.set("group_user.notification_level", notification_level);
      return (0, _ajax.ajax)(`/groups/${this.name}/notifications`, {
        data: {
          notification_level,
          user_id: userId
        },
        type: "POST"
      });
    },
    requestMembership(reason) {
      return (0, _ajax.ajax)(`/groups/${this.name}/request_membership`, {
        type: "POST",
        data: {
          reason
        }
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "emailDomains", [_dec], Object.getOwnPropertyDescriptor(_obj, "emailDomains"), _obj), _applyDecoratedDescriptor(_obj, "associatedGroupIds", [_dec2], Object.getOwnPropertyDescriptor(_obj, "associatedGroupIds"), _obj), _applyDecoratedDescriptor(_obj, "type", [_dec3], Object.getOwnPropertyDescriptor(_obj, "type"), _obj), _applyDecoratedDescriptor(_obj, "displayName", [_dec4], Object.getOwnPropertyDescriptor(_obj, "displayName"), _obj), _applyDecoratedDescriptor(_obj, "flairBackgroundHexColor", [_dec5], Object.getOwnPropertyDescriptor(_obj, "flairBackgroundHexColor"), _obj), _applyDecoratedDescriptor(_obj, "flairHexColor", [_dec6], Object.getOwnPropertyDescriptor(_obj, "flairHexColor"), _obj), _applyDecoratedDescriptor(_obj, "isPrivate", [_dec7], Object.getOwnPropertyDescriptor(_obj, "isPrivate"), _obj), _applyDecoratedDescriptor(_obj, "_updateAllowMembershipRequests", [_dec8], Object.getOwnPropertyDescriptor(_obj, "_updateAllowMembershipRequests"), _obj), _applyDecoratedDescriptor(_obj, "watchingCategories", [_dec9], Object.getOwnPropertyDescriptor(_obj, "watchingCategories"), _obj), _applyDecoratedDescriptor(_obj, "trackingCategories", [_dec10], Object.getOwnPropertyDescriptor(_obj, "trackingCategories"), _obj), _applyDecoratedDescriptor(_obj, "watchingFirstPostCategories", [_dec11], Object.getOwnPropertyDescriptor(_obj, "watchingFirstPostCategories"), _obj), _applyDecoratedDescriptor(_obj, "regularCategories", [_dec12], Object.getOwnPropertyDescriptor(_obj, "regularCategories"), _obj), _applyDecoratedDescriptor(_obj, "mutedCategories", [_dec13], Object.getOwnPropertyDescriptor(_obj, "mutedCategories"), _obj)), _obj)));
  Group.reopenClass({
    findAll(opts) {
      return (0, _ajax.ajax)("/groups/search.json", {
        data: opts
      }).then(groups => groups.map(g => Group.create(g)));
    },
    loadMembers(name, opts) {
      return (0, _ajax.ajax)(`/groups/${name}/members.json`, {
        data: opts
      });
    },
    mentionable(name) {
      return (0, _ajax.ajax)(`/groups/${name}/mentionable`);
    },
    messageable(name) {
      return (0, _ajax.ajax)(`/groups/${name}/messageable`);
    },
    checkName(name) {
      return (0, _ajax.ajax)("/groups/check-name", {
        data: {
          group_name: name
        }
      });
    }
  });
  var _default = Group;
  _exports.default = _default;
});