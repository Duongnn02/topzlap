define("discourse/models/permission-type", ["exports", "@ember/object", "I18n", "discourse-common/utils/decorators"], function (_exports, _object, _I18n, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.buildPermissionDescription = buildPermissionDescription;
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"I18n",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function buildPermissionDescription(id) {
    return _I18n.default.t("permission_types." + PermissionType.DESCRIPTION_KEYS[id]);
  }
  const PermissionType = _object.default.extend((_dec = (0, _decorators.default)("id"), (_obj = {
    description(id) {
      return buildPermissionDescription(id);
    }
  }, (_applyDecoratedDescriptor(_obj, "description", [_dec], Object.getOwnPropertyDescriptor(_obj, "description"), _obj)), _obj)));
  PermissionType.FULL = 1;
  PermissionType.CREATE_POST = 2;
  PermissionType.READONLY = 3;
  PermissionType.DESCRIPTION_KEYS = {
    1: "full",
    2: "create_post",
    3: "readonly"
  };
  var _default = PermissionType;
  _exports.default = _default;
});