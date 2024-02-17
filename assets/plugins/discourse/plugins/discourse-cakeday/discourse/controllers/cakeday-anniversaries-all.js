define("discourse/plugins/discourse-cakeday/discourse/controllers/cakeday-anniversaries-all", ["exports", "@ember/controller", "discourse-common/utils/decorators"], function (_exports, _controller, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_obj = {
    queryParams: ["month"],
    month: moment().month() + 1,
    months() {
      return moment.months().map((month, index) => {
        return {
          name: month,
          value: index + 1
        };
      });
    },
    actions: {
      loadMore() {
        this.get("model").loadMore();
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "months", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "months"), _obj)), _obj));
  _exports.default = _default;
});