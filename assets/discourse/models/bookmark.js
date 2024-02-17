define("discourse/models/bookmark", ["exports", "discourse-common/utils/category-macro", "I18n", "rsvp", "discourse/models/rest", "discourse/models/user", "discourse/models/topic", "discourse/lib/ajax", "@ember/object", "discourse-common/utils/decorators", "discourse/lib/bookmark", "discourse-common/lib/get-url", "discourse/lib/formatter", "@ember/object/computed", "@ember/string", "discourse/lib/model-transformers"], function (_exports, _categoryMacro, _I18n, _rsvp, _rest, _user, _topic, _ajax, _object, _decorators, _bookmark, _getUrl, _formatter, _computed, _string, _modelTransformers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.WITH_REMINDER_ICON = _exports.NO_REMINDER_ICON = _exports.AUTO_DELETE_PREFERENCES = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/category-macro",0,"I18n",0,"rsvp",0,"discourse/models/rest",0,"discourse/models/user",0,"discourse/models/topic",0,"discourse/lib/ajax",0,"@ember/object",0,"discourse-common/utils/decorators",0,"discourse/lib/bookmark",0,"discourse-common/lib/get-url",0,"discourse/lib/formatter",0,"@ember/object/computed",0,"@ember/string",0,"discourse/lib/model-transformers"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const AUTO_DELETE_PREFERENCES = {
    NEVER: 0,
    CLEAR_REMINDER: 3,
    WHEN_REMINDER_SENT: 1,
    ON_OWNER_REPLY: 2
  };
  _exports.AUTO_DELETE_PREFERENCES = AUTO_DELETE_PREFERENCES;
  const NO_REMINDER_ICON = "bookmark";
  _exports.NO_REMINDER_ICON = NO_REMINDER_ICON;
  const WITH_REMINDER_ICON = "discourse-bookmark-clock";
  _exports.WITH_REMINDER_ICON = WITH_REMINDER_ICON;
  const Bookmark = _rest.default.extend((_dec = (0, _decorators.default)("highest_post_number", "url"), _dec2 = (0, _decorators.default)("bumped_at", "createdAt"), _dec3 = (0, _decorators.default)("bumpedAt", "createdAt"), _dec4 = (0, _decorators.default)("created_at"), _dec5 = (0, _decorators.default)("tags"), _dec6 = (0, _decorators.default)("reminder_at", "currentUser"), _dec7 = (0, _decorators.default)("reminder_at"), _dec8 = (0, _decorators.default)(), _dec9 = (0, _decorators.default)("bookmarkable_type"), (_obj = {
    newBookmark: (0, _computed.none)("id"),
    get url() {
      return (0, _getUrl.default)(`/bookmarks/${this.id}`);
    },
    destroy() {
      if (this.newBookmark) {
        return _rsvp.Promise.resolve();
      }
      return (0, _ajax.ajax)(this.url, {
        type: "DELETE"
      });
    },
    attachedTo() {
      return {
        target: this.bookmarkable_type.toLowerCase(),
        targetId: this.bookmarkable_id
      };
    },
    togglePin() {
      if (this.newBookmark) {
        return _rsvp.Promise.resolve();
      }
      return (0, _ajax.ajax)(this.url + "/toggle_pin", {
        type: "PUT"
      });
    },
    pinAction() {
      return this.pinned ? "unpin" : "pin";
    },
    lastPostUrl(highestPostNumber) {
      return this.urlForPostNumber(highestPostNumber);
    },
    // Helper to build a Url with a post number
    urlForPostNumber(postNumber) {
      let url = (0, _getUrl.default)(`/t/${this.topic_id}`);
      if (postNumber > 0) {
        url += `/${postNumber}`;
      }
      return url;
    },
    bumpedAt(bumped_at, createdAt) {
      if (bumped_at) {
        return new Date(bumped_at);
      } else {
        return createdAt;
      }
    },
    bumpedAtTitle(bumpedAt, createdAt) {
      return _I18n.default.t("topic.bumped_at_title", {
        createdAtDate: (0, _formatter.longDate)(createdAt),
        bumpedAtDate: (0, _formatter.longDate)(bumpedAt)
      });
    },
    createdAt(created_at) {
      return new Date(created_at);
    },
    visibleListTags(tags) {
      if (!tags || !this.siteSettings.suppress_overlapping_tags_in_list) {
        return tags;
      }
      const title = this.title;
      const newTags = [];
      tags.forEach(function (tag) {
        if (!title.toLowerCase().includes(tag)) {
          newTags.push(tag);
        }
      });
      return newTags;
    },
    category: (0, _categoryMacro.default)("category_id"),
    formattedReminder(bookmarkReminderAt, currentUser) {
      return (0, _string.capitalize)((0, _bookmark.formattedReminderTime)(bookmarkReminderAt, currentUser.user_option.timezone));
    },
    reminderAtExpired(bookmarkReminderAt) {
      return moment(bookmarkReminderAt) < moment();
    },
    topicForList() {
      // for topic level bookmarks we want to jump to the last unread post URL,
      // which the topic-link helper does by default if no linked post number is
      // provided
      const linkedPostNumber = this.bookmarkable_type === "Topic" ? null : this.linked_post_number;
      return _topic.default.create({
        id: this.topic_id,
        fancy_title: this.fancy_title,
        linked_post_number: linkedPostNumber,
        last_read_post_number: this.last_read_post_number,
        highest_post_number: this.highest_post_number
      });
    },
    bookmarkableTopicAlike(bookmarkable_type) {
      return ["Topic", "Post"].includes(bookmarkable_type);
    }
  }, (_applyDecoratedDescriptor(_obj, "url", [_object.computed], Object.getOwnPropertyDescriptor(_obj, "url"), _obj), _applyDecoratedDescriptor(_obj, "lastPostUrl", [_dec], Object.getOwnPropertyDescriptor(_obj, "lastPostUrl"), _obj), _applyDecoratedDescriptor(_obj, "bumpedAt", [_dec2], Object.getOwnPropertyDescriptor(_obj, "bumpedAt"), _obj), _applyDecoratedDescriptor(_obj, "bumpedAtTitle", [_dec3], Object.getOwnPropertyDescriptor(_obj, "bumpedAtTitle"), _obj), _applyDecoratedDescriptor(_obj, "createdAt", [_dec4], Object.getOwnPropertyDescriptor(_obj, "createdAt"), _obj), _applyDecoratedDescriptor(_obj, "visibleListTags", [_dec5], Object.getOwnPropertyDescriptor(_obj, "visibleListTags"), _obj), _applyDecoratedDescriptor(_obj, "formattedReminder", [_dec6], Object.getOwnPropertyDescriptor(_obj, "formattedReminder"), _obj), _applyDecoratedDescriptor(_obj, "reminderAtExpired", [_dec7], Object.getOwnPropertyDescriptor(_obj, "reminderAtExpired"), _obj), _applyDecoratedDescriptor(_obj, "topicForList", [_dec8], Object.getOwnPropertyDescriptor(_obj, "topicForList"), _obj), _applyDecoratedDescriptor(_obj, "bookmarkableTopicAlike", [_dec9], Object.getOwnPropertyDescriptor(_obj, "bookmarkableTopicAlike"), _obj)), _obj)));
  Bookmark.reopenClass({
    create(args) {
      args = args || {};
      args.currentUser = args.currentUser || _user.default.current();
      args.user = _user.default.create(args.user);
      return this._super(args);
    },
    createFor(user, bookmarkableType, bookmarkableId) {
      return Bookmark.create({
        bookmarkable_type: bookmarkableType,
        bookmarkable_id: bookmarkableId,
        user_id: user.id,
        auto_delete_preference: user.user_option.bookmark_auto_delete_preference
      });
    },
    async applyTransformations(bookmarks) {
      await (0, _modelTransformers.applyModelTransformations)("bookmark", bookmarks);
    }
  });
  var _default = Bookmark;
  _exports.default = _default;
});