define("discourse/models/tag", ["exports", "discourse/models/rest", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _rest, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/rest",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _rest.default.extend((_dec = (0, _decorators.default)("count", "pm_count"), _dec2 = (0, _decorators.default)("id"), (_obj = {
    pmOnly: (0, _computed.readOnly)("pm_only"),
    totalCount(count, pmCount) {
      return pmCount ? count + pmCount : count;
    },
    searchContext(id) {
      return {
        type: "tag",
        id,
        tag: this,
        name: id
      };
    }
  }, (_applyDecoratedDescriptor(_obj, "totalCount", [_dec], Object.getOwnPropertyDescriptor(_obj, "totalCount"), _obj), _applyDecoratedDescriptor(_obj, "searchContext", [_dec2], Object.getOwnPropertyDescriptor(_obj, "searchContext"), _obj)), _obj)));
  _exports.default = _default;
});