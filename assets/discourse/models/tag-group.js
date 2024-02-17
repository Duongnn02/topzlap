define("discourse/models/tag-group", ["exports", "discourse/models/permission-type", "discourse/models/rest", "discourse-common/utils/decorators"], function (_exports, _permissionType, _rest, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/permission-type",0,"discourse/models/rest",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _rest.default.extend((_dec = (0, _decorators.default)("permissions"), (_obj = {
    permissionName(permissions) {
      if (!permissions) {
        return "public";
      }
      if (permissions["everyone"] === _permissionType.default.FULL) {
        return "public";
      } else if (permissions["everyone"] === _permissionType.default.READONLY) {
        return "visible";
      } else {
        return "private";
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "permissionName", [_dec], Object.getOwnPropertyDescriptor(_obj, "permissionName"), _obj)), _obj)));
  _exports.default = _default;
});