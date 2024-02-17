define("select-kit/components/period-chooser/period-chooser-row", ["exports", "select-kit/components/dropdown-select-box/dropdown-select-box-row", "I18n", "discourse-common/utils/decorators", "select-kit/templates/components/period-chooser/period-chooser-row"], function (_exports, _dropdownSelectBoxRow, _I18n, _decorators, _periodChooserRow) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/dropdown-select-box/dropdown-select-box-row",0,"I18n",0,"discourse-common/utils/decorators",0,"select-kit/templates/components/period-chooser/period-chooser-row"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _dropdownSelectBoxRow.default.extend((_dec = (0, _decorators.default)("rowName"), (_obj = {
    layout: _periodChooserRow.default,
    classNames: ["period-chooser-row"],
    title(rowName) {
      return _I18n.default.t(`filters.top.${rowName || "this_week"}`).title;
    }
  }, (_applyDecoratedDescriptor(_obj, "title", [_dec], Object.getOwnPropertyDescriptor(_obj, "title"), _obj)), _obj)));
  _exports.default = _default;
});