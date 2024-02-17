define("select-kit/components/future-date-input-selector", ["exports", "select-kit/components/combo-box", "@ember/object/computed", "@ember/utils"], function (_exports, _comboBox, _computed, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.FORMAT = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/combo-box",0,"@ember/object/computed",0,"@ember/utils"eaimeta@70e063a35619d71f
  const FORMAT = "YYYY-MM-DD HH:mmZ";
  _exports.FORMAT = FORMAT;
  var _default = _comboBox.default.extend({
    pluginApiIdentifiers: ["future-date-input-selector"],
    classNames: ["future-date-input-selector"],
    isCustom: (0, _computed.equal)("value", "custom"),
    userTimezone: null,
    selectKitOptions: {
      autoInsertNoneItem: false,
      headerComponent: "future-date-input-selector/future-date-input-selector-header"
    },
    init() {
      this._super(...arguments);
      this.userTimezone = this.currentUser.user_option.timezone;
    },
    modifyComponentForRow() {
      return "future-date-input-selector/future-date-input-selector-row";
    },
    actions: {
      onChange(value) {
        if (value !== "custom" && !(0, _utils.isEmpty)(value)) {
          const {
            time
          } = this.content.find(x => x.id === value);
          if (time) {
            this.attrs.onChangeInput && this.attrs.onChangeInput(time.locale("en").format(FORMAT));
          }
        }
        this.attrs.onChange && this.attrs.onChange(value);
      }
    }
  });
  _exports.default = _default;
});