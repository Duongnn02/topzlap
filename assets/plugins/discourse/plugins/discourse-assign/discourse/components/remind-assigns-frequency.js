define("discourse/plugins/discourse-assign/discourse/components/remind-assigns-frequency", ["exports", "@ember/component", "I18n", "discourse-common/utils/decorators"], function (_exports, _component, _I18n, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend((_dec = (0, _decorators.default)("user.custom_fields.remind_assigns_frequency", "siteSettings.remind_assigns_frequency"), _dec2 = (0, _decorators.default)("user.reminders_frequency"), (_obj = {
    selectedFrequency(userAssignsFrequency, siteDefaultAssignsFrequency) {
      if (this.availableFrequencies.map(freq => freq.value).includes(userAssignsFrequency)) {
        return userAssignsFrequency;
      }
      return siteDefaultAssignsFrequency;
    },
    availableFrequencies(userRemindersFrequency) {
      return userRemindersFrequency.map(freq => {
        return {
          name: _I18n.default.t(freq.name),
          value: freq.value,
          selected: false
        };
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "selectedFrequency", [_dec], Object.getOwnPropertyDescriptor(_obj, "selectedFrequency"), _obj), _applyDecoratedDescriptor(_obj, "availableFrequencies", [_dec2], Object.getOwnPropertyDescriptor(_obj, "availableFrequencies"), _obj)), _obj)));
  _exports.default = _default;
});