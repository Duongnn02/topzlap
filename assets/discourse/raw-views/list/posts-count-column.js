define("discourse/raw-views/list/posts-count-column", ["exports", "@ember/object", "I18n", "discourse-common/utils/decorators"], function (_exports, _object, _I18n, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"I18n",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _object.default.extend((_dec = (0, _decorators.default)("topic.like_count", "topic.posts_count"), _dec2 = (0, _decorators.default)("topic.replyCount", "ratioText"), _dec3 = (0, _decorators.default)("ratio"), _dec4 = (0, _decorators.default)("ratioText"), (_obj = {
    tagName: "td",
    ratio(likeCount, postCount) {
      const likes = parseFloat(likeCount);
      const posts = parseFloat(postCount);
      if (posts < 10) {
        return 0;
      }
      return (likes || 0) / posts;
    },
    title(count, ratio) {
      return _I18n.default.messageFormat("posts_likes_MF", {
        count,
        ratio
      }).trim();
    },
    ratioText(ratio) {
      const settings = this.siteSettings;
      if (ratio > settings.topic_post_like_heat_high) {
        return "high";
      }
      if (ratio > settings.topic_post_like_heat_medium) {
        return "med";
      }
      if (ratio > settings.topic_post_like_heat_low) {
        return "low";
      }
      return "";
    },
    likesHeat(ratioText) {
      if (ratioText && ratioText.length) {
        return `heatmap-${ratioText}`;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "ratio", [_dec], Object.getOwnPropertyDescriptor(_obj, "ratio"), _obj), _applyDecoratedDescriptor(_obj, "title", [_dec2], Object.getOwnPropertyDescriptor(_obj, "title"), _obj), _applyDecoratedDescriptor(_obj, "ratioText", [_dec3], Object.getOwnPropertyDescriptor(_obj, "ratioText"), _obj), _applyDecoratedDescriptor(_obj, "likesHeat", [_dec4], Object.getOwnPropertyDescriptor(_obj, "likesHeat"), _obj)), _obj)));
  _exports.default = _default;
});