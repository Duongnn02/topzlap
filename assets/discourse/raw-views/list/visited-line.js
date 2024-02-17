define("discourse/raw-views/list/visited-line", ["exports", "@ember/object", "discourse-common/utils/decorators"], function (_exports, _object, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _object.default.extend((_obj = {
    isLastVisited() {
      return this.lastVisitedTopic === this.topic;
    }
  }, (_applyDecoratedDescriptor(_obj, "isLastVisited", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "isLastVisited"), _obj)), _obj));
  _exports.default = _default;
});