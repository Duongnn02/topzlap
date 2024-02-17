define("discourse/controllers/user-summary", ["exports", "@ember/controller", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/lib/formatter"], function (_exports, _controller, _computed, _decorators, _formatter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse/lib/formatter"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // should be kept in sync with 'UserSummary::MAX_BADGES'
  const MAX_BADGES = 6;
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("model.badges.length"), _dec2 = (0, _decorators.default)("model.time_read"), _dec3 = (0, _decorators.default)("model.time_read"), _dec4 = (0, _decorators.default)("model.time_read", "model.recent_time_read"), _dec5 = (0, _decorators.default)("model.recent_time_read"), _dec6 = (0, _decorators.default)("model.recent_time_read"), (_obj = {
    userController: (0, _controller.inject)("user"),
    user: (0, _computed.alias)("userController.model"),
    moreBadges(badgesLength) {
      return badgesLength >= MAX_BADGES;
    },
    timeRead(timeReadSeconds) {
      return (0, _formatter.duration)(timeReadSeconds, {
        format: "tiny"
      });
    },
    timeReadMedium(timeReadSeconds) {
      return (0, _formatter.duration)(timeReadSeconds, {
        format: "medium"
      });
    },
    showRecentTimeRead(timeRead, recentTimeRead) {
      return timeRead !== recentTimeRead && recentTimeRead !== 0;
    },
    recentTimeRead(recentTimeReadSeconds) {
      return recentTimeReadSeconds > 0 ? (0, _formatter.duration)(recentTimeReadSeconds, {
        format: "tiny"
      }) : null;
    },
    recentTimeReadMedium(recentTimeReadSeconds) {
      return recentTimeReadSeconds > 0 ? (0, _formatter.duration)(recentTimeReadSeconds, {
        format: "medium"
      }) : null;
    }
  }, (_applyDecoratedDescriptor(_obj, "moreBadges", [_dec], Object.getOwnPropertyDescriptor(_obj, "moreBadges"), _obj), _applyDecoratedDescriptor(_obj, "timeRead", [_dec2], Object.getOwnPropertyDescriptor(_obj, "timeRead"), _obj), _applyDecoratedDescriptor(_obj, "timeReadMedium", [_dec3], Object.getOwnPropertyDescriptor(_obj, "timeReadMedium"), _obj), _applyDecoratedDescriptor(_obj, "showRecentTimeRead", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showRecentTimeRead"), _obj), _applyDecoratedDescriptor(_obj, "recentTimeRead", [_dec5], Object.getOwnPropertyDescriptor(_obj, "recentTimeRead"), _obj), _applyDecoratedDescriptor(_obj, "recentTimeReadMedium", [_dec6], Object.getOwnPropertyDescriptor(_obj, "recentTimeReadMedium"), _obj)), _obj)));
  _exports.default = _default;
});