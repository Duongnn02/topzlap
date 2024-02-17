define("discourse/lib/reviewable-types/queued-post", ["exports", "discourse/lib/reviewable-types/base", "@ember/template", "discourse/lib/utilities", "discourse/lib/text", "I18n"], function (_exports, _base, _template, _utilities, _text, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/reviewable-types/base",0,"@ember/template",0,"discourse/lib/utilities",0,"discourse/lib/text",0,"I18n"eaimeta@70e063a35619d71f
  class _default extends _base.default {
    get actor() {
      return _I18n.default.t("user_menu.reviewable.queue");
    }
    get description() {
      let title = this.reviewable.topic_fancy_title;
      if (!title) {
        title = (0, _utilities.escapeExpression)(this.reviewable.payload_title);
      }
      title = (0, _text.emojiUnescape)(title);
      if (this.reviewable.is_new_topic) {
        return (0, _template.htmlSafe)(title);
      } else {
        return (0, _template.htmlSafe)(_I18n.default.t("user_menu.reviewable.new_post_in_topic", {
          title
        }));
      }
    }
    get icon() {
      return "layer-group";
    }
  }
  _exports.default = _default;
});