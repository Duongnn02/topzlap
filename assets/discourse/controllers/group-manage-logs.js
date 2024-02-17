define("discourse/controllers/group-manage-logs", ["exports", "@ember/controller", "@ember/object", "discourse-common/utils/decorators"], function (_exports, _controller, _object, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("filters.action", "filters.acting_user", "filters.target_user", "filters.subject"), _dec2 = (0, _decorators.observes)("filters.action", "filters.acting_user", "filters.target_user", "filters.subject"), _dec3 = (0, _decorators.observes)("model.all_loaded"), (_obj = {
    group: (0, _controller.inject)(),
    application: (0, _controller.inject)(),
    loading: false,
    offset: 0,
    init() {
      this._super(...arguments);
      this.set("filters", _object.default.create());
    },
    filterParams(filtersAction, acting_user, target_user, subject) {
      return {
        action: filtersAction,
        acting_user,
        target_user,
        subject
      };
    },
    _refreshModel() {
      this.get("group.model").findLogs(0, this.filterParams).then(results => {
        this.set("offset", 0);
        this.model.setProperties({
          logs: results.logs,
          all_loaded: results.all_loaded
        });
      });
    },
    _showFooter() {
      this.set("application.showFooter", this.get("model.all_loaded"));
    },
    reset() {
      this.setProperties({
        offset: 0,
        filters: _object.default.create()
      });
    },
    loadMore() {
      if (this.get("model.all_loaded")) {
        return;
      }
      this.set("loading", true);
      this.get("group.model").findLogs(this.offset + 1, this.filterParams).then(results => {
        results.logs.forEach(result => this.get("model.logs").addObject(result));
        this.incrementProperty("offset");
        this.set("model.all_loaded", results.all_loaded);
      }).finally(() => this.set("loading", false));
    },
    clearFilter(key) {
      this.set(`filters.${key}`, "");
    }
  }, (_applyDecoratedDescriptor(_obj, "filterParams", [_dec], Object.getOwnPropertyDescriptor(_obj, "filterParams"), _obj), _applyDecoratedDescriptor(_obj, "_refreshModel", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_refreshModel"), _obj), _applyDecoratedDescriptor(_obj, "_showFooter", [_dec3], Object.getOwnPropertyDescriptor(_obj, "_showFooter"), _obj), _applyDecoratedDescriptor(_obj, "loadMore", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadMore"), _obj), _applyDecoratedDescriptor(_obj, "clearFilter", [_object.action], Object.getOwnPropertyDescriptor(_obj, "clearFilter"), _obj)), _obj)));
  _exports.default = _default;
});