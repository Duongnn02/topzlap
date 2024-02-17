define("discourse/models/user-action", ["exports", "@ember/object/computed", "discourse-common/utils/decorators", "discourse-common/utils/category-macro", "discourse/models/rest", "discourse/models/user", "discourse/models/user-action-group", "discourse/lib/utilities", "discourse/lib/url"], function (_exports, _computed, _decorators, _categoryMacro, _rest, _user, _userActionGroup, _utilities, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse-common/utils/category-macro",0,"discourse/models/rest",0,"discourse/models/user",0,"discourse/models/user-action-group",0,"discourse/lib/utilities",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const UserActionTypes = {
    likes_given: 1,
    likes_received: 2,
    bookmarks: 3,
    topics: 4,
    posts: 5,
    replies: 6,
    mentions: 7,
    quotes: 9,
    edits: 11,
    messages_sent: 12,
    messages_received: 13
  };
  const InvertedActionTypes = {};
  Object.keys(UserActionTypes).forEach(k => InvertedActionTypes[k] = UserActionTypes[k]);
  const UserAction = _rest.default.extend((_dec = (0, _decorators.default)("action_type"), _dec2 = (0, _decorators.default)("username"), _dec3 = (0, _decorators.default)("target_username"), _dec4 = (0, _decorators.default)("target_username"), _dec5 = (0, _decorators.default)("username"), _dec6 = (0, _decorators.default)("usernameLower"), _dec7 = (0, _decorators.default)(), _dec8 = (0, _decorators.default)(), _dec9 = (0, _decorators.default)("childGroups", "childGroups.likes.items", "childGroups.likes.items.[]", "childGroups.stars.items", "childGroups.stars.items.[]", "childGroups.edits.items", "childGroups.edits.items.[]", "childGroups.bookmarks.items", "childGroups.bookmarks.items.[]"), (_obj = {
    category: (0, _categoryMacro.default)("category_id"),
    descriptionKey(action) {
      if (action === null || UserAction.TO_SHOW.includes(action)) {
        if (this.isPM) {
          return this.sameUser ? "sent_by_you" : "sent_by_user";
        } else {
          return this.sameUser ? "posted_by_you" : "posted_by_user";
        }
      }
      if (this.topicType) {
        return this.sameUser ? "you_posted_topic" : "user_posted_topic";
      }
      if (this.postReplyType) {
        if (this.reply_to_post_number) {
          return this.sameUser ? "you_replied_to_post" : "user_replied_to_post";
        } else {
          return this.sameUser ? "you_replied_to_topic" : "user_replied_to_topic";
        }
      }
      if (this.mentionType) {
        if (this.sameUser) {
          return "you_mentioned_user";
        } else {
          return this.targetUser ? "user_mentioned_you" : "user_mentioned_user";
        }
      }
    },
    sameUser(username) {
      return username === _user.default.currentProp("username");
    },
    targetUser(targetUsername) {
      return targetUsername === _user.default.currentProp("username");
    },
    presentName: (0, _computed.or)("name", "username"),
    targetDisplayName: (0, _computed.or)("target_name", "target_username"),
    actingDisplayName: (0, _computed.or)("acting_name", "acting_username"),
    targetUserUrl(username) {
      return (0, _url.userPath)(username);
    },
    usernameLower(username) {
      return username.toLowerCase();
    },
    userUrl(usernameLower) {
      return (0, _url.userPath)(usernameLower);
    },
    postUrl() {
      return (0, _utilities.postUrl)(this.slug, this.topic_id, this.post_number);
    },
    replyUrl() {
      return (0, _utilities.postUrl)(this.slug, this.topic_id, this.reply_to_post_number);
    },
    replyType: (0, _computed.equal)("action_type", UserActionTypes.replies),
    postType: (0, _computed.equal)("action_type", UserActionTypes.posts),
    topicType: (0, _computed.equal)("action_type", UserActionTypes.topics),
    bookmarkType: (0, _computed.equal)("action_type", UserActionTypes.bookmarks),
    messageSentType: (0, _computed.equal)("action_type", UserActionTypes.messages_sent),
    messageReceivedType: (0, _computed.equal)("action_type", UserActionTypes.messages_received),
    mentionType: (0, _computed.equal)("action_type", UserActionTypes.mentions),
    isPM: (0, _computed.or)("messageSentType", "messageReceivedType"),
    postReplyType: (0, _computed.or)("postType", "replyType"),
    addChild(action) {
      let groups = this.childGroups;
      if (!groups) {
        groups = {
          likes: _userActionGroup.default.create({
            icon: "heart"
          }),
          stars: _userActionGroup.default.create({
            icon: "star"
          }),
          edits: _userActionGroup.default.create({
            icon: "pencil-alt"
          }),
          bookmarks: _userActionGroup.default.create({
            icon: "bookmark"
          })
        };
      }
      this.set("childGroups", groups);
      const bucket = function () {
        switch (action.action_type) {
          case UserActionTypes.likes_given:
          case UserActionTypes.likes_received:
            return "likes";
          case UserActionTypes.edits:
            return "edits";
          case UserActionTypes.bookmarks:
            return "bookmarks";
        }
      }();
      const current = groups[bucket];
      if (current) {
        current.push(action);
      }
    },
    children() {
      const g = this.childGroups;
      let rval = [];
      if (g) {
        rval = [g.likes, g.stars, g.edits, g.bookmarks].filter(function (i) {
          return i.get("items") && i.get("items").length > 0;
        });
      }
      return rval;
    },
    switchToActing() {
      this.setProperties({
        username: this.acting_username,
        name: this.actingDisplayName
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "descriptionKey", [_dec], Object.getOwnPropertyDescriptor(_obj, "descriptionKey"), _obj), _applyDecoratedDescriptor(_obj, "sameUser", [_dec2], Object.getOwnPropertyDescriptor(_obj, "sameUser"), _obj), _applyDecoratedDescriptor(_obj, "targetUser", [_dec3], Object.getOwnPropertyDescriptor(_obj, "targetUser"), _obj), _applyDecoratedDescriptor(_obj, "targetUserUrl", [_dec4], Object.getOwnPropertyDescriptor(_obj, "targetUserUrl"), _obj), _applyDecoratedDescriptor(_obj, "usernameLower", [_dec5], Object.getOwnPropertyDescriptor(_obj, "usernameLower"), _obj), _applyDecoratedDescriptor(_obj, "userUrl", [_dec6], Object.getOwnPropertyDescriptor(_obj, "userUrl"), _obj), _applyDecoratedDescriptor(_obj, "postUrl", [_dec7], Object.getOwnPropertyDescriptor(_obj, "postUrl"), _obj), _applyDecoratedDescriptor(_obj, "replyUrl", [_dec8], Object.getOwnPropertyDescriptor(_obj, "replyUrl"), _obj), _applyDecoratedDescriptor(_obj, "children", [_dec9], Object.getOwnPropertyDescriptor(_obj, "children"), _obj)), _obj)));
  UserAction.reopenClass({
    collapseStream(stream) {
      const uniq = {};
      const collapsed = [];
      let pos = 0;
      stream.forEach(item => {
        const key = "" + item.topic_id + "-" + item.post_number;
        const found = uniq[key];
        if (found === void 0) {
          let current;
          if (UserAction.TO_COLLAPSE.includes(item.action_type)) {
            current = UserAction.create(item);
            item.switchToActing();
            current.addChild(item);
          } else {
            current = item;
          }
          uniq[key] = pos;
          collapsed[pos] = current;
          pos += 1;
        } else {
          if (UserAction.TO_COLLAPSE.includes(item.action_type)) {
            item.switchToActing();
            collapsed[found].addChild(item);
          } else {
            collapsed[found].setProperties(item.getProperties("action_type", "description"));
          }
        }
      });
      return collapsed;
    },
    TYPES: UserActionTypes,
    TYPES_INVERTED: InvertedActionTypes,
    TO_COLLAPSE: [UserActionTypes.likes_given, UserActionTypes.likes_received, UserActionTypes.edits, UserActionTypes.bookmarks],
    TO_SHOW: [UserActionTypes.likes_given, UserActionTypes.likes_received, UserActionTypes.edits, UserActionTypes.bookmarks, UserActionTypes.messages_sent, UserActionTypes.messages_received]
  });
  var _default = UserAction;
  _exports.default = _default;
});