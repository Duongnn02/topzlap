define("discourse/raw-views/topic-list-header-column", ["exports", "@ember/object", "I18n", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _object, _I18n, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"I18n",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _object.default.extend((_obj = {
    sortable: null,
    ariaPressed: (0, _computed.and)("sortable", "isSorting"),
    localizedName() {
      if (this.forceName) {
        return this.forceName;
      }
      return this.name ? _I18n.default.t(this.name) : "";
    },
    sortIcon() {
      const asc = this.parent.ascending ? "up" : "down";
      return `chevron-${asc}`;
    },
    isSorting() {
      return this.sortable && this.parent.order === this.order;
    },
    className() {
      const name = [];
      if (this.order) {
        name.push(this.order);
      }
      if (this.sortable) {
        name.push("sortable");
        if (this.isSorting) {
          name.push("sorting");
        }
      }
      if (this.number) {
        name.push("num");
      }
      return name.join(" ");
    },
    ariaSort() {
      if (this.isSorting) {
        return this.parent.ascending ? "ascending" : "descending";
      } else {
        return false;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "localizedName", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "localizedName"), _obj), _applyDecoratedDescriptor(_obj, "sortIcon", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "sortIcon"), _obj), _applyDecoratedDescriptor(_obj, "isSorting", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "isSorting"), _obj), _applyDecoratedDescriptor(_obj, "className", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "className"), _obj), _applyDecoratedDescriptor(_obj, "ariaSort", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "ariaSort"), _obj)), _obj));
  _exports.default = _default;
});