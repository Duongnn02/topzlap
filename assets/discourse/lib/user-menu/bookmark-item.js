define("discourse/lib/user-menu/bookmark-item", ["exports", "discourse/lib/user-menu/base-item", "discourse/models/bookmark"], function (_exports, _baseItem, _bookmark) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/user-menu/base-item",0,"discourse/models/bookmark"eaimeta@70e063a35619d71f
  class UserMenuBookmarkItem extends _baseItem.default {
    constructor(_ref) {
      let {
        bookmark
      } = _ref;
      super(...arguments);
      this.bookmark = bookmark;
    }
    get className() {
      return "bookmark";
    }
    get linkHref() {
      return this.bookmark.bookmarkable_url;
    }
    get linkTitle() {
      return this.bookmark.name;
    }
    get icon() {
      return _bookmark.NO_REMINDER_ICON;
    }
    get label() {
      return this.bookmark.user?.username;
    }
    get description() {
      return this.bookmark.title;
    }
    get topicId() {
      return this.bookmark.topic_id;
    }
  }
  _exports.default = UserMenuBookmarkItem;
});