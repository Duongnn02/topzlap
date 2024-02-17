define("discourse/raw-views/list/post-count-or-badges", ["exports", "@ember/object/computed", "@ember/object", "I18n", "discourse-common/utils/decorators"], function (_exports, _computed, _object, _I18n, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"@ember/object",0,"I18n",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _object.default.extend((_obj = {
    showBadges: (0, _computed.and)("postBadgesEnabled", "topic.unread_posts"),
    newDotText() {
      return this.currentUser && this.currentUser.trust_level > 0 ? "" : _I18n.default.t("filters.new.lower_title");
    }
  }, (_applyDecoratedDescriptor(_obj, "newDotText", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "newDotText"), _obj)), _obj));
  _exports.default = _default;
});