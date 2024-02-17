define("select-kit/components/period-chooser", ["exports", "@ember/object/computed", "select-kit/components/dropdown-select-box", "I18n"], function (_exports, _computed, _dropdownSelectBox, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"select-kit/components/dropdown-select-box",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _dropdownSelectBox.default.extend({
    classNames: ["period-chooser"],
    classNameBindings: ["showPeriods::hidden"],
    content: (0, _computed.oneWay)("site.periods"),
    value: (0, _computed.readOnly)("period"),
    valueProperty: null,
    nameProperty: null,
    showPeriods: true,
    modifyComponentForRow() {
      return "period-chooser/period-chooser-row";
    },
    selectKitOptions: {
      filterable: false,
      autoFilterable: false,
      fullDay: "fullDay",
      customStyle: true,
      headerComponent: "period-chooser/period-chooser-header",
      headerAriaLabel: _I18n.default.t("period_chooser.aria_label")
    },
    actions: {
      onChange(value) {
        if (this.action) {
          this.action(value);
        } else {
          this.attrs.onChange && this.attrs.onChange(value);
        }
      }
    }
  });
  _exports.default = _default;
});