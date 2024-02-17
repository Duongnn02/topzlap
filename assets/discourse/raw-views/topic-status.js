define("discourse/raw-views/topic-status", ["exports", "@ember/object", "I18n", "discourse-common/utils/decorators"], function (_exports, _object, _I18n, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"I18n",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _object.default.extend((_dec = (0, _decorators.default)("defaultIcon"), (_obj = {
    showDefault: null,
    renderDiv(defaultIcon) {
      return (defaultIcon || this.statuses.length > 0) && !this.noDiv;
    },
    statuses() {
      const topic = this.topic;
      const results = [];

      // TODO, custom statuses? via override?
      if (topic.get("is_warning")) {
        results.push({
          icon: "envelope",
          key: "warning"
        });
      }
      if (topic.get("bookmarked")) {
        const postNumbers = topic.get("bookmarked_post_numbers");
        let url = topic.get("url");
        let extraClasses = "";
        if (postNumbers && postNumbers[0] > 1) {
          url += "/" + postNumbers[0];
        } else {
          extraClasses = "op-bookmark";
        }
        results.push({
          extraClasses,
          icon: "bookmark",
          key: "bookmarked",
          href: url
        });
      }
      if (topic.get("closed") && topic.get("archived")) {
        results.push({
          icon: "lock",
          key: "locked_and_archived"
        });
      } else if (topic.get("closed")) {
        results.push({
          icon: "lock",
          key: "locked"
        });
      } else if (topic.get("archived")) {
        results.push({
          icon: "lock",
          key: "archived"
        });
      }
      if (topic.get("pinned")) {
        results.push({
          icon: "thumbtack",
          key: "pinned"
        });
      }
      if (topic.get("unpinned")) {
        results.push({
          icon: "thumbtack",
          key: "unpinned"
        });
      }
      if (topic.get("invisible")) {
        results.push({
          icon: "far-eye-slash",
          key: "unlisted"
        });
      }
      if (this.showPrivateMessageIcon && topic.isPrivateMessage && !topic.is_warning) {
        results.push({
          icon: "envelope",
          key: "personal_message"
        });
      }
      results.forEach(result => {
        result.title = _I18n.default.t(`topic_statuses.${result.key}.help`);
        if (this.currentUser && (result.key === "pinned" || result.key === "unpinned")) {
          result.openTag = "a href";
          result.closeTag = "a";
        } else {
          result.openTag = "span";
          result.closeTag = "span";
        }
      });
      let defaultIcon = this.defaultIcon;
      if (results.length === 0 && defaultIcon) {
        this.set("showDefault", defaultIcon);
      }
      return results;
    }
  }, (_applyDecoratedDescriptor(_obj, "renderDiv", [_dec], Object.getOwnPropertyDescriptor(_obj, "renderDiv"), _obj), _applyDecoratedDescriptor(_obj, "statuses", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "statuses"), _obj)), _obj)));
  _exports.default = _default;
});