define("discourse/components/date-picker-future", ["exports", "discourse/components/date-picker"], function (_exports, _datePicker) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/date-picker"eaimeta@70e063a35619d71f
  var _default = _datePicker.default.extend({
    _opts() {
      return {
        defaultDate: this.defaultDate || moment().add(1, "day").toDate(),
        setDefaultDate: !!this.defaultDate,
        minDate: this.minDate || moment().toDate()
      };
    }
  });
  _exports.default = _default;
});