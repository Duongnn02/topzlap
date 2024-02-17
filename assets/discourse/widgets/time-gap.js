define("discourse/widgets/time-gap", ["exports", "I18n", "discourse/widgets/widget", "virtual-dom"], function (_exports, _I18n, _widget, _virtualDom) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/widgets/widget",0,"virtual-dom"eaimeta@70e063a35619d71f
  function description(attrs) {
    const daysSince = attrs.daysSince;
    if (daysSince < 30) {
      return _I18n.default.t("dates.later.x_days", {
        count: daysSince
      });
    } else if (daysSince < 365) {
      const gapMonths = Math.round(daysSince / 30);
      return _I18n.default.t("dates.later.x_months", {
        count: gapMonths
      });
    } else {
      const gapYears = Math.round(daysSince / 365);
      return _I18n.default.t("dates.later.x_years", {
        count: gapYears
      });
    }
  }
  var _default = (0, _widget.createWidget)("time-gap", {
    tagName: "div.time-gap.small-action",
    html(attrs) {
      return [(0, _virtualDom.h)("div.topic-avatar", ""), (0, _virtualDom.h)("div.small-action-desc.timegap", description(attrs))];
    }
  });
  _exports.default = _default;
});