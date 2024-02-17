define("discourse/models/pending-post", ["exports", "discourse-common/utils/decorators", "discourse/models/rest", "discourse-common/utils/category-macro", "discourse/lib/url", "@ember/object/computed", "discourse/lib/text"], function (_exports, _decorators, _rest, _categoryMacro, _url, _computed, _text) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"discourse/models/rest",0,"discourse-common/utils/category-macro",0,"discourse/lib/url",0,"@ember/object/computed",0,"discourse/lib/text"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const PendingPost = _rest.default.extend((_dec = (0, _decorators.default)("username"), (_obj = {
    expandedExcerpt: null,
    postUrl: (0, _computed.reads)("topic_url"),
    truncated: false,
    init() {
      this._super(...arguments);
      (0, _text.cookAsync)(this.raw_text).then(cooked => {
        this.set("expandedExcerpt", cooked);
      });
    },
    userUrl(username) {
      return (0, _url.userPath)(username.toLowerCase());
    },
    category: (0, _categoryMacro.default)("category_id")
  }, (_applyDecoratedDescriptor(_obj, "userUrl", [_dec], Object.getOwnPropertyDescriptor(_obj, "userUrl"), _obj)), _obj)));
  var _default = PendingPost;
  _exports.default = _default;
});