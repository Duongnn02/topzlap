define("discourse/lib/local-dates", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.applyLocalDates = applyLocalDates;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function applyLocalDates(dates, siteSettings) {
    if (!siteSettings.discourse_local_dates_enabled) {
      return;
    }
    const _applyLocalDates = requirejs("discourse/plugins/discourse-local-dates/initializers/discourse-local-dates").applyLocalDates;
    _applyLocalDates(dates, siteSettings);
  }
});