define("discourse/lib/user-menu/message-item", ["exports", "discourse/lib/user-menu/base-item", "discourse/lib/utilities", "@ember/template", "discourse/lib/text", "I18n"], function (_exports, _baseItem, _utilities, _template, _text, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/user-menu/base-item",0,"discourse/lib/utilities",0,"@ember/template",0,"discourse/lib/text",0,"I18n"eaimeta@70e063a35619d71f
  class UserMenuMessageItem extends _baseItem.default {
    constructor(_ref) {
      let {
        message
      } = _ref;
      super(...arguments);
      this.message = message;
    }
    get className() {
      return "message";
    }
    get linkHref() {
      const nextUnreadPostNumber = Math.min((this.message.last_read_post_number || 0) + 1, this.message.highest_post_number);
      return (0, _utilities.postUrl)(this.message.slug, this.message.id, nextUnreadPostNumber);
    }
    get linkTitle() {
      return _I18n.default.t("user.private_message");
    }
    get icon() {
      return "notification.private_message";
    }
    get label() {
      return this.message.last_poster_username;
    }
    get description() {
      return (0, _template.htmlSafe)((0, _text.emojiUnescape)(this.message.fancy_title));
    }
    get topicId() {
      return this.message.id;
    }
  }
  _exports.default = UserMenuMessageItem;
});