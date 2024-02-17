define("discourse/controllers/about", ["exports", "@ember/controller", "I18n", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _controller, _I18n, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("model.contact_url", "model.contact_email"), (_obj = {
    faqOverridden: (0, _computed.gt)("siteSettings.faq_url.length", 0),
    contactInfo(url, email) {
      if (url) {
        return _I18n.default.t("about.contact_info", {
          contact_info: `<a href='${url}' target='_blank'>${url}</a>`
        });
      } else if (email) {
        return _I18n.default.t("about.contact_info", {
          contact_info: email
        });
      } else {
        return null;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "contactInfo", [_dec], Object.getOwnPropertyDescriptor(_obj, "contactInfo"), _obj)), _obj)));
  _exports.default = _default;
});