define("select-kit/components/notifications-button/notifications-button-row", ["exports", "select-kit/components/dropdown-select-box/dropdown-select-box-row", "I18n", "@ember/object", "discourse/lib/utilities", "@ember/object/computed"], function (_exports, _dropdownSelectBoxRow, _I18n, _object, _utilities, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/dropdown-select-box/dropdown-select-box-row",0,"I18n",0,"@ember/object",0,"discourse/lib/utilities",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  var _default = _dropdownSelectBoxRow.default.extend({
    classNames: ["notifications-button-row"],
    i18nPrefix: (0, _computed.readOnly)("selectKit.options.i18nPrefix"),
    i18nPostfix: (0, _computed.readOnly)("selectKit.options.i18nPostfix"),
    label: (0, _object.computed)("_start", function () {
      return (0, _utilities.escapeExpression)(_I18n.default.t(`${this._start}.title`));
    }),
    title: (0, _computed.readOnly)("label"),
    icons: (0, _object.computed)("title", "item.icon", function () {
      return [(0, _utilities.escapeExpression)(this.item.icon)];
    }),
    description: (0, _object.computed)("_start", function () {
      if (this.site && this.site.mobileView) {
        return null;
      }
      return (0, _utilities.escapeExpression)(_I18n.default.t(`${this._start}.description`));
    }),
    _start: (0, _object.computed)("i18nPrefix", "i18nPostfix", "rowName", function () {
      return `${this.i18nPrefix}.${this.rowName}${this.i18nPostfix}`;
    })
  });
  _exports.default = _default;
});