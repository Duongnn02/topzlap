define("discourse/helpers/cold-age-class", ["exports", "discourse-common/lib/helpers"], function (_exports, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.daysSinceEpoch = daysSinceEpoch;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  function daysSinceEpoch(dt) {
    // 1000 * 60 * 60 * 24 = days since epoch
    return dt.getTime() / 86400000;
  }
  (0, _helpers.registerUnbound)("cold-age-class", function (dt, params) {
    let className = params["class"] || "age";
    if (!dt) {
      return className;
    }
    let startDate = params.startDate || new Date();

    // Show heat on age
    let nowDays = daysSinceEpoch(startDate),
      epochDays = daysSinceEpoch(new Date(dt));
    let siteSettings = (0, _helpers.helperContext)().siteSettings;
    if (nowDays - epochDays > siteSettings.cold_age_days_high) {
      return className + " coldmap-high";
    }
    if (nowDays - epochDays > siteSettings.cold_age_days_medium) {
      return className + " coldmap-med";
    }
    if (nowDays - epochDays > siteSettings.cold_age_days_low) {
      return className + " coldmap-low";
    }
    return className;
  });
});