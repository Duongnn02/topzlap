define("discourse/helpers/period-title", ["exports", "I18n", "discourse-common/lib/helpers"], function (_exports, _I18n, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  const TITLE_SUBS = {
    all: "all_time",
    yearly: "this_year",
    quarterly: "this_quarter",
    monthly: "this_month",
    daily: "today"
  };
  var _default = (0, _helpers.htmlHelper)((period, options) => {
    const title = _I18n.default.t("filters.top." + (TITLE_SUBS[period] || "this_week"));
    if (options.hash.showDateRange) {
      let dateString = "";
      let finish;
      if (options.hash.fullDay) {
        finish = moment().utc().subtract(1, "days");
      } else {
        finish = moment();
      }
      switch (period) {
        case "yearly":
          dateString = finish.clone().subtract(1, "year").format(_I18n.default.t("dates.long_with_year_no_time")) + " – " + finish.format(_I18n.default.t("dates.long_with_year_no_time"));
          break;
        case "quarterly":
          dateString = finish.clone().subtract(3, "month").format(_I18n.default.t("dates.long_no_year_no_time")) + " – " + finish.format(_I18n.default.t("dates.long_no_year_no_time"));
          break;
        case "weekly":
          let start;
          if (options.hash.fullDay) {
            start = finish.clone().subtract(1, "week");
          } else {
            start = finish.clone().subtract(6, "days");
          }
          dateString = start.format(_I18n.default.t("dates.long_no_year_no_time")) + " – " + finish.format(_I18n.default.t("dates.long_no_year_no_time"));
          break;
        case "monthly":
          dateString = finish.clone().subtract(1, "month").format(_I18n.default.t("dates.long_no_year_no_time")) + " – " + finish.format(_I18n.default.t("dates.long_no_year_no_time"));
          break;
        case "daily":
          dateString = finish.clone().format(_I18n.default.t("dates.full_no_year_no_time"));
          break;
      }
      return `<span class="date-section">${title}</span><span class='top-date-string'>${dateString}</span>`;
    } else {
      return title;
    }
  });
  _exports.default = _default;
});