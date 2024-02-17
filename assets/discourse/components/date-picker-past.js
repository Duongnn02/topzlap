define("discourse/components/date-picker-past", ["exports", "discourse/components/date-picker"], function (_exports, _datePicker) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/date-picker"eaimeta@70e063a35619d71f
  var _default = _datePicker.default.extend({
    _opts() {
      return {
        defaultDate: moment(this.defaultDate, "YYYY-MM-DD").toDate() || new Date(),
        setDefaultDate: !!this.defaultDate,
        maxDate: new Date()
      };
    }
  });
  _exports.default = _default;
});