define("discourse/models/user-badge", ["exports", "discourse/models/badge", "@ember/object", "rsvp", "discourse/models/topic", "discourse/models/user", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse-common/utils/decorators"], function (_exports, _badge, _object, _rsvp, _topic, _user, _ajax, _ajaxError, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/badge",0,"@ember/object",0,"rsvp",0,"discourse/models/topic",0,"discourse/models/user",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const UserBadge = _object.default.extend((_obj = {
    postUrl() {
      if (this.topic_title) {
        return "/t/-/" + this.topic_id + "/" + this.post_number;
      }
    },
    // avoid the extra bindings for now

    revoke() {
      return (0, _ajax.ajax)("/user_badges/" + this.id, {
        type: "DELETE"
      });
    },
    favorite() {
      this.toggleProperty("is_favorite");
      return (0, _ajax.ajax)(`/user_badges/${this.id}/toggle_favorite`, {
        type: "PUT"
      }).catch(e => {
        // something went wrong, switch the UI back:
        this.toggleProperty("is_favorite");
        (0, _ajaxError.popupAjaxError)(e);
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "postUrl", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "postUrl"), _obj)), _obj));
  UserBadge.reopenClass({
    createFromJson(json) {
      // Create User objects.
      if (json.users === undefined) {
        json.users = [];
      }
      let users = {};
      json.users.forEach(function (userJson) {
        users[userJson.id] = _user.default.create(userJson);
      });

      // Create Topic objects.
      if (json.topics === undefined) {
        json.topics = [];
      }
      let topics = {};
      json.topics.forEach(function (topicJson) {
        topics[topicJson.id] = _topic.default.create(topicJson);
      });

      // Create the badges.
      if (json.badges === undefined) {
        json.badges = [];
      }
      let badges = {};
      _badge.default.createFromJson(json).forEach(function (badge) {
        badges[badge.get("id")] = badge;
      });

      // Create UserBadge object(s).
      let userBadges = [];
      if ("user_badge" in json) {
        userBadges = [json.user_badge];
      } else {
        userBadges = json.user_badge_info && json.user_badge_info.user_badges || json.user_badges;
      }
      userBadges = userBadges.map(function (userBadgeJson) {
        let userBadge = UserBadge.create(userBadgeJson);
        let grantedAtDate = Date.parse(userBadge.get("granted_at"));
        userBadge.set("grantedAt", grantedAtDate);
        userBadge.set("badge", badges[userBadge.get("badge_id")]);
        if (userBadge.get("user_id")) {
          userBadge.set("user", users[userBadge.get("user_id")]);
        }
        if (userBadge.get("granted_by_id")) {
          userBadge.set("granted_by", users[userBadge.get("granted_by_id")]);
        }
        if (userBadge.get("topic_id")) {
          userBadge.set("topic", topics[userBadge.get("topic_id")]);
        }
        return userBadge;
      });
      if ("user_badge" in json) {
        return userBadges[0];
      } else {
        if (json.user_badge_info) {
          userBadges.grant_count = json.user_badge_info.grant_count;
          userBadges.username = json.user_badge_info.username;
        }
        return userBadges;
      }
    },
    /**
      Find all badges for a given username.
       @method findByUsername
      @param {String} username
      @param {Object} options
      @returns {Promise} a promise that resolves to an array of `UserBadge`.
    **/
    findByUsername(username, options) {
      if (!username) {
        return _rsvp.Promise.resolve([]);
      }
      let url = "/user-badges/" + username + ".json";
      if (options && options.grouped) {
        url += "?grouped=true";
      }
      return (0, _ajax.ajax)(url).then(function (json) {
        return UserBadge.createFromJson(json);
      });
    },
    /**
      Find all badge grants for a given badge ID.
       @method findById
      @param {String} badgeId
      @returns {Promise} a promise that resolves to an array of `UserBadge`.
    **/
    findByBadgeId(badgeId, options) {
      if (!options) {
        options = {};
      }
      options.badge_id = badgeId;
      return (0, _ajax.ajax)("/user_badges.json", {
        data: options
      }).then(function (json) {
        return UserBadge.createFromJson(json);
      });
    },
    /**
      Grant the badge having id `badgeId` to the user identified by `username`.
       @method grant
      @param {Integer} badgeId id of the badge to be granted.
      @param {String} username username of the user to be granted the badge.
      @returns {Promise} a promise that resolves to an instance of `UserBadge`.
    **/
    grant(badgeId, username, reason) {
      return (0, _ajax.ajax)("/user_badges", {
        type: "POST",
        data: {
          username,
          badge_id: badgeId,
          reason
        }
      }).then(function (json) {
        return UserBadge.createFromJson(json);
      });
    }
  });
  var _default = UserBadge;
  _exports.default = _default;
});