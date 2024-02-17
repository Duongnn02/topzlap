define("discourse/widgets/quick-access-bookmarks", ["discourse/widgets/raw-html", "discourse/models/bookmark", "discourse-common/lib/icon-library", "discourse/widgets/quick-access-panel", "discourse/lib/ajax", "discourse/widgets/widget", "virtual-dom", "discourse/lib/utilities", "I18n", "@ember/template"], function (_rawHtml, _bookmark, _iconLibrary, _quickAccessPanel, _ajax, _widget, _virtualDom, _utilities, _I18n, _template) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/raw-html",0,"discourse/models/bookmark",0,"discourse-common/lib/icon-library",0,"discourse/widgets/quick-access-panel",0,"discourse/lib/ajax",0,"discourse/widgets/widget",0,"virtual-dom",0,"discourse/lib/utilities",0,"I18n",0,"@ember/template"eaimeta@70e063a35619d71f
  (0, _widget.createWidget)("no-quick-access-bookmarks", {
    html() {
      return (0, _virtualDom.h)("div.empty-state", [(0, _virtualDom.h)("span.empty-state-title", _I18n.default.t("user.no_bookmarks_title")), (0, _virtualDom.h)("div.empty-state-body", new _rawHtml.default({
        html: "<p>" + (0, _template.htmlSafe)(_I18n.default.t("user.no_bookmarks_body", {
          icon: (0, _iconLibrary.iconHTML)(_bookmark.NO_REMINDER_ICON)
        })) + "</p>"
      }))]);
    }
  });
  (0, _widget.createWidgetFrom)(_quickAccessPanel.default, "quick-access-bookmarks", {
    buildKey: () => "quick-access-bookmarks",
    emptyStateWidget: "no-quick-access-bookmarks",
    showAllHref() {
      return `${this.attrs.path}/activity/bookmarks`;
    },
    findNewItems() {
      return this.loadBookmarksWithReminders();
    },
    itemHtml(bookmark) {
      // for topic level bookmarks we want to jump to the last unread post
      // instead of the OP
      let postNumber;
      if (bookmark.bookmarkable_type === "Topic") {
        postNumber = bookmark.last_read_post_number + 1;
      } else {
        postNumber = bookmark.linked_post_number;
      }
      let href;
      if (bookmark.bookmarkable_type === "Topic" || bookmark.bookmarkable_type === "Post") {
        href = (0, _utilities.postUrl)(bookmark.slug, bookmark.topic_id, postNumber);
      } else {
        href = bookmark.bookmarkable_url;
      }
      return this.attach("quick-access-item", {
        icon: this.icon(bookmark),
        href,
        title: bookmark.name,
        content: bookmark.title,
        username: bookmark.user?.username
      });
    },
    icon(bookmark) {
      if (bookmark.reminder_at) {
        return _bookmark.WITH_REMINDER_ICON;
      }
      return _bookmark.NO_REMINDER_ICON;
    },
    loadBookmarksWithReminders() {
      return (0, _ajax.ajax)(`/u/${this.currentUser.username}/bookmarks.json`).then(_ref => {
        let {
          user_bookmark_list
        } = _ref;
        return user_bookmark_list.bookmarks;
      });
    }
  });
});