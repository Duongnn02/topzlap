define("discourse/controllers/navigation/default", ["exports", "@ember/controller", "discourse/mixins/filter-mode", "discourse-common/utils/decorators", "@ember/service", "discourse/lib/topic-list-tracked-filter"], function (_exports, _controller, _filterMode, _decorators, _service, _topicListTrackedFilter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/filter-mode",0,"discourse-common/utils/decorators",0,"@ember/service",0,"discourse/lib/topic-list-tracked-filter"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_filterMode.default, (_dec = (0, _decorators.default)("router.currentRoute.queryParams.f"), (_obj = {
    discovery: (0, _controller.inject)(),
    router: (0, _service.inject)(),
    skipCategoriesNavItem(filterParamValue) {
      return filterParamValue === _topicListTrackedFilter.TRACKED_QUERY_PARAM_VALUE;
    }
  }, (_applyDecoratedDescriptor(_obj, "skipCategoriesNavItem", [_dec], Object.getOwnPropertyDescriptor(_obj, "skipCategoriesNavItem"), _obj)), _obj)));
  _exports.default = _default;
});