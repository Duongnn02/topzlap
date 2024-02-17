define("discourse/controllers/groups-index", ["exports", "@ember/controller", "I18n", "discourse-common/config/environment", "@ember/object", "discourse-common/utils/decorators", "discourse-common/lib/debounce"], function (_exports, _controller, _I18n, _environment, _object, _decorators, _debounce) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"discourse-common/config/environment",0,"@ember/object",0,"discourse-common/utils/decorators",0,"discourse-common/lib/debounce"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("groups.extras.type_filters"), (_obj = {
    application: (0, _controller.inject)(),
    queryParams: ["order", "asc", "filter", "type"],
    order: null,
    asc: null,
    filter: "",
    type: null,
    groups: null,
    isLoading: false,
    types(typeFilters) {
      const types = [];
      if (typeFilters) {
        typeFilters.forEach(type => types.push({
          id: type,
          name: _I18n.default.t(`groups.index.${type}_groups`)
        }));
      }
      return types;
    },
    loadGroups(params) {
      this.set("isLoading", true);
      this.store.findAll("group", params).then(groups => {
        this.set("groups", groups);
        if (groups.canLoadMore) {
          this.set("application.showFooter", !groups.canLoadMore);
        }
      }).finally(() => this.set("isLoading", false));
    },
    onFilterChanged(filter) {
      (0, _debounce.default)(this, this._debouncedFilter, filter, _environment.INPUT_DELAY);
    },
    loadMore() {
      this.groups && this.groups.loadMore();
    },
    new() {
      this.transitionToRoute("groups.new");
    },
    _debouncedFilter(filter) {
      this.set("filter", filter);
    }
  }, (_applyDecoratedDescriptor(_obj, "types", [_dec], Object.getOwnPropertyDescriptor(_obj, "types"), _obj), _applyDecoratedDescriptor(_obj, "onFilterChanged", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onFilterChanged"), _obj), _applyDecoratedDescriptor(_obj, "loadMore", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadMore"), _obj), _applyDecoratedDescriptor(_obj, "new", [_object.action], Object.getOwnPropertyDescriptor(_obj, "new"), _obj)), _obj)));
  _exports.default = _default;
});