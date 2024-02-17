define("discourse/models/result-set", ["exports", "@ember/array/proxy", "rsvp", "discourse-common/utils/decorators"], function (_exports, _proxy, _rsvp, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/array/proxy",0,"rsvp",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _proxy.default.extend((_dec = (0, _decorators.default)("totalRows", "length"), (_obj = {
    loading: false,
    loadingMore: false,
    totalRows: 0,
    refreshing: false,
    content: null,
    loadMoreUrl: null,
    refreshUrl: null,
    findArgs: null,
    store: null,
    __type: null,
    resultSetMeta: null,
    canLoadMore(totalRows, length) {
      return length < totalRows;
    },
    loadMore() {
      const loadMoreUrl = this.loadMoreUrl;
      if (!loadMoreUrl) {
        return;
      }
      const totalRows = this.totalRows;
      if (this.length < totalRows && !this.loadingMore) {
        this.set("loadingMore", true);
        return this.store.appendResults(this, this.__type, loadMoreUrl).finally(() => this.set("loadingMore", false));
      }
      return _rsvp.Promise.resolve();
    },
    refresh() {
      if (this.refreshing) {
        return;
      }
      const refreshUrl = this.refreshUrl;
      if (!refreshUrl) {
        return;
      }
      this.set("refreshing", true);
      return this.store.refreshResults(this, this.__type, refreshUrl).finally(() => this.set("refreshing", false));
    }
  }, (_applyDecoratedDescriptor(_obj, "canLoadMore", [_dec], Object.getOwnPropertyDescriptor(_obj, "canLoadMore"), _obj)), _obj)));
  _exports.default = _default;
});