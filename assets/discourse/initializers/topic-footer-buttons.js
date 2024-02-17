define("discourse/initializers/topic-footer-buttons", ["exports", "I18n", "discourse/models/bookmark", "discourse/lib/register-topic-footer-button", "discourse/lib/show-modal"], function (_exports, _I18n, _bookmark, _registerTopicFooterButton, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/models/bookmark",0,"discourse/lib/register-topic-footer-button",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  const SHARE_PRIORITY = 1000;
  const BOOKMARK_PRIORITY = 900;
  const ARCHIVE_PRIORITY = 800;
  const FLAG_PRIORITY = 700;
  const DEFER_PRIORITY = 500;
  var _default = {
    name: "topic-footer-buttons",
    initialize() {
      (0, _registerTopicFooterButton.registerTopicFooterButton)({
        id: "share-and-invite",
        icon: "d-topic-share",
        priority: SHARE_PRIORITY,
        label() {
          if (!this.get("topic.isPrivateMessage") || this.site.mobileView) {
            return "footer_nav.share";
          }
        },
        title: "topic.share.help",
        action() {
          const controller = (0, _showModal.default)("share-topic", {
            model: this.topic.category
          });
          controller.setProperties({
            allowInvites: this.currentUser.can_invite_to_forum && this.canInviteTo && !this.inviteDisabled,
            topic: this.topic
          });
        },
        dropdown() {
          return this.site.mobileView;
        },
        classNames: ["share-and-invite"],
        dependentKeys: ["topic.shareUrl", "topic.isPrivateMessage", "canInviteTo", "inviteDisabled", "isPM", "invitingToTopic"]
      });
      (0, _registerTopicFooterButton.registerTopicFooterButton)({
        id: "flag",
        icon: "flag",
        priority: FLAG_PRIORITY,
        label: "topic.flag_topic.title",
        title: "topic.flag_topic.help",
        action: "showFlagTopic",
        dropdown() {
          return this.site.mobileView;
        },
        classNames: ["flag-topic"],
        dependentKeys: ["topic.details.can_flag_topic", "topic.isPrivateMessage"],
        displayed() {
          return this.get("topic.details.can_flag_topic") && !this.get("topic.isPrivateMessage");
        }
      });
      (0, _registerTopicFooterButton.registerTopicFooterButton)({
        dependentKeys: ["topic.bookmarked", "topic.bookmarksWereChanged"],
        id: "bookmark",
        icon() {
          if (this.topic.bookmarks.some(bookmark => bookmark.reminder_at)) {
            return _bookmark.WITH_REMINDER_ICON;
          }
          return _bookmark.NO_REMINDER_ICON;
        },
        priority: BOOKMARK_PRIORITY,
        classNames() {
          return this.topic.bookmarked ? ["bookmark", "bookmarked"] : ["bookmark"];
        },
        label() {
          if (!this.topic.isPrivateMessage || this.site.mobileView) {
            if (this.topic.bookmarkCount === 0) {
              return "bookmarked.title";
            } else if (this.topic.bookmarkCount === 1) {
              return "bookmarked.edit_bookmark";
            } else {
              return "bookmarked.clear_bookmarks";
            }
          }
        },
        translatedTitle() {
          if (this.topic.bookmarkCount === 0) {
            return _I18n.default.t("bookmarked.help.bookmark");
          } else if (this.topic.bookmarkCount === 1) {
            const anyTopicBookmarks = this.topic.bookmarks.some(bookmark => bookmark.bookmarkable_type === "Topic");
            if (anyTopicBookmarks) {
              return _I18n.default.t("bookmarked.help.edit_bookmark_for_topic");
            } else {
              return _I18n.default.t("bookmarked.help.edit_bookmark");
            }
          } else if (this.topic.bookmarks.some(bookmark => bookmark.reminder_at)) {
            return _I18n.default.t("bookmarked.help.unbookmark_with_reminder");
          } else {
            return _I18n.default.t("bookmarked.help.unbookmark");
          }
        },
        action: "toggleBookmark",
        dropdown() {
          return this.site.mobileView;
        }
      });
      (0, _registerTopicFooterButton.registerTopicFooterButton)({
        id: "archive",
        priority: ARCHIVE_PRIORITY,
        icon() {
          return this.archiveIcon;
        },
        label() {
          return this.archiveLabel;
        },
        title() {
          return this.archiveTitle;
        },
        action: "toggleArchiveMessage",
        classNames: ["standard", "archive-topic"],
        dependentKeys: ["canArchive", "archiveIcon", "archiveLabel", "archiveTitle", "toggleArchiveMessage"],
        dropdown() {
          return this.site.mobileView;
        },
        displayed() {
          return this.canArchive;
        }
      });
      (0, _registerTopicFooterButton.registerTopicFooterButton)({
        id: "defer",
        icon: "circle",
        priority: DEFER_PRIORITY,
        label: "topic.defer.title",
        title: "topic.defer.help",
        action: "deferTopic",
        displayed() {
          return this.canDefer;
        },
        dropdown() {
          return this.site.mobileView;
        }
      });
    }
  };
  _exports.default = _default;
});