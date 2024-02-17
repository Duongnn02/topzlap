define("discourse/controllers/request-group-membership-form", ["exports", "@ember/controller", "discourse/lib/url", "I18n", "discourse/mixins/modal-functionality", "@ember/object/computed", "discourse-common/utils/decorators", "@ember/utils", "discourse/lib/ajax-error"], function (_exports, _controller, _url, _I18n, _modalFunctionality, _computed, _decorators, _utils, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/lib/url",0,"I18n",0,"discourse/mixins/modal-functionality",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"@ember/utils",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("model.name"), _dec2 = (0, _decorators.default)("loading", "reason"), (_obj = {
    loading: false,
    reason: (0, _computed.alias)("model.membership_request_template"),
    title(groupName) {
      return _I18n.default.t("groups.membership_request.title", {
        group_name: groupName
      });
    },
    disableSubmit(loading, reason) {
      return loading || (0, _utils.isEmpty)(reason);
    },
    actions: {
      requestMember() {
        if (this.currentUser) {
          this.set("loading", true);
          this.model.requestMembership(this.reason).then(result => {
            _url.default.routeTo(result.relative_url);
          }).catch(_ajaxError.popupAjaxError).finally(() => {
            this.set("loading", false);
          });
        } else {
          this._showLoginModal();
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "title", [_dec], Object.getOwnPropertyDescriptor(_obj, "title"), _obj), _applyDecoratedDescriptor(_obj, "disableSubmit", [_dec2], Object.getOwnPropertyDescriptor(_obj, "disableSubmit"), _obj)), _obj)));
  _exports.default = _default;
});