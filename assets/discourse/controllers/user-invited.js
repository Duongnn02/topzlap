define("discourse/controllers/user-invited", ["exports", "@ember/controller", "discourse-common/utils/decorators", "I18n"], function (_exports, _controller, _decorators, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse-common/utils/decorators",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("invitesCount.total", "invitesCount.pending"), _dec2 = (0, _decorators.default)("invitesCount.total", "invitesCount.expired"), _dec3 = (0, _decorators.default)("invitesCount.total", "invitesCount.redeemed"), (_obj = {
    pendingLabel(invitesCountTotal, invitesCountPending) {
      if (invitesCountTotal > 0) {
        return _I18n.default.t("user.invited.pending_tab_with_count", {
          count: invitesCountPending
        });
      } else {
        return _I18n.default.t("user.invited.pending_tab");
      }
    },
    expiredLabel(invitesCountTotal, invitesCountExpired) {
      if (invitesCountTotal > 0) {
        return _I18n.default.t("user.invited.expired_tab_with_count", {
          count: invitesCountExpired
        });
      } else {
        return _I18n.default.t("user.invited.expired_tab");
      }
    },
    redeemedLabel(invitesCountTotal, invitesCountRedeemed) {
      if (invitesCountTotal > 0) {
        return _I18n.default.t("user.invited.redeemed_tab_with_count", {
          count: invitesCountRedeemed
        });
      } else {
        return _I18n.default.t("user.invited.redeemed_tab");
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "pendingLabel", [_dec], Object.getOwnPropertyDescriptor(_obj, "pendingLabel"), _obj), _applyDecoratedDescriptor(_obj, "expiredLabel", [_dec2], Object.getOwnPropertyDescriptor(_obj, "expiredLabel"), _obj), _applyDecoratedDescriptor(_obj, "redeemedLabel", [_dec3], Object.getOwnPropertyDescriptor(_obj, "redeemedLabel"), _obj)), _obj)));
  _exports.default = _default;
});