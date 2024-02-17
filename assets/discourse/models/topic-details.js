define("discourse/models/topic-details", ["exports", "@ember/object", "discourse/models/rest", "discourse/models/user", "discourse/lib/ajax"], function (_exports, _object, _rest, _user, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"discourse/models/rest",0,"discourse/models/user",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  /**
    A model representing a Topic's details that aren't always present, such as a list of participants.
    When showing topics in lists and such this information should not be required.
  **/

  const TopicDetails = _rest.default.extend({
    loaded: false,
    updateFromJson(details) {
      const topic = this.topic;
      if (details.allowed_users) {
        details.allowed_users = details.allowed_users.map(function (u) {
          return _user.default.create(u);
        });
      }
      if (details.participants) {
        details.participants = details.participants.map(function (p) {
          p.topic = topic;
          return _object.default.create(p);
        });
      }
      this.setProperties(details);
      this.set("loaded", true);
    },
    updateNotifications(level) {
      return (0, _ajax.ajax)(`/t/${this.get("topic.id")}/notifications`, {
        type: "POST",
        data: {
          notification_level: level
        }
      }).then(() => {
        this.setProperties({
          notification_level: level,
          notifications_reason_id: null
        });
      });
    },
    removeAllowedGroup(group) {
      const groups = this.allowed_groups;
      const name = group.name;
      return (0, _ajax.ajax)("/t/" + this.get("topic.id") + "/remove-allowed-group", {
        type: "PUT",
        data: {
          name
        }
      }).then(() => {
        groups.removeObject(groups.findBy("name", name));
      });
    },
    removeAllowedUser(user) {
      const users = this.allowed_users;
      const username = user.get("username");
      return (0, _ajax.ajax)("/t/" + this.get("topic.id") + "/remove-allowed-user", {
        type: "PUT",
        data: {
          username
        }
      }).then(() => {
        users.removeObject(users.findBy("username", username));
      });
    }
  });
  var _default = TopicDetails;
  _exports.default = _default;
});