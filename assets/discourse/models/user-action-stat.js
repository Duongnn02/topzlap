define("discourse/models/user-action-stat", ["exports", "discourse/models/rest", "discourse/models/user-action", "discourse-common/utils/decorators", "discourse/lib/computed"], function (_exports, _rest, _userAction, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/rest",0,"discourse/models/user-action",0,"discourse-common/utils/decorators",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _rest.default.extend((_dec = (0, _decorators.default)("action_type"), _dec2 = (0, _decorators.default)("action_type"), (_obj = {
    isPM(actionType) {
      return actionType === _userAction.default.TYPES.messages_sent || actionType === _userAction.default.TYPES.messages_received;
    },
    description: (0, _computed.i18n)("action_type", "user_action_groups.%@"),
    isResponse(actionType) {
      return actionType === _userAction.default.TYPES.replies || actionType === _userAction.default.TYPES.quotes;
    }
  }, (_applyDecoratedDescriptor(_obj, "isPM", [_dec], Object.getOwnPropertyDescriptor(_obj, "isPM"), _obj), _applyDecoratedDescriptor(_obj, "isResponse", [_dec2], Object.getOwnPropertyDescriptor(_obj, "isResponse"), _obj)), _obj)));
  _exports.default = _default;
});