define("select-kit/components/notifications-filter/notifications-filter-header", ["exports", "select-kit/components/dropdown-select-box/dropdown-select-box-header", "discourse-common/utils/decorators", "discourse/lib/computed", "select-kit/templates/components/notifications-filter/notifications-filter-header"], function (_exports, _dropdownSelectBoxHeader, _decorators, _computed, _notificationsFilterHeader) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/dropdown-select-box/dropdown-select-box-header",0,"discourse-common/utils/decorators",0,"discourse/lib/computed",0,"select-kit/templates/components/notifications-filter/notifications-filter-header"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _dropdownSelectBoxHeader.default.extend((_dec = (0, _decorators.default)("selectKit.isExpanded"), (_obj = {
    layout: _notificationsFilterHeader.default,
    classNames: ["notifications-filter-header"],
    label: (0, _computed.fmt)("value", "user.user_notifications.filters.%@"),
    caretIcon(isExpanded) {
      return isExpanded ? "caret-up" : "caret-down";
    }
  }, (_applyDecoratedDescriptor(_obj, "caretIcon", [_dec], Object.getOwnPropertyDescriptor(_obj, "caretIcon"), _obj)), _obj)));
  _exports.default = _default;
});