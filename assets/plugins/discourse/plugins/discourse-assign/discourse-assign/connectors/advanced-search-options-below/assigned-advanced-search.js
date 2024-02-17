define("discourse/plugins/discourse-assign/discourse-assign/connectors/advanced-search-options-below/assigned-advanced-search", ["exports", "@ember/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = (_obj = {
    shouldRender(args, component) {
      return component.currentUser?.can_assign;
    },
    onChangeAssigned(value) {
      this.onChangeSearchedTermField("assigned", "updateSearchTermForAssignedUsername", value);
    }
  }, (_applyDecoratedDescriptor(_obj, "onChangeAssigned", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeAssigned"), _obj)), _obj);
  _exports.default = _default;
});