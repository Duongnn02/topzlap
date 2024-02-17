define("discourse/lib/reviewable-types/flagged-post", ["exports", "discourse/lib/reviewable-types/base", "@ember/template", "I18n", "discourse/lib/text"], function (_exports, _base, _template, _I18n, _text) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/reviewable-types/base",0,"@ember/template",0,"I18n",0,"discourse/lib/text"eaimeta@70e063a35619d71f
  class _default extends _base.default {
    get description() {
      const title = this.reviewable.topic_fancy_title;
      const postNumber = this.reviewable.post_number;
      if (title && postNumber) {
        return (0, _template.htmlSafe)(_I18n.default.t("user_menu.reviewable.post_number_with_topic_title", {
          post_number: postNumber,
          title: (0, _text.emojiUnescape)(title)
        }));
      } else {
        return _I18n.default.t("user_menu.reviewable.deleted_post");
      }
    }
  }
  _exports.default = _default;
});